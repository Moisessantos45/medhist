import { isAxiosError } from "axios";

const ErrorHandler = (
  error: unknown,
): { msg: string; status: number | undefined; code?: string } => {
  if (isAxiosError(error)) {
    console.error("Axios Error:", error);

    const serverMessage = error.response?.data?.message;
    const serverCode = error.response?.data?.code;

    if (serverMessage)
      return {
        msg: serverMessage,
        status: error.response?.status,
        code: serverCode,
      };

    if (error.response?.status === 400) {
      return {
        msg: "Datos inválidos. Verifica los campos.",
        status: error.response?.status,
        code: serverCode,
      };
    }

    if (error.response?.status === 401) {
      return {
        msg: "No autorizado. Verifica tu sesión.",
        status: error.response?.status,
        code: serverCode,
      };
    }

    return {
      msg: error.message || "Error del servidor",
      status: error.response?.status,
      code: serverCode,
    };
  }

  return {
    msg: error instanceof Error ? error.message : "Error desconocido",
    status: 500,
    code: "UNKNOWN_ERROR",
  };
};

export default ErrorHandler;
