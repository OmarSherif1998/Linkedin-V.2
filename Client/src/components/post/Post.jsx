/** @format */

import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { AddComment } from "../../api/postAPI.js";
import CommentSection from "./CommentSection.jsx";
import CommentBox from "./CommentBox.jsx";
import PostNav from "./PostNav.jsx";
import PostHeader from "./PostHeader.jsx";
import InteractionButtons from "./InteractionButtons.jsx";
import InteractionInsights from "./InteractionInsights.jsx";
import PostBody from "./PostBody.jsx";

const Post = forwardRef(({ postData, user }, ref) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [likesCount, setLikesCount] = useState(postData?.likesCount || 0);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    setPostComments(postData.comments);
    setLikesCount(postData.likesCount);
  }, [postData]);

  const handleLikeUpdate = (newLikesCount) => {
    setLikesCount(newLikesCount);
  };
  const handleCommentUpdate = () => {
    setIsCommentSectionOpen(!isCommentSectionOpen);
  };
  const handleCommentInput = (e) => {
    setCommentInput(e.target.value);
  };
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await AddComment(commentInput, user._id, postData._id);

      if (response) {
        console.log("got here");
        setCommentInput("");
        setPostComments((prevComments) => [response, ...prevComments]);
        postData.commentsCount++;
        if (!isCommentSectionOpen) {
          setIsCommentSectionOpen(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredComments = useMemo(() => {
    return postComments.filter((comment) => comment.post === postData._id);
  }, [postComments, postData._id]);

  return (
    <article
      ref={ref}
      className="mb-[0.5rem] w-full border border-gray-200 bg-white p-[0.9375rem] shadow-2xl"
    >
      <PostNav />

      <PostHeader postData={postData} user={user} />

      <PostBody postData={postData} />

      <footer>
        <InteractionInsights
          postData={postData}
          likesCount={likesCount}
          handleCommentUpdate={handleCommentUpdate}
        />
        <InteractionButtons
          handleLikeUpdate={handleLikeUpdate}
          handleCommentUpdate={handleCommentUpdate}
          postID={postData._id}
          likedBy={postData.likedBy}
          likesCount={likesCount}
          userID={user?._id}
        />
        <CommentBox
          profilePicture={user.profilePicture}
          handleComment={handleComment}
          handleCommentUpdate={handleCommentUpdate}
          handleCommentInput={handleCommentInput}
          commentInput={commentInput}
        />
        <CommentSection
          isCommentSectionOpen={isCommentSectionOpen}
          filteredComments={filteredComments}
        />
      </footer>
    </article>
  );
});
export default Post;
