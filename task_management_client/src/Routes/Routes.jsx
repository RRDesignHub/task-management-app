import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Authentication/Login";
import MainLayout from "../Layout/MainLayout";
import { Home } from "../Pages/Home";
import Registration from "../Pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import TaskDetails from "../Pages/TaskDetails";
import UserProfile from "../Pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: "/",
        element: <Home></Home>,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: "task/:id",
        element: <PrivateRoute><TaskDetails /></PrivateRoute>
      },
      {
        path: "profile",
        element: <PrivateRoute><UserProfile /></PrivateRoute>
      }
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  // {
  //   path: "/reset-password",
  //   element: <ResetPassword></ResetPassword>,
  // },
  
]);

export default router;
