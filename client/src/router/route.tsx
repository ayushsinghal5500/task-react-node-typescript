import { createBrowserRouter } from "react-router-dom";

import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import LoginForm from "../components/LoginForm";
import { Index } from "../components/Index";
import  Profile  from "../components/Profile";
import  StudentEditForm  from "../components/Edit";
import ErrorPage from "./error";
import ForgetPassword from "../components/forget";
import ResetPassword from "../components/resetPassword";
import ChangePassword from "../components/changePassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <StudentForm />,
  },
  {
    path: "/students",
    element: <StudentList />,
  },
  {
    path: "/student/Edit/:id",
    element: <StudentEditForm />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

export default router;
