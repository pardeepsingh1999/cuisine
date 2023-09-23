import { useState, useEffect } from "react";
import { RiSunLine } from "react-icons/ri";
import { BsMoonStars } from "react-icons/bs";
import { PiUserCircle } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/images/logo.png";
import { routes } from "../routes";
import { DEFAULT_THEME } from "../config";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  // use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : DEFAULT_THEME
  );

  // update state on toggle
  const _handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme(DEFAULT_THEME);
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {routes.map((each) => (
              <li key={each.title}>
                <NavLink
                  to={each.link}
                  className={({ isActive }) =>
                    isActive ? "active p-2 my-1" : "p-2 my-1"
                  }
                >
                  {each.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </label>

        <h1 className="btn btn-ghost pointer-events-none normal-case text-xl p-0">
          Eating Desi
        </h1>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((each) => (
            <li key={each.title} className="mx-1">
              <NavLink
                to={each.link}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {each.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex-none mx-2">
          {/* Toggle button here */}
          <button className="btn btn-square btn-ghost">
            <label className="swap swap-rotate w-12 h-12">
              <input
                type="checkbox"
                onChange={_handleToggle}
                // show toggle image based on localstorage theme
                checked={theme === DEFAULT_THEME ? false : true}
              />
              {/* light theme sun image */}
              <RiSunLine className="w-8 h-8 swap-on" />
              {/* dark theme moon image */}
              <BsMoonStars className="w-8 h-8 swap-off" />
            </label>
          </button>
        </div>

        {isAuth ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <PiUserCircle className="w-full h-full" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) =>
                    isActive ? "active p-2 my-1" : "p-2 my-1"
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <Link
                  to={"/login"}
                  className="p-2 my-1"
                  onClick={() => setIsAuth((prev) => !prev)}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            className="btn"
            to="/login"
            onClick={() => setIsAuth((prev) => !prev)}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
