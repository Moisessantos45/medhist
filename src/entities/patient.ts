
interface Patient {
  id: number;
  name: string;
  owner: string;
  owner_email: string;
  owner_phone: string;
  symptoms: string;
  veterinarian_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface MedicalRecord {
  id: number;
  visit_date: Date;
  diagnosis: string;
  treatment: string;
  prescription: string;
  weight_kg: number;
  temperature_c: number;
  notes: string;
  created_at: Date;
  updated_at: Date;

  patient_id: number;
  veterinarian_id: number;
}

const initialPatient: Patient = {
  id: 0,
  name: "",
  owner: "",
  owner_email: "",
  owner_phone: "",
  symptoms: "",
  veterinarian_id: 0,
  status: "active",
  created_at: new Date(),
  updated_at: new Date(),
};

const initialMedicalRecord: MedicalRecord = {
  id: 0,
  visit_date: new Date(),
  diagnosis: "",
  treatment: "",
  prescription: "",
  weight_kg: 0,
  temperature_c: 0,
  notes: "",
  created_at: new Date(),
  updated_at: new Date(),
  patient_id: 0,
  veterinarian_id: 0,
};

export { initialPatient, initialMedicalRecord };
export type { Patient, MedicalRecord };
