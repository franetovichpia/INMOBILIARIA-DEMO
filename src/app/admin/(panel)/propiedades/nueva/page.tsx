import PropertyForm from "@/components/admin/PropertyForm";
import { createProperty } from "@/lib/actions/properties";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Nueva propiedad</h1>
      <PropertyForm action={createProperty} />
    </div>
  );
}
