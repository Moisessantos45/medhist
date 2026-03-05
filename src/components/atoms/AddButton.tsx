type AddButtonProps = {
  title: string;
  onAdd: () => void;
};

const AddButton = ({ title, onAdd }: AddButtonProps) => {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="mt-2 cursor-pointer inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shadow-indigo-200 transition-all duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      {title}
    </button>
  );
};

export default AddButton;
