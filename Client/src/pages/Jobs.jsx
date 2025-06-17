import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMobileJob, getTopPicksJobs } from "../api/jobsAPI";
import ProfileFooter from "../components/util/ProfilUtil/ProfileFooter";
import TopPicks from "../components/jobs/TopPicks";
import ProfileInfoCard from "../components/Home/Sidebar/ProfileInfoCard";
import JobsOptions from "../components/jobs/preference/JobsOptions";
import PreferenceModal from "../components/jobs/preference/PreferenceModal";
import useUser from "../hooks/useUser";
import MobileJobOption from "../components/jobs/MobileJobOption";
import useThemeClasses from "../hooks/useThemeClasses";
import useScreenSize from "../hooks/useScreenSize";
import JobDetailModal from "../components/JobsCollection/JobDetails/JobDetailModal";

function Jobs() {
  const user = useUser();
  const { backgroundClass } = useThemeClasses();
  const { isMobile } = useScreenSize();

  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(user.jobPreference);
  const [showMobileJobDetails, setShowMobileJobDetails] = useState(false);
  const [topPickID, setTopPickID] = useState(null);

  const { data: JobsData = [], isLoading } = useQuery({
    queryKey: ["jobs", preferences],
    queryFn: () => getTopPicksJobs(preferences, isMobile),
    enabled: !!preferences,
  });
  const { data: MobileJobData, iLoading: isMobileDataLoading } = useQuery({
    queryFn: () => getMobileJob(topPickID),
    enabled: !!topPickID,
  });

  useEffect(() => {
    if (user?.jobPreference) {
      setPreferences(user.jobPreference);
    }
  }, [user?.jobPreference]);

  return (
    <div
      className={`${backgroundClass} flex min-h-screen w-full flex-col md:pt-2`}
    >
      {isMobile ? (
        <MobileJobOption setShowPreferences={setShowPreferences} />
      ) : null}

      <div className="container mx-auto w-full flex-grow md:px-4">
        <div className="grid w-full grid-cols-12 gap-6">
          <div className="col-span-3 hidden flex-col gap-5 md:flex">
            <ProfileInfoCard />
            <JobsOptions onOpenPreferences={() => setShowPreferences(true)} />
          </div>

          <div className="col-span-12 w-full md:col-span-8">
            <TopPicks
              preferences={preferences}
              showModal={setShowMobileJobDetails}
              job={JobsData}
              setTopPickID={setTopPickID}
              isLoading={isLoading}
            />
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
      {showMobileJobDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <JobDetailModal
            activeJobDetails={MobileJobData}
            isLoading={isMobileDataLoading}
            onClose={() => setShowMobileJobDetails(false)}
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
