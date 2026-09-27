import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProperties();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Encontrá tu próximo hogar o inversión
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Propiedades en venta y alquiler seleccionadas para vos. Buscá,
            comparativas y consultá con nuestro asistente con IA.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/propiedades"
              className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
            >
              Ver propiedades
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-white/60 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Propiedades destacadas</h2>
          <Link href="/propiedades" className="text-blue-600 hover:underline">
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
