import { useState, memo, type FC } from "react";
import { useShallow } from "zustand/react/shallow";
import usePatientStore from "@/store/patient";
import ItemPatient from "@/components/organisms/patients/ItemPatient";
import ConfirmDeletePatientModal from "@/components/organisms/patients/ConfirmDeletePatientModal";
import useUrlStore from "@/store/url";
import type { Patient } from "@/entities/patient";

type ItemPatientFeatureProps = {
  patient: Patient;
};

const ItemPatientFeature: FC<ItemPatientFeatureProps> = memo(({ patient }) => {
  const { getUrl } = useUrlStore();
  const { setData, remove } = usePatientStore(
    useShallow((s) => ({ setData: s.setData, remove: s.remove })),
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setData(patient);
  };

  return (
    <>
      <ItemPatient
        patient={patient}
        baseUrl={getUrl()}
        onEdit={handleEdit}
        onDeleteClick={() => setIsOpen(true)}
      />

      <ConfirmDeletePatientModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirmDelete={remove}
        patientId={patient.id}
      />
    </>
  );
});

export default ItemPatientFeature;
