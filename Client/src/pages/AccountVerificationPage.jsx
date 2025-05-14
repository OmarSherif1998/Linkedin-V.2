import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigation } from "../hooks/useNavigation";
import { verifyAccount } from "../api/SupportAPI";
import { useUser } from "../hooks/useUser";
import VERIFICATION_MESSAGES from "../staticData/VerificationMessages";
import { useQuery } from "@tanstack/react-query";
function AccountVerificationPage() {
  const { token } = useParams(); // Extract the token from URL params
  const { email } = useUser();
  const storageKey = `emailVerificationStatus:${email}`;
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error', 'already_verified'
  const [message, setMessage] = useState("");
  const { NavigateToHome } = useNavigation();

  const { error, isError, isSuccess } = useQuery({
    queryKey: ["verifyAccount", token],
    queryFn: () => verifyAccount(token),
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setStatus("success");
      setMessage(VERIFICATION_MESSAGES.SUCCESS);
      localStorage.removeItem(storageKey);
      setTimeout(() => {
        NavigateToHome();
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.response?.status === 400) {
        setStatus("already_verified");
        setMessage(VERIFICATION_MESSAGES.ALREADY_VERIFIED);
      } else if (error.response?.status === 404) {
        setStatus("error");
        setMessage(VERIFICATION_MESSAGES.ERROR);
      } else {
        setStatus("error");
        setMessage(VERIFICATION_MESSAGES.INTERNAL_SERVER_ERROR);
      }
      localStorage.removeItem(storageKey);
      setTimeout(() => {
        NavigateToHome();
      }, 3000);
    }
  }, [isError, error]);

  useEffect(() => {
    const verifyAccountToken = async () => {
      try {
        const response = await verifyAccount(token);

        if (response.status === 200) {
          setStatus("success");
          setMessage(VERIFICATION_MESSAGES.SUCCESS);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setStatus("already_verified");
          setMessage(VERIFICATION_MESSAGES.ALREADY_VERIFIED);
        } else if (error.response && error.response.status === 404) {
          setStatus("error");
          setMessage(VERIFICATION_MESSAGES.ERROR);
        } else {
          setStatus("error");
          setMessage(VERIFICATION_MESSAGES.INTERNAL_SERVER_ERROR);
        }
      }
      localStorage.removeItem(storageKey);

      setTimeout(() => {
        NavigateToHome();
      }, 3000);
    };

    verifyAccountToken();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Account Verification
        </h2>
        <div className="text-center">
          {status === "loading" && <p>Verifying your account...</p>}
          {status === "success" && <p className="text-green-500">{message}</p>}
          {status === "already_verified" && (
            <p className="text-blue-500">{message}</p>
          )}
          {status === "error" && <p className="text-red-500">{message}</p>}
          {(status === "success" || status === "already_verified") && (
            <button
              onClick={NavigateToHome}
              className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              Go to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountVerificationPage;
