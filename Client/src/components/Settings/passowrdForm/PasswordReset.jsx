/** @format */

import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SecurityIcon from "@mui/icons-material/Security";
import PasswordInput from "../../util/ResetPasswordUtil/PasswordInput";
import SquareRadioButton from "../../util/FormsUtil/SquareRadioButton";
import { updateUserPassword } from "../../../api/userAPI";
import { useSignUp } from "../../../hooks/useSignUp";
import PasswordReqs from "./PasswordReqs";
function PasswordReset({ formWidth, user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    validatePassword,
    minChar,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
    noWhitespace,
    matchedPassword,
  } = useSignUp();
  useEffect(() => {
    const isValidated = validatePassword(newPassword, confirmPassword);
    if (isValidated) {
      setError(false);
    }
  }, [newPassword, confirmPassword]);

  const submitPassword = async () => {
    if (validatePassword(newPassword, confirmPassword)) {
      try {
        const response = await updateUserPassword(
          currentPassword,
          newPassword,
          user._id,
        );

        if (response.status === 200) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setSuccess(true);

          setTimeout(() => {
            setSuccess(false);
          }, 1000);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  const onPasswordChange = (value, type) => {
    if (type === "new") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  return (
    <div
      className={`flex flex-col gap-5 ${formWidth} h-fit rounded-t-lg bg-white p-5`}
    >
      <nav className="flex items-end text-sm font-semibold text-gray-500">
        <ArrowBackIcon fontSize="small" />
        <button>Back</button>
      </nav>
      <div>
        <p className="font-semibold">Change password</p>
        <span className="text-sm font-thin">
          Create a new password that is at least 8 characters long.
        </span>
      </div>
      <button className="flex w-fit items-center gap-2 rounded-full px-5 py-2 font-semibold text-LinkedInBlue hover:bg-blue-100 hover:text-blue-900">
        <SecurityIcon fontSize="small" /> What makes a strong password?{" "}
      </button>
      <section className="flex justify-around">
        <form autoComplete="off" className="w-[40%]">
          <PasswordInput
            label="Type your current password"
            value={currentPassword}
            updateValue={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            label="Type your new password"
            value={newPassword}
            updateValue={(e) => onPasswordChange(e.target.value, "new")}
          />
          <PasswordInput
            label="Retype your new password"
            value={confirmPassword}
            updateValue={(e) => onPasswordChange(e.target.value, "confirm")}
          />
        </form>
        <PasswordReqs
          minChar={minChar}
          hasLowercase={hasLowercase}
          hasUppercase={hasUppercase}
          hasNumber={hasNumber}
          hasSpecialChar={hasSpecialChar}
          noWhitespace={noWhitespace}
          matchedPassword={matchedPassword}
        />
      </section>
      {error ? (
        <span className="text-sm text-red-500">
          Password does not meet all requirements
        </span>
      ) : null}
      {success ? (
        <span className="text-sm text-green-500">
          The password has been updated successfully
        </span>
      ) : null}
      <section className="flex items-center justify-between">
        <SquareRadioButton
          checked={checked}
          setChecked={setChecked}
          label={"Require all devices to sign in with new password"}
        />
        <button
          onClick={submitPassword}
          className="ml-auto w-fit rounded-full bg-likeColor px-5 py-2 text-white hover:bg-LinkedInBlue"
        >
          Save Password
        </button>
      </section>
    </div>
  );
}

export default PasswordReset;
