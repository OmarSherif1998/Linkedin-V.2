function EmailForm({ handleSubmit, email, setEmail, error, navigate }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[90%] max-w-[24rem] rounded-md border border-gray-300 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Email address"
              required
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Send Verification Code
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Back
            </button>
          </div>
        </form>
        <span className="text-xs">
          We'll send a verification code to this email or phone number if it
          matches an existing LinkedIn account.
        </span>
      </div>
    </div>
  );
}

export default EmailForm;
