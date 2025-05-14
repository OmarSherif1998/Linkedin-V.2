/** @format */

export default function createPasswordResetEmail(email, otp) {
	const msg = {
		from: 'linkedinclone.dev@gmail.com',
		to: email,
		subject: 'Password Reset Verification Code',
		text: `Hello,

You requested to reset your password. Please use the following One-Time Password (OTP) to proceed:

${otp}

This OTP is valid for 5 minutes.

If you did not request a password reset, please ignore this email.

Note: This message was sent as part of a demo project. No real account or data is involved.

Best regards,
LinkedIn Clone Support Team`,
		html: `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
			<h2 style="color: #333;">Password Reset Request</h2>
			<p style="font-size: 15px; color: #555;">You recently requested to reset your password. Please use the One-Time Password (OTP) below to complete the process:</p>
			<div style="text-align: center; margin: 30px 0;">
				<span style="display: inline-block; font-size: 28px; font-weight: bold; color: #004085; padding: 10px 20px; background-color: #e2e3e5; border-radius: 6px;">${otp}</span>
			</div>
			<p style="font-size: 14px; color: #555;">This OTP is valid for <strong>5 minutes</strong>. If you did not request a password reset, please disregard this email.</p>
			<hr style="margin: 30px 0;" />
			<p style="font-size: 12px; color: #999;">This email was sent as part of a <strong>demo project</strong>. No real account or data is involved.</p>
			<p style="font-size: 14px; color: #555;">Best regards,<br /><strong>LinkedIn Clone Support Team</strong></p>
		</div>
	`,
	};
	return msg;
}
