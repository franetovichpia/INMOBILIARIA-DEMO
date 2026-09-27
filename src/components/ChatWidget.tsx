"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de Gastón Niggli Propiedades. Contame qué tipo de casa en la costa estás buscando (ciudad, presupuesto, dormitorios) y te ayudo a encontrarla. Si preferís hablar directo con un agente, decímelo cuando quieras.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Ocurrió un error." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ocurrió un error de conexión, intentá de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900">
          <div className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <span className="font-semibold">Asistente Gastón Niggli Propiedades</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar chat">
              ✕
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-brand-600 text-white"
                    : "bg-black/5 dark:bg-white/10"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-black/5 px-3 py-2 text-sm dark:bg-white/10">
                Escribiendo...
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 border-t border-black/10 p-3 dark:border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu consulta..."
              className="flex-1 rounded-full border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700"
        aria-label="Abrir chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
