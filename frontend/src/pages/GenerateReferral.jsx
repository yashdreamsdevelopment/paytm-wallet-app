import React, { useState, useContext, useEffect } from "react";
import { ToastContext } from "../context/toast/ToastContext";
import {
  useLazyGenerateReferralQuery,
  useGetUserReferralsQuery,
} from "../store/services/user/user.api";
import { CLIENT_BASE_URL } from "../constants/api.constants";
import { useSelector } from "react-redux";
import protectRoute from "../utility/protectRoute";
import { useNavigate } from "react-router-dom";
import Reload from "../components/Reload";

const GenerateReferralPage = () => {
  // CONSTANTs
  const userId = useSelector((state) => state.user.userId);
  const userData = useSelector((state) => state.user.userData);

  const { notify } = useContext(ToastContext);
  const { handleProtectedRouteNavigation } = protectRoute();
  const navigate = useNavigate();

  // APIs
  const [generateReferralAPI] = useLazyGenerateReferralQuery();
  const {
    data: userReferralsData,
    isLoading: isUserReferralsLoading,
    isSuccess: isUserReferralSuccess,
    refetch,
  } = useGetUserReferralsQuery();

  // STATEs
  const [referralLink, setReferralLink] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [users, setUsers] = useState([]);

  // FUNCTIONs
  const generateReferralLink = async () => {
    try {
      // const resp = await generateReferralAPI().unwrap();

      if (true) {
        // const { referralCode, referralId } = resp;

        const newReferralLink = `${CLIENT_BASE_URL}/signup?referredBy=${userData?.referralCode}`;

        setReferralLink(newReferralLink);
        setShowLink(true);
      }
    } catch (error) {
      notify("something went wrong", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    notify("Referral link copied to clipboard!", "success");
  };

  // EFFECTs
  useEffect(() => {
    if (!userId) {
      handleProtectedRouteNavigation("/signin");
    } else {
      // refetch();
    }
  }, []);

  useEffect(() => {
    if (isUserReferralSuccess) {
      console.log("## user referrals:", userReferralsData);
      setUsers(userReferralsData?.data?.referredUsers);
    }
  }, [isUserReferralsLoading]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Referred Users and Generate Referral Link
      </h1>
      <div className="flex flex-row w-full max-w-5xl bg-white shadow-md rounded-lg">
        {/* Left Column: User List */}
        <div className="w-1/2 p-6 border-r border-gray-200  ">
          <h2 className="text-2xl font-semibold mb-4">
            User List
            <Reload cb={refetch} />
          </h2>
          <div className="overflow-y-auto h-96">
            <ul className="space-y-4">
              {users?.map((user) => (
                <li
                  key={user._id}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium">
                    {user?.firstName.concat(" ", user?.lastName)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Right Column: Generate Referral Link */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Generate Referral Link
          </h2>
          <button
            onClick={generateReferralLink}
            className="px-4 py-2 mb-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Generate Referral
          </button>
          {showLink && (
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="px-4 py-2 w-full border border-gray-300 rounded-l-md bg-gray-100 focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-r-md hover:bg-green-600"
              >
                Copy
              </button>
            </div>
          )}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateReferralPage;
