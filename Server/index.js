/** @format */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRouter from './routers/userRouter.js';
import fileRouter from './routers/fileRouter.js';
import registrationRouter from './routers/registrationRouter.js';
import postRouter from './routers/postRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// HTTP Server that is going to handl both Express and Socket.io
const httpServer = createServer(app);

// Socket.io instance
export const io = new Server(httpServer, {
	cors: {
		origin: [`http://localhost:3000`, `http://localhost:3002`],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	},
});

//Middleware
app.use(express.json());
app.use(
	cors({
		origin: [`http://localhost:3000`, `http://localhost:3002`],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);

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

//Websockets Connection

io.on('connection', (socket) => {
	console.log('New WebSocket connection', socket.id);

	socket.on('postUpdate', () => {
		console.log('Received postUpdate message from client');
	});
});

// Start the server using the HTTP server instead of the Express app
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
