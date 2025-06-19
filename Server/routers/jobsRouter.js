/** @format */

import express from 'express';
import Job from '../schema/jobs.js';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import AppliedSuccessfullyEmail from '../templates/AppliedSuccessfullyEmail.js';

const jobsRouter = express.Router();
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

jobsRouter.get('/topPicks', async (req, res) => {
	try {
		const { experienceLevel, employmentType, department } = req.query;

		// Build query object dynamically based on provided preferences
		const query = {};
		if (experienceLevel) query.level = experienceLevel;
		if (employmentType) query.type = employmentType;
		if (department) query.department = department;

		const topPicks = await Job.find(query)
			.limit(3)
			.sort({ postedAt: -1 }) // Changed to -1 to show newest first
			.select('company title location createdAt level type')
			.populate('company', 'name profilePicture');

		if (!topPicks || topPicks.length === 0) {
			return res.status(200).json({ topPicks, message: 'No jobs found' });
		}

		res.status(200).json(topPicks);
	} catch (error) {
		console.error('Error fetching top picks jobs:', error);
		res.status(500).send({ message: 'Error fetching top picks jobs' });
	}
});

jobsRouter.get('/recommendedJobs', async (req, res) => {
	const levelOrder = {
		Intern: 0,
		'Entry level': 1,
		Junior: 2,
		Associate: 3,
		'Mid level': 4,
		Senior: 5,
		Director: 6,
		Executive: 7,
	};
	const { jobID } = req.query;
	try {
		const job = await Job.findById(jobID).populate(
			'company',
			'profilePicture name size industry bio overview website',
		);
		const relatedJobs = await Job.find({
			department: job.department,
			_id: { $ne: job._id },
		})
			.limit(10)
			.sort({ createdAt: -1 })
			.populate(
				'company',
				'profilePicture name size industry bio overview website',
			);

		const jobArr = [job, ...relatedJobs];

		jobArr.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

		res.status(200).json(jobArr);
	} catch (error) {
		console.error('Error fetching related Jobs', error);
		res.status(500).send({ message: 'Error fetching related Jobs' });
	}
});
jobsRouter.get('/mobileJob', async (req, res) => {
	const { jobID } = req.query;
	try {
		const job = await Job.findById(jobID).populate(
			'company',
			'profilePicture name size industry bio overview website',
		);

		res.status(200).json(job);
	} catch (error) {
		console.error('Error fetching  Jobs', error);
		res.status(500).send({ message: 'Error fetching  Jobs' });
	}
});

jobsRouter.post('/applyForJob', async (req, res) => {
	try {
		const { formData, userID, email, jobName, jobID, companyName } = req.body;

		const job = await Job.findById(jobID);
		job.applicants.push(userID);
		await job.save();
		const msg = AppliedSuccessfullyEmail(formData, email, jobName, companyName);
		await sgMail.send(msg);
		res
			.status(200)
			.json({ success: true, message: 'Application submitted successfully' });
	} catch (error) {
		console.error('Error Applying for the job', error);
		res.status(500).send({ message: 'Error Applying for the job' });
	}
});
jobsRouter.get('/moreJobs', async (req, res) => {
	try {
		const { department, page = 1 } = req.query;
		const limit = 5;
		const skip = (page - 1) * limit;

		const defaultDepartment = department || 'product';

		const jobs = await Job.find({ department: defaultDepartment })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.select('company title location createdAt level type')
			.populate('company', 'name profilePicture');

		const totalJobs = await Job.countDocuments({
			department: defaultDepartment,
		});
		const hasNextPage = totalJobs > skip + limit;

		res.status(200).json({
			jobs,
			nextPage: hasNextPage ? parseInt(page) + 1 : null,
			totalJobs,
		});
	} catch (error) {
		console.error('Error fetching more jobs:', error);
		res.status(500).send({ message: 'Error fetching more jobs' });
	}
});

jobsRouter.get('/similarJobs', async (req, res) => {
	try {
		const { page = 1 } = req.query;
		const limit = 5;
		const skip = (page - 1) * limit;

		// Get user ID from auth middleware
		const userId = req.user?._id;

		// Find the most recent job application by the user
		const mostRecentApplication = await Job.findOne(
			{ applicants: userId },
			{ department: 1 },
			{ sort: { createdAt: -1 } },
		);

		const department = mostRecentApplication?.department || 'Engineering';

		const jobs = await Job.find({ department })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.select('company title location createdAt level type')
			.populate('company', 'name profilePicture');

		const totalJobs = await Job.countDocuments({ department });
		const hasNextPage = totalJobs > skip + limit;

		res.status(200).json({
			jobs,
			nextPage: hasNextPage ? page + 1 : null,
			totalJobs,
		});
	} catch (error) {
		console.error('Error fetching similar jobs:', error);
		res.status(500).send({ message: 'Error fetching similar jobs' });
	}
});

export default jobsRouter;
