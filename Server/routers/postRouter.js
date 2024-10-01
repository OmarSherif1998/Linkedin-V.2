/** @format */

import express from 'express';
import Post from '../schema/post.js';
import User from '../schema/user.js';
import Comment from '../schema/comment.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import mongoose from 'mongoose';
import { io } from '../index.js';
const postRouter = express.Router();

postRouter.post('/create', authenticateToken, async (req, res) => {
	const data = req.body;
	//	console.log('data: ', data);
	const content = data[0].content;
	const media = data[0].postPic;
	const uid = req.user.userId; // Assume you get the user's ID from the session or token

	// Validate that content is provided
	if (!content) {
		return res.status(400).send({ message: 'Content is required' });
	}

	try {
		// Create a new post
		const post = new Post({
			content: content,
			media: media,
			user: uid, // Associate the post with the user
		});

		// Save the post to the database
		const savedPost = await post.save();

		// Handle custom message events from the client

		// Update the user document to include this post reference
		await User.findByIdAndUpdate(
			uid,
			{ $push: { posts: savedPost._id } }, // Push the post ID into the posts array
			{ new: true } // Return the updated user document
		);
		// Respond with the newly created post
		res.status(201).json(post);
		//console.log('post: ', post);
		io.emit('PostContent', {
			...post._doc,
			username: data[0].username,
			profilePicture: data[0].profilePicture,
			bio: data[0].bio,
		});
	} catch (err) {
		// Handle errors
		console.error('BACKEND ERROR: Error saving post', err);
		res.status(500).send({ message: 'Error saving post' });
	}
});

postRouter.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find({})
			.populate({
				path: 'comments',
				populate: {
					path: 'user',
					select: 'firstName lastName profilePicture',
				},
			})
			.sort({ createdAt: -1 }); // Fetch all posts

		let UserPostData = [];

		if (posts.length > 0) {
			for (let i = 0; i < posts.length; i++) {
				const user = await User.findById(posts[i].user);
				if (user) {
					UserPostData.push({
						...posts[i]._doc, // Ensure you're copying the document data correctly
						username: user.firstName + ' ' + user.lastName,
						bio: user.bio,
						profilePicture: user.profilePicture,
					});
				} else {
					console.log(`User with id ${posts[i].user} not found`);
				}
			}

			//console.log('Userpost: ', JSON.stringify(UserPostData[0], null, 2)); // Pretty print the first post

			res.json(UserPostData);
		} else {
			res.status(201).json({ message: 'No posts found' });
		}
	} catch (error) {
		console.error('Error fetching posts or user:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

postRouter.get('/PostsByUID/:userId', async (req, res) => {
	const user = req.params.userId;
	const objectId = new mongoose.Types.ObjectId(user);

	// Find all posts where the 'user' field matches the provided ObjectId
	const posts = await Post.find({ user: objectId });
	if (posts.length === 0) {
		return res.status(404).json({ message: 'No posts found' });
	}
	try {
		res.json(posts);
	} catch (error) {
		console.error('Error fetching posts or user:', error);
	}
});

postRouter.post('/like', authenticateToken, async (req, res) => {
	const { postID, userID } = req.body;

	try {
		// Use findById to get a single post
		const post = await Post.findById(postID);

		if (!post) {
			// Return an error if the post is not found
			return res.status(404).send({
				error: 'BACKEND ERROR: Post not found',
			});
		}

		// Check if the user has already liked the post
		if (post.likedBy.includes(userID)) {
			post.likesCount--;
			post.likedBy.pull(userID); // Remove user from likedBy array
		} else {
			post.likesCount++;
			post.likedBy.push(userID); // Add user to likedBy array
		}

		// Save the updated post
		await post.save();
		//console.log('updated post: ', post);

		// Send the updated post as the response
		res.status(200).json(post);
	} catch (error) {
		console.error('Error updating like: ', error);
		res
			.status(500)
			.send({ error: 'Error updating like', details: error.message });
	}
});

postRouter.post('/addComment', async (req, res) => {
	const { content, userID, postID } = req.body;
	if (!content || !userID || !postID) {
		return res.status(400).send({ message: 'All fields are required' });
	}
	try {
		const comment = new Comment({
			content: content,
			user: userID,
			post: postID,
		});
		await comment.populate({
			path: 'user',
			select: 'firstName lastName profilePicture',
		});
		//console.log('Comment: ', comment);
		const savedComment = await comment.save();
		//console.log('Saved Comment: ', savedComment);
		// Update the post and user documents to include this comment reference
		await User.findByIdAndUpdate(userID, {
			$push: { comments: savedComment._id },
		});
		await Post.findByIdAndUpdate(postID, {
			$push: { comments: savedComment._id },
			$inc: { commentsCount: 1 },
		});

		return res.status(201).json(savedComment);
	} catch (error) {
		console.error('BACKEND ERROR: Error saving post', error);
		res.status(500).send({ message: 'Error saving post' });
	}
});

postRouter.get('/getComments', async (req, res) => {
	const { userId } = req.query; // Use req.query to get query parameters

	try {
		const comments = await Comment.find({ userId }); // Assuming you want to find comments by userId

		if (!comments || comments.length === 0) {
			return res.status(404).send({ message: 'Comments not found' });
		}

		res.status(200).send(comments);
	} catch (error) {
		console.error('Error fetching comments:', error);
		res.status(500).send({ message: 'Error fetching comments' });
	}
});

// postRouter.get('/getComments', async (req, res) => {
// 	const { commentID, userId } = req.body;
// 	if (!commentID || !userId) {
// 		return res.status(400).send({ message: 'All fields are required' });
// 	}

// 	try {
// 		let comments;
// 		if (Array.isArray(commentID)) {
// 			// If commentID is an array, fetch all comments
// 			comments = await Comment.find({ _id: { $in: commentID } }).populate(
// 				'user'
// 			); // Populate user if needed
// 		} else {
// 			// If it's a single ID, fetch that specific comment
// 			comments = await Comment.findById(commentID).populate('user'); // Populate user if needed
// 		}

// 		if (!comments) {
// 			return res.status(404).send({ message: 'Comments not found' });
// 		}

// 		res.status(200).send(comments);
// 	} catch (error) {
// 		console.error('Error fetching comments:', error);
// 		res.status(500).send({ message: 'Error fetching comments' });
// 	}
// });

export default postRouter;
