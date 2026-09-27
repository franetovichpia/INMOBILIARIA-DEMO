import Image from "next/image";
import Link from "next/link";
import type { Property } from "@prisma/client";
import { parseImages } from "@/lib/properties";
import { formatPrice } from "@/lib/format";
import {
  OPERATION_TYPE_LABELS,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type OperationType,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/constants";

export default function PropertyCard({ property }: { property: Property }) {
  const images = parseImages(property.images);
  const cover = images[0];

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:shadow-lg"
    >
      <div className="relative h-52 w-full bg-black/5">
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-black/40">
            Sin imagen
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          {OPERATION_TYPE_LABELS[property.operation as OperationType] ??
            property.operation}
        </span>
        {property.status !== "DISPONIBLE" && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
            {PROPERTY_STATUS_LABELS[property.status as PropertyStatus] ??
              property.status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {PROPERTY_TYPE_LABELS[property.type as PropertyType] ?? property.type}
        </p>
        <h3 className="line-clamp-2 font-semibold">{property.title}</h3>
        <p className="text-sm text-black/60">
          {property.city}, {property.province}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">
            {formatPrice(property.price, property.currency)}
          </span>
          <span className="text-xs text-black/50">
            {property.bedrooms > 0 && `${property.bedrooms} dorm · `}
            {property.areaTotal} m²
          </span>
        </div>
      </div>
    </Link>
  );
}
