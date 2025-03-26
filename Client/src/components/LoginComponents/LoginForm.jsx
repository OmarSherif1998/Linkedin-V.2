/** @format */
import React, { useState } from "react";
import { login } from "../../Redux/sllices/userSlice";
import { useDispatch } from "react-redux";
import { authenticateUser, fetchMyData } from "../../api/userAPI.js";
import useLoading from "../../hooks/useLoading.js";
import { useNavigation } from "../../hooks/useNavigation.js";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useLoading();
  const [invalidCredentials, setInvalidCredentials] = useState(undefined);
  const dispatch = useDispatch();
  const { NavigateToHome } = useNavigation();

  const loginToApp = async (e) => {
    e.preventDefault();

    try {
      const token = await authenticateUser({ email, password });

      if (token) {
        localStorage.setItem("token", token);
        const userData = await fetchMyData(token);

        dispatch(login(userData));
        console.log("CLIENT: LOGIN PAGE SUCCESSFULLY LOGGED IN");

        // Delay navigation to ensure loading screen is visible
        setTimeout(() => {
          NavigateToHome();
          setLoading(false);
        }, 1000);
      } else {
        setInvalidCredentials(null);
      }
    } catch (error) {
      console.log("CLIENT: LOGIN PAGE ERROR: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-[5rem] p-[2rem]">
      <div className="flex flex-col">
        <h1 className="w-[80%] pb-[2rem] font-sans text-[2.5rem] font-thin text-[#8f5849]">
          Welcome to your professional community
        </h1>
        <form className="mb-[1.25rem] flex flex-col">
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="mb-[1rem] h-[2.8125rem] w-[25rem] rounded-md border border-black pl-[1rem] text-lg"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-[1rem] h-[2.8125rem] w-[25rem] rounded-md border border-black pl-[1rem] text-lg"
          />
          {invalidCredentials === null ? (
            <span className="w-fit rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              The password or username that you have entered is incorrect.
            </span>
          ) : null}
        </form>
        <button
          type="submit"
          onClick={(e) => {
            setLoading(true);
            loginToApp(e);
          }}
          className="hover:bg-LinkedInDarkBlue h-[2.8125rem] w-[25rem] rounded-full bg-LinkedInBlue text-lg text-white"
        >
          Sign in
        </button>
        <div className="my-[1rem] flex items-center justify-start gap-[0.5rem] lg:justify-center">
          <div className="w-1/4 border-t border-gray-300 lg:w-1/3"></div>
          <span>or</span>
          <div className="w-1/4 border-t border-gray-300 lg:w-1/3"></div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <button className="h-[2.8125rem] w-[25rem] rounded-full border border-black bg-white text-lg text-black hover:bg-gray-100">
            Sign in with Google
          </button>
          <button
            className="h-[2.8125rem] w-[25rem] rounded-full border border-black bg-white text-lg text-black hover:bg-gray-100"
            onClick={loginToApp}
          >
            New to LinkedIn? Join now
          </button>
        </div>
      </div>
      <img
        src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
        alt="LinkedIn Logo"
        className="hidden w-[43.75rem] md:block"
      />
    </div>
  );
}

export default LoginForm;
