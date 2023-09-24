import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../../guards/auth-guard";

const PublicRoute = ({ redirectRoute }) => {
  const isAuth = isUserAuthenticated();

  return isAuth ? <Navigate replace to={redirectRoute} /> : <Outlet />;
};

export default PublicRoute;
