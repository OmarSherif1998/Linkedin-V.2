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

companyRouter.post('/suggestedCompanies', async (req, res) => {
	const { exclude = [], page = 1, limit = 10 } = req.body;
	try {
		const companies = await Company.find({ _id: { $nin: exclude } })
			.select('_id bio profilePicture coverPicture name') // Only select needed fields
			.skip((page - 1) * limit)
			.limit(limit);

		res.status(200).json(companies);
	} catch (err) {
		console.error('Error fetching companies:', err);
		res.status(500).json({ message: 'Error fetching companies', error: err });
	}
});

companyRouter.get('/getStockPrice', async (req, res) => {
	const symbol = req.query.symbol;
	if (!symbol) return res.status(400).json({ error: 'Missing symbol' });
	console.log('symbol:', symbol);
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
