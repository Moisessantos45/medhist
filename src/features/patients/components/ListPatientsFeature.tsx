import { useEffect, memo } from "react";
import { useShallow } from "zustand/react/shallow";
import usePatientStore from "@/store/patient";
import ListPatients from "@/components/organisms/patients/ListPatients";
import ItemPatientFeature from "./ItemPatientFeature";

const ListPatientsFeature = memo(() => {
  const { list, getAll, loading, pagination, changePage, setShowForm } =
    usePatientStore(
      useShallow((s) => ({
        list: s.list,
        getAll: s.getAll,
        loading: s.loading,
        pagination: s.pagination,
        changePage: s.changePage,
        setShowForm: s.setShowForm,
      })),
    );

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <ListPatients
      list={list}
      loading={loading}
      pagination={pagination}
      onPageChange={changePage}
      onAdd={() => {
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      renderItem={(patient) => (
        <ItemPatientFeature key={patient.id} patient={patient} />
      )}
    />
  );
});

export default ListPatientsFeature;
