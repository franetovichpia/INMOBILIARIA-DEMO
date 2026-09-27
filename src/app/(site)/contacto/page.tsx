import InquiryForm from "@/components/InquiryForm";

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="mt-2 text-black/60">
        Dejanos tu consulta y un asesor se pondrá en contacto a la brevedad.
      </p>
      <div className="mt-8">
        <InquiryForm propertyId="" />
      </div>
    </div>
  );
}
