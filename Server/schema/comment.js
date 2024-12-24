/** @format */

import mongoose from 'mongoose';

const commentschema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model('Comment', commentschema);

export default Comment;
