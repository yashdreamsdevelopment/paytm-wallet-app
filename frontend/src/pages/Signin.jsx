import { useState, useContext } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Error from "../components/Error";
import { useLoginUserMutation } from "../store/services/user/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/features/user/userSlice";
import { ToastContext } from "../context/toast/ToastContext";

export const Signin = () => {
  const [loginUserAPI, { isSuccess, isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useContext(ToastContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        userName,
        password,
      };
      const resp = await loginUserAPI(payload).unwrap();
      const { data } = resp;

      if (data.token) {
        localStorage.setItem("token", data.token);

        dispatch(setUserId(data.userId));

        notify(data.message, "success");

        // NOTE: add toast here
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      const { data } = error;
      notify(data.error.message, "error");
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="example@example.com"
            label={"Email"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <InputBox
            placeholder="password"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Siging you in..."
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
