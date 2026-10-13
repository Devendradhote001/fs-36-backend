import React from "react";
import { useContextData } from "../context/AuthContext";
import { Navigate } from "react-router";

const PublicProtected = ({ children }) => {
  let { auth } = useContextData();

  if (auth) {
    return <Navigate to={"/home"} />;
  }

  return children;
};

export default PublicProtected;
