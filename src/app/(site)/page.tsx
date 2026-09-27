import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import HeroSearch from "@/components/HeroSearch";
import { getFeaturedProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

const COASTAL_CITIES = [
  "Cariló",
  "Pinamar",
  "Mar de las Pampas",
  "Villa Gesell",
  "Mar del Plata",
  "Santa Teresita",
];

export default async function Home() {
  const featured = await getFeaturedProperties();

  return (
    <div>
      <section className="relative isolate flex min-h-[620px] items-end overflow-hidden px-4 pb-16 pt-32 text-white sm:min-h-[760px] sm:px-8">
        <Image
          src="/hero-costa.jpg"
          alt="Camino entre pinos en la costa atlántica"
          fill
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0 -z-10" />

        <span
          aria-hidden="true"
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-180 text-xs font-bold tracking-[0.3em] [writing-mode:vertical-rl] sm:block"
        >
          COSTA · MAR · HOGAR
        </span>

        <div className="w-full max-w-3xl">
          <p className="mb-7 flex items-center gap-3 text-xs font-bold tracking-[0.2em]">
            <span className="h-px w-8 bg-sun-400" />
            UNA NUEVA FORMA DE VIVIR LA COSTA
          </p>
          <h1 className="text-[2.75rem] leading-[0.98] font-heading font-extrabold tracking-tight sm:text-7xl">
            Tu próxima <em className="text-sun-400 not-italic">casa</em>
            <br />
            frente al mar.
          </h1>
          <div className="mt-9 flex max-w-2xl items-end justify-between gap-6 border-t border-white/40 pt-6">
            <p className="max-w-sm text-base text-white/90">
              Propiedades en venta y alquiler en la Costa Atlántica,
              seleccionadas por Gastón Niggli.
            </p>
            <Link
              href="#buscar"
              aria-label="Ir a la búsqueda"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white text-xl transition hover:bg-sun-400 hover:text-brand-900 hover:border-sun-400"
            >
              ↓
            </Link>
          </div>
        </div>
      </section>

      <section id="buscar" className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="mb-10 flex items-start justify-between">
          <span className="text-xs font-bold tracking-[0.2em] text-brand-900/60">
            01 — BUSCÁ TU PROPIEDAD
          </span>
          <span aria-hidden="true" className="text-2xl text-sun-500">
            ✳
          </span>
        </div>
        <HeroSearch />
        <div className="mt-8 flex flex-wrap gap-2">
          {COASTAL_CITIES.map((city) => (
            <Link
              key={city}
              href={`/propiedades?city=${encodeURIComponent(city)}`}
              className="rounded-full border border-brand-900/15 px-4 py-1.5 text-sm text-brand-900/70 transition hover:border-brand-600 hover:text-brand-600"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="mb-3 block text-xs font-bold tracking-[0.2em] text-brand-900/60">
              02 — SELECCIÓN
            </span>
            <h2 className="text-3xl sm:text-4xl">Propiedades destacadas</h2>
          </div>
          <Link
            href="/propiedades"
            className="hidden shrink-0 items-center gap-2 border-b border-brand-900 pb-1 text-sm font-bold hover:border-sun-500 hover:text-sun-600 sm:flex"
          >
            Ver todas <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-brand-900/60">
            Todavía no hay propiedades destacadas.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-brand-900 py-20 text-cream">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-sun-400">
            03 — ASISTENTE VIRTUAL
          </span>
          <h2 className="text-3xl sm:text-4xl">
            ¿Tenés dudas? <em className="text-sun-400 not-italic">Preguntale a nuestra IA.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">
            Usá el chat en la esquina inferior derecha para preguntar por
            precios, ubicaciones o características de nuestras propiedades.
          </p>
        </div>
      </section>
    </div>
  );
}
