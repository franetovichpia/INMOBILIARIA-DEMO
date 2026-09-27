import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteUserButton from "@/components/admin/DeleteUserButton";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { _count: { select: { properties: true } } },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios ({total})</h1>
        <Link
          href="/admin/usuarios/nuevo"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Nuevo usuario
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-black/5 text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Propiedades</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-black/10">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role === "ADMIN" ? "Administrador" : "Agente"}</td>
                <td className="p-3">{u._count.properties}</td>
                <td className="p-3 text-right">
                  <DeleteUserButton id={u.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/usuarios?page=${p}`}
              className={`rounded-lg border px-3 py-1.5 ${
                p === page
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-black/10 hover:bg-black/5"
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
