import { type SubmitEvent } from "react";
import useVaccinationStore from "@/store/veccination";
import FormVaccination from "@/components/organisms/vaccinations/FormVaccination";

const FormVaccinationFeature = ({ patientId }: { patientId: number }) => {
  const {
    alertState,
    data,
    register,
    updateProfile,
    updateField,
    setAlertState,
    clearData
      
  } = useVaccinationStore();
  const id = data?.id || null;

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.type || !data.date || !data.next_due_date) {
      setAlertState({
        msg: "La Vacuna, Fecha y Próxima Dosis son requeridas",
        error: true,
      });
      return;
    }

    setAlertState({ msg: "Guardando...", error: false });

    if (id) {
      await updateProfile(id, data);
    } else {
      await register({ ...data, patient_id: patientId });
    }
  };

  return (
    <FormVaccination
      data={data}
      alertState={alertState}
      id={id}
      onSubmit={handleSubmit}
      onChange={updateField}
      onCancel={clearData}
    />
  );
};

export default FormVaccinationFeature;
