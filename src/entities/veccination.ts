interface Vaccination {
  id: number;
  type: string;
  date: Date;
  next_due_date: Date;
  status: "completed" | "pending" | "canceled";
  created_at: Date;
  updated_at: Date;
  patient_id: number;
  veterinarian_id: number;
}

const initialVaccination: Partial<Vaccination> = {
  type: "",
  date: new Date(),
  next_due_date: new Date(),
  status: "completed",
  patient_id: 0,
  veterinarian_id: 0,
};

export { initialVaccination };
export type { Vaccination };
