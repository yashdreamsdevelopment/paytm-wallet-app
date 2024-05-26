import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Appbar = () => {
  const userData = useSelector((state) => state.user.userData);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello, {userData?.firstName}
        </div>
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {userData?.firstName?.split("")[0]?.toUpperCase()}
            </div>
          </div>
          {isHovered && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <Link
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                to="/referr"
              >
                Your Referrals
              </Link>
              <Link
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                to="/transactions"
              >
                Your Transactions
              </Link>
              <Link
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                to="/signout"
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
