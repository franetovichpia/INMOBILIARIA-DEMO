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
      className="grid grid-cols-1 gap-3 rounded-2xl bg-white p-4 shadow-2xl sm:grid-cols-4 sm:gap-2 sm:p-3"
    >
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black"
      >
        <option value="">Comprar o alquilar</option>
        {OPERATION_TYPES.map((op) => (
          <option key={op} value={op}>
            {OPERATION_TYPE_LABELS[op]}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black"
      >
        <option value="">Tipo de propiedad</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>
            {PROPERTY_TYPE_LABELS[t]}
          </option>
        ))}
      </select>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black"
      >
        <option value="">Toda la costa</option>
        {COASTAL_CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Buscar propiedades
      </button>
    </form>
  );
}
