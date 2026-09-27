"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  OPERATION_TYPES,
  OPERATION_TYPE_LABELS,
  PROPERTY_TYPES,
  PROPERTY_TYPE_LABELS,
} from "@/lib/constants";

const COASTAL_CITIES = [
  "Cariló",
  "Pinamar",
  "Mar de las Pampas",
  "Villa Gesell",
  "Mar del Plata",
  "Santa Teresita",
];

export default function HeroSearch() {
  const router = useRouter();
  const [operation, setOperation] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (operation) params.set("operation", operation);
    if (type) params.set("type", type);
    if (city) params.set("city", city);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 border-t border-brand-900/15 pt-6 sm:grid-cols-4 sm:items-end sm:gap-8"
    >
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-900/60">
          Operación
        </span>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="mt-2 w-full border-b border-brand-900/25 bg-transparent py-2 text-sm text-brand-900 focus:border-brand-600 focus:outline-none"
        >
          <option value="">Comprar o alquilar</option>
          {OPERATION_TYPES.map((op) => (
            <option key={op} value={op}>
              {OPERATION_TYPE_LABELS[op]}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-900/60">
          Tipo
        </span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-2 w-full border-b border-brand-900/25 bg-transparent py-2 text-sm text-brand-900 focus:border-brand-600 focus:outline-none"
        >
          <option value="">Tipo de propiedad</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {PROPERTY_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-900/60">
          Ciudad
        </span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-2 w-full border-b border-brand-900/25 bg-transparent py-2 text-sm text-brand-900 focus:border-brand-600 focus:outline-none"
        >
          <option value="">Toda la costa</option>
          {COASTAL_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="flex items-center justify-between gap-4 border-b border-brand-900 pb-2 text-sm font-bold text-brand-900 transition hover:border-sun-500 hover:text-sun-600"
      >
        Buscar propiedades
        <span aria-hidden="true" className="text-lg">
          ↗
        </span>
      </button>
    </form>
  );
}
