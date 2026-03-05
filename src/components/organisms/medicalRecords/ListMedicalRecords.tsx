import type { ReactNode } from "react";
import type { MedicalRecord } from "@/entities/patient";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";
import AddButton from "@/components/atoms/AddButton";

type ListMedicalRecordsProps = {
  list: MedicalRecord[];
  loading: boolean;
  pagination: Pagination;
  onPageChange?: (page: number) => void;
  onAdd?: () => void;
  renderItem: (record: MedicalRecord) => ReactNode;
};

const ListMedicalRecords = ({
  list,
  loading,
  pagination,
  onPageChange,
  renderItem,
  onAdd,
}: ListMedicalRecordsProps) => {
  if (loading) return <div>Cargando historial médico...</div>;

  return (
    <>
      {list.length ? (
        <>
          <h2 className="font-black text-center text-2xl text-slate-800">
            Historial de Consultas
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
            Administra los {""}
            <span className="text-indigo-600 font-bold">
              registros médicos del paciente
            </span>
          </p>
          <section className="flex flex-col gap-2 overflow-y-auto scrollbar max-h-[80vh] p-2">
            {list.map(renderItem)}
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="font-black text-2xl text-slate-800">
            No hay registros médicos
          </h2>
          <p className="text-slate-500 text-sm text-center max-w-xs">
            Aún no tienes registros médicos registrados.{" "}
            <span className="text-indigo-600 font-bold">
              ¡Agrega el primero!
            </span>
          </p>
          {onAdd && <AddButton title="Agregar registro médico" onAdd={onAdd} />}
        </div>
      )}

      {pagination.total_pages > 1 && (
        <PageNavigator pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default ListMedicalRecords;
