/** @format */

import axios from 'axios';
import { Base_URL } from './baseURL';

const axiosInstance = axios.create({
  baseURL: `${Base_URL}/post/`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});
const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('CLIENT ERROR: postAPI.js, Error fetching posts:', error);
  }
};
const createPost = async (content, token) => {
  try {
    const response = await axiosInstance.post('/create', content, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('CLIENT ERROR: postAPI.js, Error creating post:', error);
  }
};
const getUserPosts = async (userId) => {
  //console.log(userId);
  try {
    console.log('Trying to fetch posts...');
    const response = await axiosInstance.get(`/PostsByUID/${userId}`);
    //	console.log('posts fetched');
    return response.data;
  } catch (error) {
    console.error('POSTAPI, ERROR FETCHING USER POSTS:', error);
  }
};

const deletePost = async (postID) => {};
const LikePost = async (postID, userID, token) => {
  const data = { postID, userID };
  try {
    //console.log('Trying to like post...');
    const response = await axiosInstance.post('/like', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); //console.log('Post liked');
    return response;
  } catch (error) {
    console.error('POSTAPI, ERROR LIKING POST:', error);
  }
};
const AddComment = async (content, userID, postID) => {
  const data = { content, userID, postID };
  try {
    const response = await axiosInstance.post('/addComment', data);
    return response.data;
  } catch (error) {
    console.error('POSTAPI, ERROR ADDING COMMENT:', error);
  }
};
const getUserComments = async (userId) => {
  console.log(userId);
  try {
    const response = await axiosInstance.get('/getComments', {
      params: { userId }, // Use params to send query parameters
    });
    return response.data;
  } catch (error) {
    console.error('POSTAPI, ERROR FETCHING USER COMMENTS:', error);
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
