import type { Appointment } from "@/entities/appointment";
import { parseDateToISO } from "./parseDate";

const getString = (value: unknown, fallback: string = ""): string =>
  typeof value === "string" ? value : fallback;

const getNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const getStatus = (
  value: unknown,
  fallback: "scheduled" | "completed" | "canceled" = "scheduled",
): "scheduled" | "completed" | "canceled" => {
  const str = String(value).toLowerCase();
  if (str === "scheduled" || str === "completed" || str === "canceled") {
    return str as "scheduled" | "completed" | "canceled";
  }
  return fallback;
};

const appointmentMapper = (data: Record<string, unknown>): Appointment => {
  return {
    id: getNumber(data.id ?? data.ID),
    reason: getString(data.reason ?? data.Reason),
    patient_id: getNumber(data.patient_id ?? data.PatientID),
    veterinarian_id: getNumber(data.veterinarian_id ?? data.VeterinarianID),
    date: new Date(
      getString(data.date ?? data.Date) || new Date().toISOString(),
    ),
    status: getStatus(data.status ?? data.Status),
    notes: getString(data.notes ?? data.Notes),
    created_at: new Date(
      getString(data.created_at ?? data.CreatedAt) || new Date().toISOString(),
    ),
    updated_at: new Date(
      getString(data.updated_at ?? data.UpdatedAt) || new Date().toISOString(),
    ),
  };
};

const appointmentToJson = (
  appointment: Partial<Appointment>,
): Record<string, unknown> => {
  return {
    id: appointment.id,
    reason: appointment.reason,
    patient_id: appointment.patient_id,
    veterinarian_id: appointment.veterinarian_id,
    date: parseDateToISO(appointment.date),
    status: appointment.status,
    notes: appointment.notes,
    created_at: appointment.created_at
      ? appointment.created_at.toISOString()
      : undefined,
    updated_at: appointment.updated_at
      ? appointment.updated_at.toISOString()
      : undefined,
  };
};

export { appointmentMapper, appointmentToJson };
