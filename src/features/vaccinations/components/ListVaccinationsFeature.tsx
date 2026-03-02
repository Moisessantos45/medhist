import { useEffect } from "react";
import useVaccinationStore from "@/store/veccination";
import ListVaccinations from "@/components/organisms/vaccinations/ListVaccinations";
import ItemVaccinationFeature from "./ItemVaccinationFeature";

const ListVaccinationsFeature = ({ patientId }: { patientId: number }) => {
  const { list, pagination, getAll, changePage } = useVaccinationStore();

  useEffect(() => {
    if (patientId) {
      getAll(patientId);
    }
  }, [patientId, getAll]);

  return (
    <ListVaccinations
      list={list}
      pagination={pagination}
      onPageChange={(page) => changePage(patientId, page)}
      renderItem={(vaccination) => (
        <ItemVaccinationFeature
          key={vaccination.id}
          vaccination={vaccination}
        />
      )}
    />
  );
};

export default ListVaccinationsFeature;
