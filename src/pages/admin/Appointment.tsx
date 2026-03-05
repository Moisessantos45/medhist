import { useParams } from "react-router";
import useUrlStore from "@/store/url";
import ReturnLink from "@/components/atoms/ReturnLink";
import FormAppointmentFeature from "@/features/appointments/components/FormAppointmentFeature";
import ListAppointmentsFeature from "@/features/appointments/components/ListAppointmentsFeature";
import useAppointmentStore from "@/store/appointment";

const Appointment = () => {
  const { list, showForm, setShowForm } = useAppointmentStore();
  const { id } = useParams();
  const { getUrl } = useUrlStore();

  return (
    <section className="flex flex-col gap-6 p-4">
      <nav>
        <ReturnLink to={`${getUrl()}`} title="Volver a Pacientes" />
      </nav>
      {(list.length > 0 || !showForm) && (
        <button
          type="button"
          className="bg-indigo-600 uppercase font-bold mx-10 p-3 rounded-md text-white mb-10 md:hidden"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Ocultar Form" : "Mostrar Form"}
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-10 justify-center">
        <div
          className={` ${showForm || list.length < 1 ? "block" : "hidden"}
        ${list.length > 0 || showForm ? "md:block" : "hidden"} md:w-1/2 lg:w-2/5`}
        >
          <FormAppointmentFeature patientId={Number(id)} />
        </div>
        <div
          className={`${list.length < 1 ? "h-screen" : "h-auto"} md:w-1/2 lg:w-3/6`}
        >
          <ListAppointmentsFeature patientId={Number(id)} />
        </div>
      </div>
    </section>
  );
};

export default Appointment;
