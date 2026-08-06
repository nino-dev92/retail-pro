import { useState, createContext } from "react";
import React from "react";

type AuthContextType = {
  auth: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accessToken: string;
  };
  setAuth: React.SetStateAction<any>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.SetStateAction<any>;
};

export const AuthContext = createContext<AuthContextType | any>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContextType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
