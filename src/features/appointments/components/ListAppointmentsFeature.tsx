import { useEffect, memo } from "react";
import { useShallow } from "zustand/react/shallow";
import useAppointmentStore from "@/store/appointment";
import ListAppointments from "@/components/organisms/appointments/ListAppointments";
import ItemAppointmentFeature from "./ItemAppointmentFeature";

const ListAppointmentsFeature = memo(({ patientId }: { patientId: number }) => {
  const { list, pagination, getAll, changePage, setShowForm } =
    useAppointmentStore(
      useShallow((s) => ({
        list: s.list,
        pagination: s.pagination,
        getAll: s.getAll,
        changePage: s.changePage,
        setShowForm: s.setShowForm,
      })),
    );

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
      onAdd={() => {
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      renderItem={(appointment) => (
        <ItemAppointmentFeature
          key={appointment.id}
          appointment={appointment}
        />
      )}
    />
  );
});

export default ListAppointmentsFeature;
