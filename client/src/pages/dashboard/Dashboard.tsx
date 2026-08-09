import AdminDashboard from "./AdminDashboard";
import CashierDashboard from "./CashierDashboard";
import ManagerDashboard from "./ManagerDashboard";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { auth } = useAuth();

  if (auth.role === "cashier") return <CashierDashboard />;

  if (auth.role === "admin") return <AdminDashboard />;

  if (auth.role === "manager") return <ManagerDashboard />;
}
