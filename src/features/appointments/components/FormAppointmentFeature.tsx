import { type SubmitEvent } from "react";
import useAppointmentStore from "@/store/appointment";
import FormAppointment from "@/components/organisms/appointments/FormAppointment";

const FormAppointmentFeature = ({ patientId }: { patientId: number }) => {
  const {
    alertState,
    data,
    register,
    updateProfile,
    updateField,
    setAlertState,
    clearData
  } = useAppointmentStore();
  const id = data?.id || null;

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.reason || !data.date) {
      setAlertState({ msg: "La Razón y Fecha son requeridas", error: true });
      return;
    }

    setAlertState({ msg: "Guardando...", error: false });
    console.log("Submitting appointment data:",patientId, data);
    if (id) {
      await updateProfile(id, data);
    } else {
      await register({ ...data, patient_id: patientId });
    }
  };

  return (
    <FormAppointment
      data={data}
      alertState={alertState}
      isEditing={!!id}
      onSubmit={handleSubmit}
      onChange={updateField}
      onCancel={clearData}
    />
  );
};

export default FormAppointmentFeature;
