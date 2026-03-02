import type { ReactNode } from "react";
import type { MedicalRecord } from "@/entities/patient";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";

type ListMedicalRecordsProps = {
  list: MedicalRecord[];
  loading: boolean;
  pagination: Pagination;
  onPageChange?: (page: number) => void;
  renderItem: (record: MedicalRecord) => ReactNode;
};

const ListMedicalRecords = ({
  list,
  loading,
  pagination,
  onPageChange,
  renderItem,
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
        <>
          <h2 className="font-black text-center text-2xl text-slate-800">
            No hay registros médicos
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
            Las consultas que registres se visualizarán {""}
            <span className="text-indigo-600 font-bold">aquí</span>
          </p>
        </>
      )}

      {pagination.total_pages > 1 && (
        <PageNavigator pagination={pagination} onPageChange={onPageChange} />
      )}
    </>
  );
};

export default ListMedicalRecords;
