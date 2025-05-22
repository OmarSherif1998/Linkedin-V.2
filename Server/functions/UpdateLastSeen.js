/** @format */

import User from '../schema/user.js';

export default async function UpdateLastSeen(userID) {
	const date = Date.now();

	const user = await User.findById(userID).select('lastSeen');
	if (user) {
		user.lastSeen = date; // set lastSeen to timestamp
		await user.save();
	}
}
