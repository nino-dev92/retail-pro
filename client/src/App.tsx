import { Route, Routes } from "react-router-dom";
import ScrollTop from "./utils/ScrollTop";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import SalesPage from "./pages/SalesPage";
import UsersPage from "./pages/UsersPage";
import ProductCategoryPage from "./pages/products/ProductsCategoryPage";
import ManagerRoute from "./utils/protect route/ManagerRoute";
import AddProductPage from "./pages/products/AddProductPage";
import AddCategoryPage from "./pages/products/AddCategoryPage";
import SupplierPage from "./pages/supplier/SupplierPage";
import AddSupplierPage from "./pages/supplier/AddSupplierPage";
import AuthRoute from "./utils/protect route/AuthRoute";
import RoleRoute from "./utils/protect route/RoleRoute";
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

      <Route element={<RoleRoute allowedRoles={["admin", "manager"]} />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products" element={<ProductCategoryPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/add-category" element={<AddCategoryPage />} />
        <Route path="/sales" element={<SalesPage />} />
      </Route>

      <Route element={<ManagerRoute />}>
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/add-supplier" element={<AddSupplierPage />} />
      </Route>
    </Routes>
  );
}

export default App;
