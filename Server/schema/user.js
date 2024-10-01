/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const user = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		bio: { type: String, default: '' },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		birthday: { type: String },
		location: { type: String, default: '' },
		city: { type: String, default: '' },
		profilePicture: {
			type: String,
			default:
				'https://res.cloudinary.com/linkedinpicdb/image/upload/v1725304262/Default%20Profile%20Picture/default_profilePic.png',
		},
		coverPicture: {
			type: String,
			default:
				'https://res-console.cloudinary.com/linkedinpicdb/thumbnails/v1/image/upload/v1725453557/U2NyZWVuc2hvdF8yMDI0LTA5LTA0XzE1MzkwMl9keXpqYTU=/drilldown',
		},
		about: { type: String, default: '' },
		gender: { type: String, default: '' },
		experiences: [
			{
				companyName: { type: String },
				jobTitle: { type: String },
				startDate: { type: Date },
				endDate: { type: Date },
			},
		],
		licensesAndCertifications: [{ type: String }],
		skills: [{ type: String }],
		education: [{ type: String }],
		languages: [{ type: String }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
		SavedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

user.virtual('connectionCount').get(function () {
	return this.connections?.length;
});
user.virtual('postsCount').get(function () {
	return this.posts?.length;
});
user.virtual('commentsCount').get(function () {
	return this.comments?.length;
});

user.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model('User', user);

export default User;
