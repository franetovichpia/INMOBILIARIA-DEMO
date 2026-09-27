import { NextResponse } from "next/server";
import { z } from "zod";
import type Anthropic from "@anthropic-ai/sdk";
import { getAnthropicClient, CHAT_MODEL } from "@/lib/anthropic";
import { getProperties } from "@/lib/properties";
import { formatPrice } from "@/lib/format";
import {
  OPERATION_TYPE_LABELS,
  PROPERTY_TYPE_LABELS,
  type OperationType,
  type PropertyType,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
});

// Herramienta que el modelo puede invocar para consultar la base de datos
// en lugar de recibir todo el catálogo en el prompt: así el chat escala
// aunque haya miles de propiedades cargadas.
const searchTool: Anthropic.Tool = {
  name: "buscar_propiedades",
  description:
    "Busca propiedades disponibles en la base de datos según filtros. Usar antes de responder preguntas sobre propiedades, precios, ubicaciones o disponibilidad.",
  input_schema: {
    type: "object",
    properties: {
      ciudad: { type: "string", description: "Ciudad o barrio" },
      tipo: {
        type: "string",
        enum: ["CASA", "DEPARTAMENTO", "PH", "TERRENO", "LOCAL", "OFICINA"],
      },
      operacion: { type: "string", enum: ["VENTA", "ALQUILER"] },
      precioMin: { type: "number" },
      precioMax: { type: "number" },
      dormitoriosMin: { type: "number" },
      texto: {
        type: "string",
        description: "Texto libre para buscar en título/descripción",
      },
    },
  },
};

async function runSearch(input: {
  ciudad?: string;
  tipo?: string;
  operacion?: string;
  precioMin?: number;
  precioMax?: number;
  dormitoriosMin?: number;
  texto?: string;
}) {
  const { items } = await getProperties({
    city: input.ciudad,
    type: input.tipo,
    operation: input.operacion,
    minPrice: input.precioMin,
    maxPrice: input.precioMax,
    bedrooms: input.dormitoriosMin,
    q: input.texto,
    page: 1,
  });

  return items.slice(0, 8).map((p) => ({
    id: p.id,
    titulo: p.title,
    tipo: PROPERTY_TYPE_LABELS[p.type as PropertyType] ?? p.type,
    operacion: OPERATION_TYPE_LABELS[p.operation as OperationType] ?? p.operation,
    precio: formatPrice(p.price, p.currency),
    ciudad: p.city,
    provincia: p.province,
    dormitorios: p.bedrooms,
    banos: p.bathrooms,
    areaTotal: p.areaTotal,
    estado: p.status,
    url: `/propiedades/${p.id}`,
  }));
}

const SYSTEM_PROMPT = `Sos el asistente virtual de InmobiliariaDemo, un sitio inmobiliario en Argentina.
Ayudás a los visitantes a encontrar propiedades en venta y alquiler, respondés en español rioplatense, de forma breve, cálida y profesional.
Usá siempre la herramienta buscar_propiedades para verificar precios, disponibilidad y características antes de responder sobre propiedades concretas: nunca inventes datos que no vengan de la herramienta.
Si no encontrás resultados, sugerí ampliar la búsqueda (otra ciudad, otro rango de precio, etc).
Cuando menciones una propiedad, incluí su nombre y el link relativo (por ejemplo /propiedades/abc123) para que el usuario pueda hacer clic.
Si te preguntan algo que no tiene que ver con la inmobiliaria, respondé amablemente que solo podés ayudar con temas de propiedades.`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const anthropic = getAnthropicClient();

  if (!anthropic) {
    // Sin API key configurada: respondemos con una búsqueda básica en la
    // base de datos para que el chat siga siendo útil en desarrollo.
    const lastMessage = parsed.data.messages.at(-1)?.content ?? "";
    const results = await runSearch({ texto: lastMessage });
    const reply =
      results.length > 0
        ? `Encontré ${results.length} propiedad(es) relacionadas:\n\n` +
          results
            .map((r) => `• ${r.titulo} — ${r.precio} (${r.ciudad}) → ${r.url}`)
            .join("\n")
        : "No encontré propiedades que coincidan con tu búsqueda. Probá con otra ciudad, tipo o rango de precio.\n\n(Nota: configurá ANTHROPIC_API_KEY para habilitar el asistente con IA conversacional completo.)";
    return NextResponse.json({ reply });
  }

  const messages: Anthropic.MessageParam[] = parsed.data.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  let finalText = "";

  for (let turn = 0; turn < 4; turn++) {
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [searchTool],
      messages,
    });

    const toolUses = response.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
    );

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    if (text) finalText = text;

    if (toolUses.length === 0 || response.stop_reason !== "tool_use") {
      break;
    }

    messages.push({ role: "assistant", content: response.content });

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const toolUse of toolUses) {
      if (toolUse.name === "buscar_propiedades") {
        const results = await runSearch(
          (toolUse.input ?? {}) as Parameters<typeof runSearch>[0],
        );
        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: JSON.stringify(results),
        });
      }
    }
    messages.push({ role: "user", content: toolResults });
  }

  return NextResponse.json({
    reply: finalText || "No pude generar una respuesta, intentá reformular tu consulta.",
  });
}
