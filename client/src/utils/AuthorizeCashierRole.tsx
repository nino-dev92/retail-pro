import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthorizeCashierRole = () => {
  const { auth } = useAuth();

  return auth?.role === "cashier" ? <Outlet /> : <h1>Unauthorized</h1>;
};

export default AuthorizeCashierRole;
