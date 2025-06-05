import ProfileFooter from "../components/util/ProfilUtil/ProfileFooter";
import TopPicks from "../components/jobs/TopPicks";
import ProfileInfoCard from "../components/Home/Sidebar/ProfileInfoCard";
import JobsOptions from "../components/jobs/preference/JobsOptions";
import PreferenceModal from "../components/jobs/preference/PreferenceModal";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

function Jobs() {
  const user = useUser();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(user.jobPreference);

  useEffect(() => {
    if (user?.jobPreference) {
      setPreferences(user.jobPreference);
    }
  }, [user]);
  return (
    <div className={`min-h-screen`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 flex flex-col gap-5">
            <ProfileInfoCard />
            <JobsOptions onOpenPreferences={() => setShowPreferences(true)} />
          </div>

          <div className="col-span-8 flex flex-col">
            <TopPicks preferences={preferences} />
          </div>
        </div>
      </div>
      <ProfileFooter />
      {showPreferences && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <PreferenceModal
            onClose={() => setShowPreferences(false)}
            setPreferences={setPreferences}
            preferences={preferences}
          />
        </div>
      )}
    </div>
  );
}

export default Jobs;
