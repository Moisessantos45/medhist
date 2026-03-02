import type { ReactNode } from "react";
import type { Appointment } from "@/entities/appointment";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";

type ListAppointmentsProps = {
  list: Appointment[];
  pagination: Pagination;
  onPageChange?: (page: number) => void;
  renderItem: (appointment: Appointment) => ReactNode;
};

const ListAppointments = ({
  list,
  pagination,
  onPageChange,
  renderItem,
}: ListAppointmentsProps) => {
  return (
    <>
      <h2 className="font-black text-2xl text-slate-800 text-center">
        Listado de Citas
      </h2>
      <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
        Revisa y administra {""}
        <span className="text-indigo-600 font-bold">las citas pendientes</span>
      </p>

      {list.length ? (
        <div className="flex flex-col gap-4">{list.map(renderItem)}</div>
      ) : (
        <div className="bg-slate-50/50 border border-slate-200 border-dashed rounded-xl p-10 text-center">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25H3Z"
            />
          </svg>
          <h3 className="text-sm font-bold text-slate-800 mb-2">
            No hay citas registradas
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Comienza agregando una cita usando el formulario.
          </p>
        </div>
      )}
      {pagination.total_pages > 1 && (
        <PageNavigator pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default ListAppointments;
