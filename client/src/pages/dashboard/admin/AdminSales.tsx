import AdminLayout from "../../../layouts/AdminLayout";
import useAuth from "../../../hooks/useAuth";

export default function AdminSales() {
  const { theme } = useAuth();
  return (
    <AdminLayout theme={theme}>
      <h1>Sales</h1>
    </AdminLayout>
  );
}
