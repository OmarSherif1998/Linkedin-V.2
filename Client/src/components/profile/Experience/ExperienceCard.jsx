/** @format */
import React, { useMemo } from "react";
import companyImage from "../../../images/defaultCompImg.jpeg";
import { calcDates } from "../../../functions/calcDates";
import { formatDates } from "../../../functions/formatDates";

function ExperienceCard({
  jobTitle,
  companyName,
  employmentType,
  startDate,
  endDate,
  location,
  locationType,
  description,
}) {
  const timePassed = startDate ? calcDates(startDate) : "";
  const start = useMemo(() => formatDates(startDate), [startDate]);
  const end = useMemo(() => (endDate ? formatDates(endDate) : null), [endDate]);
  const descList = useMemo(() => description.split("\n"), [description]);

  return (
    <div className="flex">
      <img src={companyImage} alt="" className="size-20" />
      <section className="py-2">
        <h2 className="text-lg font-medium">{jobTitle}</h2>
        <p className="text-sm text-gray-900">
          {companyName} · {employmentType}
        </p>
        <section className="text-sm text-gray-400">
          <time className="">{start}</time> -{" "}
          <time className="">{end ? end : "Present"}</time>{" "}
          <span className="italic text-gray-400"> · {timePassed}</span>
        </section>
        <div className="text-sm text-gray-400">
          {location && (
            <span>
              {location} · <span>{locationType}</span>
            </span>
          )}
        </div>
        <section className="pt-2 text-sm text-gray-400">
          {descList.map((desc, idx) => (
            <p key={idx}>{desc}</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default ExperienceCard;
