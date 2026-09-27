import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const agentPassword = await bcrypt.hash("agente123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "gaston@nigglipropiedades.com" },
    update: {},
    create: {
      name: "Gastón Niggli",
      email: "gaston@nigglipropiedades.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const agente = await prisma.user.upsert({
    where: { email: "agente@nigglipropiedades.com" },
    update: {},
    create: {
      name: "Agente Demo",
      email: "agente@nigglipropiedades.com",
      password: agentPassword,
      role: "AGENTE",
    },
  });

  const properties = [
    {
      title: "Casa frente al mar en Cariló",
      description:
        "Casa de estilo bosque con acceso directo a la playa, tres dormitorios en suite, living con hogar a leña y deck de madera entre pinos. Totalmente amoblada y equipada.",
      type: "CASA",
      operation: "VENTA",
      status: "DISPONIBLE",
      price: 420000,
      currency: "USD",
      address: "Bosque del Mar 145",
      city: "Cariló",
      province: "Buenos Aires",
      bedrooms: 3,
      bathrooms: 3,
      areaTotal: 900,
      areaCovered: 210,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200",
      ]),
      featured: true,
      ownerId: admin.id,
    },
    {
      title: "Departamento con vista al mar en Pinamar",
      description:
        "Dos ambientes a metros de la playa, balcón corrido con vista al mar, cochera cubierta y amenities: piscina climatizada y solárium.",
      type: "DEPARTAMENTO",
      operation: "VENTA",
      status: "DISPONIBLE",
      price: 145000,
      currency: "USD",
      address: "Av. Bunge 850",
      city: "Pinamar",
      province: "Buenos Aires",
      bedrooms: 1,
      bathrooms: 1,
      areaTotal: 52,
      areaCovered: 48,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
        "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200",
      ]),
      featured: true,
      ownerId: agente.id,
    },
    {
      title: "Casa quinta en Mar de las Pampas",
      description:
        "Casa de troncos en medio de la forestación, cuatro dormitorios, parrilla exterior y galería cerrada. A ocho cuadras del mar caminando entre médanos.",
      type: "CASA",
      operation: "ALQUILER",
      status: "DISPONIBLE",
      price: 900,
      currency: "USD",
      address: "Calle de las Gaviotas 320",
      city: "Mar de las Pampas",
      province: "Buenos Aires",
      bedrooms: 4,
      bathrooms: 2,
      areaTotal: 600,
      areaCovered: 160,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
      ]),
      featured: false,
      ownerId: admin.id,
    },
    {
      title: "Terreno con vista al mar en Villa Gesell",
      description:
        "Lote de 600m2 a tres cuadras de la playa, listo para construir, todos los servicios y excelente exposición norte.",
      type: "TERRENO",
      operation: "VENTA",
      status: "DISPONIBLE",
      price: 68000,
      currency: "USD",
      address: "Calle 306 esquina 5",
      city: "Villa Gesell",
      province: "Buenos Aires",
      bedrooms: 0,
      bathrooms: 0,
      areaTotal: 600,
      areaCovered: 0,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
      ]),
      featured: false,
      ownerId: admin.id,
    },
    {
      title: "Departamento a estrenar en Mar del Plata",
      description:
        "Tres ambientes a estrenar en Playa Grande, cochera, balcón terraza y vista parcial al mar. Excelente para inversión o vivienda de verano.",
      type: "DEPARTAMENTO",
      operation: "ALQUILER",
      status: "DISPONIBLE",
      price: 750,
      currency: "USD",
      address: "Alberti 4200",
      city: "Mar del Plata",
      province: "Buenos Aires",
      bedrooms: 2,
      bathrooms: 1,
      areaTotal: 65,
      areaCovered: 60,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      ]),
      featured: true,
      ownerId: agente.id,
    },
    {
      title: "Casa reciclada en Santa Teresita",
      description:
        "Casa de dos dormitorios totalmente reciclada, a cinco cuadras de la playa, patio con parrilla y lavadero independiente. Ideal primera vivienda o renta de temporada.",
      type: "CASA",
      operation: "VENTA",
      status: "RESERVADA",
      price: 89000,
      currency: "USD",
      address: "Calle 33 N° 512",
      city: "Santa Teresita",
      province: "Buenos Aires",
      bedrooms: 2,
      bathrooms: 1,
      areaTotal: 250,
      areaCovered: 85,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200",
      ]),
      featured: false,
      ownerId: agente.id,
    },
  ];

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }

  console.log("Seed completado.");
  console.log("Usuarios de prueba:");
  console.log("  gaston@nigglipropiedades.com / admin123 (ADMIN)");
  console.log("  agente@nigglipropiedades.com / agente123 (AGENTE)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
