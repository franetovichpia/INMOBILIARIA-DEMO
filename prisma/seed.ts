import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const agentPassword = await bcrypt.hash("agente123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@inmobiliaria-demo.com" },
    update: {},
    create: {
      name: "María Pía Administradora",
      email: "admin@inmobiliaria-demo.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const agente = await prisma.user.upsert({
    where: { email: "agente@inmobiliaria-demo.com" },
    update: {},
    create: {
      name: "Agente Demo",
      email: "agente@inmobiliaria-demo.com",
      password: agentPassword,
      role: "AGENTE",
    },
  });

  const properties = [
    {
      title: "Casa moderna con pileta en barrio cerrado",
      description:
        "Hermosa casa de tres dormitorios, living comedor amplio, cocina integrada y quincho con pileta. Excelente ubicación en barrio cerrado con seguridad las 24 horas.",
      type: "CASA",
      operation: "VENTA",
      status: "DISPONIBLE",
      price: 185000,
      currency: "USD",
      address: "Los Aromos 245",
      city: "Pilar",
      province: "Buenos Aires",
      bedrooms: 3,
      bathrooms: 2,
      areaTotal: 450,
      areaCovered: 180,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200",
      ]),
      featured: true,
      ownerId: agente.id,
    },
    {
      title: "Departamento 2 ambientes a estrenar",
      description:
        "Monoambiente de categoría a estrenar, balcón con parrilla individual, amenities: piscina, gimnasio y SUM. A pasos del subte.",
      type: "DEPARTAMENTO",
      operation: "VENTA",
      status: "DISPONIBLE",
      price: 98000,
      currency: "USD",
      address: "Av. Cabildo 3200",
      city: "Ciudad Autónoma de Buenos Aires",
      province: "CABA",
      bedrooms: 1,
      bathrooms: 1,
      areaTotal: 45,
      areaCovered: 42,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      ]),
      featured: true,
      ownerId: agente.id,
    },
    {
      title: "PH reciclado con patio propio",
      description:
        "PH totalmente reciclado, dos dormitorios, patio con parrilla, terraza y lavadero independiente. Ideal para inversión o vivienda familiar.",
      type: "PH",
      operation: "ALQUILER",
      status: "DISPONIBLE",
      price: 650,
      currency: "USD",
      address: "Gorriti 1560",
      city: "Ciudad Autónoma de Buenos Aires",
      province: "CABA",
      bedrooms: 2,
      bathrooms: 1,
      areaTotal: 90,
      areaCovered: 75,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200",
      ]),
      featured: false,
      ownerId: admin.id,
    },
    {
      title: "Terreno en country con vista al lago",
      description:
        "Lote de 800m2 en country náutico, listo para construir, vista al espejo de agua, todos los servicios.",
      type: "TERRENO",
      operation: "VENTA",
      status: "DISPONIBLE",
      price: 75000,
      currency: "USD",
      address: "Lote 45, Country Náutico",
      city: "Tigre",
      province: "Buenos Aires",
      bedrooms: 0,
      bathrooms: 0,
      areaTotal: 800,
      areaCovered: 0,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
      ]),
      featured: false,
      ownerId: admin.id,
    },
    {
      title: "Oficina premium en microcentro",
      description:
        "Oficina de 60m2 en piso alto con vista panorámica, aire acondicionado central, recepción compartida y cochera opcional.",
      type: "OFICINA",
      operation: "ALQUILER",
      status: "DISPONIBLE",
      price: 900,
      currency: "USD",
      address: "Av. Corrientes 850",
      city: "Ciudad Autónoma de Buenos Aires",
      province: "CABA",
      bedrooms: 0,
      bathrooms: 1,
      areaTotal: 60,
      areaCovered: 60,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      ]),
      featured: true,
      ownerId: agente.id,
    },
    {
      title: "Local comercial en avenida principal",
      description:
        "Local a la calle con gran vidriera, depósito y baño. Excelente esquina de alto tránsito peatonal y vehicular.",
      type: "LOCAL",
      operation: "VENTA",
      status: "RESERVADA",
      price: 140000,
      currency: "USD",
      address: "Av. Rivadavia 4500",
      city: "Ciudad Autónoma de Buenos Aires",
      province: "CABA",
      bedrooms: 0,
      bathrooms: 1,
      areaTotal: 110,
      areaCovered: 110,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
      ]),
      featured: false,
      ownerId: admin.id,
    },
  ];

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }

  console.log("Seed completado.");
  console.log("Usuarios de prueba:");
  console.log("  admin@inmobiliaria-demo.com / admin123 (ADMIN)");
  console.log("  agente@inmobiliaria-demo.com / agente123 (AGENTE)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
