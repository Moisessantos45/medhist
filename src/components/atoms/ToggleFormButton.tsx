type ToggleFormButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const ToggleFormButton = ({ isOpen, onToggle }: ToggleFormButtonProps) => {
  return (
    <button
      type="button"
      className="bg-indigo-600 uppercase font-bold mx-10 p-3 rounded-md text-white mb-10 md:hidden"
      onClick={onToggle}
    >
      {isOpen ? "Ocultar Form" : "Mostrar Form"}
    </button>
  );
};

export default ToggleFormButton;
