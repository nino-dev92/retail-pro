import AdminLayout from "../../../layouts/AdminLayout";
import useAuth from "../../../hooks/useAuth";

export default function AdminProducts() {
  const { theme } = useAuth();
  return (
    <AdminLayout theme={theme}>
      <h1>Products</h1>
    </AdminLayout>
  );
}
