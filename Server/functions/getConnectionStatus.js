import Connection from '../schema/connections.js';

const getConnectionStatus = async (userA, userB) => {
	if (userA === userB) return 'self';

	const connection = await Connection.findOne({
		$or: [
			{ sender: userA, receiver: userB },
			{ sender: userB, receiver: userA },
		],
	});

	return connection?.status === 'pending'
		? 'pending'
		: connection?.status === 'accepted'
			? 'accepted'
			: 'none';
};

export default getConnectionStatus;
