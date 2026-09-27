import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(p: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== "page") params.set(key, value);
    }
    params.set("page", String(p));
    return `/propiedades?${params.toString()}`;
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={`rounded-lg border border-black/10 px-3 py-2 text-sm ${
          page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-black/5"
        }`}
      >
        Anterior
      </Link>
      <span className="text-sm text-black/60">
        Página {page} de {totalPages}
      </span>
      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={`rounded-lg border border-black/10 px-3 py-2 text-sm ${
          page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-black/5"
        }`}
      >
        Siguiente
      </Link>
    </nav>
  );
}
