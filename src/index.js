import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./styles/global.scss";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ErrorNotFound from "./components/ErrorNotFound";
import Registration from "./pages/Registration";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import BlogDetails from "./pages/BlogDetails";
import Recipes from "./pages/Recipes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="recipes/:id" element={<Recipes />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="blog/:id" element={<BlogDetails />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="favorite-recipes" element={<FavoriteRecipes />} />

      {/* public routes */}
      <Route path="" element={<PublicRoute redirectRoute={"/"} />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* protected routes */}
      <Route path="" element={<ProtectedRoute redirectRoute={"/login"} />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<ErrorNotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
