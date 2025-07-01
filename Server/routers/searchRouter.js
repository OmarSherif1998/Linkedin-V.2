import express from 'express';
import User from '../schema/user.js';
import University from '../schema/university.js';
import Company from '../schema/company.js';
import Post from '../schema/post.js';
import Job from '../schema/jobs.js';

const searchRouter = express.Router();

searchRouter.get('/getSearchResults', async (req, res) => {
	const { searchParam, exclude } = req.query;
	if (!searchParam)
		return res.status(400).json({ error: 'Missing searchParam' });

	const regex = new RegExp(searchParam, 'i');

	try {
		const [company, university, users, jobs, posts] = await Promise.all([
			Company.findOne({ name: regex }).select(
				'_id name profilePicture industry followers location.city location.country',
			),

			University.findOne({ name: regex }).select(
				'_id name city country profilePicture bio',
			),

			User.find({
				_id: { $ne: exclude },
				$or: [
					{ firstName: regex },
					{ lastName: regex },
					{ bio: regex },
					{ 'experiences.name': regex },
				],
			}),
			Job.find({
				$or: [
					{ title: regex },
					{ location: regex },
					{ type: regex },
					{ department: regex },
					{ description: regex },
					{ responsibilities: regex },
					{ qualifications: regex },
					{ skills: regex },
				],
			})
				.limit(5)
				.select('_id title location type ')
				.populate({ path: 'company', select: '_id name profilePicture ' }),

			Post.find({ content: regex })
				.limit(3)
				.select('_id content  commentsCount likesCount createdAt likedBy ')
				.populate({
					path: 'user',
					select: '_id firstName lastName  profilePicture bio ',
				})
				.populate({
					path: 'comments',
				}),
		]);

		if (
			(!users || users.length === 0) &&
			(!posts || posts.length === 0) &&
			(!jobs || jobs.length === 0) &&
			!university &&
			!company
		) {
			return res.json({ message: 'No results found for your search.' });
		}
		res.json({ company, university, users, jobs, posts });
	} catch (err) {
		console.error('SEARCH ERROR:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

export default searchRouter;
