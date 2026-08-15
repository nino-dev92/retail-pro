import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AdminRoute = () => {
  const { auth, theme } = useAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return auth?.role === "admin" ? (
    <Outlet />
  ) : (
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
};

export default AdminRoute;
