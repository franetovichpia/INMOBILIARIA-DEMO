"use client";

import { useTransition } from "react";
import { deleteUser } from "@/lib/actions/users";

export default function DeleteUserButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("¿Eliminar este usuario?")) {
          startTransition(() => deleteUser(id));
        }
      }}
      disabled={isPending}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      {isPending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
