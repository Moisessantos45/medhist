import { useEffect } from "react";
import usePatientStore from "@/store/patient";
import ListPatients from "@/components/organisms/patients/ListPatients";
import ItemPatientFeature from "./ItemPatientFeature";

type ListPatientsFeatureProps = {
  onAdd?: () => void;
};

const ListPatientsFeature = ({ onAdd }: ListPatientsFeatureProps) => {
  const { list, getAll, loading, pagination, changePage } = usePatientStore();

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <ListPatients
      list={list}
      loading={loading}
      pagination={pagination}
      onPageChange={changePage}
      onAdd={onAdd}
      renderItem={(patient) => (
        <ItemPatientFeature key={patient.id} patient={patient} />
      )}
    />
  );
};

export default ListPatientsFeature;
