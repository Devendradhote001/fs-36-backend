import React from "react";
import { Navigate } from "react-router";
import { useContextData } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  let { auth } = useContextData();

  if (!auth) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
