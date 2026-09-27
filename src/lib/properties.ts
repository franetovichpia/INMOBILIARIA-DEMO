import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const PAGE_SIZE = 12;

export type PropertyFilters = {
  city?: string;
  type?: string;
  operation?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  q?: string;
  page?: number;
};

export function parseImages(images: string): string[] {
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getProperties(filters: PropertyFilters = {}) {
  const where: Prisma.PropertyWhereInput = {};

  if (filters.city) {
    where.city = { contains: filters.city };
  }
  if (filters.type) {
    where.type = filters.type;
  }
  if (filters.operation) {
    where.operation = filters.operation;
  }
  if (filters.bedrooms) {
    where.bedrooms = { gte: filters.bedrooms };
  }
  if (filters.minPrice || filters.maxPrice) {
    where.price = {
      ...(filters.minPrice ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
    };
  }
  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q } },
      { description: { contains: filters.q } },
      { address: { contains: filters.q } },
      { city: { contains: filters.q } },
    ];
  }

  const page = Math.max(1, filters.page ?? 1);

  const [items, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.property.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getFeaturedProperties() {
  return prisma.property.findMany({
    where: { featured: true, status: "DISPONIBLE" },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getPropertyById(id: string) {
  return prisma.property.findUnique({ where: { id } });
}
