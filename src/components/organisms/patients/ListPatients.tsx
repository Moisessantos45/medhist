import type { ReactNode } from "react";
import type { Patient } from "@/entities/patient";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";
import AddButton from "@/components/atoms/AddButton";

type ListPatientsProps = {
  list: Patient[];
  loading: boolean;
  pagination: Pagination;
  onPageChange?: (page: number) => void;
  onAdd?: () => void;
  renderItem: (patient: Patient) => ReactNode;
};

const ListPatients = ({
  list,
  loading,
  pagination,
  renderItem,
  onPageChange,
  onAdd,
}: ListPatientsProps) => {
  if (loading) return <div>Cargando pacientes...</div>;

  return (
    <>
      {list.length ? (
        <>
          <h2 className="font-black text-center text-2xl text-slate-800">
            Lista de pacientes
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">pacientes y citas</span>
          </p>
          <section className="flex flex-col gap-2 overflow-y-auto scrollbar max-h-screen p-2">
            {list.map(renderItem)}
          </section>
          {pagination.total_pages > 1 && (
            <PageNavigator
              pagination={pagination}
              onPageChange={onPageChange}
            />
          )}
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
                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 4a2 2 0 100-4 2 2 0 000 4zM3 14a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </div>
          <h2 className="font-black text-2xl text-slate-800">
            No hay pacientes
          </h2>
          <p className="text-slate-500 text-sm text-center max-w-xs">
            Aún no tienes pacientes registrados.{" "}
            <span className="text-indigo-600 font-bold">
              ¡Agrega el primero!
            </span>
          </p>
          {onAdd && <AddButton title="Agregar paciente" onAdd={onAdd} />}
        </div>
      )}
    </>
  );
};

export default ListPatients;
