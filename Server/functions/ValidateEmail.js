/** @format */

import User from '../schema/user.js';

export default async function ValidateEmail(email) {
	const response = { status: false, value: '' };
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		response.status = false;
		response.value = 'Invalid email format';
		return response;
	}
	const user = await User.findOne({ email });
	if (user) {
		const ID = user._id;
		response.status = true;
		response.value = ID.toString();
		return response;
	}
}
