import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Authentication/Login";
import MainLayout from "../Layout/MainLayout";
import { Home } from "../Pages/Home";
import Registration from "../Pages/Authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      
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
