/** @format */

import { calcDates } from "../../../functions/calcDates";
import useThemeClasses from "../../../hooks/useThemeClasses";

function ActivityComment({ comments, username }) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  const date = calcDates(comments);
  return (
    <div className={`flex cursor-pointer flex-col gap-2 opacity-80`}>
      {comments?.length > 0 ? (
        comments?.map((data, index) => (
          <div
            key={index}
            className={`flex w-full flex-col border-t border-gray-400 p-4 ${hoverColorClass}`}
          >
            <div className={`flex items-start gap-2 p-2`}>
              <div className="flex flex-col gap-1">
                <h3 className="text-xs text-gray-600">
                  {username + ` commented on a post • ${date[index]} ago`}
                </h3>
              </div>
            </div>
            <p className={`ml-12 text-sm ${textColorClass}`}>{data?.content}</p>
            <img src={data?.media} alt="" />
          </div>
        ))
      ) : (
        <p>No Comments available.</p>
      )}
    </div>
  );
}

export default ActivityComment;
