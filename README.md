# Gastón Niggli Propiedades

Sitio inmobiliario completo para casas en la costa atlántica: catálogo de
propiedades, chat con inteligencia artificial (con derivación a un agente
humano) y panel de gestión multiusuario.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **Prisma** + **Postgres** (necesario para desplegar en Vercel u otro
  entorno serverless, donde no se puede usar un archivo de SQLite)
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
- Para producción con mucho tráfico, además de Postgres conviene
  desplegar detrás de un CDN/edge cache para las páginas públicas.

## Primeros pasos

Necesitás una base Postgres (local o en la nube) antes de arrancar. La
forma más rápida de conseguir una gratis es [neon.new](https://neon.new)
o [Supabase](https://supabase.com); copiá la connection string que te
den.

```bash
npm install
cp .env.example .env   # pegar el DATABASE_URL de Postgres y completar lo demás
npx prisma db push     # crea las tablas en esa base
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

- `DATABASE_URL`: cadena de conexión de Postgres (ver más abajo cómo
  conseguir una).
- `AUTH_SECRET`: secreto de NextAuth (generar uno propio en producción).
- `ANTHROPIC_API_KEY`: clave de la API de Anthropic para el chat con IA
  (opcional en desarrollo).
- `ANTHROPIC_MODEL`: opcional, para elegir el modelo del chat.
- `AGENT_NAME`: nombre que usa el chat al presentarse y al derivar una
  consulta.
- `AGENT_WHATSAPP`: número de WhatsApp del agente (formato internacional,
  sin "+"), para el link directo que ofrece el chat al derivar.

## Desplegar en Vercel

Vercel corre el sitio en funciones serverless con sistema de archivos
efímero/de solo lectura: **no admite un archivo de SQLite**, por eso el
proyecto usa Postgres desde el principio. Pasos para publicarlo:

1. **Crear la base de datos**: en [neon.new](https://neon.new) (o
   Supabase, o el addon de Postgres de Vercel), crear un proyecto nuevo
   y copiar la connection string (`DATABASE_URL`).
2. **Cargar el esquema** una vez, desde tu máquina, apuntando esa misma
   `DATABASE_URL` en tu `.env` local:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
3. **Importar el repo en Vercel** (vercel.com → Add New → Project →
   elegir este repositorio de GitHub).
4. **Configurar las variables de entorno** en Vercel (Settings →
   Environment Variables), las mismas de `.env.example`:
   - `DATABASE_URL` (la de Postgres del paso 1)
   - `AUTH_SECRET` (generar una nueva para producción, no reusar la de
     desarrollo — se puede generar con `openssl rand -base64 32`)
   - `ANTHROPIC_API_KEY` (opcional, para el chat con IA completo)
   - `ANTHROPIC_MODEL`, `AGENT_NAME`, `AGENT_WHATSAPP` (opcionales)
5. **Deploy**. Si falla, revisar en Vercel → el deployment → "Runtime
   Logs" para ver el error real (suele ser una variable de entorno que
   falta o mal copiada).

Los pasos 1 y 2 solo se repiten si se cambia de base de datos; después,
cada `git push` a la rama conectada dispara un deploy nuevo solo.

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
