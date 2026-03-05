import { create } from "zustand";
import { initialPatient, type Patient } from "@/entities/patient";
import { apiPublic } from "@/services/api";
import useAuthStore from "./auth";
import { patientMapper, patientToJson } from "@/helpers/mappers/patientMapper";
import type { AlertProps } from "@/components/molecules/Alert";
import ErrorHandler from "@/services/errorHandler";
import useVeterinarianStore from "./veterinarian";
import { initialPagination, type Pagination } from "@/entities/pagination";
import { mapPagination } from "@/helpers/mappers/pagination";

interface PatientState {
  data: Partial<Patient>;
  list: Patient[];
  loading: boolean;
  alertState: AlertProps;
  pagination: Pagination;
  showForm: boolean;
  changePage: (page: number) => void;
  get: (id: string) => Promise<void>;
  getAll: (page?: number) => Promise<void>;
  register: (data: Partial<Patient>) => Promise<void>;
  updateProfile: (id: number, data: Partial<Patient>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateField: (field: keyof Partial<Patient>, value: string) => void;
  clearData: () => void;
  closeForm: () => void;

  setData: (data: Patient) => void;
  setList: (data: Patient[]) => void;
  setLoading: (loading: boolean) => void;
  setAlertState: (state: AlertProps) => void;
  setPagination: (pagination: Pagination) => void;
  setShowForm: (show: boolean) => void;
}

const usePatientStore = create<PatientState>((set, get) => ({
  data: { ...initialPatient },
  list: [],
  loading: false,
  alertState: { error: false, msg: "" },
  pagination: { ...initialPagination },
  showForm: false,
  changePage: (page) => {
    get().setPagination({ ...get().pagination, page });
    get().getAll(page);
  },
  get: async (_) => {
    set({ data: { ...initialPatient }, alertState: { error: false, msg: "" } });
  },
  getAll: async (page: number = 1) => {
    set({ loading: true });
    try {
      const { data } = await apiPublic.get(
        `/patient/veterinarian?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const patients = (data["data"] || []).map(patientMapper);
      const paginationInfo = mapPagination(
        data["paginate"] || initialPagination,
      );

      set({
        list: patients,
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
  register: async (patient) => {
    try {
      const veterinarianId = useVeterinarianStore.getState().data.id;
      if (!veterinarianId) {
        throw new Error("No se pudo obtener el ID del veterinario");
      }

      const { data } = await apiPublic.post(
        "/patient",
        {
          ...patientToJson({
            ...patient,
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

      const extractData = data["data"] || null;

      if (!extractData) throw new Error("No se pudo registrar el paciente");

      const transformedData = patientMapper(extractData);
      set({
        list: [...get().list, transformedData],
        data: { ...initialPatient },
        alertState: { error: false, msg: "¡Paciente registrado!" },
      });
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      setTimeout(() => {
        set({ alertState: { error: false, msg: "" } });
      }, 3000);
    }
  },
  updateProfile: async (id, patient) => {
    try {
      const { data } = await apiPublic.put(
        `/patient/${id}`,
        { ...patientToJson(patient) },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] ?? null;
      console.log("Response data:", data);
      if (!extractedData) throw new Error("No se pudo actualizar el paciente");

      const transformedData = patientMapper(extractedData);
      set((state) => ({
        list: state.list.map((p) => (p.id === id ? transformedData : p)),
        data: { ...initialPatient },
        alertState: { error: false, msg: "¡Paciente actualizado!" },
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
  remove: async (id: number) => {
    try {
      await apiPublic.patch(
        `/patient/${id}/status`,
        {
          status: "inactive",
        },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      set((state) => ({
        list: state.list.filter((patient) => patient.id !== id),
        alertState: { error: false, msg: "¡Paciente eliminado!" },
      }));
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    }
  },
  updateField: (field, value) => {
    set((state) => ({
      data: { ...state.data, [field]: value },
    }));
  },
  clearData: () => set({ data: { ...initialPatient } }),
  closeForm() {
    get().clearData();
    set({ showForm: false });
  },
  setData: (data) => set({ data }),
  setList: (list) => set({ list }),
  setLoading: (loading) => set({ loading }),
  setAlertState: (alertState) => set({ alertState }),
  setPagination: (pagination) => set({ pagination }),
  setShowForm: (show) => set({ showForm: show }),
}));

export default usePatientStore;
