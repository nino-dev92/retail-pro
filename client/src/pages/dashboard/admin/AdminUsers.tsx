import AdminLayout from "../../../layouts/AdminLayout";
import useAuth from "../../../hooks/useAuth";

export default function AdminUsers() {
  const { theme } = useAuth();
  return (
    <AdminLayout theme={theme}>
      <h1>Cashiers</h1>
    </AdminLayout>
  );
}
