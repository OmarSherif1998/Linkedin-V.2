import React, { useState } from "react";
import { verifyEmailAndSendOTP } from "../../../api/SupportAPI";
import { SubColumnList } from "../../../functions/footerFunctions";
import { column5 } from "../../../staticData/footerData";
import VerificationCodeForm from "./VerificationCodeForm";
import EmailForm from "./EmailForm";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";
function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [userID, setUserID] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await verifyEmailAndSendOTP(email);
      setIsEmailSent(true);
      setUserID(response.userID);
    } catch (err) {
      console.log(err);
      setError("Failed to send verification code. Please try again.");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-BgColor">
      <Header navigate={navigate} />
      <div className="h-[87vh] w-full">
        {isOTPVerified ? (
          <ResetPasswordForm userID={userID} />
        ) : isEmailSent ? (
          <VerificationCodeForm
            email={email}
            setIsOTPVerified={setIsOTPVerified}
          />
        ) : (
          <EmailForm
            isEmailSent={isEmailSent}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            navigate={navigate}
          />
        )}
      </div>
      <div className="hidden md:block">
        <SubColumnList data={column5} />
      </div>
    </div>
  );
}

export default ForgetPassword;
