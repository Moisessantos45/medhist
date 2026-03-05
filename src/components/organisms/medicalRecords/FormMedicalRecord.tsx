import { type SubmitEvent } from "react";
import type { MedicalRecord } from "@/entities/patient";
import Input from "@/components/atoms/Input";
import Alert from "@/components/molecules/Alert";

type FormMedicalRecordProps = {
  data: Partial<MedicalRecord>;
  alertState: { msg: string; error: boolean };
  hiddenButton: boolean;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onChange: (field: keyof MedicalRecord, value: string) => void;
  onCancel: () => void;
};

const FormMedicalRecord = ({
  data,
  alertState,
  hiddenButton,
  onSubmit,
  onChange,
  onCancel,
}: FormMedicalRecordProps) => {
  const { msg } = alertState;

  return (
    <div className="bg-white px-6 py-8 border border-slate-200 shadow-sm shadow-slate-200/50 rounded-xl mb-8 relative">
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

      <h2 className="font-black text-center text-2xl text-slate-800 mb-2">
        {data?.id ? "Editar Registro" : "Nuevo Registro"}
      </h2>
      <p className="text-slate-500 text-center text-sm mb-8">
        Registra la consulta y {""}
        <span className="text-indigo-600 font-bold">tratamiento médico</span>
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-1">
        <div className="mb-2">
          <Input
            label="Fecha de Visita"
            type="date"
            id="visitDate"
            required={true}
            value={
              data.visit_date instanceof Date
                ? data.visit_date.toISOString().split("T")[0]
                : (data.visit_date as string | undefined) || ""
            }
            onChange={(e) => onChange("visit_date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <Input
            label="Peso (kg)"
            type="number"
            step="0.01"
            id="weightKg"
            required={true}
            placeholder="Ej. 12.5"
            value={data.weight_kg || ""}
            onChange={(e) => onChange("weight_kg", e.target.value)}
          />

          <Input
            label="Temperatura (°C)"
            type="number"
            step="0.1"
            id="temperatureC"
            required={true}
            placeholder="Ej. 38.5"
            value={data.temperature_c || ""}
            onChange={(e) => onChange("temperature_c", e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="diagnosis"
            className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1"
          >
            Diagnóstico
          </label>
          <textarea
            id="diagnosis"
            required={true}
            placeholder="Describe el diagnóstico del paciente"
            className="w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-25 font-medium"
            value={data.diagnosis || ""}
            onChange={(e) => onChange("diagnosis", e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="treatment"
            className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1"
          >
            Tratamiento
          </label>
          <textarea
            id="treatment"
            required={true}
            placeholder="Indica el tratamiento a seguir"
            className="w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-25 font-medium"
            value={data.treatment || ""}
            onChange={(e) => onChange("treatment", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
          <div className="mb-5">
            <label
              htmlFor="prescription"
              className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1"
            >
              Receta (Prescripción)
            </label>
            <textarea
              id="prescription"
              required={true}
              placeholder="Medicamentos recetados"
              className="w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-400 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-25 font-medium font-serif italic"
              value={data.prescription || ""}
              onChange={(e) => onChange("prescription", e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="notes"
              className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1"
            >
              Notas adicionales{" "}
              <span className="text-slate-400 font-normal lowercase tracking-normal">
                (Opcional)
              </span>
            </label>
            <textarea
              id="notes"
              placeholder="Cualquier observación extra"
              className="w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-25 font-medium"
              value={data.notes || ""}
              onChange={(e) => onChange("notes", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 cursor-pointer font-bold text-xs uppercase tracking-wider bg-indigo-600 text-white p-3 transition-colors hover:bg-slate-800 rounded-lg shadow-sm"
          >
            {data.id ? "Guardar Cambios" : "Registrar Consulta"}
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

      {msg && (
        <div className="mt-6">
          <Alert {...alertState} />
        </div>
      )}
    </div>
  );
};

export default FormMedicalRecord;
