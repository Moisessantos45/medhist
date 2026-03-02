import { isAxiosError } from "axios";

const ErrorHandler = (error: unknown): { msg: string } => {
  if (isAxiosError(error)) {
    console.error("Axios Error:", error);

    const serverMessage = error.response?.data?.message;

    if (serverMessage) return { msg: serverMessage };

    if (error.response?.status === 400) {
      return { msg: "Datos inválidos. Verifica los campos." };
    }

    if (error.response?.status === 401) {
      return { msg: "No autorizado. Verifica tu sesión." };
    }

    return { msg: error.message || "Error del servidor" };
  }

  return { msg: error instanceof Error ? error.message : "Error desconocido" };
};

export default ErrorHandler;
