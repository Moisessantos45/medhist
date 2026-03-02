import { useEffect } from "react";
import useAppointmentStore from "@/store/appointment";
import ListAppointments from "@/components/organisms/appointments/ListAppointments";
import ItemAppointmentFeature from "./ItemAppointmentFeature";

const ListAppointmentsFeature = ({ patientId }: { patientId: number }) => {
  const { list, pagination, getAll, changePage } = useAppointmentStore();

  useEffect(() => {
    if (patientId) {
      getAll(patientId);
    }
  }, [patientId, getAll]);

  return (
    <ListAppointments
      list={list}
      pagination={pagination}
      onPageChange={(page) => changePage(patientId, page)}
      renderItem={(appointment) => (
        <ItemAppointmentFeature
          key={appointment.id}
          appointment={appointment}
        />
      )}
    />
  );
};

export default ListAppointmentsFeature;
