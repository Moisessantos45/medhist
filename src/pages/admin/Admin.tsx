import FormPatientFeature from "@/features/patients/components/FormPatientFeature";
import ListPatientsFeature from "@/features/patients/components/ListPatientsFeature";
import usePatientStore from "@/store/patient";

const Admin = () => {
  const { list, showForm, setShowForm } = usePatientStore();

  return (
    <section className="flex flex-col md:flex-row gap-3 justify-center p-4">
      {list.length > 1 && (
        <button
          type="button"
          className="bg-indigo-600 uppercase font-bold mx-10 p-3 rounded-md text-white mb-10 md:hidden"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Ocultar Form" : "Mostrar Form"}
        </button>
      )}

      <div
        className={`${
          showForm || list.length < 1 ? "block" : "hidden"
        } ${list.length > 1 || showForm ? "md:block" : "hidden"} md:w-1/2 lg:w-2/5`}
      >
        <FormPatientFeature />
      </div>
      <div
        className={`${list.length < 1 ? "h-screen" : "h-auto"} md:w-1/2 lg:w-3/6`}
      >
        <ListPatientsFeature />
      </div>
    </section>
  );
};

export default Admin;
