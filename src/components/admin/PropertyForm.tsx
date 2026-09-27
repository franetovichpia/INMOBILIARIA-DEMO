import type { Property } from "@prisma/client";
import {
  OPERATION_TYPES,
  OPERATION_TYPE_LABELS,
  PROPERTY_STATUSES,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPES,
  PROPERTY_TYPE_LABELS,
} from "@/lib/constants";
import { parseImages } from "@/lib/properties";

export default function PropertyForm({
  action,
  property,
}: {
  action: (formData: FormData) => void;
  property?: Property;
}) {
  const images = property ? parseImages(property.images).join("\n") : "";

  return (
    <form action={action} className="flex max-w-3xl flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Título</label>
        <input
          name="title"
          required
          defaultValue={property?.title}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={property?.description}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Tipo</label>
          <select
            name="type"
            defaultValue={property?.type ?? PROPERTY_TYPES[0]}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {PROPERTY_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Operación</label>
          <select
            name="operation"
            defaultValue={property?.operation ?? OPERATION_TYPES[0]}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          >
            {OPERATION_TYPES.map((o) => (
              <option key={o} value={o}>
                {OPERATION_TYPE_LABELS[o]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Estado</label>
          <select
            name="status"
            defaultValue={property?.status ?? PROPERTY_STATUSES[0]}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          >
            {PROPERTY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {PROPERTY_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={property?.price}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Moneda</label>
          <input
            name="currency"
            defaultValue={property?.currency ?? "USD"}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={property?.featured}
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Destacada en portada
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Dirección</label>
          <input
            name="address"
            required
            defaultValue={property?.address}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Ciudad</label>
          <input
            name="city"
            required
            defaultValue={property?.city}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Provincia</label>
          <input
            name="province"
            required
            defaultValue={property?.province}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Dormitorios</label>
          <input
            name="bedrooms"
            type="number"
            defaultValue={property?.bedrooms ?? 0}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Baños</label>
          <input
            name="bathrooms"
            type="number"
            defaultValue={property?.bathrooms ?? 0}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Superficie total (m²)</label>
          <input
            name="areaTotal"
            type="number"
            step="0.01"
            defaultValue={property?.areaTotal ?? 0}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Superficie cubierta (m²)</label>
          <input
            name="areaCovered"
            type="number"
            step="0.01"
            defaultValue={property?.areaCovered ?? 0}
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Imágenes (una URL por línea)
        </label>
        <textarea
          name="images"
          rows={3}
          defaultValue={images}
          placeholder="https://..."
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-black"
        />
      </div>

      <button
        type="submit"
        className="w-fit rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Guardar propiedad
      </button>
    </form>
  );
}
