/** @format */
import express from 'express';
import Company from '../schema/company.js';
import dotenv from 'dotenv';
import axios from 'axios';
import CompanyFollowers from '../schema/CompanyFollowers.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { attachIsFollowingToCompany } from '../functions/searchHelpers.js';
import mongoose from 'mongoose';
const companyRouter = express.Router();
dotenv.config();

companyRouter.get('/companyData', authenticateToken, async (req, res) => {
	try {
		const { companyID } = req.query;
		const userId = req.user.userId;
		if (!companyID) {
			return res.status(400).json({ message: 'Missing companyID' });
		}

		let companyData = await Company.findById(companyID);

		if (!companyData) {
			return res.status(404).json({ message: 'Company not found' });
		}
		companyData = await attachIsFollowingToCompany(companyData, userId);
		res.status(200).json(companyData);
	} catch (error) {
		console.error('Error fetching companyData:', error);
		res.status(500).send({ message: 'Error fetching companyData' });
	}
});
companyRouter.get('/companiesData', async (req, res) => {
	try {
		const companiesData = await Company.find().select(
			'_id name profilePicture',
		);

		// Optional: skip 404 for empty arrays if you prefer
		if (companiesData.length === 0) {
			return res.status(404).json({ message: 'No company found' });
		}

		res.status(200).json(companiesData);
	} catch (error) {
		console.error('Error fetching companiesData:', error);
		res.status(500).json({ message: 'Error fetching company data' });
	}
});
companyRouter.post(
	'/suggestedCompanies',
	authenticateToken,
	async (req, res) => {
		const { limit, exclude } = req.body;
		const userId = req.user.userId;

		try {
			let companies = await Company.aggregate([
				{
					$match: {
						_id: { $ne: new mongoose.Types.ObjectId(exclude) },
					},
				},
				{
					$sample: { size: limit },
				},
				{
					$project: {
						_id: 1,
						bio: 1,
						profilePicture: 1,
						coverPicture: 1,
						name: 1,
						followers: 1,
					},
				},
			]);
			if (!companies || companies.length === 0) {
				return res.status(404).json({ message: 'No companies found' });
			}

			companies = await Promise.all(
				companies.map((company) => attachIsFollowingToCompany(company, userId)),
			);

			res.status(200).json(companies);
		} catch (err) {
			console.error('Error fetching companies:', err);
			res.status(500).json({ message: 'Error fetching companies' });
		}
	},
);

companyRouter.post('/followCompany', async (req, res) => {
	try {
		const { companyID, userID } = req.body;

		if (!companyID || !userID) {
			return res.status(400).json({ message: 'Missing companyID or userID' });
		}

		const company = await Company.findById(companyID);
		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}

		const isFollowing = await CompanyFollowers.exists({ userID, companyID });

		if (isFollowing) {
			return res
				.status(200)
				.json({ message: 'Already following this company' });
		}

		// Try to create a new follow document
		await CompanyFollowers.create({ companyId: companyID, userId: userID });

		// Optional: update cached follower count
		company.followerCount = (company.followerCount || 0) + 1;
		await company.save();

		res.status(200).json({ message: 'Followed company successfully' });
	} catch (error) {
		console.error('Error following company:', error);
		res.status(500).json({ message: 'Error following company' });
	}
});
companyRouter.post('/unfollowCompany', async (req, res) => {
	try {
		const { companyID, userID } = req.body;

		if (!companyID || !userID) {
			return res.status(400).json({ message: 'Missing companyID or userID' });
		}

		const company = await Company.findById(companyID);
		if (!company) {
			return res.status(404).json({ message: 'Company not found' });
		}

		// Check if follow doc exists
		const deleted = await CompanyFollowers.findOneAndDelete({
			companyId: companyID,
			userId: userID,
		});

		if (!deleted) {
			return res
				.status(400)
				.json({ message: 'User was not following this company' });
		}

		// Optional: decrement follower count
		company.followerCount = Math.max((company.followerCount || 1) - 1, 0);
		await company.save();

		res.status(200).json({ message: 'Unfollowed company successfully' });
	} catch (error) {
		console.error('Error unfollowing company:', error);
		res.status(500).json({ message: 'Error unfollowing company' });
	}
});

companyRouter.get('/getStockPrice', async (req, res) => {
	const symbol = req.query.symbol;
	if (!symbol) return res.status(400).json({ error: 'Missing symbol' });
	try {
		const response = await axios.get('https://finnhub.io/api/v1/quote', {
			params: {
				symbol: symbol,
				token: process.env.FINNHUB_API_KEY,
			},
		});

		res.json(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch stock data' });
	}
});

export default companyRouter;
