/** @format */

import React from "react";
import SettingsForm from "./SettingsForm";
import {
  VisibilityLinkedInActivity,
  VisibilityProfileNetwork,
} from "../../staticData/SettingsData";

function Visibility() {
  return (
    <div>
      <div className="flex h-fit w-full flex-col gap-5">
        <SettingsForm
          StaticDate={VisibilityProfileNetwork}
          title={"Visibility of your profile & network"}
        />
        <SettingsForm
          StaticDate={VisibilityLinkedInActivity}
          title={"Visibility of your LinkedIn activity"}
        />
      </div>
    </div>
  );
}

export default Visibility;
