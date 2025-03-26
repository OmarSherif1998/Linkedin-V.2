import React from "react";
import { calcDates } from "../../functions/calcDates";

function CommentSection({ isCommentSectionOpen, filteredComments }) {
  return (
    <div className="text-[8px] md:text-xs">
      {isCommentSectionOpen ? (
        <section className="rounded-md bg-white p-4 shadow-sm">
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
                    <p>
                      {comment.user.firstName + " " + comment.user.lastName}
                    </p>
                  </button>

                  <p className="ml-8 mt-1 text-sm text-gray-700">
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
            <p className="text-center text-gray-500">
              There's no comments on this post yet
            </p>
          )}
        </section>
      ) : null}
    </div>
  );
}

export default CommentSection;
