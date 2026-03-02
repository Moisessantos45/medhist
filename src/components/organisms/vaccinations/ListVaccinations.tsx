import type { ReactNode } from "react";
import type { Vaccination } from "@/entities/veccination";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";

interface ListVaccinationsProps {
  list: Vaccination[];
  pagination: Pagination;
  onPageChange?: (page: number) => void;
  renderItem: (vaccination: Vaccination) => ReactNode;
}

const ListVaccinations = ({
  list,
  pagination,
  onPageChange,
  renderItem,
}: ListVaccinationsProps) => {
  return (
    <>
      <h2 className="font-black text-2xl text-slate-800 text-center">
        Cartilla de Vacunación
      </h2>
      <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
        Revisa y administra {""}
        <span className="text-indigo-600 font-bold">el control de vacunas</span>
      </p>

      {list.length ? (
        <div className="flex flex-col gap-4">{list.map(renderItem)}</div>
      ) : (
        <div className="bg-slate-50/50 border border-slate-200 border-dashed rounded-xl p-10 text-center">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <h3 className="text-sm font-bold text-slate-800 mb-2">
            No hay vacunas registradas
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Comienza agregando una vacuna usando el formulario.
          </p>
        </div>
      )}

      {pagination.total_pages > 1 && (
        <PageNavigator pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default ListVaccinations;
