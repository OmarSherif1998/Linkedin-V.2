import express from 'express';
import User from '../schema/user.js';
import University from '../schema/university.js';
import Company from '../schema/company.js';
import Post from '../schema/post.js';
import Job from '../schema/jobs.js';
// ...existing code...

const searchRouter = express.Router();

searchRouter.get('/Search', async (req, res) => {
	const { searchParam } = req.query;
	if (!searchParam)
		return res.status(400).json({ error: 'Missing searchParam' });

	const regex = new RegExp(searchParam, 'i'); // case-insensitive

	try {
		const [users, universities, companies, posts, jobs] = await Promise.all([
			User.find({ name: regex }).limit(5),
			University.find({ name: regex }).limit(5),
			Company.find({ name: regex }).limit(5),
			Post.find({ content: regex }).limit(5),
			Job.find({ title: regex }).limit(5),
		]);

		res.json({ users, universities, companies, posts, jobs });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

searchRouter.get('/Search', async (req, res) => {
	const { searchParam } = req.query;
	if (!searchParam)
		return res.status(400).json({ error: 'Missing searchParam' });

	const regex = new RegExp(searchParam, 'i');

	try {
		const [companies, universities, usersByBioAndName] = await Promise.all([
			// COMPANY SEARCH
			Company.find({ name: regex }).select(
				'name profilePicture bio location.city location.country',
			),

			// UNIVERSITY SEARCH
			University.find({ name: regex }).select(
				'name city country profilePicture bio',
			),

			// USER SEARCH by name or bio
			User.find({
				$or: [{ firstName: regex }, { lastName: regex }, { bio: regex }],
			})
				.select('_id firstName lastName profilePicture bio city country')
				.populate({
					path: 'experiences.company',
					select: 'name',
				})
				.populate({
					path: 'education.university',
					select: 'name',
				}),
		]);

		// USER SEARCH by experience.company.name and education.university.name (in-memory)
		const usersWithCompanyOrUniversityMatch = await User.find()
			.select(
				'_id firstName lastName profilePicture bio city country experiences education',
			)
			.populate({
				path: 'experiences.company',
				select: 'name',
			})
			.populate({
				path: 'education.university',
				select: 'name',
			});

		const usersByExperienceOrEducation =
			usersWithCompanyOrUniversityMatch.filter(
				(user) =>
					user.experiences?.some((exp) =>
						exp.company?.name
							?.toLowerCase()
							.includes(searchParam.toLowerCase()),
					) ||
					user.education?.some((edu) =>
						edu.university?.name
							?.toLowerCase()
							.includes(searchParam.toLowerCase()),
					),
			);

		// Deduplicate users using Map
		const userMap = new Map();
		[...usersByBioAndName, ...usersByExperienceOrEducation].forEach((user) => {
			userMap.set(user._id.toString(), user);
		});

		const users = Array.from(userMap.values());

		res.json({ users, universities, companies });
	} catch (err) {
		console.error('SEARCH ERROR:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

export default searchRouter;
