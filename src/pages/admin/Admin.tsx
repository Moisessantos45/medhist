import FormPatientFeature from "@/features/patients/components/FormPatientFeature";
import ListPatientsFeature from "@/features/patients/components/ListPatientsFeature";
import { useState } from "react";

const Admin = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col md:flex-row gap-3 justify-center p-4">
      <button
        type="button"
        className="bg-indigo-600 uppercase font-bold mx-10 p-3 rounded-md text-white mb-10 md:hidden"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ocultar Form" : "Mostrar Form"}
      </button>
      <div
        className={`${
          showForm ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <FormPatientFeature />
      </div>
      <div className="md:w-1/2 lg:w-3/6">
        <ListPatientsFeature onAdd={handleAdd} />
      </div>
    </section>
  );
};

export default Admin;

