import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthorizeCashierRole from "./utils/authorizeCashierRole";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route></Route>
    </Routes>
  );
}

export default App;
