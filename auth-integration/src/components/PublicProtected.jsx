import React from "react";
import { useContextData } from "../context/AuthContext";
import { Navigate } from "react-router";

const PublicProtected = ({ children }) => {
  let { isLoggedInUser } = useContextData();
  console.log("is logged in in public", isLoggedInUser);

  if (isLoggedInUser) {
    return <Navigate to={"/home"} />;
  }

  return children;
};

export default PublicProtected;
