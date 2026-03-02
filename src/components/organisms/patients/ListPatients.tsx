import type { ReactNode } from "react";
import type { Patient } from "@/entities/patient";
import type { Pagination } from "@/entities/pagination";
import PageNavigator from "@/components/molecules/PageNavigator";

type ListPatientsProps = {
  list: Patient[];
  loading: boolean;
  pagination: Pagination;
  onPageChange?: (page: number) => void;
  renderItem: (patient: Patient) => ReactNode;
};

const ListPatients = ({
  list,
  loading,
  pagination,
  renderItem,
  onPageChange,
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
        <>
          <h2 className="font-black text-center text-2xl text-slate-800">
            No hay pacientes{" "}
          </h2>
          <p className="text-slate-500 text-sm mt-2 mb-8 text-center max-w-sm mx-auto">
            Los pacientes agregados se visualizarán {""}
            <span className="text-indigo-600 font-bold">en este apartado</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListPatients;
