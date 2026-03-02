import { create } from "zustand";
import { encryptData } from "@/helpers/crypto";

interface UrlState {
  urlToken: string | null;
  getUrl: () => string;
  generateToken: (userId: string) => Promise<void>;
  clearToken: () => void;
  setUrlToken: (token: string) => void;
}

const useUrlStore = create<UrlState>((set) => ({
  urlToken: localStorage.getItem("urlToken") || null,
  getUrl: (): string => {
    const token = useUrlStore.getState().urlToken;
    return `/admin${token ? `/${token}` : ""}`;
  },
  generateToken: async (userId: string) => {
    try {
      const result = await encryptData(userId);
      const safeToken = encodeURIComponent(result.data);

      localStorage.setItem("urlToken", safeToken);
      set({ urlToken: safeToken });
    } catch (error) {
      console.error("Error generando urlToken:", error);
    }
  },

  clearToken: () => {
    localStorage.removeItem("urlToken");
    set({ urlToken: null });
  },

  setUrlToken: (token: string) => {
    localStorage.setItem("urlToken", token);
    set({ urlToken: token });
  },
}));

export default useUrlStore;
