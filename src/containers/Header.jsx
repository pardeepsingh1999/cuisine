import { useState, useEffect } from "react";
import { RiSunLine } from "react-icons/ri";
import { BsMoonStars } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { routes } from "../routes";
import { APP_LOGO, APP_NAME, DEFAULT_THEME } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticated } from "../guards/auth-guard";
import { clearUserData } from "../redux/actions";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.userData);

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

  const _logout = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  // Closing DaisyUI dropdown using .blur() method
  const _handleClick = () => {
    try {
      const elem = document.activeElement;
      if (elem) {
        elem?.blur();
      }
    } catch (error) {
      console.log({ error });
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
          <button tabIndex={0} className="btn btn-circle btn-ghost md:hidden">
            <HiOutlineMenuAlt1 className="w-6 h-6" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {routes.map((each) => (
              // Closing DaisyUI dropdown using .blur() method
              <li key={each.title} onClick={_handleClick}>
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

        <button className="btn btn-circle btn-ghost">
          <Link to="/">
            <img src={APP_LOGO} alt="logo" className="w-10 h-10" />
          </Link>
        </button>

        <h1 className="btn btn-ghost pointer-events-none normal-case text-xl p-0">
          {APP_NAME}
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
          <button className="btn btn-circle btn-ghost">
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

        {isUserAuthenticated() ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-circle btn-ghost">
              <label className="swap swap-rotate w-12 h-12">
                {userData?.user?.photoURL ? (
                  <img
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={userData?.user?.photoURL}
                    alt="avatar"
                    title={userData?.user?.displayName}
                  />
                ) : (
                  <AiOutlineUser className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
                )}
              </label>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Closing DaisyUI dropdown using .blur() method */}
              <li onClick={_handleClick}>
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
                  onClick={() => _logout()}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
