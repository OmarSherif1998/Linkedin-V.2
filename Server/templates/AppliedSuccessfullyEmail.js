/** @format */

export default function AppliedSuccessfullyEmail(
	formData,
	email,
	jobName,
	companyName,
) {
	const {
		firstName,
		lastName,
		bio,
		email: userEmail,
		phone,
		currentCompany,
	} = formData;

	const currentYear = new Date().getFullYear();

	const msg = {
		from: 'linkedinclone.dev@gmail.com',
		to: email,
		subject: `Your application to ${companyName} was sent`,
		text: `Hello,

Your application for ${jobName} at ${companyName} has been successfully submitted.

What happens next?
- The employer will review your application
- You may hear back directly from the employer
- You can view or withdraw your application in your "My Jobs" section

Thank you for using our platform.

Best regards,
LinkedIn Clone Team`,
		html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333; line-height: 1.5;">
        <div style="border-bottom: 1px solid #e6e6e6; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #0073b1; font-size: 24px; margin: 0;">Application Submitted</h1>
        </div>

        <p style="font-size: 16px;">Your application for <strong>${jobName}</strong> at <strong>${companyName}</strong> has been successfully submitted.</p>

        <div style="background-color: #f3f6f8; border-radius: 4px; padding: 15px; margin: 20px 0;">
          <h3 style="color: #0073b1; font-size: 16px; margin-top: 0;">Your Application Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${userEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Current Company:</strong></td>
              <td style="padding: 8px 0;">${currentCompany || 'Not provided'}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f3f6f8; border-left: 3px solid #0073b1; padding: 15px; margin: 20px 0;">
          <h3 style="color: #0073b1; font-size: 18px; margin-top: 0;">What happens next?</h3>
          <ul style="padding-left: 20px; margin-bottom: 0;">
            <li>The employer will review your application</li>
            <li>You may hear back directly from the employer</li>
            <li>You can view or withdraw your application in your "My Jobs" section</li>
          </ul>
        </div>

 

        <!-- App Promotion Section -->
        <div style="text-align: center; margin: 40px 0;">
          <h2 style="color: #0073b1; font-size: 18px;">Get the new LinkedIn desktop app</h2>
          <a href="https://www.microsoft.com/store/apps" style="display: inline-block; margin: 10px 0;">
            <img src="https://developer.microsoft.com/store/badges/images/English_get-it-from-MS.png" alt="Get it from Microsoft" width="150">
          </a>
          <p style="margin-top: 20px; font-size: 16px;">Also available on mobile</p>
          <div>
            <a href="https://apps.apple.com/" style="margin-right: 10px;">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" width="135">
            </a>
            <a href="https://play.google.com/store">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="150">
            </a>
          </div>
        </div>

         <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 12px; color: #666666; margin-top: 40px; border-top: 1px solid #e6e6e6; padding-top: 20px;">
          <tr>
            <td style="padding-bottom: 15px;">
              <p style="margin: 0; font-size: 11px; color: #999999;">
                This email was intended for <strong>${firstName} ${lastName} </strong> (${bio}).
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 15px;">
              <a href="#" style="color: #666666; text-decoration: underline;">Learn why we included this.</a>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="margin: 0; font-size: 12px; color: #666666;">
                You are receiving LinkedIn notification emails.
                <a href="#" style="color: #666666; text-decoration: none;">Unsubscribe</a> · 
                <a href="#" style="color: #666666; text-decoration: underline;">Help</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 15px;">
              <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.png.original.png" width="80" alt="LinkedIn" style="border: 0;"/>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin: 0; font-size: 11px; color: #999999; line-height: 1.5;">
                © ${new Date().getFullYear()} LinkedIn Corporation, 1000 West Maude Avenue, Sunnyvale, CA 94085.<br>
                LinkedIn and the LinkedIn logo are registered trademarks of LinkedIn.
              </p>
            </td>
          </tr>
        </table>

       <div style="margin-top: 30px; font-size: 14px; color: #666;">
          <p>Thank you for using our platform.</p>
          <p>Best regards,<br>
          <strong style="color: #0073b1;">LinkedIn Clone Team</strong></p>
        </div>

        <div style="border-top: 1px solid #e6e6e6; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #999;">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${currentYear} LinkedIn Clone. All rights reserved.</p>
        </div>
      </div>
    `,
	};
	return msg;
}
