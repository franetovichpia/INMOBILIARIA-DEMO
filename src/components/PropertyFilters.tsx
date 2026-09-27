"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  OPERATION_TYPES,
  OPERATION_TYPE_LABELS,
  PROPERTY_TYPES,
  PROPERTY_TYPE_LABELS,
} from "@/lib/constants";

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [operation, setOperation] = useState(searchParams.get("operation") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (operation) params.set("operation", operation);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <form
      onSubmit={applyFilters}
      className="grid grid-cols-1 gap-3 rounded-xl border border-black/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar..."
        className="rounded-lg border border-black/10 px-3 py-2 text-sm lg:col-span-2"
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ciudad"
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      />
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      >
        <option value="">Operación</option>
        {OPERATION_TYPES.map((op) => (
          <option key={op} value={op}>
            {OPERATION_TYPE_LABELS[op]}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      >
        <option value="">Tipo</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>
            {PROPERTY_TYPE_LABELS[t]}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Precio min"
          type="number"
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Precio max"
          type="number"
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 lg:col-span-6"
      >
        Buscar
      </button>
    </form>
  );
}
