/** @format */
import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import fileRouter from './routers/fileRouter.js';
import registrationRouter from './routers/registrationRouter.js';
import postRouter from './routers/postRouter.js';
import connectionRouter from './routers/connectionRouter.js';
import chatRouter from './routers/chatRouter.js';
import supportRouter from './routers/supportRouter.js';
import roomHandler from './functions/Sockets/roomHandler.js';
import typingHandler from './functions/Sockets/typingHandler.js';
import messageHandler from './functions/Sockets/messageHandler.js';
import postUpdateHandler from './functions/Sockets/postUpdateHandler.js';
import activeUserHandler from './functions/Sockets/activeUserHandler.js';
import connectionHandler from './functions/Sockets/connectionHandler.js';
import activeConnectionHandler from './functions/Sockets/activeConnectionHandler.js';
import companyRouter from './routers/companyRouter.js';
dotenv.config();
console.clear();
const app = express();
const PORT = process.env.PORT || 3001;

// HTTP Server that is going to handl both Express and Socket.io
const httpServer = createServer(app);

// Socket.io instance
export const io = new Server(httpServer, {
	cors: {
		origin: [
			`http://localhost:3000`,
			`http://localhost:3002`,
			`http://localhost:3003`,
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	},
});

//Middleware
app.use(express.json());
app.use(
	cors({
		origin: [
			`http://localhost:3000`,
			`http://localhost:3002`,
			`http://localhost:3003`,
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	}),
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
app.use('/connection', connectionRouter);
app.use('/chat', chatRouter);
app.use('/support', supportRouter);
app.use('/company', companyRouter);

//Websockets Connection

io.on('connection', (socket) => {
	const userID = socket.handshake.query.UID;

	console.log('Socket ID:', socket.id);
	console.log('userID: ', userID);

	if (userID) {
		socket.join(userID);
	}
	roomHandler(socket);
	typingHandler(socket);
	messageHandler(socket);
	postUpdateHandler(socket);
	activeUserHandler(socket, userID);
	activeConnectionHandler(socket, userID);
});

// Start the server using the HTTP server instead of the Express app
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
