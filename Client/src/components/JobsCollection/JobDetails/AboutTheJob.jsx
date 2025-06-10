import React from "react";
import useThemeClasses from "../../../hooks/useThemeClasses";

function AboutTheJob({
  name,
  overview,
  bio,
  city,
  country,
  description,
  responsibilities,
  qualifications,
  skills,
}) {
  const { textColorClass } = useThemeClasses();

  return (
    <div className={`space-y-6 ${textColorClass}`}>
      <section>
        <h2 className="mb-2 text-xl font-semibold">About the job</h2>
        <p className="text-sm text-gray-400">
          {name} – {bio}
        </p>
        <p className="text-sm text-gray-400">
          Based in {city}, {country}
        </p>
      </section>

      <section>
        <p className="text-sm leading-relaxed text-gray-300">{overview}</p>
      </section>

      <section>
        <h2 className="mb-1 text-lg font-semibold">Description</h2>
        <p className="text-sm leading-relaxed text-gray-300">{description}</p>
      </section>

      <section>
        <h2 className="mb-1 text-lg font-semibold">Responsibilities</h2>
        {responsibilities?.map((r, idx) => (
          <p key={idx} className="text-sm leading-relaxed text-gray-300">
            - {r}
          </p>
        ))}
      </section>

      <section>
        <h2 className="mb-1 text-lg font-semibold">Qualifications</h2>

        {qualifications?.map((q, idx) => (
          <p key={idx} className="text-sm leading-relaxed text-gray-300">
            - {q}
          </p>
        ))}
      </section>
      <section>
        <h2 className="mb-1 text-lg font-semibold">Prefferred Skills:</h2>

        {skills?.map((s, idx) => (
          <p key={idx} className="text-sm leading-relaxed text-gray-300">
            - {s}
          </p>
        ))}
      </section>
    </div>
  );
}

export default AboutTheJob;
