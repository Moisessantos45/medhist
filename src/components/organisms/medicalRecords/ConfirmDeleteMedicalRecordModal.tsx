import Modal from "@/components/molecules/Modal";

interface ConfirmDeleteMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (id: number) => Promise<void>;
  medicalRecordId: number | null;
}

const ConfirmDeleteMedicalRecordModal = ({
  isOpen,
  onClose,
  onConfirmDelete,
  medicalRecordId,
}: ConfirmDeleteMedicalRecordModalProps) => {
  const handleConfirm = async () => {
    if (medicalRecordId) {
      await onConfirmDelete(medicalRecordId);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Acción">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-gray-600">
          ¿Estás seguro de que deseas eliminar este registro médico? Esta acción
          no se puede deshacer.
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

export default ConfirmDeleteMedicalRecordModal;
