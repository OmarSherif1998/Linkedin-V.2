/** @format */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routers/userRouter.js'; // Import userRoute

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Set port number
//Middleware
app.use(express.json());
app.use(
	cors({
		origin: `http://localhost:3000`,
	})
);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
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

//Routers

app.use('/users', userRoute);
