import React, { useEffect, useState } from "react";
import { sendVerificationEmail } from "../../api/SupportAPI";
import useUser from "../../hooks/useUser";
import {
  getWithExpiry,
  setWithExpiry,
} from "../../functions/localStorageExpiryManager";

function VerifyAccountBanner() {
  const { _id, email } = useUser();
  const [cooldownActive, setCooldownActive] = useState(false);
  const storageKey = `emailVerificationStatus:${email}`;

  useEffect(() => {
    const checkEmailCooldown = () => {
      const stored = getWithExpiry(storageKey); // Only pass the storageKey here
      if (stored) {
        setCooldownActive(true);
      } else {
        setCooldownActive(false); // Only reset if no value is stored or if expired
      }
    };
    checkEmailCooldown();
  }, [cooldownActive]); // Add storageKey as a dependency

  const handleVerifyAccount = async () => {
    try {
      await sendVerificationEmail(email, _id);
      setWithExpiry(storageKey, true, 3600000);
      setCooldownActive(true);
      // Set with expiry (1 hour)
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-verifyColor px-6 py-1 shadow-md">
      {!cooldownActive ? (
        <p className="flex items-center gap-1 text-xs font-semibold text-black">
          Your account is not verified yet. Please{" "}
          <button
            className="font-medium text-blue-600 hover:text-blue-800"
            onClick={handleVerifyAccount}
          >
            verify
          </button>{" "}
          your email to access all features.
        </p>
      ) : (
        <p className="flex items-center gap-1 text-xs font-semibold text-black">
          Verification email sent. Please check your email for verification.
        </p>
      )}
    </div>
  );
}

export default VerifyAccountBanner;
