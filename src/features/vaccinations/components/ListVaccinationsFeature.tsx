import { useEffect,memo } from "react";
import { useShallow } from "zustand/react/shallow";
import useVaccinationStore from "@/store/veccination";
import ListVaccinations from "@/components/organisms/vaccinations/ListVaccinations";
import ItemVaccinationFeature from "./ItemVaccinationFeature";

const ListVaccinationsFeature = memo(({ patientId }: { patientId: number }) => {
  const { list, pagination, getAll, changePage, setShowForm } =
    useVaccinationStore(
      useShallow((s) => ({
        list: s.list,
        pagination: s.pagination,
        getAll: s.getAll,
        changePage: s.changePage,
        setShowForm: s.setShowForm,
      })),
    );

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
      onAdd={() => {
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      renderItem={(vaccination) => (
        <ItemVaccinationFeature
          key={vaccination.id}
          vaccination={vaccination}
        />
      )}
    />
  );
});

export default ListVaccinationsFeature;
