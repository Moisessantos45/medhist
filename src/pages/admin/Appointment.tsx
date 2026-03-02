import { useParams } from "react-router";
import useUrlStore from "@/store/url";
import ReturnLink from "@/components/atoms/ReturnLink";
import FormAppointmentFeature from "@/features/appointments/components/FormAppointmentFeature";
import ListAppointmentsFeature from "@/features/appointments/components/ListAppointmentsFeature";

const Appointment = () => {
  const { id } = useParams();
  const { getUrl } = useUrlStore();

  return (
    <section className="flex flex-col gap-6 p-4">
      <nav>
        <ReturnLink to={`${getUrl()}`} title="Volver a Pacientes" />
      </nav>
      
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 lg:w-2/5">
           <FormAppointmentFeature patientId={Number(id)} />
        </div>
        <div className="md:w-1/2 lg:w-3/5 h-screen md:overflow-y-scroll md:pr-4 pb-10 custom-scrollbar">
           <ListAppointmentsFeature patientId={Number(id)} />
        </div>
      </div>
    </section>
  );
};

export default Appointment;
