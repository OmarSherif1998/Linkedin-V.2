import React from "react";
import useThemeClasses from "../../hooks/useThemeClasses";

function CompanyInfo({ bio, city, location }) {
  const { darkMode } = useThemeClasses();
  return (
    <div>
      <p className="text-[8px] md:text-base">{bio}</p>

      <div className={`" flex items-center gap-1`}>
        {city || location ? (
          <>
            <p
              className={`${darkMode ? "text-white" : "text-gray-600"} text-[8px] md:text-sm`}
            >
              {city}, {location}
            </p>
            <p className="text-[8px] md:text-sm">•</p>
          </>
        ) : null}

        <button className="text-[8px] font-semibold text-LinkedInBlue hover:underline md:text-sm">
          Contact Info
        </button>
      </div>
    </div>
  );
}

export default CompanyInfo;
