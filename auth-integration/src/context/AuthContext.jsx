import { createContext, useContext, useState } from "react";

let Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);
  

  return (
    <Auth.Provider value={{ isLoggedInUser, setIsLoggedInUser }}>
      {children}
    </Auth.Provider>
  );
};

export const useContextData = () => useContext(Auth);
