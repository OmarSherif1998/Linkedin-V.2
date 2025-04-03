/** @format */

import express from 'express';
import Connection from '../schema/connections.js';
import User from '../schema/user.js';
const connectionRouter = express.Router();

connectionRouter.post('/sendConnectionRequest', async (req, res) => {
	try {
		const { senderID, receiverID } = req.body;
		//console.log(req.body);
		const newConnection = new Connection({
			sender: senderID,
			receiver: receiverID,
			status: 'pending',
		});
		await newConnection.save();

		res.status(200).json(newConnection);
	} catch (error) {
		console.error('Error sending connection request: ', error.message);
	}
});
connectionRouter.get('/getConnectionRequests', async (req, res) => {
	try {
		const { userID } = req.query; // Access userID from query parameters
		// Fetch connection requests for the userID
		const requests = await Connection.find({
			receiver: userID,
			status: 'pending',
		}).populate({
			path: 'sender',
			select: '_id firstName lastName  profilePicture ',
		});

		res.status(200).json(requests);
	} catch (error) {
		console.error('Error getting connection requests', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});
connectionRouter.get('/getPendingRequestList', async (req, res) => {
	try {
		const { userID } = req.query; // Access userID from query parameters
		// Fetch connection requests for the userID
		const requests = await Connection.find({
			sender: userID,
			status: 'pending',
		}).select('-_id receiver');

		// console.log(requests);
		res.status(200).json(requests);
	} catch (error) {
		console.error('Error getting connection requests', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

connectionRouter.post('/acceptRequest', async (req, res) => {
	try {
		const { requestID, userID } = req.body.data;
		console.log('requestID: ', requestID);
		const connection = await Connection.findByIdAndUpdate(
			requestID,
			{ status: 'accepted' },
			{ new: true },
		);
		console.log(connection);
		//	Add the connection to both the sender and receiver's connection list

		await Promise.all([
			User.findByIdAndUpdate(userID, {
				$push: { connections: connection.receiver },
			}),
			User.findByIdAndUpdate(connection.receiver, {
				$push: { connections: userID },
			}),
		]);

		res.status(200).json({ message: 'Request accepted' });
	} catch (error) {
		console.error('Error accepting connection request:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

connectionRouter.post('/rejectRequest', async (req, res) => {
	try {
		const { requestID } = req.body;
		console.log(requestID);
		await Connection.findByIdAndUpdate(requestID, {
			status: 'rejected',
		});
		res.status(200).json({ message: 'Request rejected' });
	} catch (error) {
		console.error('Error ignoring connection request:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});
connectionRouter.get('/connections', async (req, res) => {
	try {
		const { userID } = req.query; // Use req.query to get userID from the query string
		// console.log('userID: ', userID);
		const user = await User.findById(userID)
			.select('connections')
			.populate('connections', '_id firstName lastName profilePicture bio')
			.exec();
		// console.log('user: ', user);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		// Optionally, return user's connections if needed
		res.json(user.connections);
	} catch (error) {
		console.error('Error getting connections:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

export default connectionRouter;
