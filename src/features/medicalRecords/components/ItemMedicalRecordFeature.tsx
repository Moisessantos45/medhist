import { useState, memo, type FC } from "react";
import { useShallow } from "zustand/react/shallow";
import type { MedicalRecord } from "@/entities/patient";
import useMedicalRecordStore from "@/store/medical_record";
import ItemMedicalRecord from "@/components/organisms/medicalRecords/ItemMedicalRecord";
import ConfirmDeleteMedicalRecordModal from "@/components/organisms/medicalRecords/ConfirmDeleteMedicalRecordModal";

type ItemMedicalRecordFeatureProps = {
  record: MedicalRecord;
};

const ItemMedicalRecordFeature: FC<ItemMedicalRecordFeatureProps> =memo(({
  record,
}) => {
  const { setData, remove } = useMedicalRecordStore(
    useShallow((s) => ({ setData: s.setData, remove: s.remove })),
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setData(record);
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ItemMedicalRecord
        record={record}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmDeleteMedicalRecordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirmDelete={remove}
        medicalRecordId={record.id}
      />
    </>
  );
});

export default ItemMedicalRecordFeature;
