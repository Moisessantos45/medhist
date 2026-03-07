import { useState, memo, type FC } from "react";
import { useShallow } from "zustand/react/shallow";
import type { Vaccination } from "@/entities/veccination";
import useVaccinationStore from "@/store/veccination";
import ItemVaccination from "@/components/organisms/vaccinations/ItemVaccination";
import ConfirmDeleteVaccinationModal from "@/components/organisms/vaccinations/ConfirmDeleteVaccinationModal";

type ItemVaccinationFeatureProps = {
  vaccination: Vaccination;
};

const ItemVaccinationFeature: FC<ItemVaccinationFeatureProps> = memo(
  ({ vaccination }) => {
    const { setData, remove } = useVaccinationStore(
      useShallow((s) => ({ setData: s.setData, remove: s.remove })),
    );
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setData(vaccination);
    };

    const handleDelete = () => {
      setIsOpen(true);
    };

    return (
      <>
        <ItemVaccination
          vaccination={vaccination}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ConfirmDeleteVaccinationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirmDelete={remove}
          vaccinationId={vaccination.id}
        />
      </>
    );
  },
);

export default ItemVaccinationFeature;
