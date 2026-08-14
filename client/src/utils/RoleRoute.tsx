import { useNavigate, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

type RoleRouteProps = {
  allowedRoles: string[];
};

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { auth, theme } = useAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);

    return;
  };

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return (
      <main className={`${theme}`}>
        <Header />

        <div className="p-5 min-h-155 dark:bg-on-surface">
          <h1 className="text-2xl dark:text-surface">
            You are Unauthorized to view requested resource
          </h1>
          <br />
          <br />
          <p
            className="cursor-pointer underline hover:text-red-500 w-fit dark:text-surface"
            onClick={goBack}
          >
            Go Back
          </p>
        </div>

        <Footer />
      </main>
    );
  }

  return <Outlet />;
}
