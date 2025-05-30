import React from "react";
import useThemeClasses from "../../hooks/useThemeClasses";

function CompanySection({ setActiveSection, activeSection }) {
  const sections = ["Home", "About", "Post", "Job", "People"];
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} flex space-x-3 border-b border-gray-200 pb-2 pl-2 md:space-x-6`}
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`px-2 py-2 text-xs font-medium md:px-4 md:text-base ${
            activeSection === section
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
}

export default CompanySection;
