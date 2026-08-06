import { Route, Routes } from "react-router-dom";
import ScrollTop from "./utils/ScrollTop";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectManagerRoute from "./utils/ProtectManagerRoute";

function App() {
  return (
    <Routes>
      <Route element={<ScrollTop />} />

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectManagerRoute />}></Route>
    </Routes>
  );
}

export default App;
