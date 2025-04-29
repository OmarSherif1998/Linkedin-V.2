/** @format */

import express from 'express';

import Chat from '../schema/chat.js';
import User from '../schema/user.js'; // Import your User model
import Message from '../schema/message.js';
const chatRouter = express.Router();

chatRouter.get('/chats', async (req, res) => {
	try {
		const { userID } = req.query;
		const friendsList = await Chat.find(
			{ participants: { $in: [userID] } },
			{
				roomID: 1,
				participants: 1,
				lastMessage: 1,
			},
		);

		const friendsData = await Promise.all(
			friendsList.map(async (friend) => {
				// Find the other participant in the chat
				const otherParticipantId = friend?.participants.find(
					(id) => id.toString() !== userID.toString(),
				);

				// Query the user details of the other participant (assuming you use the user ID to query)
				const otherParticipant = await User.findById(
					otherParticipantId,
					'_id firstName lastName bio profilePicture',
				);

				// Return the friend data along with the other participant's details
				return {
					_id: otherParticipant._id.toString(),
					roomID: friend.roomID,
					lastMessage: friend.lastMessage,
					name: otherParticipant.firstName + ' ' + otherParticipant.lastName, // Assuming 'username' is the name field
					profilePicture: otherParticipant.profilePicture, // Assuming 'profilePicture' is the field for their profile image URL
					bio: otherParticipant.bio,
				};
			}),
		);

		res.status(200).json(friendsData);
	} catch (error) {
		console.error('Error fetching friends List:', error);
		res.status(500).send({ message: 'Error fetching chats' });
	}
});

chatRouter.get('/historicalMessages', async (req, res) => {
	const MESSAGES_LIMIT = 20;
	const { pageParam, roomId } = req.query;
	const skipMessages = (pageParam - 1) * MESSAGES_LIMIT;

	try {
		const messages = await Message.find({ roomId: roomId })
			.sort({ createdAt: -1 })
			.skip(skipMessages)
			.limit(MESSAGES_LIMIT);

		res.status(200).json(messages);
	} catch (error) {
		console.error('Error fetching historical messages:', error);
		res.status(500).json({ message: 'Error fetching historical messages' });
	}
});

export default chatRouter;
