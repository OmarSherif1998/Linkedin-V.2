import ProfileFooter from "../components/util/ProfilUtil/ProfileFooter";
import TopPicks from "../components/jobs/TopPicks";
import JobDetails from "../components/jobs/JobDetails";
import MyJobs from "../components/jobs/MyJobs";
import MyApplications from "../components/jobs/MyApplications";
import ProfileInfoCard from "../components/Home/Sidebar/ProfileInfoCard";

function Jobs() {
  return (
    <div className={`min-h-screen`}>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - My Jobs */}
          <div className="flex flex-col col-span-3 gap-5">
            <ProfileInfoCard />
            <MyJobs />
            <MyApplications />
          </div>

          {/* Main Content - Jobs List */}
          <div className="col-span-5">
            <TopPicks />
          </div>
        </div>
      </div>
      <ProfileFooter />
    </div>
  );
}

export default Jobs;
