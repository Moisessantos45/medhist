import { useEffect, useState, type SubmitEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Alert from "@/components/molecules/Alert";
import useAuthStore from "@/store/auth";
import useUrlStore from "@/store/url";
import Input from "@/components/atoms/Input";

const Login = () => {
  const { login, alertState, authenticated, getToken, setLoading } =
    useAuthStore();
  const { urlToken } = useUrlStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate(`/admin/${urlToken || "dashboard"}`);
    } else {
      setLoading(false);
    }
  }, [navigate, getToken, setLoading, urlToken]);

  const { msg } = alertState;

  if (authenticated)
    return <Navigate to={`/admin/${urlToken || "dashboard"}`} replace />;
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl mb-1">
          <span className="text-indigo-600 font-bold">Med</span>
          <span className="text-slate-800 font-black">Hist</span>
        </h1>
        <h1 className="text-2xl font-bold mb-3">Inicia sesión</h1>
        <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
          Ingresa a tu cuenta para administrar a tus{" "}
          <span className="text-indigo-600 font-bold">pacientes</span>
        </p>
      </div>

      <div className="bg-white shadow-sm shadow-slate-200/50 border border-slate-200 mt-5 md:mt-0 px-8 py-10 rounded-xl w-full max-w-sm mx-auto">
        {msg && (
          <div className="mb-6">
            <Alert {...alertState} />
          </div>
        )}
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-2">
          <Input
            label="Email"
            id="email"
            type="email"
            inputMode="email"
            required={true}
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            inputMode="text"
            required={true}
            placeholder="Ingresa tu password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-sm transition-colors hover:bg-slate-800 mt-4 cursor-pointer"
          >
            Iniciar Sesión
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
            to="/forgot-password"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
