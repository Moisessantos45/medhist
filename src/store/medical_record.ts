import { create } from "zustand";
import type { AlertProps } from "@/components/molecules/Alert";
import { initialMedicalRecord, type MedicalRecord } from "@/entities/patient";
import ErrorHandler from "@/services/errorHandler";
import { apiPublic } from "@/services/api";
import useVeterinarianStore from "./veterinarian";
import useAuthStore from "./auth";
import {
  medicalRecordMapper,
  medicalRecordToJson,
} from "@/helpers/mappers/medicalRecordMapper";
import type { Pagination } from "@/entities/pagination";
import { initialPagination } from "@/entities/pagination";
import { mapPagination } from "@/helpers/mappers/pagination";

interface MedicalRecordState {
  data: Partial<MedicalRecord>;
  list: MedicalRecord[];
  loading: boolean;
  alertState: AlertProps;
  pagination: Pagination;
  changePage: (id: number, page: number) => void;
  getAll: (id: number, page?: number) => Promise<void>;
  register: (data: Partial<MedicalRecord>) => Promise<void>;
  updateProfile: (id: number, data: Partial<MedicalRecord>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateField: (field: keyof Partial<MedicalRecord>, value: string) => void;
  clearData: () => void;

  setData: (data: MedicalRecord) => void;
  setList: (data: MedicalRecord[]) => void;
  setLoading: (loading: boolean) => void;
  setAlertState: (state: AlertProps) => void;
  setPagination: (pagination: Pagination) => void;
}

const useMedicalRecordStore = create<MedicalRecordState>((set, get) => ({
  data: { ...initialMedicalRecord },
  list: [],
  loading: false,
  alertState: { error: false, msg: "" },
  pagination: { ...initialPagination },

  changePage: (id, page) => {
    get().setPagination({ ...get().pagination, page });
    get().getAll(id, page);
  },
  getAll: async (id: number, page: number = 1) => {
    set({ loading: true });
    try {
      const veterinarianId = useVeterinarianStore.getState().data.id;
      if (!veterinarianId) {
        throw new Error("Veterinario no autenticado");
      }

      const { data } = await apiPublic.get(
        `/medical-records/patient/${id}/veterinarian/${veterinarianId}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );
      const medicalRecords = (data["data"] || []).map(medicalRecordMapper);
      const paginationInfo = mapPagination(
        data["paginate"] || initialPagination,
      );

      set({
        list: medicalRecords,
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
  register: async (medical) => {
    try {
      const veterinarianId = useVeterinarianStore.getState().data.id;
      if (!veterinarianId) {
        throw new Error("Veterinario no autenticado");
      }

      const { data } = await apiPublic.post(
        "/medical-records",
        {
          ...medicalRecordToJson({
            ...medical,
            veterinarian_id: veterinarianId,
          }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] || null;
      if (!extractedData) {
        throw new Error("Respuesta inválida del servidor");
      }

      const newMedicalRecord = medicalRecordMapper(extractedData);
      set((state) => ({
        data: { ...initialMedicalRecord },
        list: [...state.list, newMedicalRecord],
        alertState: { error: false, msg: "Historial médico registrado" },
      }));
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      setTimeout(() => {
        set({ alertState: { error: false, msg: "" } });
      }, 3000);
    }
  },
  updateProfile: async (id, medical_record) => {
    set({ loading: true });
    try {
      const { data } = await apiPublic.put(
        `/medical-records/${id}`,
        medicalRecordToJson(medical_record),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] || null;
      const extractedMsg = data["message"] || "Historial médico actualizado";
      if (!extractedData) {
        throw new Error("Respuesta inválida del servidor");
      }

      const updatedMedicalRecord = medicalRecordMapper(extractedData);

      set((state) => ({
        list: state.list.map((record) =>
          record.id === id ? updatedMedicalRecord : record,
        ),
        alertState: { error: false, msg: extractedMsg },
        data: { ...initialMedicalRecord },
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
      const { data } = await apiPublic.delete(`/medical-records/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
        },
      });

      const extractedMsg = data["message"] || "Historial médico eliminado";

      set((state) => ({
        list: state.list.filter((record) => record.id !== id),
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
    set({ data: { ...initialMedicalRecord } });
  },

  setData: (data) => set({ data }),
  setList: (list) => set({ list }),
  setLoading: (loading) => set({ loading }),
  setAlertState: (alertState) => set({ alertState }),
  setPagination: (pagination) => set({ pagination }),
}));

export default useMedicalRecordStore;
