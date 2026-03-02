import useAuthStore from "@/store/auth";
import useUrlStore from "@/store/url";
import Header from "@/components/organisms/Header";

const HeaderFeature = () => {
  const { logout } = useAuthStore();
  const { getUrl } = useUrlStore();

  return <Header onLogout={logout} baseUrl={getUrl()} />;
};

export default HeaderFeature;
