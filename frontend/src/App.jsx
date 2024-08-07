import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import { withToastProvider } from "./context/toast/ToastContext";
import GenerateReferralPage from "./pages/GenerateReferral";
import Transactions from "./pages/Transactions";
import Appbar from "./components/Appbar";
import Layout from "./pages/Layout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Layout />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="send" element={<SendMoney />} />
            <Route path="referr-a-friend" element={<GenerateReferralPage />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
          {/* <Route path="/send" element={<SendMoney />} />
          <Route path="/referr" element={<GenerateReferralPage />} />
          <Route path="/transactions" element={<Transactions />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default withToastProvider(App);
