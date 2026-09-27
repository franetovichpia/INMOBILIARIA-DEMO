import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // La página de login se renderiza sin el shell del panel.
  if (!session?.user) {
    redirect("/admin/login");
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col justify-between border-r border-black/10 bg-white p-5">
        <div>
          <p className="mb-8 text-lg font-bold">
            Gastón Niggli<span className="text-brand-600"> Propiedades</span>
          </p>
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 hover:bg-black/5"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/propiedades"
              className="rounded-lg px-3 py-2 hover:bg-black/5"
            >
              Propiedades
            </Link>
            {isAdmin && (
              <Link
                href="/admin/usuarios"
                className="rounded-lg px-3 py-2 hover:bg-black/5"
              >
                Usuarios
              </Link>
            )}
            <Link
              href="/"
              className="mt-4 rounded-lg px-3 py-2 text-black/60 hover:bg-black/5"
            >
              ← Ver sitio público
            </Link>
          </nav>
        </div>
        <div className="border-t border-black/10 pt-4 text-sm">
          <p className="font-medium">{session.user.name}</p>
          <p className="mb-3 text-xs text-black/50">
            {session.user.role === "ADMIN" ? "Administrador" : "Agente"}
          </p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 bg-cream p-8">{children}</main>
    </div>
  );
}
