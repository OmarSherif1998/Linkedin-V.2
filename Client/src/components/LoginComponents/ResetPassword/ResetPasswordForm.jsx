import { useState } from "react";
import { resetPassword } from "../../../api/SupportAPI";
import { useNavigate } from "react-router-dom";
function ResetPasswordForm({ userID }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Assume resetPassword is a function that handles the password reset logic
      await resetPassword(newPassword, userID);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex w-[90%] flex-col items-center justify-center rounded-md border bg-white p-4 md:w-1/2 md:p-8">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-700 md:mb-6 md:text-2xl">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-LinkedInBlue"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-LinkedInBlue"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-3 py-2 text-white rounded-md hover:bg-LinkedInDarkBlue bg-LinkedInBlue"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
