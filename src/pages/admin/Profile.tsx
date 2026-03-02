import type { SubmitEvent } from "react";
import Alert from "@/components/molecules/Alert";
import useVeterinarianStore from "@/store/veterinarian";
import useUrlStore from "@/store/url";
import ReturnLink from "@/components/atoms/ReturnLink";
import Input from "@/components/atoms/Input";
import SettingsNav from "@/components/molecules/SettingsNav";

const Profile = () => {
  const { getUrl } = useUrlStore();
  const { data, alertState, updateField, setAlertState, updateProfile } =
    useVeterinarianStore();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, token, ...profileData } = data;

    if (Object.values(profileData).some((f) => f === "")) {
      setAlertState({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (!data?.id) {
      setAlertState({ msg: "ID de veterinario no encontrado", error: true });
      return;
    }

    await updateProfile(data.id, data);
  };

  const { msg } = alertState;
  return (
    <section className="flex flex-col gap-2 p-4">
      <nav>
        <ReturnLink to={`${getUrl()}`} title="Volver al panel" />
      </nav>

      <SettingsNav />

      <h1 className="font-black text-2xl text-slate-800 text-center">Editar Perfil</h1>
      <p className="text-sm text-center text-slate-500 mt-2 max-w-sm mx-auto">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">información personal</span>
      </p>

      <div className="flex justify-center mt-6">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-sm shadow-slate-200/50 border border-slate-200 rounded-xl p-8">
          {msg && (
            <div className="mb-6">
              <Alert {...alertState} />
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              <Input
                label="Nombre"
                id="nombre"
                type="text"
                required={true}
                placeholder="Tu nombre completo"
                value={data.name || ""}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <Input
                label="Sitio web"
                id="web"
                type="text"
                placeholder="https://tusitio.com"
                value={data.website || ""}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              <Input
                label="Teléfono"
                id="telefono"
                type="tel"
                placeholder="10 dígitos"
                value={data.phone || ""}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <Input
                label="Email"
                id="email"
                type="email"
                required={true}
                placeholder="ejemplo@correo.com"
                value={data.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3 bg-indigo-600 text-white font-bold uppercase text-xs tracking-wider rounded-lg shadow-sm transition-colors hover:bg-slate-800 cursor-pointer"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
