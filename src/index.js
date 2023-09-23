import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/global.scss";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ErrorNotFound from "./components/ErrorNotFound";
import Registration from "./pages/Registration";
import MyFavoriteRecipes from "./pages/MyFavoriteRecipes";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/my-favorite-recipes",
        element: <MyFavoriteRecipes />,
      },
      {
        path: "*",
        element: <ErrorNotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
