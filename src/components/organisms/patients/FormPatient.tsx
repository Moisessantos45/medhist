import { type SubmitEvent } from "react";
import type { Patient } from "@/entities/patient";
import Input from "@/components/atoms/Input";
import Alert from "@/components/molecules/Alert";

type FormPatientProps = {
  data: Partial<Patient>;
  alertState: { msg: string; error: boolean };
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onChange: (field: keyof Patient, value: string) => void;
};

const FormPatient = ({
  data,
  alertState,
  onSubmit,
  onCancel,
  onChange,
}: FormPatientProps) => {
  const { msg } = alertState;

  return (
    <div className="bg-white px-6 py-8 border border-slate-200 shadow-sm shadow-slate-200/50 rounded-xl mb-8">
      <h2 className="font-black text-center text-2xl text-slate-800 mb-2">
        {data?.id ? "Editar Paciente" : "Nuevo Paciente"}
      </h2>
      <p className="text-slate-500 text-center text-sm mb-8">
        {data?.id ? "Actualiza los datos del" : "Añade un paciente y"} {""}
        <span className="text-indigo-600 font-bold">registro clínico</span>
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-1">
        {/* Row 1: Nombres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <Input
            label="Mascota / Paciente"
            type="text"
            id="paciente"
            required={true}
            placeholder="Nombre de la mascota"
            value={data.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
          <Input
            label="Propietario"
            type="text"
            id="encargado"
            required={true}
            placeholder="Nombre del dueño"
            value={data.owner || ""}
            onChange={(e) => onChange("owner", e.target.value)}
          />
        </div>

        {/* Row 2: Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <Input
            label="Email de Contacto"
            type="email"
            id="email"
            required={true}
            placeholder="ejemplo@correo.com"
            value={data.owner_email || ""}
            onChange={(e) => onChange("owner_email", e.target.value)}
          />
          <Input
            id="telefono"
            label="Teléfono"
            type="tel"
            required={true}
            placeholder="10 dígitos"
            value={data.owner_phone || ""}
            onChange={(e) => onChange("owner_phone", e.target.value)}
          />
        </div>

        {/* Textarea: Síntomas */}
        <div className="mb-6">
          <label
            htmlFor="sintomas"
            className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1"
          >
            Síntomas o Motivo de Consulta
          </label>
          <textarea
            id="sintomas"
            required={true}
            placeholder="Describe brevemente los síntomas..."
            className="w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-30 font-medium"
            value={data.symptoms || ""}
            onChange={(e) => onChange("symptoms", e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 cursor-pointer font-bold text-xs uppercase tracking-wider bg-indigo-600 text-white p-3 transition-colors hover:bg-slate-800 rounded-lg shadow-sm"
          >
            {data?.id ? "Guardar Cambios" : "Agregar Paciente"}
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

export default FormPatient;
