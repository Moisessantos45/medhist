import { Link, useParams } from "react-router";
import Alert from "@/components/molecules/Alert";
import { apiAuth } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import ErrorHandler from "@/services/errorHandler";

const ConfirmAccount = () => {
  const { token } = useParams<{ token: string }>();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["confirm-account", token],
    queryFn: async () => {
      const { data } = await apiAuth.get("/auth/confirm-account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

  if (isLoading) return <div>Cargando confirmación...</div>;
  if (isError) {
    const msg = ErrorHandler(error).msg || "Token inválido (401)";
    return (
      <div className="bg-white shadow-sm shadow-slate-200/50 border border-slate-200 mt-20 px-8 py-10 rounded-xl max-w-sm mx-auto flex flex-col items-center text-center">
        <Alert msg={msg} error={true} />
        <Link className="block mt-8 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors" to="/register">
          Registrar nueva cuenta
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-slate-800 font-black md:text-4xl text-3xl mb-2">
          Confirma tu cuenta
        </h1>
        <p className="text-sm text-slate-500 max-w-xs mx-auto mb-8">
          Termina el proceso vaciando para administrar a tus <span className="text-indigo-600 font-bold">pacientes</span>.
        </p>
      </div>
      
      <div className="bg-white shadow-sm shadow-slate-200/50 border border-slate-200 mt-10 md:mt-5 px-8 py-10 rounded-xl max-w-sm mx-auto flex flex-col items-center text-center">
        <Alert msg={data.msg} error={false} />
        <Link className="block mt-8 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors" to="/">
          Inicia sesión
        </Link>
      </div>
    </>
  );
};

export default ConfirmAccount;
