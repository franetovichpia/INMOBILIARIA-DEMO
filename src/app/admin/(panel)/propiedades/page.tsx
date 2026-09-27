import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";
import { PROPERTY_STATUS_LABELS, type PropertyStatus } from "@/lib/constants";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const q = params.q?.trim();

  const where = q
    ? {
        OR: [
          { title: { contains: q } },
          { city: { contains: q } },
        ],
      }
    : {};

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { owner: { select: { name: true } } },
    }),
    prisma.property.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Propiedades ({total})</h1>
        <Link
          href="/admin/propiedades/nueva"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Nueva propiedad
        </Link>
      </div>

      <form className="mb-4" method="get">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por título o ciudad..."
          className="w-full max-w-sm rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
        />
      </form>

      <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-black/5 text-left dark:bg-white/5">
            <tr>
              <th className="p-3">Título</th>
              <th className="p-3">Ciudad</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Agente</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t border-black/10 dark:border-white/10">
                <td className="max-w-xs truncate p-3 font-medium">{property.title}</td>
                <td className="p-3">{property.city}</td>
                <td className="p-3">{formatPrice(property.price, property.currency)}</td>
                <td className="p-3">
                  {PROPERTY_STATUS_LABELS[property.status as PropertyStatus] ??
                    property.status}
                </td>
                <td className="p-3">{property.owner.name}</td>
                <td className="whitespace-nowrap p-3 text-right">
                  <Link
                    href={`/admin/propiedades/${property.id}`}
                    className="mr-4 text-sm font-medium text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <DeletePropertyButton id={property.id} />
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-black/50 dark:text-white/50">
                  No hay propiedades cargadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/propiedades?page=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-lg border px-3 py-1.5 ${
                p === page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
