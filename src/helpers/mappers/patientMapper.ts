import type { Patient } from "@/entities/patient";

const getString = (value: unknown, fallback: string = ""): string =>
  typeof value === "string" ? value : fallback;

const getNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const patientMapper = (data: Record<string, unknown>): Patient => {
  return {
    id: getNumber(data.id ?? data.ID),
    name: getString(data.name ?? data.Name),
    owner: getString(data.owner ?? data.Owner),
    owner_email: getString(data.owner_email ?? data.OwnerEmail),
    owner_phone: getString(data.owner_phone ?? data.OwnerPhone),
    symptoms: getString(data.symptoms ?? data.Symptoms),
    veterinarian_id: getNumber(data.veterinarian_id ?? data.VeterinarianID),
    status: getString(data.status ?? data.Status),
    created_at: new Date(
      getString(data.created_at ?? data.CreatedAt) || new Date().toISOString(),
    ),
    updated_at: new Date(
      getString(data.updated_at ?? data.UpdatedAt) || new Date().toISOString(),
    ),
  };
};

const patientToJson = (patient: Partial<Patient>): Record<string, unknown> => {
  return {
    id: patient.id,
    name: patient.name,
    owner: patient.owner,
    owner_email: patient.owner_email,
    owner_phone: patient.owner_phone,
    symptoms: patient.symptoms,
    veterinarian_id: patient.veterinarian_id,
    status: patient.status,
  };
};

export { patientMapper, patientToJson };
