/** @format */

import useThemeClasses from "../../../../hooks/useThemeClasses";

function ContactInfo({ setContactInfo }) {
  const { textColorClass, hoverColorClass, darkMode } = useThemeClasses();
  return (
    <div className="flex flex-col">
      <h1 className={`${textColorClass} text-xl font-normal`}>Contact Info</h1>
      <span className={`font-semibold text-gray-500`}>
        Add or edit your profile URL, email, and more
      </span>
      <button
        onClick={setContactInfo}
        className={`my-5 w-fit rounded-lg p-2 text-LinkedInBlue ${darkMode ? `${hoverColorClass} hover:text-white` : "hover:bg-blue-50 hover:text-blue-900"}`}
      >
        Edit contact info
      </button>
    </div>
  );
}

export default ContactInfo;
