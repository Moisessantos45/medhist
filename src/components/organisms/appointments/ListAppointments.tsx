import type { ReactNode } from "react";
import type { Appointment } from "@/entities/appointment";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";
import AddButton from "@/components/atoms/AddButton";

type ListAppointmentsProps = {
  list: Appointment[];
  pagination: Pagination;
  onAdd?: () => void;
  onPageChange?: (page: number) => void;
  renderItem: (appointment: Appointment) => ReactNode;
};

const ListAppointments = ({
  list,
  pagination,
  onPageChange,
  renderItem,
  onAdd,
}: ListAppointmentsProps) => {
  return (
    <>
      {list.length ? (
        <>
          <h2 className="font-black text-2xl text-slate-800 text-center">
            Listado de Citas
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
            Revisa y administra {""}
            <span className="text-indigo-600 font-bold">
              las citas pendientes
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="font-black text-2xl text-slate-800">
            No hay citas registradas
          </h2>
          <p className="text-slate-500 text-sm text-center max-w-xs">
            Aún no tienes citas registradas.{" "}
            <span className="text-indigo-600 font-bold">
              ¡Agrega la primera!
            </span>
          </p>
          {onAdd && <AddButton title="Agregar cita" onAdd={onAdd} />}
        </div>
      )}
      {pagination.total_pages > 1 && (
        <PageNavigator pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default ListAppointments;
