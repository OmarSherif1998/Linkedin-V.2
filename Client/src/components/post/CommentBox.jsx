import React from "react";

function CommentBox({
  profilePicture,
  handleCommentInput,
  handleComment,
  commentInput,
}) {
  return (
    <form
      className="flex items-center gap-2 mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleComment(e);
      }}
    >
      <img
        src={profilePicture}
        alt="User profile"
        className="object-contain w-8 h-8 bg-white border rounded-full"
      />

      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full px-4 py-1 text-sm border border-gray-300 rounded-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        onChange={handleCommentInput}
        value={commentInput}
        aria-label="Comment input"
      />

      <button
        type="submit"
        className="px-4 py-1 text-sm text-white transition-all bg-blue-500 rounded-full hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 2xl:hidden"
      >
        Send
      </button>
    </form>
  );
}

export default CommentBox;
