/** @format */

import { io } from '../index.js';

import Chat from '../schema/chat.js';
import Message from '../schema/message.js';

const handleChatMessages = async (
	roomID,
	messageContent,
	senderID,
	receiverID
) => {
	try {
		//	console.log('room id:', roomID);
		let chat = await Chat.findOne({ roomID: roomID });
		//	console.log('chat:', chat);

		if (!chat) {
			chat = new Chat({
				roomID: roomID,
				participants: [senderID, receiverID],
				messages: [],
				lastMessage: '',
			});
			await chat.save();
		}
		//console.log('chat:', chat);

		const message = new Message({
			chat: chat._id,
			sender: senderID,
			receiver: receiverID,
			content: messageContent,
		});

		await message.save();
		//console.log(message);
		chat.messages.push(message._id);
		chat.lastMessage = messageContent;
		await chat.save();
		// console.log(`${senderID} sent  ${message} to  ${receiverID} on ${roomId}`);
		io.to(roomID).emit('receivedMessage', message.content, senderID);
	} catch (error) {
		console.error('Error sending message: ', error.message);
	}
};
export default handleChatMessages;
