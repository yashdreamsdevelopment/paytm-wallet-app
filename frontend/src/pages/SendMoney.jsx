import { useSelector } from "react-redux";
import { useTransferAmountMutation } from "../store/services/account/account.api";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import protectRoute from "../utility/protectRoute";
import { ToastContext } from "../context/toast/ToastContext";

const SendMoney = () => {
  const receiverUserData = useSelector(
    (state) => state.user.transferToUserData
  );
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const { handleProtectedRouteNavigation } = protectRoute();
  const { notify } = useContext(ToastContext);

  const [transferAmountAPI, { isSuccess, isLoading }] =
    useTransferAmountMutation();

  const [amount, setAmount] = useState(0);

  const handleInitiateTransfer = async () => {
    try {
      const payload = {
        amount: parseInt(amount),
        to: receiverUserData._id,
      };

      const resp = await transferAmountAPI(payload).unwrap();

      if (resp.success) {
        const { data } = resp;

        // TODO: add a toast here
        notify(data.message, "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.log("## error:", error);

      notify(error.data.error.message, "error");
    }
  };

  useEffect(() => {
    if (!receiverUserData) {
      handleProtectedRouteNavigation("/dashboard");
    }

    if (!userId) {
      handleProtectedRouteNavigation("/signin");
    }
  }, []);

  return (
    <div className="h-full flex justify-center">
      <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
        <div class="flex flex-col space-y-1.5 p-6">
          <h2 class="text-3xl font-bold text-center">Send Money</h2>
        </div>
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span class="text-2xl text-white">
                {receiverUserData?.firstName[0]?.toUpperCase()}
              </span>
            </div>
            <h3 class="text-2xl font-semibold">
              {receiverUserData?.firstName}
            </h3>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="amount"
              >
                Amount (in Rs)
              </label>
              <input
                type="number"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <button
              class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              onClick={handleInitiateTransfer}
            >
              {!isLoading ? "Initiate Transfer" : "Initiating..."}
            </button>

            <div className="text-center">
              <Link to={"/dashboard"} className="text-blue-700">
                Go back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
