/** @format */

import express from 'express';
import Job from '../schema/jobs.js';

const jobsRouter = express.Router();

jobsRouter.get('/topPicks', async (req, res) => {
	try {
		const { experienceLevel, employmentType, department } = req.query;

		// Build query object dynamically based on provided preferences
		const query = {};
		if (experienceLevel) query.level = experienceLevel;
		if (employmentType) query.type = employmentType;
		if (department) query.department = department;

		console.log(query);
		const topPicks = await Job.find(query)
			.limit(3)
			.sort({ postedAt: -1 }) // Changed to -1 to show newest first
			.select('company title location createdAt level type')
			.populate('company', 'name profilePicture');

		if (!topPicks || topPicks.length === 0) {
			// If no jobs found with filters, return latest jobs instead
			const latestJobs = await Job.find()
				.limit(3)
				.sort({ postedAt: -1 })
				.select('company title location createdAt level type')
				.populate('company', 'name profilePicture');

			console.log(latestJobs);
			return res.status(200).json(latestJobs);
		}

		res.status(200).json(topPicks);
	} catch (error) {
		console.error('Error fetching top picks jobs:', error);
		res.status(500).send({ message: 'Error fetching top picks jobs' });
	}
});

export default jobsRouter;
