import React from "react";
import { calcDates } from "../../functions/calcDates.js";
import useThemeClasses from "../../hooks/useThemeClasses.js";

function CommentSection({ isCommentSectionOpen, filteredComments }) {
  const { componentBGColorClass, textColorClass, darkMode } = useThemeClasses();
  return (
    <div className="text-[8px] md:text-xs">
      {isCommentSectionOpen ? (
        <section
          className={`${componentBGColorClass} rounded-md p-4 shadow-sm`}
        >
          {filteredComments.length > 0 ? (
            filteredComments.map((comment, index) => (
              <div
                key={comment._id}
                className="mt-4 flex items-start gap-2 p-3 shadow-md"
              >
                <div className="flex flex-col">
                  <button className="flex items-center gap-2 text-sm font-semibold hover:underline">
                    <img
                      src={comment.user.profilePicture}
                      alt="Profile"
                      className="flex h-[1.5rem] w-[1.5rem] rounded-full object-cover"
                    />
                    <section className="flex flex-col items-start">
                      <p className={`${textColorClass}`}>
                        {comment.user.firstName + " " + comment.user.lastName}
                      </p>
                      <p
                        className={`w-[60%] truncate text-[9px] text-gray-600`}
                      >
                        {comment.user.bio}
                      </p>
                    </section>
                  </button>

                  <p
                    className={`${darkMode ? textColorClass : "text-gray-700"} ml-8 mt-1 text-sm`}
                  >
                    {comment.content}
                  </p>
                  <section className="ml-5 flex gap-2">
                    <div className="mt-1 flex items-center gap-2 text-gray-500">
                      <button className="hover:text-blue-600">Like</button>
                      <button>Reply</button>
                      <p className="ml-auto text-gray-500">
                        {calcDates(comment.createdAt) + " ago"}
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            ))
          ) : (
            <p className={`${componentBGColorClass} text-center text-gray-500`}>
              There's no comments on this post yet
            </p>
          )}
        </section>
      ) : null}
    </div>
  );
}

export default CommentSection;
