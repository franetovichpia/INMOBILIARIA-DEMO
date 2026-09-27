"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  OPERATION_TYPES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants";

const propertySchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  type: z.enum(PROPERTY_TYPES),
  operation: z.enum(OPERATION_TYPES),
  status: z.enum(PROPERTY_STATUSES),
  price: z.coerce.number().nonnegative(),
  currency: z.string().min(1).max(10),
  address: z.string().min(1).max(300),
  city: z.string().min(1).max(100),
  province: z.string().min(1).max(100),
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  areaTotal: z.coerce.number().nonnegative(),
  areaCovered: z.coerce.number().nonnegative(),
  images: z.string().max(4000).optional().default(""),
  featured: z.coerce.boolean().optional().default(false),
});

function imagesToJson(raw: string): string {
  const urls = raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(urls);
}

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("No autorizado");
  return session.user;
}

export async function createProperty(formData: FormData) {
  const user = await requireUser();
  const parsed = propertySchema.parse(Object.fromEntries(formData));

  await prisma.property.create({
    data: {
      ...parsed,
      images: imagesToJson(parsed.images ?? ""),
      ownerId: user.id,
    },
  });

  revalidatePath("/propiedades");
  revalidatePath("/admin/propiedades");
  redirect("/admin/propiedades");
}

export async function updateProperty(id: string, formData: FormData) {
  await requireUser();
  const parsed = propertySchema.parse(Object.fromEntries(formData));

  await prisma.property.update({
    where: { id },
    data: {
      ...parsed,
      images: imagesToJson(parsed.images ?? ""),
    },
  });

  revalidatePath("/propiedades");
  revalidatePath(`/propiedades/${id}`);
  revalidatePath("/admin/propiedades");
  redirect("/admin/propiedades");
}

export async function deleteProperty(id: string) {
  await requireUser();
  await prisma.property.delete({ where: { id } });
  revalidatePath("/propiedades");
  revalidatePath("/admin/propiedades");
}
