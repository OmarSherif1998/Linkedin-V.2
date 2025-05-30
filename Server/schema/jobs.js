/** @format */

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
			index: true,
		},

		location: {
			city: String,
			country: String,
			isRemote: { type: Boolean, default: false },
		},

		type: {
			type: String,
			enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
			default: 'Full-time',
		},

		level: {
			type: String,
			enum: [
				'Intern',
				'Entry level',
				'Junior',
				'Associate',
				'Mid level',
				'Senior',
				'Director',
				'Executive',
			],
		},

		department: {
			type: String, // e.g. "Engineering", "Marketing"
		},

		description: {
			type: String,
			required: true,
		},

		responsibilities: {
			type: [String], // List of bullet points
		},

		qualifications: {
			type: [String], // List of required qualifications
		},

		skills: {
			type: [String], // Keywords for search
			index: true,
		},

		salaryRange: {
			min: Number,
			max: Number,
			currency: { type: String, default: 'USD' },
		},

		applicationLink: {
			type: String,
		},

		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},

		views: {
			type: Number,
			default: 0,
		},

		applicants: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				resume: String, // cloud URL
				coverLetter: String,
				appliedAt: { type: Date, default: Date.now },
			},
		],

		isActive: {
			type: Boolean,
			default: true,
		},

		deadline: {
			type: Date,
		},
	},
	{ timestamps: true },
);

// Text index for search functionality
jobSchema.index({
	title: 'text',
	description: 'text',
	skills: 'text',
	department: 'text',
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
