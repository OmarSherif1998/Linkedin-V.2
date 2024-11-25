/** @format */

import express from 'express';

import Chat from '../schema/chat.js';
import User from '../schema/user.js'; // Import your User model
import Message from '../schema/message.js';
const chatRouter = express.Router();

chatRouter.get('/chats', async (req, res) => {
	try {
		const { userID } = req.query; // Correct way to access userID from query string
		const user = await Chat.findOne(
			{ participants: { $in: [userID] } },
			{
				roomID: 1,
				participants: 1,
				lastMessage: 1,
			}
		);
		const friendsList = [];
		user ? friendsList.push(user) : []; // Extract the populated connections array

		// Assuming you have a User model to fetch details like name and profile picture

		const friendsData = await Promise.all(
			friendsList.map(async (friend) => {
				// Find the other participant in the chat
				const otherParticipantId = friend.participants.find(
					(id) => id.toString() !== userID.toString()
				);

				// Query the user details of the other participant (assuming you use the user ID to query)
				const otherParticipant = await User.findById(
					otherParticipantId,
					'firstName lastName bio profilePicture'
				);

				// Return the friend data along with the other participant's details
				return {
					_id: friend._id.toString(),
					roomID: friend.roomID,
					lastMessage: friend.lastMessage,
					name: otherParticipant.firstName + ' ' + otherParticipant.lastName, // Assuming 'username' is the name field
					profilePicture: otherParticipant.profilePicture, // Assuming 'profilePicture' is the field for their profile image URL
					bio: otherParticipant.bio,
				};
			})
		);

		console.log(friendsData);
		res.status(200).json(friendsData);
	} catch (error) {
		console.error('Error fetching friends List:', error);
		res.status(500).send({ message: 'Error fetching chats' });
	}
});

chatRouter.get('/historicalMessages', async (req, res) => {
	const MESSAGES_LIMIT = 20;
	const { currentPage = 1, roomId } = req.query;
	//console.log(currentPage, +' - ' + roomId);
	//const messages = await Message.find({ chatId: roomId });
});

export default chatRouter;
