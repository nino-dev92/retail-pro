import AdminLayout from "../../../layouts/AdminLayout";
import useAuth from "../../../hooks/useAuth";

export default function AdminCategory() {
  const { theme } = useAuth();
  return (
    <AdminLayout theme={theme}>
      <h1>Categories</h1>
    </AdminLayout>
  );
}
