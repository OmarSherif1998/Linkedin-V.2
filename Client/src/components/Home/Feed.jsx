/** @format */

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/postAPI.js";
import { getSocket } from "../../Sockets/Sockets.js";
import LazyLoading from "../util/LazyLoading.jsx";
import Post from "../post/Post";
import PostSection from "../post/PostSection.jsx";
import PostModal from "../post/PostModal.jsx";

import useThemeClasses from "../../hooks/useThemeClasses.js";
import queryClient from "../../functions/queryClient.js";

function Feed({ user }) {
  const { backgroundClass, componentBGColorClass, borderClass } =
    useThemeClasses();
  const [postModal, setPostModal] = useState(false);
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60000, // Keep data fresh for 1 min
  });

  // Handle opening/closing post form
  const handleForm = (e) => {
    e.preventDefault();
    setPostModal((prev) => !prev);
  };

  useEffect(() => {
    const socket = getSocket("Feed", user?._id);

    socket.on("PostContent", (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) => [
        newPost,
        ...(oldPosts || []),
      ]);
    });

    return () => {
      socket.off("PostContent");
    };
  }, [user?._id]);

  return (
    <div className={`relative w-full lg:w-[40%] ${backgroundClass}`}>
      {postModal && <PostModal handleClose={handleForm} />}

      <div
        className={`${componentBGColorClass} z-0 mb-[1.25rem] hidden rounded-[0.625rem] ${borderClass} px-[2rem] py-[2rem] pb-[1.25rem] shadow-lg lg:block`}
      >
        <PostSection
          profilePicture={user?.profilePicture}
          handleForm={handleForm}
        />
      </div>

      {isLoading ? (
        <div className="flex w-full flex-col p-[1rem]">
          <LazyLoading />
          <LazyLoading />
          <LazyLoading />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error fetching posts.</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">
          No updates at this time, please check again later.
        </div>
      ) : (
        posts?.map((data) => (
          <Post key={data._id} postData={data} user={user} />
        ))
      )}
    </div>
  );
}

export default Feed;
