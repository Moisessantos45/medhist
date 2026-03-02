import Alert from "@/components/molecules/Alert";
import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import Input from "@/components/atoms/Input";
import useAuthStore from "@/store/auth";

const ForgotPassword = () => {
  const { alertState, forgotPassword } = useAuthStore();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await forgotPassword(email);
  };

  const { msg } = alertState;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-slate-800 font-black md:text-4xl text-3xl mb-2">
          Recupera tu password
        </h1>
        <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
          Recibe instrucciones para no perder el acceso a tus{" "}
          <span className="text-indigo-600 font-bold">pacientes</span>
        </p>
      </div>

      <div className="bg-white shadow-sm shadow-slate-200/50 border border-slate-200 mt-5 md:mt-0 px-8 py-10 rounded-xl w-full max-w-sm mx-auto">
        {msg && (
          <div className="mb-6">
            <Alert {...alertState} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Email"
            id="email"
            type="email"
            inputMode="email"
            required={true}
            placeholder="Ingresa tu correo registrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-sm transition-colors hover:bg-slate-800 mt-4 cursor-pointer"
          >
            Enviar Instrucciones
          </button>
        </form>

        <nav className="mt-8 flex flex-col items-center gap-3">
          <Link
            className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider"
            to="/register"
          >
            Regístrate aquí
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider"
            to="/"
          >
            Inicia sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgotPassword;
