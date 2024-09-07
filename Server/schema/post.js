/** @format */

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
			trim: true,
			maxlength: 1000, // Limit content length if needed
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true, // Indexing for quicker searches by user
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		likesCount: { type: Number, default: 0 }, // Added field
		likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		media: [
			{
				type: String, // URLs to images/videos
			},
		],
		visibility: {
			type: String,
			enum: ['public', 'private', 'connections'],
			default: 'public',
		},
		tags: [
			{
				type: String, // For hashtags or other tags
			},
		],
		mentions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const Post = mongoose.model('Post', postSchema);

export default Post;
