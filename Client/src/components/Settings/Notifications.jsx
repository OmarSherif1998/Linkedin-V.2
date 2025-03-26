/** @format */

import React from "react";
import SettingsForm from "./SettingsForm";
import { NotificationData } from "../../staticData/SettingsData";

function Notifications() {
  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <SettingsForm
        StaticDate={NotificationData}
        title={"Notifications you receive"}
      />
    </div>
  );
}

export default Notifications;
