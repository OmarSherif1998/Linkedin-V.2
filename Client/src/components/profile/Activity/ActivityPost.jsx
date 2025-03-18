/** @format */

import React from "react";
import { calcDates } from "../../../functions/calcDates.js";
function ActivityPost({ posts, userDetails }) {
  const date = calcDates(posts);

  return (
    <div className="flex flex-col opacity-80">
      {posts?.length > 0 ? (
        posts.map((data, index) => (
          <div
            key={index}
            className="flex w-full flex-col border-t border-gray-400 p-4 hover:bg-gray-100"
          >
            <div className="flex items-center gap-2 py-2">
              <h3 className="text-xs text-gray-600">
                {userDetails?.username + ` posted this • ${date[index]} ago`}
              </h3>
            </div>
            <section className="flex cursor-pointer flex-col">
              <section className="flex items-start gap-3">
                <img src={data?.media} alt="" className="size-20 rounded-md" />
                <p className="text-sm">{data?.content}</p>
              </section>
              <section className="mt-5 flex justify-between gap-2 text-[12px] hover:text-LinkedInBlue">
                <p>{data.likesCount} likes</p>

                <p>{data.commentsCount} comments</p>
              </section>
            </section>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default ActivityPost;
