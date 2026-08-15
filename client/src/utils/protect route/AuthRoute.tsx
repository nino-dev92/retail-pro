import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AuthRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.firstName ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
