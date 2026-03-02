import { useState, type FC } from "react";
import type { Appointment } from "@/entities/appointment";
import useAppointmentStore from "@/store/appointment";
import ItemAppointment from "@/components/organisms/appointments/ItemAppointment";
import ConfirmDeleteAppointmentModal from "@/components/organisms/appointments/ConfirmDeleteAppointmentModal";

type ItemAppointmentFeatureProps = {
  appointment: Appointment;
};

const ItemAppointmentFeature: FC<ItemAppointmentFeatureProps> = ({
  appointment,
}) => {
  const { setData, remove } = useAppointmentStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setData(appointment);
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ItemAppointment
        appointment={appointment}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmDeleteAppointmentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirmDelete={remove}
        appointmentId={appointment.id}
      />
    </>
  );
};

export default ItemAppointmentFeature;
