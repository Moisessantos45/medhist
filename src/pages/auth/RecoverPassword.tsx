import { useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Alert from "@/components/molecules/Alert";
import useAuthStore from "@/store/auth";
import Input from "@/components/atoms/Input";

const RecoverPassword = () => {
  const { alertState, setAlertState, resetPassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "" || token === "") {
      setAlertState({
        msg: "Campos vacios",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlertState({
        msg: "Password muy corto minimo 7 caracteres",
        error: true,
      });
      return;
    }

    if (!token) {
      setAlertState({
        msg: "Token no válido",
        error: true,
      });
      return;
    }

    await resetPassword(password, token);
    if (!alertState.error) {
      navigate("/");
    }
  };

  const { msg } = alertState;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-slate-800 font-black md:text-4xl text-3xl mb-2">
          Restablece tu password
        </h1>
        <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
          Crea una nueva contraseña y recupera tu{" "}
          <span className="text-indigo-600 font-bold">acceso</span>
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
            label="Tu Nuevo Password"
            id="password"
            type="password"
            required={true}
            placeholder="Tu nuevo password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-sm transition-colors hover:bg-slate-800 mt-4 cursor-pointer"
          >
            Actualizar password
          </button>
        </form>

        <nav className="mt-8 flex flex-col items-center gap-3">
          <Link
            className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider"
            to="/register"
          >
            ¿No tienes cuenta?
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider"
            to="/"
          >
            Inicia sesión aquí
          </Link>
        </nav>
      </div>
    </>
  );
};

export default RecoverPassword;
