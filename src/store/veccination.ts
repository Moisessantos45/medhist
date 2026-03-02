import { create } from "zustand";
import type { AlertProps } from "@/components/molecules/Alert";
import { initialVaccination, type Vaccination } from "@/entities/veccination";
import useVeterinarianStore from "./veterinarian";
import { apiPublic } from "@/services/api";
import useAuthStore from "./auth";
import {
  vaccinationMapper,
  vaccinationToJson,
} from "@/helpers/mappers/vaccinationMapper";
import ErrorHandler from "@/services/errorHandler";
import { initialPagination, type Pagination } from "@/entities/pagination";
import { mapPagination } from "@/helpers/mappers/pagination";

interface VaccinationState {
  data: Partial<Vaccination>;
  list: Vaccination[];
  loading: boolean;
  alertState: AlertProps;
  pagination: Pagination;
  changePage: (id: number, page: number) => void;
  getAll: (id: number, page?: number) => Promise<void>;
  register: (data: Partial<Vaccination>) => Promise<void>;
  updateProfile: (id: number, data: Partial<Vaccination>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateField: (field: keyof Partial<Vaccination>, value: string) => void;
  clearData: () => void;

  setData: (data: Vaccination) => void;
  setList: (data: Vaccination[]) => void;
  setLoading: (loading: boolean) => void;
  setAlertState: (state: AlertProps) => void;
  setPagination: (pagination: Pagination) => void;
}

const useVaccinationStore = create<VaccinationState>((set, get) => ({
  data: { ...initialVaccination },
  list: [],
  loading: false,
  alertState: { error: false, msg: "" },
  pagination: { ...initialPagination },

  changePage: (id, page) => {
    get().setPagination({ ...get().pagination, page });
    get().getAll(id, page);
  },
  getAll: async (id, page = 1) => {
    set({ loading: true });
    try {
      const veterinarianId = useVeterinarianStore.getState().data.id;
      if (!veterinarianId) {
        throw new Error("Veterinario no autenticado");
      }

      const { data } = await apiPublic.get(
        `/vaccination/patient/${id}/veterinarian/${veterinarianId}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const vaccinationRecords = (data["data"] || []).map(vaccinationMapper);
      const paginationInfo = mapPagination(
        data["paginate"] || initialPagination,
      );

      set({
        list: vaccinationRecords,
        pagination: paginationInfo,
        alertState: { error: false, msg: "" },
      });
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      set({ loading: false });
      setTimeout(() => {
        set({ alertState: { error: false, msg: "" } });
      }, 3000);
    }
  },
  register: async (vaccination) => {
    set({ loading: true });
    try {
      const veterinarianId = useVeterinarianStore.getState().data.id;
      if (!veterinarianId) {
        throw new Error("Veterinario no autenticado");
      }

      const { data } = await apiPublic.post(
        "/vaccination",
        {
          ...vaccinationToJson({
            ...vaccination,
            veterinarian_id: veterinarianId,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] || null;
      const extractedMsg =
        data["message"] || "Vacunación registrada exitosamente";

      if (!extractedData) throw new Error("No se pudo registrar la vacunación");

      set((state) => ({
        list: [...state.list, vaccinationMapper(extractedData)],
        data: { ...initialVaccination },
        alertState: { error: false, msg: extractedMsg },
      }));
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      setTimeout(() => {
        set({ alertState: { error: false, msg: "" } });
      }, 3000);
      set({ loading: false });
    }
  },
  updateProfile: async (id, vaccination) => {
    set({ loading: true });
    try {
      const { data } = await apiPublic.put(
        `/vaccination/${id}`,
        {
          ...vaccinationToJson(vaccination),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] || null;
      const extractedMsg =
        data["message"] || "Vacunación actualizada exitosamente";

      if (!extractedData)
        throw new Error("No se pudo actualizar la vacunación");

      set((state) => ({
        list: state.list.map((item) =>
          item.id === id ? vaccinationMapper(extractedData) : item,
        ),
        data: { ...initialVaccination },
        alertState: { error: false, msg: extractedMsg },
      }));
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      setTimeout(() => {
        set({ alertState: { error: false, msg: "" } });
      }, 3000);
      set({ loading: false });
    }
  },
  remove: async (id) => {
    set({ loading: true });
    try {
      const { data } = await apiPublic.put(`/vaccination/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
        },
      });

      const extractedMsg =
        data["message"] || "Vacunación actualizada exitosamente";

      set((state) => ({
        list: state.list.filter((item) => item.id !== id),
        alertState: { error: false, msg: extractedMsg },
      }));
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      setTimeout(() => {
        set({ alertState: { error: false, msg: "" } });
      }, 3000);
      set({ loading: false });
    }
  },
  updateField: (field, value) => {
    set((state) => ({
      data: { ...state.data, [field]: value },
    }));
  },
  clearData: () => {
    set({ data: { ...initialVaccination } });
  },
  setData: (data) => {
    set({ data });
  },
  setList: (list) => {
    set({ list });
  },
  setLoading: (loading) => {
    set({ loading });
  },
  setAlertState: (alertState) => {
    set({ alertState });
  },
  setPagination: (pagination) => {
    set({ pagination });
  },
}));

export default useVaccinationStore;
