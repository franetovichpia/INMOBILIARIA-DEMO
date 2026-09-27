import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur dark:bg-black/80 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="shrink-0 text-base font-bold tracking-tight sm:text-lg">
          Gastón Niggli<span className="text-brand-600"> Propiedades</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium sm:gap-6">
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
            className="shrink-0 rounded-full bg-brand-600 px-3 py-2 text-xs text-white hover:bg-brand-700 sm:px-4 sm:text-sm"
          >
            Panel de gestión
          </Link>
        </nav>
      </div>
    </header>
  );
}
