import { Link, useLocation } from "react-router";
import useUrlStore from "@/store/url";

const SettingsNav = () => {
  const { getUrl } = useUrlStore();
  const location = useLocation();

  const isProfileActive = location.pathname.includes("/profile");
  const isPasswordActive = location.pathname.includes("/change-password");

  const activeClasses = "text-indigo-600 border-b-2 border-indigo-600 font-bold";
  const inactiveClasses = "text-gray-500 hover:text-indigo-600 font-semibold";

  return (
    <div className="border-b border-gray-200 mb-8 mt-6">
      <nav className="-mb-px flex gap-6 sm:gap-10 overflow-x-auto">
        <Link
          to={`${getUrl()}/profile`}
          className={`whitespace-nowrap pb-4 px-1 text-sm transition-colors ${
            isProfileActive ? activeClasses : inactiveClasses
          }`}
        >
          Mi Perfil
        </Link>
        <Link
          to={`${getUrl()}/change-password`}
          className={`whitespace-nowrap pb-4 px-1 text-sm transition-colors ${
            isPasswordActive ? activeClasses : inactiveClasses
          }`}
        >
          Seguridad (Password)
        </Link>
      </nav>
    </div>
  );
};

export default SettingsNav;
