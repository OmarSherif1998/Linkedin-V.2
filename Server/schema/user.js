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
		phoneNumber: { type: String },
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
				'https://res.cloudinary.com/linkedinpicdb/image/upload/v1725453557/Screenshot_2024-09-04_153902_dyzja5.png',
		},
		about: { type: String, default: '' },
		gender: { type: String, default: '' },
		experiences: [
			{
				companyName: { type: String, required: true, default: '' },
				jobTitle: { type: String, required: true, default: '' },
				employmentType: { type: String, required: true, default: '' },
				location: { type: String },
				locationType: { type: String, default: '' },
				startDate: { type: String, required: true, default: '' },
				endDate: { type: String },
				description: { type: String, default: '' },
				isCurrent: { type: Boolean, default: true },
			},
		],
		licensesAndCertifications: [{ type: String }],
		skills: [{ type: String }],
		education: [
			{
				institutionName: { type: String },
				degree: { type: String },
				graduationDate: { type: Date },
				major: { type: String },
				grade: { type: String },
				educationStartDate: { type: String, required: true, default: '' },
				educationEndDate: { type: String },
				educationDescription: { type: String },
				activities: { type: String },
				isCurrent: { type: Boolean, default: true },
			},
		],
		languages: [{ type: String }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
		SavedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		verified: { type: Boolean, default: false },
		darkMode: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
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

	// Check if the password is already hashed (bcrypt hashes start with $2)
	if (this.password.startsWith('$2')) return next();

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
