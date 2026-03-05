import { useEffect } from "react";
import usePatientStore from "@/store/patient";
import ListPatients from "@/components/organisms/patients/ListPatients";
import ItemPatientFeature from "./ItemPatientFeature";

const ListPatientsFeature = () => {
  const { list, getAll, loading, pagination, changePage, setShowForm } =
    usePatientStore();

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
};

export default ListPatientsFeature;
