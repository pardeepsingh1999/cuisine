import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./containers/Header";
import Footer from "./containers/Footer";

const Layout = () => {
  return (
    <div class="flex flex-col h-screen">
      <Header />

      <main class="flex-1 overflow-y-auto p-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
