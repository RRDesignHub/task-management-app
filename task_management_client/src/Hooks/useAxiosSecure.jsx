import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://task-management-server-kappa-black.vercel.app",
});
export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // add auth token for secure data fatching by requesting axios interseptor:
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.auth = `Bearer ${token}`;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // interseptor stop user for 401 and 403 status and logout and navigate to login:
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};
