import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-900/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 font-heading text-base font-extrabold tracking-tight sm:text-lg"
        >
          GASTÓN<span className="font-medium"> NIGGLI</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sun-500" />
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
          <Link href="/" className="hidden hover:text-brand-600 sm:inline">
            Inicio
          </Link>
          <Link href="/propiedades" className="hidden hover:text-brand-600 sm:inline">
            Propiedades
          </Link>
          <Link href="/contacto" className="hidden hover:text-brand-600 sm:inline">
            Contacto
          </Link>
          <Link
            href="/admin"
            className="shrink-0 rounded-full bg-sun-400 px-3 py-2 text-xs font-bold text-brand-900 hover:bg-sun-300 sm:px-4 sm:text-sm"
          >
            Panel de gestión
          </Link>
        </nav>
      </div>
    </header>
  );
}
