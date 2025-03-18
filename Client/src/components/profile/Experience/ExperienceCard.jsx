/** @format */
import React from "react";
import companyImage from "../../../images/defaultCompImg.jpeg";
import { calcDates } from "../../../functions/calcDates";

function ExperienceCard({
  jobTitle,
  companyName,
  employmentType,
  startDate,
  endDate,
  location,
  locationType,
}) {
  const timePassed = startDate ? calcDates(startDate) : "";

  return (
    <div className="flex items-center border border-x border-gray-300">
      <img src={companyImage} alt="" className="size-20" />
      <section className="py-2">
        <h2 className="text-lg font-medium">{jobTitle}</h2>
        <p className="mb-2 text-sm font-medium text-gray-400">
          {companyName} · {employmentType}
        </p>
        <section className="mb-2 text-sm text-gray-400">
          <time className="">{startDate}</time> -{" "}
          <time className="">{endDate ? endDate : "Present"}</time>{" "}
          <span className="italic text-gray-400"> · {timePassed}</span>
        </section>
        <div className="text-sm text-gray-400">
          <span className="">{location}</span> · <span>{locationType}</span>
        </div>
      </section>
    </div>
  );
}

export default ExperienceCard;
