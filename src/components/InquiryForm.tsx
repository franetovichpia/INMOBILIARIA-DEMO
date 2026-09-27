"use client";

import { useState } from "react";

export default function InquiryForm({ propertyId }: { propertyId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
      propertyId,
    };
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
        ¡Gracias por tu consulta! Un asesor se pondrá en contacto a la
        brevedad.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="name"
        required
        placeholder="Nombre"
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      />
      <input
        name="phone"
        placeholder="Teléfono (opcional)"
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="Mensaje"
        className="rounded-lg border border-black/10 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar consulta"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Ocurrió un error, intentá nuevamente.
        </p>
      )}
    </form>
  );
}
