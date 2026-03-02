import type { MedicalRecord } from "@/entities/patient";
import { parseDateToISO } from "./parseDate";

const getString = (value: unknown, fallback: string = ""): string =>
  typeof value === "string" ? value : fallback;

const getNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const medicalRecordMapper = (data: Record<string, unknown>): MedicalRecord => {
  return {
    id: getNumber(data.id ?? data.ID),
    visit_date: new Date(
      getString(data.visit_date ?? data.VisitDate) || new Date().toISOString(),
    ),
    diagnosis: getString(data.diagnosis ?? data.Diagnosis),
    treatment: getString(data.treatment ?? data.Treatment),
    prescription: getString(data.prescription ?? data.Prescription),
    weight_kg: getNumber(data.weight_kg ?? data.WeightKg),
    temperature_c: getNumber(data.temperature_c ?? data.TemperatureC),
    notes: getString(data.notes ?? data.Notes),
    created_at: new Date(
      getString(data.created_at ?? data.CreatedAt) || new Date().toISOString(),
    ),
    updated_at: new Date(
      getString(data.updated_at ?? data.UpdatedAt) || new Date().toISOString(),
    ),
    patient_id: getNumber(data.patient_id ?? data.PatientID),
    veterinarian_id: getNumber(data.veterinarian_id ?? data.VeterinarianID),
  };
};

const medicalRecordToJson = (
  record: Partial<MedicalRecord>,
): Record<string, unknown> => {
  return {
    id: record.id,
    visit_date: parseDateToISO(record.visit_date),
    diagnosis: record.diagnosis,
    treatment: record.treatment,
    prescription: record.prescription,
    weight_kg: Number(record.weight_kg ?? 0),
    temperature_c: Number(record.temperature_c ?? 0),
    notes: record.notes,
    patient_id: Number(record.patient_id ?? 0),
    veterinarian_id: Number(record.veterinarian_id ?? 0),
  };
};

export { medicalRecordMapper, medicalRecordToJson };
