import type { Vaccination } from "@/entities/veccination";
import { parseDateToISO } from "./parseDate";

const getString = (value: unknown, fallback: string = ""): string =>
  typeof value === "string" ? value : fallback;

const getNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const getStatus = (
  value: unknown,
  fallback: "completed" | "pending" | "canceled" = "pending",
): "completed" | "pending" | "canceled" => {
  const str = String(value).toLowerCase();
  if (str === "completed" || str === "pending" || str === "canceled") {
    return str as "completed" | "pending" | "canceled";
  }
  return fallback;
};

const vaccinationMapper = (data: Record<string, unknown>): Vaccination => {
  return {
    id: getNumber(data.id ?? data.ID),
    type: getString(data.type ?? data.Type),
    date: new Date(
      getString(data.date ?? data.Date) || new Date().toISOString(),
    ),
    next_due_date: new Date(
      getString(data.nextDueDate ?? data.next_due_date ?? data.NextDueDate) ||
        new Date().toISOString(),
    ),
    status: getStatus(data.status ?? data.Status),
    created_at: new Date(
      getString(data.createdAt ?? data.created_at ?? data.CreatedAt) ||
        new Date().toISOString(),
    ),
    updated_at: new Date(
      getString(data.updatedAt ?? data.updated_at ?? data.UpdatedAt) ||
        new Date().toISOString(),
    ),
    patient_id: getNumber(data.patientId ?? data.patient_id ?? data.PatientId),
    veterinarian_id: getNumber(
      data.veterinarianId ?? data.veterinarian_id ?? data.VeterinarianId,
    ),
  };
};

const vaccinationToJson = (
  vaccination: Record<string, unknown>,
): Record<string, unknown> => {
  return {
    id: vaccination.id,
    type: vaccination.type,
    date: parseDateToISO(vaccination.date),
    next_due_date: parseDateToISO(vaccination.next_due_date),
    status: vaccination.status,
    patient_id: vaccination.patient_id,
    veterinarian_id: vaccination.veterinarian_id,
  };
};

export { vaccinationMapper, vaccinationToJson };
