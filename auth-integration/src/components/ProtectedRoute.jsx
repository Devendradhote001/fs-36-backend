import { Navigate } from "react-router";
import { useContextData } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  let { isLoggedInUser, isLoading } = useContextData();
  console.log("auth->", isLoggedInUser);

  if (isLoading) return <h1>Loading...</h1>;

  if (!isLoggedInUser) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
