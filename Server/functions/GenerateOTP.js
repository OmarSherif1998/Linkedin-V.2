/** @format */

export default function GenerateOTP() {
	const otp = Math.floor(100000 + Math.random() * 900000);
	return otp;
}
