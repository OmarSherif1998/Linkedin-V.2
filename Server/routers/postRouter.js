/** @format */

import express from 'express';
import Post from '../schema/post.js';
import User from '../schema/user.js';
import Comment from '../schema/comment.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import mongoose from 'mongoose';
import { io } from '../index.js';
import Connection from '../schema/connections.js';
import ConnectionStates from '../staticData/ConnectionStates.js';
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
			{ new: true }, // Return the updated user document
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

// postRouter.get('/posts', async (req, res) => {
// 	try {
// 		const posts = await Post.find({})
// 			.populate({
// 				path: 'comments',
// 				populate: {
// 					path: 'user',
// 					select: 'firstName lastName profilePicture bio',
// 				},
// 			})
// 			.sort({ createdAt: -1 }); // Fetch all posts

// 		let UserPostData = [];

// 		if (posts.length > 0) {
// 			for (let i = 0; i < posts.length; i++) {
// 				const user = await User.findById(posts[i].user);
// 				if (user) {
// 					UserPostData.push({
// 						...posts[i]._doc, // Ensure you're copying the document data correctly
// 						userID: posts[i].user, // rename 'user' to 'userID'
// 						username: user.firstName + ' ' + user.lastName,
// 						bio: user.bio,
// 						profilePicture: user.profilePicture,
// 					});
// 				} else {
// 					console.log(`User with id ${posts[i].user} not found`);
// 				}
// 			}

// 			//console.log('Userpost: ', JSON.stringify(UserPostData[0], null, 2)); // Pretty print the first post

// 			res.json(UserPostData);
// 		} else {
// 			res.status(201).json({ message: 'No posts found' });
// 		}
// 	} catch (error) {
// 		console.error('Error fetching posts or user:', error);
// 		res.status(500).json({ message: 'Internal Server Error' });
// 	}
// });

postRouter.get('/posts', async (req, res) => {
	const currentUserId = req.query.userId;
	console.log(currentUserId);
	if (!currentUserId) {
		return res.status(400).json({ message: 'Missing userId' });
	}

	try {
		// 1. Fetch all posts with nested comments' users
		const posts = await Post.find({})
			.populate({
				path: 'comments',
				populate: {
					path: 'user',
					select: 'firstName lastName profilePicture bio',
				},
			})
			.sort({ createdAt: -1 });

		if (!posts.length) {
			return res.status(200).json([]);
		}

		// 2. Get all unique author IDs from posts (excluding self-posts)
		const authorIds = posts
			.map((p) => p.user.toString())
			.filter((id) => id !== currentUserId);

		// 3. Get all connections between current user and authors
		const connections = await Connection.find({
			$or: [
				{ sender: currentUserId, receiver: { $in: authorIds } },
				{ receiver: currentUserId, sender: { $in: authorIds } },
			],
		});

		// 4. Map connections to a lookup table
		const connectionMap = {};
		connections.forEach((conn) => {
			const otherUserId =
				conn.sender.toString() === currentUserId
					? conn.receiver.toString()
					: conn.sender.toString();

			connectionMap[otherUserId] = conn.status; // "pending" or "accepted"
		});

		// 5. Enrich each post with author info and connection status
		const enrichedPosts = [];

		for (const post of posts) {
			const postAuthorId = post.user.toString();

			const user = await User.findById(postAuthorId).select(
				'firstName lastName bio profilePicture',
			);

			if (!user) continue;

			let connectionStatus = ConnectionStates.NONE;

			if (postAuthorId === currentUserId) {
				connectionStatus = ConnectionStates.SELF;
			} else if (
				connectionMap[postAuthorId] &&
				connectionMap[postAuthorId] !== ConnectionStates.REJECTED
			) {
				connectionStatus = connectionMap[postAuthorId]; // "pending" or "accepted"
			}

			enrichedPosts.push({
				...post._doc,
				username: `${user.firstName} ${user.lastName}`,
				bio: user.bio,
				profilePicture: user.profilePicture,
				connectionStatus,
			});
		}

		res.status(200).json(enrichedPosts);
	} catch (error) {
		console.error('Error fetching posts:', error);
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
		const post = await Post.findById(postID);

		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		// Toggle like
		if (post.likedBy.includes(userID)) {
			post.likesCount--;
			post.likedBy.pull(userID);
		} else {
			post.likesCount++;
			post.likedBy.push(userID);
		}
		// console.log(post.likesCount);
		await post.save();

		// Return only necessary data
		res.status(200).json({
			likesCount: post.likesCount,
			likedBy: post.likedBy,
		});
	} catch (error) {
		console.error('Error updating like: ', error);
		res
			.status(500)
			.json({ error: 'Error updating like', details: error.message });
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

export default postRouter;
