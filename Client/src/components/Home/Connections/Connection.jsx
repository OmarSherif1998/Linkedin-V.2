/** @format */
import { fetchSuggestedUsers } from "../../../api/userAPI";
import { useQuery } from "@tanstack/react-query";
import EastIcon from "@mui/icons-material/East";
import useThemeClasses from "../../../hooks/useThemeClasses";
import NewUser from "./NewUser";
import LoadingSpinner from "../../util/LoadingSpinner";
import { useNavigation } from "../../../hooks/useNavigation";
import useUser from "../../../hooks/useUser";
function Connection({ pageSpecs }) {
  const { componentBGColorClass, borderClass, textColorClass, darkMode } =
    useThemeClasses();
  const { _id, connections } = useUser();
  const { NavigateToMyNetwork } = useNavigation();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: () =>
      fetchSuggestedUsers({
        pageParam: 1,
        exclude: [_id, ...connections],
        limit: 4,
      }),
  });
  return (
    <div
      className={`${componentBGColorClass} ${borderClass} flex h-fit flex-col rounded-md border-gray-300 p-2 shadow-xl`}
    >
      <div className="flex flex-col p-2">
        <div className="flex gap-1">
          <h2
            className={`${darkMode ? textColorClass : "text-gray-600"} text-base font-medium`}
          >
            {pageSpecs?.title}
          </h2>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          users?.map((user, index) => (
            <div key={index}>
              <NewUser
                Name={user.firstName}
                bio={user.bio}
                pic={user.profilePicture}
                _id={user._id}
              />
            </div>
          ))
        )}
      </div>
      <button
        className={`flex items-center ${textColorClass} hover:bg-BgColor justify-center gap-1 rounded-md`}
        onClick={NavigateToMyNetwork}
      >
        <h1>View all recommendations </h1>
        <EastIcon fontSize="sm" />
      </button>
    </div>
  );
}

export default Connection;
