/** @format */

import logo from "../images/linkedin.png";
import google from "../images/google.png";
import PasswordRequirements from "../components/Sign-up/PasswordRequirements";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { SubColumnList } from "../functions/footerFunctions";
import { column5 } from "../staticData/footerData";
import LoadingScreen from "../components/util/LoadingScreen";
import { useSignUp } from "../hooks/useSignUp";

function SignUp() {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    visible,
    revisible,
    warning,
    loading,
    warningMessage,
    minChar,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
    noWhitespace,
    setFirstName,
    setLasttName,
    setEmail,
    setPassword,
    setConfirmPassword,
    togglePasswordVisibility,
    toggleRePasswordVisibility,
    handleSubmit,
    handleInputChange,
  } = useSignUp();

  return (
    <div className="flex w-[100%] flex-col gap-10 p-[1rem]">
      <Link to={"/login"}>
        {" "}
        <img src={logo} alt="logo" className="w-36" />
      </Link>

      {loading && <LoadingScreen />}
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10">
        <h1 className="text-center text-4xl font-normal">
          Make the most of your professional life
        </h1>
        <div className="flex w-full flex-col items-center rounded border border-gray-400 bg-white p-8 shadow-2xl md:w-[33rem]">
          <form className="flex w-full flex-col gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
              className="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleInputChange(setLasttName)}
              className="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
              className="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {warning && <p className="text-red-500">{warningMessage}</p>}

            <div className="relative">
              <input
                type={visible ? "text" : "password"} // Toggle password visibility
                placeholder="Password"
                value={password}
                onChange={handleInputChange(setPassword)}
                className="w-full rounded border p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-2 flex cursor-pointer items-center"
                onClick={togglePasswordVisibility}
              >
                {!visible ? (
                  <VisibilityOffIcon className="text-gray-500" />
                ) : (
                  <VisibilityIcon className="text-gray-500" />
                )}
              </span>
            </div>
            <div className="relative">
              <input
                type={revisible ? "text" : "password"} // Toggle password visibility
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                className="w-full rounded border p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-2 flex cursor-pointer items-center"
                onClick={toggleRePasswordVisibility}
              >
                {!revisible ? (
                  <VisibilityOffIcon className="text-gray-500" />
                ) : (
                  <VisibilityIcon className="text-gray-500" />
                )}
              </span>
            </div>
            {password && confirmPassword ? (
              password === confirmPassword ? (
                <span className="text-green-400">Passwords match</span>
              ) : (
                <span className="text-red-600">Passwords don't match</span>
              )
            ) : null}

            <div className="flex flex-col gap-6">
              <PasswordRequirements
                minChar={minChar}
                hasLowercase={hasLowercase}
                hasUppercase={hasUppercase}
                hasNumber={hasNumber}
                hasSpecialChar={hasSpecialChar}
                noWhitespace={noWhitespace}
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" name="Remember Me" id="" />
                <p className="text-sm font-normal">Remember me</p>
              </div>
              <div className="text-center">
                <span className="text-sm font-thin">
                  By clicking Agree & Join or Continue, you agree to the
                  LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
                </span>
                <button
                  onClick={handleSubmit}
                  className="mt-4 h-[3.5rem] w-[80%] rounded-full bg-LinkedInBlue text-lg font-semibold text-white hover:bg-blue-700 md:w-[29rem]"
                >
                  Agree & Join
                </button>
              </div>
            </div>
          </form>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-3">
              <p className="mt-6 text-lg font-semibold">or</p>
              <button className="flex h-[3.5rem] w-full items-center justify-center gap-2 rounded-full border border-black px-2 text-sm font-semibold text-black hover:bg-gray-100 md:w-[29rem]">
                <img src={google} alt="Google Logo" className="w-10" />
                Sign In with Google
              </button>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm">Already on LinkedIn?</p>
              <Link to="/">
                <span className="font-medium text-LinkedInBlue">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <SubColumnList data={column5} />
      </div>
    </div>
  );
}

export default SignUp;
