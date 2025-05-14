import React from "react";
import useThemeClasses from "../../hooks/useThemeClasses.js";

function CommentBox({
  profilePicture,
  handleCommentInput,
  handleComment,
  commentInput,
}) {
  const { componentBGColorClass } = useThemeClasses();
  return (
    <form
      className="mt-5 flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleComment(e);
      }}
    >
      <img
        src={profilePicture}
        alt="User profile"
        className="h-8 w-10 rounded-full border object-cover"
      />

      <input
        type="text"
        placeholder="Add a comment..."
        className={`w-full rounded-full border border-gray-300 px-4 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${componentBGColorClass}`}
        onChange={handleCommentInput}
        value={commentInput}
        aria-label="Comment input"
      />

      <button
        type="submit"
        className="rounded-full bg-blue-500 px-4 py-1 text-sm text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 2xl:hidden"
      >
        Send
      </button>
    </form>
  );
}

export default CommentBox;
