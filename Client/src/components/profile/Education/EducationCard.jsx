/** @format */

import React from "react";
import defaultEducation from "../../../images/defaultEducation.jpg";
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
  return (
    <div className="flex items-center gap-4 border border-x border-gray-300 p-4">
      <img src={defaultEducation} alt="" className="size-12" />
      <section className="py-2">
        <h2 className="text-lg font-medium">{institutionName}</h2>
        <p className="mb-2 text-sm font-medium text-gray-400">
          {degree} · {major}
        </p>
        <div className="text-sm text-gray-400">
          <span className="">{grade}</span>
        </div>
        <section className="mb-2 text-sm text-gray-400">
          <time className="">{educationStartDate}</time> -{" "}
          <time className="">{educationEndDate}</time>{" "}
          <span className="italic text-gray-400"> · {}</span>
        </section>
      </section>
    </div>
  );
}

export default EducationCard;
