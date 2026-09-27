"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

const userSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  password: z.string().min(6).max(200),
  role: z.enum(ROLES),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }
  return session.user;
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const parsed = userSchema.parse(Object.fromEntries(formData));

  const hashed = await bcrypt.hash(parsed.password, 10);
  await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      password: hashed,
      role: parsed.role,
    },
  });

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export async function deleteUser(id: string) {
  const currentUser = await requireAdmin();
  if (currentUser.id === id) {
    throw new Error("No podés eliminar tu propio usuario");
  }
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
}

export async function updateUserRole(id: string, role: string) {
  await requireAdmin();
  const parsedRole = z.enum(ROLES).parse(role);
  await prisma.user.update({ where: { id }, data: { role: parsedRole } });
  revalidatePath("/admin/usuarios");
}
