import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 gap-5 mt-5 md:mt-0 p-4 items-center md:min-h-screen">
        <Outlet />
      </main>
    </>
  );
};
export default AuthLayout;
