import React, { useState, useContext, useEffect } from "react";
import { ToastContext } from "../context/toast/ToastContext";
import { useLazyGenerateReferralQuery } from "../store/services/user/user.api";
import { CLIENT_BASE_URL } from "../constants/api.constants";
import { useSelector } from "react-redux";
import protectRoute from "../utility/protectRoute";
import { useNavigate } from "react-router-dom";

const GenerateReferralPage = () => {
  // CONSTANTs
  const userId = useSelector((state) => state.user.userId);
  const { notify } = useContext(ToastContext);
  const { handleProtectedRouteNavigation } = protectRoute();
  const navigate = useNavigate();

  // APIs
  const [generateReferralAPI] = useLazyGenerateReferralQuery();

  // STATEs
  const [referralLink, setReferralLink] = useState("");
  const [showLink, setShowLink] = useState(false);
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    { id: 3, name: "Alice Johnson" },
    // Add more users as needed
    { id: 3, name: "Alice Johnson" },
  ];

  // FUNCTIONs
  const generateReferralLink = async () => {
    try {
      const resp = await generateReferralAPI().unwrap();

      if (resp.success) {
        const { referralCode } = resp;

        const newReferralLink = `${CLIENT_BASE_URL}/signup?referredBy=${referralCode}`;

        setReferralLink(newReferralLink);
        setShowLink(true);
      }
    } catch (error) {
      notify("something went wrong", "error");
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
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Referred Users and Generate Referral Link
      </h1>
      <div className="flex flex-row w-full max-w-5xl bg-white shadow-md rounded-lg">
        {/* Left Column: User List */}
        <div className="w-1/2 p-6 border-r border-gray-200  ">
          <h2 className="text-2xl font-semibold mb-4">User List</h2>
          <div className="overflow-y-auto h-96">
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium">{user.name}</p>
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
    </div>
  );
};

export default GenerateReferralPage;
