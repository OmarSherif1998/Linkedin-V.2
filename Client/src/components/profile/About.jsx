/** @format */

import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import useThemeClasses from "../../hooks/useThemeClasses";
function About({ about, type }) {
  const {
    componentBGColorClass,
    textColorClass,
    iconColorClass,
    hoverColorClass,
  } = useThemeClasses();
  const [isExpanded, setIsExpanded] = useState(false); // State to track expanded/collapsed view
  const aboutText = about || ""; // Optional chaining for undefined handling
  const characterLimit = 400; // Define the limit for trimmed text

  // Toggle function to switch between expanded and collapsed state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the text to display based on expansion state
  const displayText = isExpanded
    ? aboutText
    : aboutText.substring(0, characterLimit) +
      (aboutText.length > characterLimit ? "..." : "");

  return (
    <div
      className={`min-h-[8rem] border-gray-400 ${componentBGColorClass} p-4 md:rounded-lg md:border md:shadow-xl`}
    >
      <section className="flex items-center justify-between">
        <h1 className={`text-lg font-semibold ${textColorClass}`}>About</h1>{" "}
        {type === "Me" ? (
          <ModeEditIcon
            fontSize="large"
            className={`cursor-pointer rounded-full p-2 ${hoverColorClass}`}
            style={{ color: iconColorClass }}
          />
        ) : null}
      </section>

      <p className={`${textColorClass} text-sm`}>{displayText}</p>
      {aboutText.length > characterLimit && (
        <button
          onClick={toggleExpansion}
          className="flex mt-2 ml-auto text-gray-500 hover:text-LinkedInBlue hover:underline focus:outline-none"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default About;
