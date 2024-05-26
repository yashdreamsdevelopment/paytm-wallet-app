import React from "react";
import { useNavigate } from "react-router-dom";

const protectRoute = () => {
  const navigate = useNavigate();

  const handleProtectedRouteNavigation = (to) => {
    navigate(to);
  };

  return {
    handleProtectedRouteNavigation,
  };
};

export default protectRoute;
