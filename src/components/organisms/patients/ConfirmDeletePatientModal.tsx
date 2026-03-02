import type { FC } from "react";
import Modal from "@/components/molecules/Modal";

interface ConfirmDeletePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (id: number) => Promise<void>;
  patientId: number | null;
}

const ConfirmDeletePatientModal: FC<ConfirmDeletePatientModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  patientId,
}) => {
  const handleConfirm = async () => {
    if (patientId) {
      await onConfirmDelete(patientId);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Acción">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-gray-600">
          ¿Estás seguro de que deseas eliminar a este paciente? Esta acción no
          se puede deshacer.
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeletePatientModal;
