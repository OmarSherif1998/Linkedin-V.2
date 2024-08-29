/** @format */

// server/testConnection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = process.env.MONGO;

console.log('Attempting to connect to MongoDB...');

mongoose
	.connect(connection, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connected successfully');

		// Perform a simple database operation to test connectivity
		console.log('Inserting test data...');
		return mongoose.connection.db.collection('users').insertOne({
			email: 'test@example.com',
			password: 'testpassword',
			name: 'Test User',
		});
	})
	.then(() => {
		console.log('Test data inserted');

		// Retrieve the data to confirm insertion
		console.log('Retrieving data...');
		return mongoose.connection.db.collection('users').find().toArray();
	})
	.then((users) => {
		console.log('Users:', users);
	})
	.catch((err) => {
		console.error('Error:', err);
	})
	.finally(() => {
		console.log('Closing connection...');
		mongoose.connection.close();
	});
