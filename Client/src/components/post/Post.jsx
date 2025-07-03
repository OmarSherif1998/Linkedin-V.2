/** @format */

import { forwardRef, useEffect, useMemo, useState } from 'react';
import { AddComment } from '../../api/postAPI.js';
import CommentSection from './CommentSection.jsx';
import CommentBox from './CommentBox.jsx';
import PostNav from './PostNav.jsx';
import PostHeader from './PostHeader.jsx';
import InteractionButtons from './InteractionButtons.jsx';
import InteractionInsights from './InteractionInsights.jsx';
import PostBody from './PostBody.jsx';
import useThemeClasses from '../../hooks/useThemeClasses.js';

const Post = forwardRef(({ postData, user, hasNav = true }, ref) => {
  const { componentBGColorClass, darkMode } = useThemeClasses();

  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [likesCount, setLikesCount] = useState(postData?.likesCount || 0);
  const [commentInput, setCommentInput] = useState('');
  const username =
    postData.username || postData.user.firstName + ' ' + postData.user.lastName;

  const profilePicture =
    postData.profilePicture || postData.user.profilePicture;

  const bio = postData.bio || postData.user.bio;
  const posterUserID = postData.userID || postData.user;
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
        setCommentInput('');
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
  // console.log(postData);
  const filteredComments = useMemo(() => {
    return postComments?.filter((comment) => comment.post === postData._id);
  }, [postComments, postData._id]);
  return (
    <article
      ref={ref}
      className={`mb-[.5rem] w-full lg:rounded-xl ${darkMode ? '' : 'border'} border-gray-200 ${componentBGColorClass} p-[1rem] pb-0`}
    >
      {hasNav && <PostNav />}

      <PostHeader
        connectionStatus={postData.connectionStatus}
        profilePicture={profilePicture}
        bio={bio}
        createdAt={postData.createdAt}
        username={username}
        posterUserID={posterUserID}
        connections={user.connections}
        userID={user._id}
      />

      <PostBody postData={postData} />

      <footer>
        <InteractionInsights
          postData={postData}
          likesCount={likesCount}
          commentsCount={postData.commentsCount}
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
        {isCommentSectionOpen && (
          <CommentBox
            profilePicture={user.profilePicture}
            handleComment={handleComment}
            handleCommentUpdate={handleCommentUpdate}
            handleCommentInput={handleCommentInput}
            commentInput={commentInput}
          />
        )}
        <CommentSection
          isCommentSectionOpen={isCommentSectionOpen}
          filteredComments={filteredComments}
        />
      </footer>
    </article>
  );
});
export default Post;
