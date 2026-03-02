import type { Veterinarian } from "@/entities/veterinarian";

const getString = (value: unknown, fallback: string = ""): string =>
  typeof value === "string" ? value : fallback;

const getNumber = (value: unknown, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const getBoolean = (value: unknown, fallback: boolean = false): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return fallback;
};

const veterinarianMapper = (data: Record<string, unknown>): Veterinarian => {
  return {
    id: getNumber(data.id),
    name: getString(data.name),
    email: getString(data.email),
    password: getString(data.password),
    phone: getString(data.phone),
    website: getString(data.website),
    token: getString(data.token),
    emailConfirmed: getBoolean(data.email_confirmed ?? data.emailConfirmed),
    createdAt: new Date(
      getString(data.created_at ?? data.createdAt) || new Date().toISOString(),
    ),
    updatedAt: new Date(
      getString(data.updated_at ?? data.updatedAt) || new Date().toISOString(),
    ),
  };
};

const veterinarianToJson = (
  veterinarian: Partial<Veterinarian>,
): Record<string, unknown> => {
  return {
    id: veterinarian.id,
    name: veterinarian.name,
    email: veterinarian.email,
    password: veterinarian.password,
    phone: veterinarian.phone,
    website: veterinarian.website,
    token: veterinarian.token,
    email_confirmed: veterinarian.emailConfirmed,
  };
};

export { veterinarianToJson };
export default veterinarianMapper;
