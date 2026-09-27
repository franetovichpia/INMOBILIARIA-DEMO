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
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden px-4 pb-32 pt-32 text-white sm:min-h-[640px] sm:pb-40">
        <Image
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80"
          alt="Camino entre pinos en la costa atlántica"
          fill
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-900/50 to-brand-900/10" />

        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="mb-3 inline-block rounded-full bg-sun-400 px-4 py-1 text-sm font-semibold text-brand-900">
            Casas en la costa
          </p>
          <h1 className="text-4xl font-bold drop-shadow-sm sm:text-5xl">
            Tu próxima casa frente al mar te está esperando
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 drop-shadow-sm">
            Propiedades en venta y alquiler en la Costa Atlántica,
            seleccionadas por Gastón Niggli. Buscá, comparás y consultá con
            nuestro asistente con IA.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-4">
        <div className="mx-auto -mt-24 max-w-4xl sm:-mt-20">
          <HeroSearch />
        </div>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
          {COASTAL_CITIES.map((city) => (
            <Link
              key={city}
              href={`/propiedades?city=${encodeURIComponent(city)}`}
              className="rounded-full border border-black/10 px-4 py-1.5 text-sm text-black/70 transition hover:border-brand-600 hover:text-brand-600 dark:border-white/10 dark:text-white/70"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Propiedades destacadas</h2>
          <Link href="/propiedades" className="text-brand-600 hover:underline">
            Ver todas →
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-black/60 dark:text-white/60">
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

      <section className="bg-white py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold">¿Tenés dudas?</h2>
          <p className="mx-auto mt-2 max-w-xl text-black/60 dark:text-white/60">
            Usá el chat con inteligencia artificial en la esquina inferior
            derecha para preguntar por precios, ubicaciones o características
            de nuestras propiedades.
          </p>
        </div>
      </section>
    </div>
  );
}
