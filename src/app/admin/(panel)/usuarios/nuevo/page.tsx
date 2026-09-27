import { createUser } from "@/lib/actions/users";
import { ROLES } from "@/lib/constants";

export default function NewUserPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Nuevo usuario</h1>
      <form action={createUser} className="flex max-w-md flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre</label>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Contraseña</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Rol</label>
          <select
            name="role"
            defaultValue="AGENTE"
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r === "ADMIN" ? "Administrador" : "Agente"}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-fit rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Crear usuario
        </button>
      </form>
    </div>
  );
}
