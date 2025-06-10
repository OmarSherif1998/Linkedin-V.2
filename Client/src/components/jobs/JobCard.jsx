import timeAgo from "../../functions/timeAgo";
import useNavigation from "../../hooks/useNavigation";
import useThemeClasses from "../../hooks/useThemeClasses";

function JobCard({ job }) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  const { NavigateToJobCollection } = useNavigation();
  return (
    <div onClick={() => NavigateToJobCollection(job._id)}>
      <div className={`${hoverColorClass} cursor-pointer rounded-lg p-2`}>
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={job.company.profilePicture}
              alt={job.company.name}
              className="object-cover w-12 h-12"
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

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">{timeAgo(job?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
