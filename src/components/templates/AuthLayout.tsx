import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 gap-5 mt-5 md:mt-0 p-4 items-center md:min-h-screen">
        <Outlet />
      </main>
    </>
  );
};
export default AuthLayout;
