import React, { useState, useContext } from "react";
import { ToastContext } from "../context/toast/ToastContext";

const GenerateReferralPage = () => {
  const { notify } = useContext(ToastContext);

  const [referralLink, setReferralLink] = useState("");
  const [showLink, setShowLink] = useState(false);

  const generateReferralLink = () => {
    const newReferralLink = `https://example.com/referral/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setReferralLink(newReferralLink);
    setShowLink(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    notify("Referral link copied to clipboard!", "success");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
      <h1 className="text-3xl font-bold mb-4">Generate Referral Link</h1>
      <button
        onClick={generateReferralLink}
        className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Generate Referral
      </button>
      {showLink && (
        <div className="flex items-center">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="px-4 py-2 w-64 border border-gray-300 rounded-l-md bg-gray-100 focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-r-md hover:bg-green-600"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateReferralPage;
