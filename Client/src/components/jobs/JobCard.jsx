import timeAgo from "../../functions/timeAgo";
import useNavigation from "../../hooks/useNavigation";
import useScreenSize from "../../hooks/useScreenSize";
import useThemeClasses from "../../hooks/useThemeClasses";

function JobCard({ job, showModal, setTopPickID }) {
  const { textColorClass, hoverColorClass, borderColor } = useThemeClasses();
  const { NavigateToJobCollection } = useNavigation();
  const { isMobile } = useScreenSize();
  const handleClick = () => {
    if (isMobile) {
      showModal(true);
      setTopPickID(job._id);
    } else {
      NavigateToJobCollection(job._id);
    }
  };
  return (
    <div onClick={handleClick}>
      <div
        className={`${hoverColorClass} md:boder-none cursor-pointer border-b ${borderColor} p-2 md:rounded-lg`}
      >
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={job.company.profilePicture}
              alt={job.company.name}
              className="h-12 w-12 object-cover"
            />

            <div className="flex flex-col">
              <h3 className={`text-lg font-semibold ${textColorClass}`}>
                {job.title}
              </h3>
              <section className="flex gap-1">
                {" "}
                <p className={`text-sm ${textColorClass}`}>
                  {job.company.name}
                </p>
                <p className="text-sm text-gray-500">
                  {job.location.city}, {job.location.country}{" "}
                  {job.location.isRemote ? "· Remote" : "· On-site"}
                </p>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">{timeAgo(job?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
