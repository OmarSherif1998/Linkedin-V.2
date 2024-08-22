/** @format */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.listen(3000, () => {
	console.log('listening on port 3000');
});
// Connect to MongoDB

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log('MongoDB is connected');
	})
	.catch((err) => {
		console.log('The error: ', err);
	});
