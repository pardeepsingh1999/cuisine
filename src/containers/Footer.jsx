import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiYoutube, FiFacebook } from "react-icons/fi";

import { APP_LOGO } from "../config";

const Footer = () => {
  return (
    <footer className="footer gap-0 items-center p-4 bg-base-300">
      <aside className="items-center grid-flow-col pl-1">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Link to="/">
              <img src={APP_LOGO} alt="logo" />
            </Link>
          </div>
        </label>

        <p className="text-primary-content-500">
          Copyright © 2023 - All right reserved
        </p>
      </aside>

      <nav className="grid-flow-col md:place-self-center md:justify-self-end">
        <Link
          className="btn btn-ghost"
          to="https://twitter.com"
          target="_blank"
        >
          <FiTwitter className="text-lg" />
        </Link>
        <Link
          className="btn btn-ghost"
          to="https://youtube.com"
          target="_blank"
        >
          <FiYoutube className="text-lg" />
        </Link>
        <Link
          className="btn btn-ghost"
          to="https://facebook.com"
          target="_blank"
        >
          <FiFacebook className="text-lg" />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
