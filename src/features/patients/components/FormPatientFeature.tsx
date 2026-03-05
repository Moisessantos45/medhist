import { type SubmitEvent } from "react";
import usePatientStore from "@/store/patient";
import FormPatient from "@/components/organisms/patients/FormPatient";

const FormPatientFeature = () => {
  const {
    data,
    alertState,
    showForm,
    setAlertState,
    register,
    updateProfile,
    updateField,
    clearData,
    closeForm,
  } = usePatientStore();
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
      await register(data);
    }
  };

  return (
    <FormPatient
      data={data}
      hiddenButton={showForm}
      alertState={alertState}
      onSubmit={handleSubmit}
      onCancel={() => {
        clearData();
        closeForm();
      }}
      onChange={updateField}
    />
  );
};

export default FormPatientFeature;
