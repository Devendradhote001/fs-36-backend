import { createContext, useContext, useState } from "react";

let Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Auth.Provider
      value={{ isLoggedInUser, setIsLoggedInUser, isLoading, setIsLoading }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useContextData = () => useContext(Auth);
