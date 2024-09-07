/** @format */

import express from 'express';
import Post from '../schema/post.js';

const postRouter = express.Router();

postRouter.post('/create', async (req, res) => {
	const { content } = req.body; // Extract content from the request body
	const userId = req.user.id; // Assume you get the user's ID from the session or token
	console.log('content: ', content, 'userID', userId);
	// // Validate that content is provided
	// if (!content) {
	// 	return res.status(400).send({ message: 'Content is required' });
	// }

	// try {
	// 	// Create a new post
	// 	const post = new Post({
	// 		content,
	// 		user: userId, // Associate the post with the user
	// 		createdAt: new Date(), // Set the creation date
	// 	});

	// 	// Save the post to the database
	// 	await post.save();

	// 	// Respond with the newly created post
	// 	res.status(201).json(post);
	// } catch (err) {
	// 	// Handle errors
	// 	console.error('BACKEND ERROR: Error saving post', err);
	// 	res.status(500).send({ message: 'Error saving post' });
	// }
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
