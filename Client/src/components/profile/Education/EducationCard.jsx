/** @format */

import React, { useMemo } from "react";
import defaultEducation from "../../../images/defaultEducation.jpg";
import { formatDates } from "../../../functions/formatDates";
import useThemeClasses from "../../../hooks/useThemeClasses";
function EducationCard({
  institutionName,
  degree,
  grade,
  educationStartDate,
  educationEndDate,
  description,
  activities,
  major,
}) {
  const { textColorClass } = useThemeClasses();
  const start = useMemo(
    () => formatDates(educationStartDate),
    [educationStartDate],
  );
  const end = useMemo(
    () => (educationEndDate ? formatDates(educationEndDate) : null),
    [educationEndDate],
  );
  return (
    <div className="flex items-center gap-4 p-4">
      <img src={defaultEducation} alt="" className="size-12" />
      <section className="py-2">
        <h2 className={`text-lg font-medium ${textColorClass}`}>
          {institutionName}
        </h2>
        {degree && (
          <p className={`text-sm ${textColorClass}`}>
            {degree} · {major}
          </p>
        )}
        {grade && (
          <div className="text-sm text-gray-400">
            <span className="">GPA:{grade}</span>
          </div>
        )}
        <section className="text-sm text-gray-400">
          <time className="">{start}</time> -{" "}
          <time className="">{end}</time>{" "}
        </section>
      </section>
    </div>
  );
}

export default EducationCard;
