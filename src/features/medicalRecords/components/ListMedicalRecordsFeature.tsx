import { memo } from "react";
import { useShallow } from "zustand/react/shallow";
import useMedicalRecordStore from "@/store/medical_record";
import ListMedicalRecords from "@/components/organisms/medicalRecords/ListMedicalRecords";
import ItemMedicalRecordFeature from "./ItemMedicalRecordFeature";
import { useEffect } from "react";

const ListMedicalRecordsFeature = memo(
  ({ patientId }: { patientId: number }) => {
    const { list, pagination, loading, changePage, getAll, setShowForm } =
      useMedicalRecordStore(
        useShallow((s) => ({
          list: s.list,
          pagination: s.pagination,
          loading: s.loading,
          changePage: s.changePage,
          getAll: s.getAll,
          setShowForm: s.setShowForm,
        })),
      );

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
        onAdd={() => {
          setShowForm(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        renderItem={(record) => (
          <ItemMedicalRecordFeature key={record.id} record={record} />
        )}
      />
    );
  },
);

export default ListMedicalRecordsFeature;
