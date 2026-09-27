import Image from "next/image";
import { notFound } from "next/navigation";
import { getPropertyById, parseImages } from "@/lib/properties";
import { formatPrice } from "@/lib/format";
import InquiryForm from "@/components/InquiryForm";
import {
  OPERATION_TYPE_LABELS,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type OperationType,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  const images = parseImages(property.images);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {images.length > 0 ? (
              images.map((src, i) => (
                <div
                  key={src + i}
                  className={`relative h-64 overflow-hidden rounded-xl bg-black/5 ${
                    i === 0 ? "sm:col-span-2 sm:h-96" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl bg-black/5 text-black/40 sm:col-span-2">
                Sin imágenes
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              {OPERATION_TYPE_LABELS[property.operation as OperationType] ??
                property.operation}
            </span>
            <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">
              {PROPERTY_TYPE_LABELS[property.type as PropertyType] ??
                property.type}
            </span>
            <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">
              {PROPERTY_STATUS_LABELS[property.status as PropertyStatus] ??
                property.status}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold">{property.title}</h1>
          <p className="mt-1 text-black/60">
            {property.address}, {property.city}, {property.province}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-black/10 p-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-black/50">Dormitorios</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </div>
            <div>
              <p className="text-xs text-black/50">Baños</p>
              <p className="font-semibold">{property.bathrooms}</p>
            </div>
            <div>
              <p className="text-xs text-black/50">Superficie total</p>
              <p className="font-semibold">{property.areaTotal} m²</p>
            </div>
            <div>
              <p className="text-xs text-black/50">Superficie cubierta</p>
              <p className="font-semibold">{property.areaCovered} m²</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Descripción</h2>
            <p className="mt-2 whitespace-pre-line text-black/70">
              {property.description}
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-black/10 p-6">
          <p className="text-3xl font-bold">
            {formatPrice(property.price, property.currency)}
          </p>
          <p className="mb-6 text-sm text-black/50">
            {OPERATION_TYPE_LABELS[property.operation as OperationType]}
          </p>
          <h2 className="mb-3 font-semibold">Consultar por esta propiedad</h2>
          <InquiryForm propertyId={property.id} />
        </aside>
      </div>
    </div>
  );
}
