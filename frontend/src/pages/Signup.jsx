import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Error from "../components/Error";
import { useCreateUserMutation } from "../store/services/user/user.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/features/user/userSlice";

export const Signup = () => {
  const [createUserAPI, { isSuccess, isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // STATEs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const payLoad = {
        userName,
        firstName,
        lastName,
        password,
      };
      const resp = await createUserAPI(payLoad).unwrap();

      console.log("## resp:", resp);

      const { data } = resp;

      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setUserId(data.userId));

        // NOTE: add toast here
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log("## error:", error);
      const { data } = error;
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            placeholder="John"
            label={"First Name"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            placeholder="Doe"
            label={"Last Name"}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            placeholder="example@domain.com"
            label={"Email"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            placeholder="password"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText={"Sigining you up..."}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
