import "./App.css";
import { createBrowserRouter } from "react-router";
import AuthLayout from "./components/templates/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import AdminLayout from "./components/templates/AdminLayout";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/admin/Profile";
import ResetPassword from "./pages/admin/ResetPassword";
import Patients from "./pages/admin/Patients";
import MedicalRecord from "./pages/admin/MedicalRecord";
import Appointment from "./pages/admin/Appointment";
import Vaccination from "./pages/admin/Vaccination";


const App = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
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
    element: <AdminLayout />,
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
        path:"patient/medical-record/:id",
        element:<MedicalRecord/>
      },
      {
        path:"patient/appointment/:id",
        element:<Appointment/>
      },
      {
        path:"patient/vaccination/:id",
        element:<Vaccination/>
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
    path:"*",
    element:<h1>Pagina no existe</h1>
  }
]);

export default App;
