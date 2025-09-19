import { createBrowserRouter } from "react-router-dom";

import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import LoginForm from "../components/LoginForm";
import { Index } from "../components/Index";
import  Profile  from "../components/Profile";
import  StudentEditForm  from "../components/Edit";
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
]);

export default router;
