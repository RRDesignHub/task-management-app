import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
const Navbar = () => {
  const { user, logOut } = useAuth(); // User authentication state
  const [isOpen, setIsOpen] = useState(false);
  const [openCloseMenu, setOpenCloseMenu] = useState(true);
  const handleOpenCloseMenu = (status) => {
    setOpenCloseMenu(!status);
  };
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

      {user && (
        <>
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
              onClick={() => logOut()}
              className="px-2 lg:px-4 py-2 rounded-lg transition duration-300 text-textDark"
            >
              Logout
            </button>
          </li>
        </>
      )}

      {!user && (
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
      )}
    </>
  );
  return (
    <>
      <div className={`h-[64px] w-full fixed bg-base-100`}>
        <div className="navbar w-11/12 mx-auto px-0 max-sm:px-4 h-[64px] relative">
          <div className="flex-1">
            <a className="text-xl font-semibold text-textDark">Task Manager</a>
          </div>
          <div className="flex-none">
            <ul className="max-sm:hidden menu menu-horizontal px-1 gap-x-2">
              {links}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => handleOpenCloseMenu(openCloseMenu)}
              className="text-white bg-primary py-2 px-4 rounded-lg text-2xl focus:outline-none"
            >
              {openCloseMenu ? <TiThMenu /> : <FaWindowClose />}
            </button>
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        <div
          className={`z-50 lg:hidden relative w-60 mx-auto transition-all duration-300 text-center ease-in-out ${
            openCloseMenu ? "-top-[1000px]" : "top-2"
          } bg-white shadow-md py-6 rounded-lg`}
        >
          <ul className="space-y-4 text-md font-semibold uppercase">{links}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
