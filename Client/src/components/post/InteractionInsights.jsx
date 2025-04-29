import React from "react";

function InteractionInsights({
  postData,
  likesCount,
  commentsCount,
  handleCommentUpdate,
}) {
  return (
    <div className="flex justify-end gap-1 px-2">
      {" "}
      <section className="mr-auto flex gap-1 text-sm font-medium text-gray-700">
        {likesCount > 0 && (
          <>
            <span className="text-blue-600">{likesCount}</span>
            <span className="text-gray-500"> Likes</span>
          </>
        )}
      </section>
      <section>
        <button
          onClick={handleCommentUpdate}
          className="flex gap-1 text-sm font-medium text-gray-700"
        >
          {commentsCount > 0 && (
            <>
              <span className="text-blue-600">{commentsCount}</span>
              <span className="text-gray-500"> Comments</span>
            </>
          )}
        </button>
        <div className="flex gap-1 text-sm font-medium text-gray-700">
          {postData.sharesCount > 0 && (
            <>
              <span className="text-blue-600">{postData.sharesCount}</span>
              <span className="text-gray-500"> Shares</span>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default InteractionInsights;
