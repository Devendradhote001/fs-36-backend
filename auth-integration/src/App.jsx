import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicProtected from "./components/PublicProtected";

const App = () => {
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
