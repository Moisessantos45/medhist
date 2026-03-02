
interface Veterinarian {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  website: string;
  token: string;
  emailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const initialVeterinarian: Veterinarian = {
  id: 0,
  name: "",
  email: "",
  password: "",
  phone: "",
  website: "",
  token: "",
  emailConfirmed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export { initialVeterinarian };
export type { Veterinarian };