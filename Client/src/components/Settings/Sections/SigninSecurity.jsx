/** @format */

import SettingsSection from "../SectionForm";
import { getSigninSecurityData } from "../../../staticData/SettingsData";
import { useOutletContext } from "react-router-dom";
import useUser from "../../../hooks/useUser";

function SigninSecurity() {
  const { formWidth, isMobile } = useOutletContext();
  const user = useUser();
  const sections = [
    {
      StaticDate: getSigninSecurityData(user),
      title: "Account Access",
    },
  ];

  return (
    <div className={`${formWidth} flex h-fit flex-col gap-5`}>
      <SettingsSection
        sectionTitle="Sign in & Security"
        sections={sections}
        isMobile={isMobile}
      />
    </div>
  );
}

export default SigninSecurity;
