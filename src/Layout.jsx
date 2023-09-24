import React from "react";
import { Outlet } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import Header from "./containers/Header";
import Footer from "./containers/Footer";
import { persistor, store } from "./redux/store";

const Layout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <div class="flex flex-col h-screen">
          <Header />

          <main class="flex-1 overflow-y-auto p-5">
            <Outlet />
          </main>

          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
