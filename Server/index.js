/** @format */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import fileRouter from './routers/fileRouter.js';
import registrationRouter from './routers/registrationRouter.js';
import postRouter from './routers/postRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
//Middleware
app.use(express.json());
app.use(
	cors({
		origin: `http://localhost:3000`,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
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
app.use('/users', userRouter);
app.use('/files', fileRouter);
app.use('/regi', registrationRouter);
app.use('/post', postRouter);
