import type { ReactNode } from "react";
import type { Vaccination } from "@/entities/veccination";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";
import AddButton from "@/components/atoms/AddButton";

interface ListVaccinationsProps {
  list: Vaccination[];
  pagination: Pagination;
  onAdd?: () => void;
  onPageChange?: (page: number) => void;
  renderItem: (vaccination: Vaccination) => ReactNode;
}

const ListVaccinations = ({
  list,
  pagination,
  onPageChange,
  onAdd,
  renderItem,
}: ListVaccinationsProps) => {
  return (
    <>
      {list.length ? (
        <>
          <h2 className="font-black text-2xl text-slate-800 text-center">
            Cartilla de Vacunación
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
            Revisa y administra {""}
            <span className="text-indigo-600 font-bold">
              el control de vacunas
            </span>
          </p>
          <div className="flex flex-col gap-4">{list.map(renderItem)}</div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="font-black text-2xl text-slate-800">
            No hay vacunas registradas
          </h2>
          <p className="text-slate-500 text-sm text-center max-w-xs">
            Aún no tienes vacunas registradas.{" "}
            <span className="text-indigo-600 font-bold">
              ¡Agrega la primera!
            </span>
          </p>
          {onAdd && (
           <AddButton title="Agregar vacuna" onAdd={onAdd} />
          )}
        </div>
      )}

      {pagination.total_pages > 1 && (
        <PageNavigator pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default ListVaccinations;
