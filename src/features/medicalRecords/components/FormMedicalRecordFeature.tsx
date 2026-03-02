import { type SubmitEvent } from "react";
import useMedicalRecordStore from "@/store/medical_record";
import FormMedicalRecord from "@/components/organisms/medicalRecords/FormMedicalRecord";

const FormMedicalRecordFeature = ({ patientId }: { patientId: number }) => {
  const {
    data,
    alertState,
    setAlertState,
    updateField,
    clearData,
    register,
    updateProfile,
  } = useMedicalRecordStore();
  const id = data?.id || null;

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(data).some((f) => f === "")) {
      setAlertState({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (id) {
      await updateProfile(id, data);
    } else {
      await register({ ...data, patient_id: patientId });
    }
  };

  return (
    <FormMedicalRecord
      data={data}
      alertState={alertState}
      onSubmit={handleSubmit}
      onChange={updateField}
      onCancel={clearData}
    />
  );
};

export default FormMedicalRecordFeature;
