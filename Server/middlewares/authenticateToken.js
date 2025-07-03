/** @format */

import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
	//console.log('Authenticating token...');
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		// Send a response if the token is missing
		return res.status(401).json('Access Token Required');
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			// Send a response if the token is invalid or expired
			return res.status(403).json({ message: 'Invalid or Expired Token' });
		}
		// console.log('Token verified');

		req.user = user; // Attach user info to the request
		next(); // Proceed to the next middleware or route handler
	});
};

export default authenticateToken;
