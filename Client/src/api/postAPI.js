/** @format */

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/post/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
});
const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");

    return response.data;
  } catch (error) {
    console.error("POST API ERROR: ", error);
  }
};
const createPost = async (content, token) => {
  try {
    const response = await axiosInstance.post("/create", content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST API ERROR: ", error);
  }
};
const getUserPosts = async (userId) => {
  //console.log(userId);
  try {
    console.log("Trying to fetch posts...");
    const response = await axiosInstance.get(`/PostsByUID/${userId}`);
    //	console.log('posts fetched');
    return response.data;
  } catch (error) {
    console.error("POST API ERROR: ", error);
  }
};

const deletePost = async (postID) => {};
const LikePost = async (postID, userID, token) => {
  const data = { postID, userID };
  try {
    //console.log('Trying to like post...');
    const response = await axiosInstance.post("/like", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log('Post liked');
    return response;
  } catch (error) {
    console.error("POST API ERROR: ", error);
  }
};
const AddComment = async (content, userID, postID) => {
  const data = { content, userID, postID };
  try {
    const response = await axiosInstance.post("/addComment", data);
    return response.data;
  } catch (error) {
    console.error("POST API ERROR: ", error);
  }
};
const getUserComments = async (userId) => {
  console.log(userId);
  try {
    const response = await axiosInstance.get("/getComments", {
      params: { userId }, // Use params to send query parameters
    });
    return response.data;
  } catch (error) {
    console.error("GET API ERROR: ", error);
  }
};

export {
  createPost,
  deletePost,
  fetchPosts,
  getUserPosts,
  getUserComments,
  LikePost,
  AddComment,
};
