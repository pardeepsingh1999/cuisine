import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../../guards/auth-guard";

const ProtectedRoute = ({ redirectRoute }) => {
  const isAuth = isUserAuthenticated();

  return isAuth ? <Outlet /> : <Navigate replace to={redirectRoute} />;
};

export default ProtectedRoute;
