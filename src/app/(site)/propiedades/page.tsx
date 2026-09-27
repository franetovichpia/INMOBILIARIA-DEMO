import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import Pagination from "@/components/Pagination";
import { getProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  city?: string;
  type?: string;
  operation?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
};

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { items, total, page, totalPages } = await getProperties({
    q: params.q,
    city: params.city,
    type: params.type,
    operation: params.operation,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    page: params.page ? Number(params.page) : 1,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Propiedades</h1>
      <div className="mb-8">
        <PropertyFilters />
      </div>
      <p className="mb-4 text-sm text-black/60">
        {total} resultado{total !== 1 && "s"}
      </p>
      {items.length === 0 ? (
        <p className="text-black/60">
          No se encontraron propiedades con esos filtros.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} searchParams={params} />
        </>
      )}
    </div>
  );
}
