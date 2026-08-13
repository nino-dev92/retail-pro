import { Route, Routes } from "react-router-dom";
import ScrollTop from "./utils/ScrollTop";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminSales from "./pages/admin/AdminSales";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AuthRoute from "./utils/AuthRoute";
import AdminRoute from "./utils/AdminRoute";
import Spinner from "./utils/Spinner";

function App() {
  return (
    <Routes>
      <Route element={<ScrollTop />} />
      <Route path="/spinner" element={<Spinner />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<AuthRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/sales" element={<AdminSales />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
      </Route>
    </Routes>
  );
}

export default App;
