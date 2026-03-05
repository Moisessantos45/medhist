import { type SubmitEvent, type FC } from "react";
import Alert from "@/components/molecules/Alert";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import type { Appointment } from "@/entities/appointment";

interface FormAppointmentProps {
  data: Partial<Appointment>;
  alertState: { msg: string; error: boolean };
  isEditing: boolean;
  hiddenButton: boolean;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onChange: (field: keyof Appointment, value: string) => void;
  onCancel: () => void;
}

const FormAppointment: FC<FormAppointmentProps> = ({
  data,
  alertState,
  isEditing,
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
        Registrar Cita
      </h2>
      <p className="text-sm mt-2 mb-8 text-center text-slate-500 max-w-sm mx-auto">
        Programa nuevas citas y {""}
        <span className="text-indigo-600 font-bold">adminístralas</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Input
            label="Razón de la Cita *"
            id="reason"
            type="text"
            required={true}
            placeholder="Revisión general, vacuna, profilaxis..."
            value={data.reason || ""}
            onChange={(e) => onChange("reason", e.target.value)}
          />
          <Input
            label="Fecha y Hora *"
            id="date"
            type="datetime-local"
            required={true}
            value={
              data.date ? new Date(data.date).toISOString().slice(0, 16) : ""
            }
            onChange={(e) => onChange("date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <Select
            label="Estado de la Cita"
            id="status"
            value={data.status || "scheduled"}
            onChange={(val) => onChange("status", val)}
            list={[
              { name: "Programada (Scheduled)", value: "scheduled" },
              { name: "Completada (Completed)", value: "completed" },
              { name: "Cancelada (Canceled)", value: "canceled" },
            ]}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="notes"
            className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-2 pl-1"
          >
            Notas Adicionales
          </label>
          <textarea
            id="notes"
            className="w-full p-3 bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-25 font-medium"
            value={data.notes || ""}
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            type="submit"
            className="flex-1 cursor-pointer font-bold text-xs uppercase tracking-wider bg-indigo-600 text-white p-3 transition-colors hover:bg-slate-800 rounded-lg shadow-sm"
          >
            {isEditing ? "Guardar Cambios" : "Agregar Cita"}
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

export default FormAppointment;
