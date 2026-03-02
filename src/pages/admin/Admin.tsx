import FormPatientFeature from "@/features/patients/components/FormPatientFeature";
import ListPatientsFeature from "@/features/patients/components/ListPatientsFeature";
import { useState } from "react";

const Admin = () => {
  const [hiddenForm, setHiddenForm] = useState(false);
  return (
    <section className="flex flex-col md:flex-row gap-3 justify-center p-4">
      <button
        type="button"
        className="bg-indigo-600 uppercase font-bold mx-10 p-3 rounded-md text-white mb-10 md:hidden"
        onClick={() => setHiddenForm(!hiddenForm)}
      >
        {" "}
        {hiddenForm ? "Ocultar Form" : "Mostrar Form"}
      </button>
      <div
        className={`${
          hiddenForm ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <FormPatientFeature />
      </div>
      <div className="md:w-1/2 lg:w-3/6">
        <ListPatientsFeature />
      </div>
    </section>
  );
};

export default Admin;
