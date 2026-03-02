import type { FC } from "react";
import type { Appointment } from "@/entities/appointment";

type ItemAppointmentProps = {
  appointment: Appointment;
  onEdit: () => void;
  onDelete: () => void;
};

const ItemAppointment: FC<ItemAppointmentProps> = ({
  appointment,
  onEdit,
  onDelete,
}) => {
  const { date, reason, status, notes } = appointment;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <span className="bg-amber-50/50 text-amber-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-200/50">Programada</span>;
      case "completed":
        return <span className="bg-emerald-50/50 text-emerald-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-200/50">Completada</span>;
      case "canceled":
        return <span className="bg-red-50/50 text-red-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-red-200/50">Cancelada</span>;
      default:
        return <span className="bg-slate-50 text-slate-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200/50">{status}</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4 hover:border-indigo-200 transition-colors">
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4 gap-4 justify-between">
        <div>
           <p className="text-xs uppercase tracking-wider text-indigo-500 font-bold mb-1">Razón de la Visita</p>
           <h3 className="text-xl font-bold text-gray-800 capitalize leading-tight">{reason}</h3>
        </div>
        <div className="flex flex-col xl:items-end gap-2">
           {getStatusBadge(status)}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex items-center gap-4">
           <div className="bg-white border border-slate-200 shadow-sm p-3 rounded-lg text-indigo-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25H3Z" />
              </svg>
           </div>
           <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Fecha Programada</p>
              <p className="text-slate-800 font-black text-lg">{new Date(date).toLocaleString()}</p>
           </div>
         </div>
      </div>

      {notes && (
        <details className="mt-6 group border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
          <summary className="p-4 cursor-pointer text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-100 transition-colors list-none flex justify-between items-center outline-none">
            Ver notas adicionales
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-open:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <div className="p-4 bg-white border-t border-slate-200">
            <p className="text-slate-600 bg-slate-50/50 p-4 rounded-lg text-sm italic border border-slate-100 leading-relaxed font-serif">
              {notes}
            </p>
          </div>
        </details>
      )}

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

export default ItemAppointment;
