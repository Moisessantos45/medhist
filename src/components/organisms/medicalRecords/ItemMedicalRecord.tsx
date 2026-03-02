import type { FC } from "react";
import type { MedicalRecord } from "@/entities/patient";

type ItemMedicalRecordProps = {
  record: MedicalRecord;
  onEdit: () => void;
  onDelete: () => void;
};

const ItemMedicalRecord: FC<ItemMedicalRecordProps> = ({
  record,
  onEdit,
  onDelete,
}) => {
  const {
    visit_date,
    diagnosis,
    treatment,
    prescription,
    weight_kg,
    temperature_c,
  } = record;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4 hover:border-indigo-200 transition-colors">
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4 gap-4">
        <div>
           <p className="text-xs uppercase tracking-wider text-indigo-500 font-bold mb-1">Diagnóstico</p>
           <h3 className="text-xl font-bold text-gray-800 capitalize leading-tight">{diagnosis}</h3>
        </div>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider whitespace-nowrap self-start xl:self-auto border border-slate-200/50">
           {new Date(visit_date).toLocaleDateString()}
        </span>
      </div>

      <details className="mt-6 group border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
        <summary className="p-4 cursor-pointer text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-100 transition-colors list-none flex justify-between items-center outline-none">
          Ver detalles del diagnóstico
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-open:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
        
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Tratamiento</p>
            <p className="text-slate-700 font-medium leading-relaxed text-sm">
              {treatment}
            </p>
          </div>

          <div className="mb-4 opacity-90">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Receta / Indicaciones</p>
            <p className="text-slate-600 bg-slate-50/50 p-4 rounded-lg text-sm italic border border-slate-100 leading-relaxed font-serif">
              {prescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div className="flex flex-col items-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">Peso</p>
              <p className="text-slate-800 font-black text-xl">{weight_kg} <span className="text-xs text-slate-400 font-medium font-serif">kg</span></p>
            </div>
            <div className="flex flex-col items-center sm:border-l border-slate-200 pt-4 sm:pt-0 sm:mt-0 border-t sm:border-t-0 mt-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">Temp.</p>
              <p className="text-slate-800 font-black text-xl">{temperature_c} <span className="text-xs text-slate-400 font-medium font-serif">°C</span></p>
            </div>
          </div>
        </div>
      </details>

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

export default ItemMedicalRecord;
