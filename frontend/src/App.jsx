import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import { withToastProvider } from "./context/toast/ToastContext";
import GenerateReferralPage from "./pages/GenerateReferral";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/referr" element={<GenerateReferralPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default withToastProvider(App);
