import { create } from "zustand";
import {
  initialVeterinarian,
  type Veterinarian,
} from "@/entities/veterinarian";
import { apiAuth } from "@/services/api";
import ErrorHandler from "@/services/errorHandler";
import veterinarianMapper, {
  veterinarianToJson,
} from "@/helpers/mappers/veterinarianMapper";
import useAuthStore from "./auth";
import type { AlertProps } from "@/components/molecules/Alert";

interface VeterinarianState {
  data: Partial<Veterinarian>;
  list: Veterinarian[];
  loading: boolean;
  alertState: AlertProps;
  get: () => Promise<void>;
  updateProfile: (id: number, data: Partial<Veterinarian>) => Promise<void>;
  updateField: (field: keyof Partial<Veterinarian>, value: string) => void;
  clearData: () => void;

  setDat: (data: Veterinarian) => void;
  setList: (data: Veterinarian[]) => void;
  setLoading: (loading: boolean) => void;
  setAlertState: (data: AlertProps) => void;
}

const useVeterinarianStore = create<VeterinarianState>((set) => ({
  data: { ...initialVeterinarian },
  list: [],
  loading: false,
  alertState: { msg: "", error: false },
  get: async () => {
    try {
      useAuthStore.getState().setLoading(true);
      const { data } = await apiAuth.get("/auth/session", {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
        },
      });

      const extractedData = data["data"] ?? null;
      if (!extractedData) {
        throw new Error("No se pudo obtener la información del veterinario");
      }

      const transformedData = veterinarianMapper(extractedData);

      set({ data: transformedData, alertState: { msg: "", error: false } });
      useAuthStore.getState().setAuthenticated(true);
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { msg, error: true } });
      useAuthStore.getState().setAuthenticated(false);
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  },
  updateProfile: async (id, veterinarian) => {
    set({ loading: true });
    try {
      const { data } = await apiAuth.put(
        `/veterinarian/${id}`,
        {
          ...veterinarianToJson(veterinarian),
        },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] ?? null;
      const extractedMsg =
        data["message"] ?? "Perfil actualizado correctamente";
      if (!extractedData) {
        throw new Error("No se pudo actualizar la información del veterinario");
      }

      const transformedData = veterinarianMapper(extractedData);

      set({
        data: transformedData,
        alertState: { msg: extractedMsg, error: false },
      });
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { msg, error: true } });
    } finally {
      setTimeout(() => {
        set({ alertState: { msg: "", error: false } });
      }, 3000);
      set({ loading: false });
    }
  },

  updateField: (field, value) => {
    set((state) => ({
      data: { ...state.data, [field]: value },
    }));
  },
  clearData: () => set({ data: { ...initialVeterinarian } }),
  setDat: (data) => set({ data }),
  setList: (list) => set({ list }),
  setLoading: (loading) => set({ loading }),
  setAlertState: (alertState) => set({ alertState }),
}));

export default useVeterinarianStore;
