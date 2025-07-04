/** @format */

import { calcDates } from "../../../functions/calcDates.js";
import useThemeClasses from "../../../hooks/useThemeClasses";
function ActivityPost({ posts, username }) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  const date = calcDates(posts);

  return (
    <div className="flex flex-col opacity-80">
      {posts?.length > 0 ? (
        posts.map((data, index) => (
          <div
            key={index}
            className={`mt-2 flex w-full flex-col border-t border-gray-400 p-4 ${hoverColorClass}`}
          >
            <div className="flex items-center gap-2 py-2">
              <h3 className="text-xs text-gray-600">
                {username + ` posted this • ${date[index]} ago`}
              </h3>
            </div>
            <section className="flex cursor-pointer flex-col">
              <section className="flex items-start gap-3">
                {data.media.length > 0 ? (
                  <img src={data.media} alt="" className="size-20 rounded-md" />
                ) : null}
                <p className={`text-sm ${textColorClass}`}>{data?.content}</p>
              </section>

              <section
                className={`${textColorClass} mt-5 flex justify-between gap-2 text-[12px]`}
              >
                <p className={`hover:text-LinkedInBlue`}>
                  {data.likesCount} likes
                </p>

                <p className={`hover:text-LinkedInBlue`}>
                  {data.commentsCount} comments
                </p>
              </section>
            </section>
          </div>
        ))
      ) : (
        <p className={`${textColorClass}`}>No posts available.</p>
      )}
    </div>
  );
}

export default ActivityPost;
