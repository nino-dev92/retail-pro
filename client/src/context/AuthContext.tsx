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
  theme: string;
  setTheme: React.SetStateAction<any>;
};

export const AuthContext = createContext<AuthContextType | any>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContextType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, theme, setTheme }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
