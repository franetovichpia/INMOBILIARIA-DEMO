"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
    >
      Cerrar sesión
    </button>
  );
}
