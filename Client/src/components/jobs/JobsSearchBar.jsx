import React from "react";
import { Search, FilterList } from "@mui/icons-material";
import useThemeClasses from "../../hooks/useThemeClasses";

function JobsSearchBar() {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();

  return (
    <div
      className={`mb-4 ${componentBGColorClass} ${borderClass} rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center flex-1 gap-2 px-4 py-2 border border-gray-300 rounded-full">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search job titles, keywords, or companies"
            className={`w-full bg-transparent outline-none ${textColorClass}`}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full">
          <FilterList className="text-gray-500" />
          <span className={textColorClass}>Filters</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          className={`rounded-full border border-gray-300 px-4 py-1 text-sm ${textColorClass}`}
        >
          Date Posted
        </button>
        <button
          className={`rounded-full border border-gray-300 px-4 py-1 text-sm ${textColorClass}`}
        >
          Experience Level
        </button>
        <button
          className={`rounded-full border border-gray-300 px-4 py-1 text-sm ${textColorClass}`}
        >
          Job Type
        </button>
        <button
          className={`rounded-full border border-gray-300 px-4 py-1 text-sm ${textColorClass}`}
        >
          Remote
        </button>
        <button
          className={`rounded-full border border-gray-300 px-4 py-1 text-sm ${textColorClass}`}
        >
          Salary
        </button>
      </div>
    </div>
  );
}

export default JobsSearchBar;
