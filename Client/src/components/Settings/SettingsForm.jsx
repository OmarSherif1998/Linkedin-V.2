/** @format */

import React from "react";
import SettingsButton from "./SettingsButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function SettingsForm({ StaticDate, title, handlePasswordChange }) {
  return (
    <section className="rounded-lg bg-white">
      {title && <h1 className="px-5 pt-5 text-lg font-semibold">{title}</h1>}

      {StaticDate?.map((data, idx) => {
        return (
          <section key={idx} className="hover:cursor-pointer">
            <SettingsButton
              label={data.label}
              placeholder={data.placeholder}
              Arrow={ArrowForwardIcon}
              handlePasswordChange={handlePasswordChange}
            />

            {StaticDate.length > idx ? (
              <div className="w-full border border-t" />
            ) : null}
          </section>
        );
      })}
    </section>
  );
}

export default SettingsForm;
