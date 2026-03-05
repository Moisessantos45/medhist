import type { SubmitEvent, FC } from "react";
import Alert from "@/components/molecules/Alert";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import type { Vaccination } from "@/entities/veccination";

interface FormVaccinationProps {
  data: Partial<Vaccination>;
  alertState: { msg: string; error: boolean };
  id: number | null;
  hiddenButton: boolean;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onChange: (field: keyof Vaccination, value: string) => void;
  onCancel: () => void;
}

const FormVaccination: FC<FormVaccinationProps> = ({
  data,
  alertState,
  id,
  hiddenButton,
  onSubmit,
  onChange,
  onCancel,
}) => {
  const { msg } = alertState;

  return (
    <div className="bg-white px-2 py-4 border border-slate-200 shadow-sm shadow-slate-200/50 rounded-xl mb-8 relative">
      {hiddenButton && (
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 transition-colors absolute top-4 right-4"
          onClick={onCancel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <h2 className="font-black text-2xl text-slate-800 text-center">
        Registrar Vacuna
      </h2>
      <p className="text-sm mt-2 mb-8 text-center text-slate-500 max-w-sm mx-auto">
        Control y seguimiento de {""}
        <span className="text-indigo-600 font-bold">vacunación</span>
      </p>

      {msg && (
        <div className="mb-6">
          <Alert {...alertState} />
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-white py-8 px-6 rounded-xl flex flex-col gap-6 mb-8"
      >
        <div className="grid grid-cols-1 gap-5">
          <Input
            label="Tipo de Vacuna *"
            id="type"
            type="text"
            required={true}
            placeholder="Ej. Rabia, Parvovirus, Moquillo..."
            value={data.type || ""}
            onChange={(e) => onChange("type", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Input
            label="Fecha Aplicada *"
            id="date"
            type="date"
            required={true}
            value={
              data.date ? new Date(data.date).toISOString().split("T")[0] : ""
            }
            onChange={(e) => onChange("date", e.target.value)}
          />
          <Input
            label="Próxima Dosis *"
            id="nextDueDate"
            type="date"
            required={true}
            value={
              data.next_due_date
                ? new Date(data.next_due_date).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => onChange("next_due_date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <Select
            label="Estado"
            id="status"
            value={data.status || "completed"}
            onChange={(val) => onChange("status", val)}
            list={[
              { name: "Aplicada (Completed)", value: "completed" },
              { name: "Pendiente (Pending)", value: "pending" },
              { name: "Cancelada (Canceled)", value: "canceled" },
            ]}
          />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            type="submit"
            className="flex-1 cursor-pointer font-bold text-xs uppercase tracking-wider bg-indigo-600 text-white p-3 transition-colors hover:bg-slate-800 rounded-lg shadow-sm"
          >
            {id ? "Guardar Cambios" : "Agregar Vacuna"}
          </button>

          {data?.id && (
            <button
              type="button"
              className="flex-1 cursor-pointer font-bold text-xs uppercase tracking-wider bg-slate-50 text-slate-600 p-3 transition-colors hover:bg-slate-100 border border-slate-200 rounded-lg"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormVaccination;
