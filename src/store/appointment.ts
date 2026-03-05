import { create } from "zustand";
import type { AlertProps } from "@/components/molecules/Alert";
import { initialAppointment, type Appointment } from "@/entities/appointment";
import ErrorHandler from "@/services/errorHandler";
import { apiPublic } from "@/services/api";
import {
  appointmentMapper,
  appointmentToJson,
} from "@/helpers/mappers/appointmentMapper";
import useAuthStore from "./auth";
import useVeterinarianStore from "./veterinarian";
import { initialPagination, type Pagination } from "@/entities/pagination";
import { mapPagination } from "@/helpers/mappers/pagination";

interface AppointmentState {
  data: Partial<Appointment>;
  list: Appointment[];
  loading: boolean;
  alertState: AlertProps;
  pagination: Pagination;
  showForm: boolean;
  changePage: (id: number, page: number) => void;
  getAll: (id: number, page?: number) => Promise<void>;
  register: (data: Partial<Appointment>) => Promise<void>;
  updateProfile: (id: number, data: Partial<Appointment>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateField: (field: keyof Partial<Appointment>, value: string) => void;
  clearData: () => void;
  closeForm: () => void;

  setData: (data: Appointment) => void;
  setList: (data: Appointment[]) => void;
  setLoading: (loading: boolean) => void;
  setAlertState: (state: AlertProps) => void;
  setPagination: (pagination: Pagination) => void;
  setShowForm: (show: boolean) => void;
}

const useAppointmentStore = create<AppointmentState>((set, get) => ({
  data: { ...initialAppointment },
  list: [],
  loading: false,
  alertState: { error: false, msg: "" },
  pagination: { ...initialPagination },
  showForm: false,
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
        `/appointment/patient/${id}/veterinarian/${veterinarianId}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const medicalRecords = (data["data"] || []).map(appointmentMapper);
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
  register: async (appointment) => {
    set({ loading: true });
    try {
      const veterinarianId = useVeterinarianStore.getState().data.id;
      if (!veterinarianId) {
        throw new Error("Veterinario no autenticado");
      }

      const { data } = await apiPublic.post(
        "/appointment",
        {
          ...appointmentToJson({
            ...appointment,
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
      const extractedMsg = data["message"] || "Cita registrada exitosamente";

      if (!extractedData) throw new Error("No se pudo registrar la cita");

      set((state) => ({
        data: { ...initialAppointment },
        list: [...state.list, appointmentMapper(extractedData)],
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
  updateProfile: async (id, appointment) => {
    set({ loading: true });
    try {
      const { data } = await apiPublic.put(
        `/appointment/${id}`,
        {
          ...appointmentToJson(appointment),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      const extractedData = data["data"] || null;
      const extractedMsg = data["message"] || "Cita actualizada exitosamente";

      if (!extractedData) throw new Error("No se pudo actualizar la cita");

      set((state) => ({
        data: { ...initialAppointment },
        list: state.list.map((item) =>
          item.id === id ? appointmentMapper(extractedData) : item,
        ),
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
      const { data } = await apiPublic.delete(`/appointment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
        },
      });

      const extractedMsg = data["message"] || "Cita eliminada exitosamente";

      set({
        alertState: { error: false, msg: extractedMsg },
        list: get().list.filter((item) => item.id !== id),
      });
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
    set({ data: { ...initialAppointment } });
  },
  closeForm: () => {
    set({ showForm: false, data: { ...initialAppointment } });
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
  setShowForm: (show) => {
    set({ showForm: show });
  },
}));

export default useAppointmentStore;
