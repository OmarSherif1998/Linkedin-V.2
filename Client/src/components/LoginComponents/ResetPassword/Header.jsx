import linkedin from "../../../images/linkedin.png";
function Header({ navigate }) {
  return (
    <div className="flex items-center justify-around w-full py-4">
      <img
        src={linkedin}
        alt="Logo"
        className="h-6 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 border rounded-full border-LinkedInBlue text-LinkedInBlue hover:border-blue-950 hover:text-blue-950"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

export default Header;
