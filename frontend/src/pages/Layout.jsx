import Appbar from "../components/Appbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import protectRoute from "../utility/protectRoute";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const userId = useSelector((state) => state.user.userId);
  const { handleProtectedRouteNavigation } = protectRoute();

  useEffect(() => {
    if (!userId) {
      handleProtectedRouteNavigation("/signin");
    }
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
