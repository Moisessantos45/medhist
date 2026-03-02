import type { FC } from "react";
import type { Vaccination } from "@/entities/veccination";

interface ItemVaccinationProps {
  vaccination: Vaccination;
  onEdit: () => void;
  onDelete: () => void;
}

const ItemVaccination: FC<ItemVaccinationProps> = ({
  vaccination,
  onEdit,
  onDelete,
}) => {
  const {
    type,
    date,
    next_due_date,
    status,
  } = vaccination;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="bg-emerald-50/50 text-emerald-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-200/50">Aplicada</span>;
      case "pending":
        return <span className="bg-amber-50/50 text-amber-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-200/50">Pendiente</span>;
      case "canceled":
        return <span className="bg-red-50/50 text-red-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-red-200/50">Cancelada</span>;
      default:
        return <span className="bg-slate-50 text-slate-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200/50">{status}</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4 hover:border-indigo-200 transition-colors">
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4 gap-4">
        <div>
           <p className="text-xs uppercase tracking-wider text-indigo-500 font-bold mb-1">Tipo de Vacuna</p>
           <h3 className="text-xl font-bold text-gray-800 capitalize leading-tight">{type}</h3>
        </div>
        <div className="flex flex-col xl:items-end gap-2">
           {getStatusBadge(status)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
        <div className="flex flex-col items-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">Fecha de Aplicación</p>
          <p className="text-slate-800 font-black text-lg">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="flex flex-col items-center sm:border-l border-slate-200 pt-4 sm:pt-0 sm:mt-0 border-t sm:border-t-0 mt-4">
          <p className="text-[10px] text-rose-400 font-bold uppercase mb-1 tracking-wider flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25m0 0v2.25m0-2.25h2.25m-2.25 0H9.75M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
            </svg>
            Próxima Dosis
          </p>
          <p className="text-rose-600 font-black text-lg">{new Date(next_due_date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
         <button
          className="py-2 px-6 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
          type="button"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="py-2 px-6 text-red-400 hover:text-red-600 hover:bg-red-50 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
          type="button"
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemVaccination;
