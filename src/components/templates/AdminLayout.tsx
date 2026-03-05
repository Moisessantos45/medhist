import useAuthStore from "@/store/auth";
import { Outlet, Navigate, useLocation } from "react-router";
import HeaderFeature from "@/features/layout/components/HeaderFeature";
import Footer from "../organisms/Footer";
import { useEffect } from "react";

const AdminLayout = () => {
  const { authenticated, loading, getSession } = useAuthStore();
  const { pathname } = useLocation();

  useEffect(() => {
    getSession();
  }, [getSession]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);


  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div>Validando sesión...</div>
      </div>
    );

  if (!authenticated) return <Navigate to="/" replace />;

  return (
    <>
      <HeaderFeature />

      <main className="w-full mt-5 md:mt-0 mx-auto md:min-h-screen p-4">
        {" "}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default AdminLayout;
