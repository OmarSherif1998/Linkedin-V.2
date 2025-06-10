import { useEffect, useState } from "react";
import ProfileFooter from "../components/util/ProfilUtil/ProfileFooter";
import TopPicks from "../components/jobs/TopPicks";
import ProfileInfoCard from "../components/Home/Sidebar/ProfileInfoCard";
import JobsOptions from "../components/jobs/preference/JobsOptions";
import PreferenceModal from "../components/jobs/preference/PreferenceModal";
import useUser from "../hooks/useUser";

function Jobs() {
  const user = useUser();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(user.jobPreference);

  useEffect(() => {
    if (user?.jobPreference) {
      setPreferences(user.jobPreference);
    }
  }, [user?.jobPreference]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex-grow px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="flex flex-col col-span-3 gap-5">
            <ProfileInfoCard />
            <JobsOptions onOpenPreferences={() => setShowPreferences(true)} />
          </div>

          <div className="flex flex-col col-span-8">
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
      <div className="ml-20">
        <ProfileFooter />
      </div>
    </div>
  );
}

export default Jobs;
