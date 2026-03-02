import useMedicalRecordStore from "@/store/medical_record";
import ListMedicalRecords from "@/components/organisms/medicalRecords/ListMedicalRecords";
import ItemMedicalRecordFeature from "./ItemMedicalRecordFeature";
import { useEffect } from "react";

const ListMedicalRecordsFeature = ({ patientId }: { patientId: number }) => {
  const { list, pagination, loading, changePage, getAll } =
    useMedicalRecordStore();

  useEffect(() => {
    if (patientId) {
      getAll(patientId);
    }
  }, [patientId, getAll]);

  return (
    <ListMedicalRecords
      list={list}
      loading={loading}
      pagination={pagination}
      onPageChange={(page) => changePage(patientId, page)}
      renderItem={(record) => (
        <ItemMedicalRecordFeature key={record.id} record={record} />
      )}
    />
  );
};

export default ListMedicalRecordsFeature;
