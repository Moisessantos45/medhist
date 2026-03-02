import type { FC } from "react";
import { Link } from "react-router";
import type { Patient } from "@/entities/patient";

type ItemPatientProps = {
  patient: Patient;
  baseUrl: string;
  onEdit: () => void;
  onDeleteClick: () => void;
};

const ItemPatient: FC<ItemPatientProps> = ({
  patient,
  baseUrl,
  onEdit,
  onDeleteClick,
}) => {
  const { name, owner, owner_email, symptoms, created_at } = patient;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-4 hover:border-indigo-200 transition-colors">
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4 gap-4 xl:gap-0">
        <div>
          <h3 className="text-2xl font-black text-indigo-900 capitalize">
            {name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Ingresado el {created_at.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full xl:w-auto mt-4 xl:mt-0">
          <Link
            to={`${baseUrl}/patient/medical-record/${patient.id}`}
            className="bg-indigo-50/50 text-indigo-700 hover:bg-slate-50 px-4 py-2 uppercase font-bold text-[10px] tracking-wider rounded-lg transition-colors flex items-center justify-center border border-indigo-100"
          >
            Historial Médico
          </Link>
          <div className="flex gap-2 w-full">
            <Link
              to={`${baseUrl}/patient/appointment/${patient.id}`}
              className="bg-emerald-50/50 text-emerald-700 hover:bg-slate-50 px-4 py-2 uppercase font-bold text-[10px] tracking-wider rounded-lg transition-colors flex items-center justify-center flex-1 border border-emerald-100"
            >
              Citas
            </Link>
            <Link
              to={`${baseUrl}/patient/vaccination/${patient.id}`}
              className="bg-sky-50/50 text-sky-700 hover:bg-slate-50 px-4 py-2 uppercase font-bold text-[10px] tracking-wider rounded-lg transition-colors flex items-center justify-center flex-1 border border-sky-100"
            >
              Vacunas
            </Link>
          </div>
        </div>
      </div>

      <details className="mt-6 group border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
        <summary className="p-4 cursor-pointer text-xs font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-100 transition-colors list-none flex justify-between items-center outline-none">
          Ver más información
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 transition-transform group-open:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </summary>

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">
                Encargado
              </p>
              <p className="text-gray-800 font-medium capitalize">{owner}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                Email
              </p>
              <p className="text-slate-800 font-medium break-all">
                {owner_email}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
              Síntomas
            </p>
            <p className="text-slate-700 bg-slate-50/50 p-4 rounded-lg text-sm border border-slate-100 leading-relaxed font-serif italic">
              {symptoms}
            </p>
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
          onClick={onDeleteClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemPatient;
