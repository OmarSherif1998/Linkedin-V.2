/** @format */

import React from "react";
import SettingsForm from "./SettingsForm";
import {
  HowLinkedInUsesyourData,
  JobSeekingPreferences,
  MessagingExperience,
  OtherApplications,
  WhoCanReachYou,
} from "../../staticData/SettingsData";

function DataPrivacy() {
  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <SettingsForm
        StaticDate={HowLinkedInUsesyourData}
        title={"How LinkedIn uses your data"}
      />
      <SettingsForm StaticDate={WhoCanReachYou} title={"Who can reach you"} />
      <SettingsForm
        StaticDate={MessagingExperience}
        title={"Messaging experience"}
      />
      <SettingsForm
        StaticDate={JobSeekingPreferences}
        title={"Job seeking preferences"}
      />
      <SettingsForm
        StaticDate={OtherApplications}
        title={"Other applications"}
      />
    </div>
  );
}

export default DataPrivacy;
