import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { auth } = useAuth();

  return auth?.role === "admin" || "manager" ? (
    <Outlet />
  ) : (
    <h1>Unauthorized</h1>
  );
};

export default AdminRoute;
