import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="mx-auto max-w-3xl bg-white rounded-xl drop-shadow-lg flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Task Manager
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Organize your tasks efficiently with our intuitive drag-and-drop
          system.
        </p>

        {!user ? (
          <Link
            to="/login"
            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition"
          >
            Get Started
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </>
  );
};
