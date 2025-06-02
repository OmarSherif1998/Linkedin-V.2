/** @format */

import express from 'express';
import Job from '../schema/jobs.js';

const jobsRouter = express.Router();

jobsRouter.get('/topPicks', async (req, res) => {
	try {
		const prefernce = req.query.prefernce || 'Engineering';

		const topPicks = await Job.find({ department: prefernce })
			.limit(3)
			.sort({ postedAt: -1 })
			.select('company title location')
			.populate('company', 'name profilePicture'); // Populate company field with name and logo

		if (!topPicks || topPicks.length === 0) {
			return res
				.status(404)
				.json({ message: 'No jobs found for this preference' });
		}

		res.status(200).json(topPicks);
	} catch (error) {
		console.error('Error fetching top picks jobs:', error);
		res.status(500).send({ message: 'Error fetching top picks jobs' });
	}
});

export default jobsRouter;
