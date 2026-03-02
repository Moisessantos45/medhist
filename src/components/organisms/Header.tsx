import { Link } from "react-router";

type HeaderProps = {
  onLogout: () => void;
  baseUrl: string;
};

const Header = ({ onLogout, baseUrl }: HeaderProps) => {
  return (
    <>
      <header className="flex flex-col md:flex-row md:justify-between bg-white border-b border-gray-100 shadow-sm py-5 px-4 sticky top-0 z-50">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold md:text-4xl text-3xl text-indigo-900 tracking-tight">
            <span className="text-indigo-600 font-bold text-3xl">Med</span>
            <span className="text-indigo-900 font-black text-3xl">Hist</span>
          </h1>
          <h1 className="text-gray-600 font-semibold text-sm mt-1">
            Administrador de citas y {""}
            <span className="text-indigo-600 font-black">pacientes</span>
          </h1>
        </div>
        <nav className="flex items-center justify-end gap-2 mt-2 lg:mt-0">
          <Link
            className="text-gray-600 font-semibold text-sm px-4 py-2 rounded-lg transition-colors hover:text-indigo-600 hover:bg-indigo-50"
            to={`${baseUrl}/patients`}
          >
            Pacientes
          </Link>
          <Link
            className="text-gray-600 font-semibold text-sm px-4 py-2 rounded-lg transition-colors hover:text-indigo-600 hover:bg-indigo-50"
            to={`${baseUrl}/profile`}
          >
            Perfil
          </Link>
          <button
            type="button"
            className="text-red-500 font-semibold text-sm px-4 py-2 rounded-lg transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer ml-2"
            onClick={onLogout}
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
