/** @format */

import React from "react";
import { calcDates } from "../../../functions/calcDates";

function ActivityComment({ comments, userDetails }) {
  const date = calcDates(comments);
  return (
    <div className="flex cursor-pointer flex-col gap-2 opacity-80 hover:bg-gray-100">
      {comments?.length > 0 ? (
        comments?.map((data, index) => (
          <div
            key={index}
            className="flex w-full flex-col border-t border-gray-400 p-4"
          >
            <div className="flex items-start gap-2 p-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs text-gray-600">
                  {userDetails?.username +
                    ` commented on a post • ${date[index]} ago`}
                </h3>
              </div>
            </div>
            <p className="ml-12 text-sm">{data?.content}</p>
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
