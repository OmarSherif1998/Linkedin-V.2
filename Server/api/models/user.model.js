/** @format */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		name: { type: String, required: true },
		about: { type: String },
		experiences: [
			{
				companyName: { type: String, required: true },
				jobTitle: { type: String, required: true },
				startDate: { type: Date, required: true },
				endDate: { type: Date },
			},
		],
		licensesAndCertifications: [{ type: String }],
		skills: [{ type: String }],
		education: [{ type: String }],
		languages: [{ type: String }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		SavedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		connectionRequestsSent: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		],
		connectionsRequestsReceived: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.virtual('connectionCount').get(function () {
	return this.connections.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
