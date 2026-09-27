import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur dark:bg-black/80 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Inmobiliaria<span className="text-blue-600">Demo</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>
          <Link href="/propiedades" className="hover:text-blue-600">
            Propiedades
          </Link>
          <Link href="/contacto" className="hover:text-blue-600">
            Contacto
          </Link>
          <Link
            href="/admin"
            className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Panel de gestión
          </Link>
        </nav>
      </div>
    </header>
  );
}
