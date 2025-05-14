/** @format */

// what we need is to
//1. Cut all the bloat from the user, request only the nessacary data to display the Profie Card
//2. Add a button to add the user as a connection
//3. Add a button to view the user's profile

import ProfileCard from "./ProfileCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/sllices/userSlice";
import { fetchSuggestedUsers } from "../../../api/userAPI";
import useThemeClasses from "../../../hooks/useThemeClasses";
function PeopleYouMayKnow() {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();
  const user = useSelector(selectUser);
  const exclude = [user._id, ...(user.connections || [])];

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["suggestedUsers", exclude],
      queryFn: ({ pageParam }) => fetchSuggestedUsers({ pageParam, exclude }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length + 1 : undefined,
    });

  return (
    <div
      className={`${componentBGColorClass} ${textColorClass} flex h-fit flex-col gap-3 p-3 md:gap-5 md:rounded-lg md:p-5 md:shadow-lg`}
    >
      <header className="flex items-center justify-between px-1 text-sm md:px-2 md:text-lg">
        <h1>People you may know</h1>
        <button
          className={`${hoverColorClass} rounded-lg p-1 text-xs font-semibold md:text-sm`}
        >
          See all
        </button>
      </header>
      <section className="grid grid-cols-2 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {isLoading ? (
          <p className={`${textColorClass} text-center`}>Loading...</p>
        ) : (
          data?.pages
            .flat()
            .map((suggestedUser) => (
              <ProfileCard
                key={suggestedUser._id}
                suggestedUser={suggestedUser}
              />
            ))
        )}
      </section>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          className="mt-3 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isFetching ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default PeopleYouMayKnow;
