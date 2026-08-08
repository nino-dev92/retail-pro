import { useState, createContext, useEffect } from "react";
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
  const [auth, setAuth] = useState<AuthContextType | null>(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) return null;
    return JSON.parse(storedAuth);
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, theme, setTheme }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
