/** @format */

import {
  HowLinkedInUsesyourData,
  JobSeekingPreferences,
  MessagingExperience,
  OtherApplications,
  WhoCanReachYou,
} from "../../../staticData/SettingsData";
import SettingsSection from "../SectionForm";
import { useOutletContext } from "react-router-dom";

const sections = [
  { StaticDate: HowLinkedInUsesyourData, title: "How LinkedIn uses your data" },
  { StaticDate: WhoCanReachYou, title: "Who can reach you" },
  { StaticDate: MessagingExperience, title: "Messaging experience" },
  { StaticDate: JobSeekingPreferences, title: "Job seeking preferences" },
  { StaticDate: OtherApplications, title: "Other applications" },
];
function DataPrivacy() {
  const { formWidth, isMobile } = useOutletContext();

  return (
    <div className={`${formWidth} flex h-fit flex-col gap-5`}>
      <SettingsSection
        sectionTitle="Data Privacy"
        sections={sections}
        isMobile={isMobile}
      />
    </div>
  );
}

export default DataPrivacy;
