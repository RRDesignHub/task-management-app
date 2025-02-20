import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="max-sm:w-11/12 max-w-3xl mx-auto bg-white max-h-[70vh] py-20 flex flex-col justify-center items-center text-center">
        {user && <h2 className="text-2xl font-bold text-textDark">Hey, {user?.displayName}</h2>}
        <h1 className="text-3xl md:text-5xl font-bold text-primary">
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
