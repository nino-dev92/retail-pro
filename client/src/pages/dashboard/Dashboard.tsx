import AdminDashboard from "./admin/AdminDashboard";
import CashierDashboard from "./cashier/CashierDashboard";
import ManagerDashboard from "./manager/ManagerDashboard";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { auth } = useAuth();

  if (auth.role === "cashier") return <CashierDashboard />;

  if (auth.role === "admin") return <AdminDashboard />;

  if (auth.role === "manager") return <ManagerDashboard />;
}
