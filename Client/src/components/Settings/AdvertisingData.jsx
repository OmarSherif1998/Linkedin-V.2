/** @format */

import React from "react";
import SettingsForm from "./SettingsForm";
import {
  ActivityInferredData,
  ProfileData,
  ThirdPartyData,
} from "../../staticData/SettingsData";

function AdvertisingData() {
  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <SettingsForm StaticDate={ProfileData} title={"Profile data"} />
      <SettingsForm
        StaticDate={ActivityInferredData}
        title={"Activity and inferred data"}
      />
      <SettingsForm StaticDate={ThirdPartyData} title={"Third-party data"} />
    </div>
  );
}

export default AdvertisingData;
