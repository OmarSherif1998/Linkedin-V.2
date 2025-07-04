/** @format */

import { io } from '../index.js';

import Chat from '../schema/chat.js';
import Message from '../schema/message.js';

const handleChatMessages = async (
	roomId,
	messageContent,
	senderID,
	receiverID,
) => {
	console.log('Received message content:', messageContent);
	try {
		let chat = await Chat.findOne({ roomID: roomId });
		if (!chat) {
			chat = new Chat({
				roomID: roomId,
				participants: [senderID, receiverID],
				messages: [],
				lastMessage: '',
				sender: senderID,
			});
			await chat.save();
		}

		const message = new Message({
			chat: chat._id,
			roomId: roomId,
			sender: senderID,
			receiver: receiverID,
			content: messageContent,
		});

		await message.save();
		chat.messages.push(message._id);
		chat.lastMessage = messageContent;

		await chat.save();
		io.to(roomId).emit('receivedMessage', {
			...message._doc,
		});
	} catch (error) {
		console.error('Error sending message: ', error.message);
	}
};
export default handleChatMessages;
