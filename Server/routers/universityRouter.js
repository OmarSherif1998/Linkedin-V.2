/** @format */
import express from 'express';
import University from '../schema/university.js';
import dotenv from 'dotenv';
const universityRouter = express.Router();
dotenv.config();

universityRouter.get('/universityData', async (req, res) => {
	try {
		const { universityID } = req.query;
		if (!universityID) {
			return res.status(400).json({ message: 'Missing universityID' });
		}

		const universityData = await University.findById(universityID);

		if (!universityData) {
			return res.status(404).json({ message: 'University not found' });
		}
		console.log(universityData);

		res.status(200).json(universityData);
	} catch (error) {
		console.error('Error fetching universityData:', error);
		res.status(500).send({ message: 'Error fetching universityData' });
	}
});

universityRouter.get('/universitiesData', async (req, res) => {
	try {
		const universitiesData = await University.find().select(
			'_id name profilePicture',
		);

		// Optional: skip 404 for empty arrays if you prefer
		if (universitiesData.length === 0) {
			return res.status(404).json({ message: 'No university found' });
		}

		res.status(200).json(universitiesData);
	} catch (error) {
		console.error('Error fetching universitiesData:', error);
		res.status(500).json({ message: 'Error fetching university data' });
	}
});

universityRouter.post('/suggestedUniversities', async (req, res) => {
	const limit = 3;
	try {
		const universities = await University.find()
			.select('_id bio profilePicture coverPicture name')
			.sort({ name: 1 }) // Sort alphabetically by name
			.limit(limit);

		if (!universities || universities.length === 0) {
			return res.status(404).json({ message: 'No universities found' });
		}

		res.status(200).json(universities);
	} catch (err) {
		console.error('Error fetching universities:', err);
		res.status(500).json({ message: 'Error fetching universities' });
	}
});

export default universityRouter;
