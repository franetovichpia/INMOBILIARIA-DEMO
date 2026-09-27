import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [totalProperties, disponibles, totalUsers, totalInquiries] =
    await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "DISPONIBLE" } }),
      prisma.user.count(),
      prisma.inquiry.count(),
    ]);

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { property: true },
  });

  const stats = [
    { label: "Propiedades totales", value: totalProperties },
    { label: "Disponibles", value: disponibles },
    { label: "Usuarios del panel", value: totalUsers },
    { label: "Consultas recibidas", value: totalInquiries },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-black/10 bg-white p-5"
          >
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-black/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Últimas consultas</h2>
      {recentInquiries.length === 0 ? (
        <p className="text-sm text-black/60">
          Todavía no hay consultas.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-black/10">
          <table className="w-full text-sm">
            <thead className="bg-black/5 text-left">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Email</th>
                <th className="p-3">Propiedad</th>
                <th className="p-3">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-t border-black/10">
                  <td className="p-3">{inquiry.name}</td>
                  <td className="p-3">{inquiry.email}</td>
                  <td className="p-3">{inquiry.property?.title ?? "General"}</td>
                  <td className="max-w-xs truncate p-3">{inquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
