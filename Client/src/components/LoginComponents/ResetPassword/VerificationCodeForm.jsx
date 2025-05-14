import { useState } from "react";
import LoadingSpinner from "../../util/LoadingSpinner";
import { verifyOTP } from "../../../api/SupportAPI";

function VerificationCodeForm({ email, setIsOTPVerified }) {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const updatedCode = [...verificationCode];

    // Update verificationCode state properly
    [...pastedData].forEach((char, i) => {
      if (i < updatedCode.length) {
        updatedCode[i] = char;
      }
    });

    setVerificationCode(updatedCode);

    // Automatically focus the next input after pasting
    const firstEmptyIndex = updatedCode.findIndex((char) => char === "");
    if (firstEmptyIndex !== -1) {
      document.querySelectorAll("input")[firstEmptyIndex].focus();
    }
  };

  const submitOTP = async () => {
    const isValid = await verifyOTP(email, verificationCode);
    if (isValid) {
      console.log("OTP is valid");
      setIsOTPVerified(true);
    } else {
      console.log("OTP is invalid");
    }
  };
  return (
    // Start Generation Here
    <div className="flex items-center justify-center h-full">
      <div className="flex w-[90%] flex-col items-center justify-center rounded-md border bg-white p-4 md:w-1/2 md:p-8">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-700 md:mb-6 md:text-2xl">
          Enter Verification Code
        </h2>

        <div className="flex justify-center gap-1 mb-4 md:mb-6 md:gap-2">
          {verificationCode.map((code, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-10 h-10 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-LinkedInBlue md:h-12 md:w-12 md:text-2xl"
              value={code}
              onChange={(e) => {
                const updatedCode = [...verificationCode];
                updatedCode[index] = e.target.value;
                setVerificationCode(updatedCode);

                // Automatically focus the next input
                if (e.target.value && index < 5) {
                  e.target.nextElementSibling?.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !e.target.value && index > 0) {
                  e.target.previousElementSibling?.focus();
                }
              }}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <div className="mb-4 text-center md:mb-6">
          <p className="text-sm text-gray-600">Time remaining:</p>
          <p className="text-lg font-semibold text-LinkedInBlue md:text-xl">
            1:30
          </p>
        </div>
        <button
          className="w-full px-3 py-2 text-white rounded-md hover:bg-LinkedInDarkBlue bg-LinkedInBlue md:px-4 md:py-2"
          onClick={() => submitOTP()}
        >
          {isLoading ? (
            <LoadingSpinner
              spinnerSize={4}
              componentName="VerificationCodeForm"
            />
          ) : (
            "Verify Code"
          )}
        </button>
      </div>
    </div>
  );
}

export default VerificationCodeForm;
