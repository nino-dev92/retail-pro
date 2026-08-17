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
  theme: string;
  setTheme: React.SetStateAction<any>;
  isLoading: boolean;
  setIsLoading: React.SetStateAction<any>;
};

export const AuthContext = createContext<AuthContextType | any>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContextType | null>(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) return null;
    return JSON.parse(storedAuth);
  });

  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) return "light";
    return JSON.parse(storedTheme);
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, theme, setTheme, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
