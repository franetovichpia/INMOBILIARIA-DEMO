"use client";

import { useTransition } from "react";
import { deleteProperty } from "@/lib/actions/properties";

export default function DeletePropertyButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("¿Eliminar esta propiedad? Esta acción no se puede deshacer.")) {
          startTransition(() => deleteProperty(id));
        }
      }}
      disabled={isPending}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      {isPending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
