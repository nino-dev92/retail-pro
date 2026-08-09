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
  const [theme, setTheme] = useState<string>("light");

  return (
    <AuthContext.Provider value={{ auth, setAuth, theme, setTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
