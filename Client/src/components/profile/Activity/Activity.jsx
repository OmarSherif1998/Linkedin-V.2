/** @format */

import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ActivityPost from "./ActivityPost.jsx";
import ActivityComment from "./ActivityComment.jsx";
import useThemeClasses from "../../../hooks/useThemeClasses";

function Activity({ connectionCount, username, posts, comments }) {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();
  const [isPostActive, setIsPostActive] = useState(true);
  const [isCommentActive, setIsCommentActive] = useState(false);

  const togglePostActive = () => {
    if (isPostActive) return;
    setIsPostActive(!isPostActive);
    setIsCommentActive(!isCommentActive);
  };
  const toggleCommentActive = () => {
    if (isCommentActive) return;
    setIsCommentActive(!isCommentActive);
    setIsPostActive(!isPostActive);
  };

  // Define classes for active and inactive states
  const baseClasses = "px-4 border  rounded-full w-fit transition-colors";
  const activeClasses = "bg-green-700 text-white";
  const inactiveClasses = "hover:bg-green-700 hover:text-white";

  const PostbuttonClasses = `${baseClasses} ${
    isPostActive ? activeClasses : inactiveClasses
  }`;
  const CommentbuttonClasses = `${baseClasses} ${
    isCommentActive ? activeClasses : inactiveClasses
  }`;

  return (
    <div>
      <div
        className={`flex flex-col gap-3 p-4 ${componentBGColorClass} border-gray-400 md:rounded-t-lg md:border md:border-b-0 md:shadow-xl`}
      >
        <div className="flex flex-col">
          <h1 className={`text-lg font-semibold ${textColorClass}`}>
            Activity
          </h1>
          <span className={`text-xs ${textColorClass}`}>
            {connectionCount + " followers"}
          </span>
        </div>
        <div className={`flex gap-2 ${textColorClass}`}>
          <button className={PostbuttonClasses} onClick={togglePostActive}>
            Posts
          </button>
          <button
            className={CommentbuttonClasses}
            onClick={toggleCommentActive}
          >
            Comments
          </button>
        </div>
        {isPostActive && <ActivityPost posts={posts} username={username} />}
        {isCommentActive && (
          <ActivityComment comments={comments} username={username} />
        )}
      </div>
      <div
        className={`${hoverColorClass} flex cursor-pointer items-center justify-center gap-1 border border-gray-400 ${componentBGColorClass} py-2 ${textColorClass} shadow-xl md:rounded-b-lg`}
      >
        {isPostActive ? (
          <button>
            Show all posts <ArrowRightAltIcon />{" "}
          </button>
        ) : (
          <button>
            Show all comments <ArrowRightAltIcon />{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default Activity;
