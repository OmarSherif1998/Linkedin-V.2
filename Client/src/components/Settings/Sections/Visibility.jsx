/** @format */

import SettingsSection from "../SectionForm";
import {
  VisibilityLinkedInActivity,
  VisibilityProfileNetwork,
} from "../../../staticData/SettingsData";

const sections = [
  {
    StaticDate: VisibilityProfileNetwork,
    title: "Visibility of your profile & network",
  },
  {
    StaticDate: VisibilityLinkedInActivity,
    title: "Visibility of your LinkedIn activity",
  },
];

function Visibility({ formWidth }) {
  return (
    <div className={`flex flex-col gap-5 ${formWidth} h-fit`}>
      <SettingsSection sectionTitle="Visibility" sections={sections} />
    </div>
  );
}

export default Visibility;
