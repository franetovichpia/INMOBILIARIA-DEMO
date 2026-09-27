import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-sun-400 px-4 py-14 text-brand-900">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-3xl sm:text-5xl">
          Tu próximo capítulo <em className="not-italic text-brand-700">empieza acá.</em>
        </h2>
        <Link
          href="/contacto"
          className="mt-8 inline-flex min-w-[220px] items-center justify-between gap-16 border-b-2 border-brand-900 pb-3 font-heading text-lg font-bold"
        >
          Escribinos <span aria-hidden="true" className="text-2xl">↗</span>
        </Link>
        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-brand-900/25 pt-5 text-xs font-bold tracking-wide sm:flex-row">
          <span>GASTÓN NIGGLI PROPIEDADES</span>
          <span>© {new Date().getFullYear()} · Casas en la costa</span>
        </div>
      </div>
    </footer>
  );
}
