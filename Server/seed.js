/** @format */

import mongoose from 'mongoose';
import User from './api/db/models/user.js'; // Adjust the path as necessary
import dotenv from 'dotenv';

dotenv.config();

const connection = process.env.MONGO;
console.log('MongoDB Connection String:', connection);

mongoose
	.connect(connection)
	.then(() => console.log('DB connected'))
	.catch((err) => console.error('DB connection error:', err));

const seedData = async () => {
	try {
		// Clear existing data
		await User.deleteMany({});

		// Create new data
		const users = [
			{
				email: 'omaralkady98@gmail.com',
				password: 'a1234567',
				name: 'Omar Sherif',
				bio: 'Software Engineer.',
				about: 'Software Engineer.',
				experiences: [
					{
						companyName: 'Capgemini',
						jobTitle: 'Software Engineer',
						startDate: new Date('2023-04-12'),
						endDate: new Date('2025-01-01'),
					},
				],
				licensesAndCertifications: ['Certification A'],
				skills: ['JavaScript', 'Node.js'],
				education: ['BSc Computer Science'],
				languages: ['English'],
				posts: [],
				savedPosts: [],
				connections: [],
				connectionRequestsSent: [],
				connectionRequestsReceived: [],
			},
		];

		// Create user instances and save them
		for (const userData of users) {
			const user = new User(userData);
			await user.save(); // This will trigger the pre('save') middleware
		}

		console.log('Data inserted successfully');
	} catch (err) {
		console.error('Error inserting data:', err);
	} finally {
		mongoose.connection.close();
	}
};

seedData();
