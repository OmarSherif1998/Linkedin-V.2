import { useEffect, useState } from "react";
import ProfileFooter from "../components/util/ProfilUtil/ProfileFooter";
import TopPicks from "../components/jobs/TopPicks";
import ProfileInfoCard from "../components/Home/Sidebar/ProfileInfoCard";
import JobsOptions from "../components/jobs/preference/JobsOptions";
import PreferenceModal from "../components/jobs/preference/PreferenceModal";
import useUser from "../hooks/useUser";
import MobileJobOption from "../components/jobs/MobileJobOption";
import useThemeClasses from "../hooks/useThemeClasses";

function Jobs() {
  const user = useUser();
  const { backgroundClass } = useThemeClasses();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(user.jobPreference);
  const [showMobileJobDetails, setSsMobileJobDetailsOpen] = useState(false);
  useEffect(() => {
    if (user?.jobPreference) {
      setPreferences(user.jobPreference);
    }
  }, [user?.jobPreference]);
  return (
    <div
      className={`${backgroundClass} flex min-h-screen w-full flex-col md:pt-2`}
    >
      <div className="md:hidden">
        <MobileJobOption />
      </div>

      <div className="container mx-auto w-full flex-grow md:px-4">
        <div className="grid w-full grid-cols-12 gap-6">
          <div className="col-span-3 hidden flex-col gap-5 md:flex">
            <ProfileInfoCard />
            <JobsOptions onOpenPreferences={() => setShowPreferences(true)} />
          </div>

          <div className="col-span-12 flex w-full flex-col md:col-span-8">
            <TopPicks preferences={preferences} />
          </div>
        </div>
      </div>

      {showPreferences && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <PreferenceModal
            onClose={() => setShowPreferences(false)}
            setPreferences={setPreferences}
            preferences={preferences}
          />
        </div>
      )}
      <div className="ml-20 hidden md:block">
        <ProfileFooter />
      </div>
    </div>
  );
}

export default Jobs;
