import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { updateProperty } from "@/lib/actions/properties";
import { getPropertyById } from "@/lib/properties";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  const updateWithId = updateProperty.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Editar propiedad</h1>
      <PropertyForm action={updateWithId} property={property} />
    </div>
  );
}
