/** @format */

import SettingsSection from "../SectionForm";
import {
  AccountManagement,
  Display,
  GeneralPreferences,
  ProfileInformationData,
  SubscriptionsPayments,
  SyncingOptions,
} from "../../../staticData/SettingsData";
import { useOutletContext } from "react-router-dom";

const sections = [
  { StaticDate: ProfileInformationData, title: "Profile Information Data" },
  { StaticDate: Display, title: "Display" },
  { StaticDate: GeneralPreferences, title: "General Preferences" },
  { StaticDate: SyncingOptions, title: "Syncing Options" },
  { StaticDate: SubscriptionsPayments, title: "Subscriptions and Payments" },
  { StaticDate: AccountManagement, title: "Account Management" },
];

function AccountPreferences() {
  const { formWidth, isMobile } = useOutletContext();

  return (
    <div className={`flex flex-col gap-5 ${formWidth} h-screen sm:h-fit`}>
      <SettingsSection
        sectionTitle="Account Preferences"
        sections={sections}
        isMobile={isMobile}
      />
    </div>
  );
}

export default AccountPreferences;
