/** @format */

import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		country: {
			type: String,
			required: true,
		},
		city: {
			type: String,
		},
		website: {
			type: String,
		},
		profilePicture: {
			type: String, // Logo URL
		},
		coverPicture: {
			type: String, // Banner image
		},
		bio: {
			type: String, // Short tagline (e.g., "Leading research university...")
		},
		overview: {
			type: String, // Full description of the university
		},
		established: {
			type: Number, // e.g., 1820
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // Optional: who created this entry
		},
	},
	{ timestamps: true },
);

const University = mongoose.model('University', universitySchema);
export default University;
