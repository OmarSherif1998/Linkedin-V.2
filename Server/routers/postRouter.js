/** @format */

import express from 'express';
import Post from '../schema/post.js';
import User from '../schema/user.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import mongoose from 'mongoose';
const postRouter = express.Router();

postRouter.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find({}); // Fetch all posts
		let UserPostData = [];
		if (posts.length > 0) {
			for (let i = 0; i < posts.length; i++) {
				const user = await User.findById(posts[i].user);
				UserPostData.push({
					...posts[i],
					uid: user._id,
					username: user.firstName + ' ' + user.lastName,
					bio: user.bio,
					profilePicture: user.profilePicture,
				});
			}

			res.json(UserPostData);
		} else {
			res.status(404).json({ message: 'No posts found' });
		}
	} catch (error) {
		console.error('Error fetching posts or user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

postRouter.post('/create', authenticateToken, async (req, res) => {
	const data = req.body; // Extract content from the request body

	const content = data[0].content;
	const uid = req.user.userId; // Assume you get the user's ID from the session or token

	// Validate that content is provided
	if (!content) {
		return res.status(400).send({ message: 'Content is required' });
	}

	try {
		// Create a new post
		const post = new Post({
			content: content,
			user: uid, // Associate the post with the user
		});

		// Save the post to the database
		await post.save();

		// Respond with the newly created post
		res.status(201).json(post);
	} catch (err) {
		// Handle errors
		console.error('BACKEND ERROR: Error saving post', err);
		res.status(500).send({ message: 'Error saving post' });
	}
});

postRouter.get('/like/:postId', async (req, res) => {
	const postID = req.params.postId;
	const userId = req.user.id;
	try {
		const post = await Post.findOne(postID);

		if (!post) {
			return res.status(404).send('BACKEND ERROR: Post not found');
		}

		if (post.likedBy.includes(userId)) {
			post.likesCount--;
			post.likedBy.pull(userId);
		} else {
			post.likesCount++;
			post.likedBy.push(userId);
		}
		await post.save();
		res.status(200).json(post);
	} catch (error) {
		res.status(500).send('BACKEND ERROR: Error updating like', error);
	}
});
export default postRouter;
