/** @format */

import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../api/postAPI.js";
import { initializeSocket } from "../../Sockets/Sockets.js";
import LazyLoading from "../util/LazyLoading.jsx";
import Post from "../post/Post";
import PostSection from "../post/PostSection.jsx";
import PostModal from "../post/PostModal.jsx";

function Feed({ user }) {
  const queryClient = useQueryClient();
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
    // Set up socket connection for real-time posts
    const socket = initializeSocket();
    socket.on("PostContent", (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) => [
        newPost,
        ...(oldPosts || []),
      ]);
    });

    return () => {
      socket.off("PostContent");
    };
  }, []);

  return (
    <div className="relative w-full lg:w-[40%]">
      {postModal && <PostModal handleClose={handleForm} />}

      <div className="z-0 mb-[1.25rem] hidden cursor-pointer rounded-[0.625rem] border bg-white px-[2rem] py-[2rem] pb-[1.25rem] shadow-lg lg:block">
        <PostSection
          profilePicture={user?.profilePicture}
          handleForm={handleForm}
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col">
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
