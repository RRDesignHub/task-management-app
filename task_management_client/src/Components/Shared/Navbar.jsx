import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth(); // User authentication state
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
              isActive
                ? "bg-[#f3fff9] text-textDark font-semibold border-b-4 border-primary active:bg-background focus:bg-blue-50 active:text-textDark focus:text-textDark" // Active state style with a border
                : "text-textDark"
            } hover:bg-blue-100 hover:text-textDark`
          }
        >
          Home
        </NavLink>
      </li>
      
      {user && <>
        <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
              isActive
                ? "bg-[#f3fff9] text-textDark font-semibold border-b-4 border-primary active:bg-background focus:bg-blue-50 active:text-textDark focus:text-textDark" // Active state style with a border
                : "text-textDark"
            } hover:bg-blue-100 hover:text-textDark`
          }
        >
          Dashboard
        </NavLink>
      </li>
        <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
              isActive
                ? "bg-[#f3fff9] text-textDark font-semibold border-b-4 border-primary active:bg-background focus:bg-blue-50 active:text-textDark focus:text-textDark" // Active state style with a border
                : "text-textDark"
            } hover:bg-blue-100 hover:text-textDark`
          }
        >
          Profile
        </NavLink>
      </li>
        <li>
        <button
        onClick={() =>logOut()}
          className="btn"
        >
          Logout
        </button>
      </li>
      </>}

      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `px-2 lg:px-4 py-2 rounded-lg transition duration-300 ${
              isActive
                ? "bg-[#f3fff9] text-textDark font-semibold border-b-4 border-primary active:bg-background focus:bg-blue-50 active:text-textDark focus:text-textDark" // Active state style with a border
                : "text-textDark"
            } hover:bg-blue-100 hover:text-textDark`
          }
        >
          Login
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar w-11/12 mx-auto">
      <div className="flex-1">
        <a className="text-xl font-semibold text-textDark">Task Manager</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-x-2">{links}</ul>
      </div>
    </div>
  );
};

export default Navbar;
