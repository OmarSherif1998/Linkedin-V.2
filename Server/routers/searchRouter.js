import express from 'express';
import {
	attachIsFollowingToCompany,
	getSearchResults,
	isEmptySearchResults,
} from '../functions/searchHelpers.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const searchRouter = express.Router();

searchRouter.get('/getSearchResults', authenticateToken, async (req, res) => {
	const { searchParam } = req.query;
	const userId = req.user.userId;
	if (!searchParam)
		return res.status(400).json({ error: 'Missing searchParam' });

	try {
		let { company, university, users, jobs, posts } = await getSearchResults(
			searchParam,
			userId,
		);
		company = await attachIsFollowingToCompany(company, userId);
		if (isEmptySearchResults({ users, posts, jobs, university, company })) {
			return res.json({ message: 'No results found for your search.' });
		}

		res.json({ company, university, users, jobs, posts });
	} catch (err) {
		console.error('SEARCH ERROR:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

export default searchRouter;
