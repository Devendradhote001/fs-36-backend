import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicProtected from "./components/PublicProtected";
import { api } from "./config/api";
import { useContextData } from "./context/AuthContext";
import { useEffect } from "react";

const App = () => {
  let { setIsLoggedInUser, setIsLoading } = useContextData();

  let hydrateUser = async () => {
    try {
      let res = await api.get("/api/auth/me");
      console.log("hydrate user->", res);
      setIsLoggedInUser(res.data.data);
    } catch (error) {
      console.log("error in hydration", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    hydrateUser();
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicProtected>
              <Login />
            </PublicProtected>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
