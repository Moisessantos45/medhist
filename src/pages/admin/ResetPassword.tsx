import { useState, type SubmitEvent } from "react";
import Alert from "@/components/molecules/Alert";
import useAuthStore from "@/store/auth";
import ReturnLink from "@/components/atoms/ReturnLink";
import useUrlStore from "@/store/url";
import Input from "@/components/atoms/Input";
import SettingsNav from "@/components/molecules/SettingsNav";

const ResetPassword = () => {
  const { getUrl } = useUrlStore();
  const { alertState, setAlertState, updatePassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "" || newPassword === "") {
      setAlertState({
        msg: "Campos vacios",
        error: true,
      });
      return;
    }

    if (newPassword.length < 6) {
      setAlertState({
        msg: "Password muy corto minimo 7 caracteres",
        error: true,
      });
      return;
    }

    await updatePassword(password, newPassword);
  };

  const { msg } = alertState;
  return (
    <section className="flex flex-col gap-2">
      <nav>
        <ReturnLink to={`${getUrl()}`} title="Volver al panel" />
      </nav>

      <SettingsNav />

      <h1 className="font-black text-2xl text-slate-800 text-center">
        Seguridad de la cuenta
      </h1>
      <p className="text-sm text-center text-slate-500 mt-2 max-w-sm mx-auto">
        Actualiza tu {""}
        <span className="text-indigo-600 font-bold">contraseña aquí</span>
      </p>

      <div className="flex justify-center mt-6">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-sm shadow-slate-200/50 border border-slate-200 rounded-xl p-8">
          {msg && (
            <div className="mb-6">
              <Alert {...alertState} />
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <Input
              label="Password Actual"
              id="password"
              type="password"
              required={true}
              placeholder="Escribe tu Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Tu Nuevo Password"
              id="nuevopassword"
              type="password"
              required={true}
              placeholder="Escribe tu nuevo Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3 bg-indigo-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-sm transition-colors hover:bg-slate-800 cursor-pointer"
              >
                Actualizar Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
