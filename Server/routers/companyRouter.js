/** @format */
import express from 'express';
import Company from '../schema/company.js';
import dotenv from 'dotenv';
import axios from 'axios';
const companyRouter = express.Router();
dotenv.config();

companyRouter.get('/companyData', async (req, res) => {
	try {
		const { companyID } = req.query;

		if (!companyID) {
			return res.status(400).json({ message: 'Missing companyID' });
		}

		const companyData = await Company.findById(companyID);

		if (!companyData) {
			return res.status(404).json({ message: 'Company not found' });
		}

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

companyRouter.post('/suggestedCompanies', async (req, res) => {
	const limit = 3;
	try {
		const companies = await Company.find()
			.select('_id bio profilePicture coverPicture name')
			.sort({ name: 1 }) // Sort alphabetically by name
			.limit(limit);

		if (!companies || companies.length === 0) {
			return res.status(404).json({ message: 'No companies found' });
		}

		res.status(200).json(companies);
	} catch (err) {
		console.error('Error fetching companies:', err);
		res.status(500).json({ message: 'Error fetching companies' });
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
