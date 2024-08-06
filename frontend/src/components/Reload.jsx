import React from "react";
import refreshIcon from "../assets/refresh.png";

const Reload = ({ cb }) => {
  return (
    <div
      className="borde inline-block ml-4 w-7 p-1 align-bottom cursor-pointer"
      onClick={() => cb()}
    >
      <img src={refreshIcon} alt="reload-icon" />
    </div>
  );
};

export default Reload;
