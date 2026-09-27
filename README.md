# Gastón Niggli Propiedades

Sitio inmobiliario completo para casas en la costa atlántica: catálogo de
propiedades, chat con inteligencia artificial (con derivación a un agente
humano) y panel de gestión multiusuario.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **Prisma** + SQLite (demo local, fácil de migrar a Postgres/MySQL)
- **NextAuth v5** (Credentials) para el panel de gestión con roles
- **Anthropic API** (`@anthropic-ai/sdk`) para el chat con IA, con
  búsqueda de propiedades como *tool* del modelo (no se envía todo el
  catálogo al prompt, así escala con miles de propiedades)

## Funcionalidades

- **Sitio público**: home con destacados, listado de propiedades con
  filtros (ciudad, tipo, operación, precio) y paginación, ficha de
  detalle con formulario de consulta, página de contacto.
- **Chat con IA**: widget flotante que responde preguntas sobre las
  propiedades consultando la base de datos en tiempo real, y cuando la
  consulta lo requiere (agendar visita, negociar precio, pedir hablar con
  alguien) pide nombre y contacto y **deriva la conversación a un agente
  humano**: crea una consulta que aparece en el panel de gestión y, si se
  configuró `AGENT_WHATSAPP`, ofrece un link directo de WhatsApp. Sin
  `ANTHROPIC_API_KEY` configurada funciona en modo degradado (búsqueda
  simple) para poder probar el resto del sitio igual.
- **Panel de gestión** (`/admin`): login con roles `ADMIN` y `AGENTE`.
  - Dashboard con métricas y últimas consultas recibidas.
  - ABM de propiedades (alta, edición, baja) con paginación para
    catálogos grandes.
  - ABM de usuarios del panel (solo `ADMIN`).

## Pensado para gran volumen de clientes y propiedades

- Listados con paginación real (`skip`/`take` + `count`) tanto en el
  sitio público como en el panel, en vez de traer todo a memoria.
- Índices de base de datos (`prisma/schema.prisma`) en los campos que se
  filtran habitualmente: ciudad, tipo, operación, estado, precio, fecha.
- El chat consulta la base de datos a demanda (tool calling) en lugar de
  incluir el catálogo completo en cada prompt.
- Para producción con mucho tráfico se recomienda migrar de SQLite a
  **Postgres** (ver más abajo) y desplegar detrás de un CDN/edge cache
  para las páginas públicas.

## Primeros pasos

```bash
npm install
cp .env.example .env   # completar ANTHROPIC_API_KEY si se quiere el chat con IA
npx prisma db push     # crea prisma/dev.db con el esquema
npx prisma db seed     # carga usuarios y propiedades de ejemplo
npm run dev
```

Abrir http://localhost:3000

### Usuarios de prueba (panel `/admin`)

| Email | Contraseña | Rol |
|---|---|---|
| gaston@nigglipropiedades.com | admin123 | ADMIN |
| agente@nigglipropiedades.com | agente123 | AGENTE |

## Variables de entorno

Ver `.env.example`:

- `DATABASE_URL`: cadena de conexión de Prisma (SQLite por defecto).
- `AUTH_SECRET`: secreto de NextAuth (generar uno propio en producción).
- `ANTHROPIC_API_KEY`: clave de la API de Anthropic para el chat con IA
  (opcional en desarrollo).
- `ANTHROPIC_MODEL`: opcional, para elegir el modelo del chat.
- `AGENT_NAME`: nombre que usa el chat al presentarse y al derivar una
  consulta.
- `AGENT_WHATSAPP`: número de WhatsApp del agente (formato internacional,
  sin "+"), para el link directo que ofrece el chat al derivar.

## Migrar a Postgres para producción

1. En `prisma/schema.prisma` cambiar `provider = "sqlite"` por
   `provider = "postgresql"` en el bloque `datasource db`.
2. Los campos que hoy son `String` a modo de "enum" (`role`, `type`,
   `operation`, `status`) se pueden convertir a `enum` reales de Prisma
   si se desea (SQLite no los soporta, Postgres sí).
3. Configurar `DATABASE_URL` apuntando al Postgres real y correr
   `npx prisma migrate deploy`.

## Estructura

```
src/
  app/
    (site)/          # sitio público: home, propiedades, contacto
    admin/
      login/         # login (fuera del layout del panel)
      (panel)/       # dashboard, ABM de propiedades y usuarios
    api/
      auth/          # NextAuth
      chat/          # chat con IA
      inquiries/     # consultas del formulario de contacto
  components/        # UI compartida (cards, filtros, chat widget, forms)
  lib/               # prisma client, auth, acciones de servidor, helpers
prisma/
  schema.prisma
  seed.ts
```
