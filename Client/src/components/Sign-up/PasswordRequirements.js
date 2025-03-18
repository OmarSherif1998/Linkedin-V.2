/** @format */

import React from "react";

function PasswordRequirements({
  minChar,
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSpecialChar,
  noWhitespace,
}) {
  const requirements = [
    {
      text: "Must be at least 8 letters",
      condition: minChar,
    },
    {
      text: "Must have at least 1 lowercase letter",
      condition: hasLowercase,
    },
    {
      text: "Must have at least 1 uppercase letter",
      condition: hasUppercase,
    },
    {
      text: "Must have at least 1 number",
      condition: hasNumber,
    },
    {
      text: "Must have a special character",
      condition: hasSpecialChar,
    },
    {
      text: "Must not contain  whitespace",
      condition: noWhitespace,
    },
  ];

  return (
    <div>
      <p>Password Requirements</p>
      <ul className="grid grid-cols-2 gap-x-4 text-[0.8rem] font-normal">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`flex gap-1 ${
              req.condition ? "text-green-500" : "text-red-600"
            }`}
          >
            <p>•</p>
            {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordRequirements;
