import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDataQuery } from "../store/services/user/user.api";
import { useLazyGetAccountBalanceQuery } from "../store/services/account/account.api";
import { useContext, useEffect, useRef } from "react";
import { setUserData } from "../store/features/user/userSlice";
import { setAccountBalance } from "../store/features/account/accountSlice";
import protectRoute from "../utility/protectRoute";
import { ToastContext } from "../context/toast/ToastContext";

const Dashboard = () => {
  const userId = useSelector((state) => state.user.userId);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);
  const { handleProtectedRouteNavigation } = protectRoute();

  const getBalanceOnce = useRef(true);

  const { data, isSuccess, isLoading } = useGetUserDataQuery(userId);
  const [
    getAccountBalanceAPI,
    {
      isSuccess: isAccountBalanceDataSuccess,
      isLoading: isAccountBalanceDataLoading,
    },
  ] = useLazyGetAccountBalanceQuery();

  const handleGetAccountBalanceApi = async () => {
    try {
      const resp = await getAccountBalanceAPI().unwrap();

      if (resp.success) {
        dispatch(setAccountBalance(resp.data));
        notify(resp.data.message, "success");
      }
    } catch (error) {
      console.log("## error:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      handleProtectedRouteNavigation("/signin");
    }
    if (getBalanceOnce.current) {
      handleGetAccountBalanceApi();

      getBalanceOnce.current = false;
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserData(data.data));
    }
  }, [isLoading]);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={account.accountBalance.balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
