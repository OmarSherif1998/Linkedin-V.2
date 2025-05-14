/** @format */

import SettingsSection from "../SectionForm";
import {
  ActivityInferredData,
  ProfileData,
  ThirdPartyData,
} from "../../../staticData/SettingsData";
import { useOutletContext } from "react-router-dom";

const sections = [
  { StaticDate: ProfileData, title: "Profile data" },
  { StaticDate: ActivityInferredData, title: "Activity and inferred data" },
  { StaticDate: ThirdPartyData, title: "Third-party data" },
];

function AdvertisingData() {
  const { formWidth, isMobile } = useOutletContext();

  return (
    <div className={`${formWidth} flex h-fit flex-col gap-5`}>
      <SettingsSection
        sectionTitle="Advertising Data"
        sections={sections}
        isMobile={isMobile}
      />
    </div>
  );
}

export default AdvertisingData;
