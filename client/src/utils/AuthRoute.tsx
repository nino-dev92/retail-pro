import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
