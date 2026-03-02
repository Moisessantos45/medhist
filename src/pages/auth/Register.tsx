import { useReducer, useState, type SubmitEvent } from "react";
import type { AlertProps } from "@/components/molecules/Alert";
import Alert from "@/components/molecules/Alert";
import { Link } from "react-router";
import { apiAuth } from "@/services/api";
import ErrorHandler from "@/services/errorHandler";
import Input from "@/components/atoms/Input";

type FormState = {
  userName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [form, dispatch] = useReducer(
    (state: FormState, action: Partial<FormState>) => ({ ...state, ...action }),
    { userName: "", email: "", phone: "", password: "", confirmPassword: "" }
  );
  const { userName, email, phone, password, confirmPassword } = form;
  const [alertState, setAlertState] = useState<AlertProps>({
    error: false,
    msg: "",
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [userName, email, phone, password, confirmPassword].some(
        (field) => field.trim() === "",
      )
    ) {
      setAlertState({ msg: "hay campos vacios", error: true });
      return;
    }

    if (password !== confirmPassword) {
      setAlertState({
        msg: "los password no son iguales",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlertState({ msg: "el password es muy corto", error: true });
      return;
    }

    setAlertState({ msg: "", error: false });
    try {
      await apiAuth.post("/veterinarian/register", {
        name: userName,
        email,
        phone,
        password,
      });

      setAlertState({
        msg: "verifica tu correo confirma tu cuenta",
        error: false,
      });
    } catch (error) {
      const { msg } = ErrorHandler(error);
      setAlertState({ msg, error: true });
    }
  };

  const { msg } = alertState;
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl mb-1">
          <span className="text-indigo-600 font-bold">Med</span>
          <span className="text-slate-800 font-black">Hist</span>
        </h1>

        <h1 className="text-2xl font-bold mb-3">
          Crea una cuenta
        </h1>
        <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
          Regístrate para administrar a tus <span className="text-indigo-600 font-bold">pacientes</span>
        </p>
      </div>

      <div className="bg-white shadow-sm shadow-slate-200/50 border border-slate-200 mt-3 md:mt-0 px-8 py-10 rounded-xl w-full max-w-lg mx-auto">
        {msg && <div className="mb-6"><Alert {...alertState} /></div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Nombre"
            id="userName"
            type="text"
            inputMode="text"
            required={true}
            placeholder="Tu nombre completo"
            value={userName}
            onChange={(e) => dispatch({ userName: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Input
              label="Email"
              id="email"
              type="email"
              inputMode="email"
              required={true}
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => dispatch({ email: e.target.value })}
            />
            <Input
              label="Teléfono"
              id="phone"
              type="tel"
              inputMode="tel"
              required={true}
              placeholder="10 dígitos mínimo"
              value={phone}
              onChange={(e) => dispatch({ phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Input
              label="Password"
              id="password"
              type="password"
              inputMode="text"
              required={true}
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => dispatch({ password: e.target.value })}
            />
            <Input
              label="Repite tu Password"
              id="confirmPassword"
              type="password"
              inputMode="text"
              required={true}
              placeholder="Confirma la contraseña"
              value={confirmPassword}
              onChange={(e) => dispatch({ confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-sm transition-colors hover:bg-slate-800 mt-4 cursor-pointer"
          >
            Crear cuenta
          </button>
        </form>

        <nav className="mt-8 flex flex-col items-center gap-3">
          <Link className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider" to="/">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <Link
            className="text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold uppercase tracking-wider"
            to="/forgot-password"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
