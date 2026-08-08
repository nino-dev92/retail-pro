import { Route, Routes } from "react-router-dom";
import ScrollTop from "./utils/ScrollTop";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ManagerRoute from "./utils/ManagerRoute";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <Routes>
      <Route element={<ScrollTop />} />

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<AuthRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<ManagerRoute />}></Route>
    </Routes>
  );
}

export default App;
