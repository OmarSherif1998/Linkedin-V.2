/** @format */

function createAccountVerificationEmail({ email, link }) {
	const msg = {
		from: 'linkedinclone.dev@gmail.com',
		to: email,
		subject: 'Account Verification - Please Confirm Your Email',
		text: `Hello,

Thank you for registering with LinkedIn Clone. Please use the following link to verify your email address and complete the registration process:

${link}

This verification link is valid for a limited time. If you did not create an account, please disregard this email.

Note: This message was sent as part of a demo project. No real account or data is involved.

Best regards,
LinkedIn Clone Support Team`,
		html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Account Verification</h2>
      <p style="font-size: 15px; color: #555;">Thank you for registering with LinkedIn Clone! Please click the link below to verify your email address and complete your registration:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="display: inline-block; font-size: 18px; font-weight: bold; color: #ffffff; background-color: #007bff; padding: 10px 30px; text-decoration: none; border-radius: 6px;">Verify My Account</a>
      </div>
      <p style="font-size: 14px; color: #555;">This verification link is valid for a limited time. If you did not register an account, please ignore this email.</p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">This email was sent as part of a <strong>demo project</strong>. No real account or data is involved.</p>
      <p style="font-size: 14px; color: #555;">Best regards,<br /><strong>LinkedIn Clone Support Team</strong></p>
    </div>
    `,
	};
	return msg;
}

export default createAccountVerificationEmail;
