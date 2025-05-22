/** @format */
const VERIFICATION_TYPES = {
	OTP: {
		type: 'OTP',
		EXPIRATION: 300,
	},
	ACCOUNT_VERIFICATION: {
		type: 'ACCOUNT_VERIFICATION',
		EXPIRATION: 36000,
	},
	ACTIVE_USER: {
		type: 'active_Users_Count',
		EXPIRATION: null,
	},
};

export default VERIFICATION_TYPES;
