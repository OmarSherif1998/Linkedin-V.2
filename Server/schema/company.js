/** @format */

import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		industry: {
			type: String,
			required: true,
		},
		size: {
			type: String, // e.g., "1-10", "11-50", "500+"
		},
		website: {
			type: String,
		},
		location: {
			city: String,
			country: String,
		},
		logo: {
			type: String, // URL to logo (Cloudinary, etc.)
		},
		description: {
			type: String,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // Who created this company entry (optional)
		},
	},
	{ timestamps: true },
);

const Company = mongoose.model('Company', companySchema);
export default Company;
