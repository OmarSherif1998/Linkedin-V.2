/** @format */

import SettingsSection from "../SectionForm";
import { NotificationData } from "../../../staticData/SettingsData";
import { useOutletContext } from "react-router-dom";

const sections = [
  {
    StaticDate: NotificationData,
    title: "Notifications you receive",
  },
];

function Notifications() {
  const { formWidth, isMobile } = useOutletContext();

  return (
    <div className={`${formWidth} flex h-fit flex-col gap-5`}>
      <SettingsSection
        sectionTitle="Notifications"
        sections={sections}
        isMobile={isMobile}
      />
    </div>
  );
}

export default Notifications;
