import { create } from "zustand";
import useVeterinarianStore from "./veterinarian";
import useUrlStore from "./url";
import ErrorHandler from "@/services/errorHandler";
import { apiAuth, apiPublic } from "@/services/api";
import type { AlertProps } from "@/components/molecules/Alert";
import veterinarianMapper from "@/helpers/mappers/veterinarianMapper";

interface AuthState {
  loading: boolean;
  authenticated: boolean;
  alertState: AlertProps;
  getSession: () => Promise<void>;
  getToken: () => string | null;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setAlertState: (alertState: AlertProps) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  loading: true,
  authenticated: false,
  alertState: { error: false, msg: "" },
  getSession: async () => {
    const token = get().getToken();
    if (!token) {
      set({ authenticated: false, loading: false });
      return;
    }

    await useVeterinarianStore.getState().get();
  },
  getToken: () => {
    return localStorage.getItem("authToken");
  },
  register: async (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => {
    set({ loading: true });
    try {
      await apiAuth.post("/veterinarian/register", {
        name,
        email,
        password,
        phone,
      });

      set({
        alertState: {
          error: false,
          msg: "Registro exitoso, por favor inicia sesión",
        },
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
  login: async (email: string, password: string) => {
    set({ loading: true });
    if ([email, password].some((field) => field.trim() === "")) {
      set({
        loading: false,
        alertState: { error: true, msg: "Todos los campos son obligatorios" },
      });
      return;
    }

    try {
      const { data } = await apiAuth.post("/auth/login", {
        email,
        password,
      });

      const extractedData = data["data"] || null;
      if (!extractedData) {
        throw new Error("Respuesta inesperada del servidor");
      }

      const transformedData = veterinarianMapper(extractedData);

      localStorage.setItem("authToken", transformedData.token);

      await useUrlStore.getState().generateToken(transformedData.id.toString());

      set({ authenticated: true, alertState: { error: false, msg: "" } });
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token");

      await apiAuth.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("authToken");
      useUrlStore.getState().clearToken();

      set({
        authenticated: false,
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
  forgotPassword: async (email: string) => {
    set({ loading: true });
    try {
      const { data } = await apiAuth.post("/auth/forgot-password", { email });

      const extractedData =
        data["message"] ||
        "Se ha enviado un enlace de recuperación a tu correo";

      set({
        alertState: {
          error: false,
          msg: extractedData,
        },
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
  resetPassword: async (password: string, token: string) => {
    set({ loading: true });
    try {
      const { data } = await apiAuth.post(
        "/auth/reset-password",
        { new_password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const extractedData =
        data["message"] || "Contraseña restablecida correctamente";

      set({
        alertState: {
          error: false,
          msg: extractedData,
        },
      });
    } catch (error) {
      const { msg } = ErrorHandler(error);
      set({ alertState: { error: true, msg } });
    } finally {
      set({ loading: false });
    }
  },
  updatePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const { data } = await apiPublic.post(
        "/auth/change-password",
        { current_password: currentPassword, new_password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().getToken()}`,
          },
        },
      );

      set({
        alertState: {
          msg: data["message"] || "Contraseña actualizada correctamente",
          error: false,
        },
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
  setLoading: (loading: boolean) => set({ loading }),
  setAuthenticated: (authenticated: boolean) => set({ authenticated }),
  setAlertState: (alertState: AlertProps) => set({ alertState }),
}));

export default useAuthStore;
