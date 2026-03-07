import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import AuthLayout from "./components/templates/AuthLayout";
import AdminLayout from "./components/templates/AdminLayout";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const RecoverPassword = lazy(() => import("./pages/auth/RecoverPassword"));
const ConfirmAccount = lazy(() => import("./pages/auth/ConfirmAccount"));

const Admin = lazy(() => import("./pages/admin/Admin"));
const Profile = lazy(() => import("./pages/admin/Profile"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const Patients = lazy(() => import("./pages/admin/Patients"));
const MedicalRecord = lazy(() => import("./pages/admin/MedicalRecord"));
const Appointment = lazy(() => import("./pages/admin/Appointment"));
const Vaccination = lazy(() => import("./pages/admin/Vaccination"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password/:token",
        element: <RecoverPassword />,
      },
      {
        path: "confirm/:token",
        element: <ConfirmAccount />,
      },
    ],
  },
  {
    path: "/admin/:urlToken",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "patient/medical-record/:id",
        element: <MedicalRecord />,
      },
      {
        path: "patient/appointment/:id",
        element: <Appointment />,
      },
      {
        path: "patient/vaccination/:id",
        element: <Vaccination />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Pagina no existe</h1>,
  },
]);

export default App;
