/** @format */

//Account Preferences
const ProfileInformationData = [
	{ label: 'Name, location, and industry', placeholder: '' },
	{ label: 'Personal Demographic information', placeholder: '' },
	{ label: 'Change password', placeholder: '' },
	{ label: 'Verification', placeholder: '' },
];
const Display = [{ label: 'Dark mode', placeholder: '' }];
const GeneralPreferences = [
	{ label: 'Language', placeholder: '' },
	{ label: 'Content Language', placeholder: '' },
	{ label: 'Autoplay videos', placeholder: '' },
	{ label: 'Sound effcts', placeholder: '' },
	{ label: 'Showing profile photos', placeholder: '' },
	{ label: 'Prefferred Feed View', placeholder: '' },
	{ label: 'People you unfollowed', placeholder: '' },
];
const SyncingOptions = [
	{ label: 'Sync calendar', placeholder: '' },
	{ label: 'Sync contacts', placeholder: '' },
];

const SubscriptionsPayments = [
	{ label: 'Reactivate', placeholder: '' },
	{ label: 'Manage Premium account', placeholder: '' },
	{ label: 'View purchase history', placeholder: '' },
];
const AccountManagement = [
	{ label: 'Hibernate account', placeholder: '' },
	{ label: 'Close account', placeholder: '' },
];

// Signin & Security Data

const getSigninSecurityData = (user) => [
	{ label: 'Email addresses', placeholder: user?.email || 'Not provided' },
	{ label: 'Phone numbers', placeholder: user?.phoneNumber || 'Not provided' },
	{ label: 'Change password', placeholder: '' },
	{ label: 'Pass key', placeholder: '' },
	{ label: 'Where you are signed in', placeholder: '' },
	{ label: 'Devices remember your password', placeholder: '' },
	{ label: 'Two Step Verification', placeholder: 'Off' },
];

// Visibility

const VisibilityProfileNetwork = [
	{ label: 'Profile vieiwng options', placeholder: 'Private mode' },
	{ label: 'Page visit visibility', placeholder: 'On' },
	{ label: 'Edit your public profile', placeholder: '' },
	{ label: 'Who can see or download your email address', placeholder: '' },
	{ label: 'Who can see your connections', placeholder: ' On' },
	{
		label: 'Who can see memebers you follow',
		placeholder: 'Anyone of LinkedIn',
	},
	{ label: 'Who can see your last name', placeholder: '' },
	{ label: 'Representing your organizatiopns and interests', placeholder: '' },
	{ label: 'Page owners exporting your data', placeholder: '' },
	{ label: 'Profile discoveryand visibility off LinkedIn', placeholder: '' },
	{ label: 'Profile discovery using email address', placeholder: '' },
	{ label: 'Profile discovery using phone number', placeholder: '' },
	{ label: 'Blocking', placeholder: '' },
];
const VisibilityLinkedInActivity = [
	{ label: 'Manage active status', placeholder: 'Your connections only' },
	{
		label:
			'Share job changes, education changes, and work anniversaries from profile',
		placeholder: 'On',
	},
	{
		label: 'Notify connections when you are in the news',
		placeholder: 'On',
	},
	{
		label: 'Mentioned by others',
		placeholder: 'On',
	},
	{
		label: 'Followers',
		placeholder: '',
	},
];

// Data Privacy

const HowLinkedInUsesyourData = [
	{ label: 'Manage your data anad activity ', placeholder: '' },
	{ label: 'Get a copy of your data', placeholder: '' },
	{ label: 'Mnagae cookie preferences', placeholder: 'On' },
	{ label: 'Search history', placeholder: '' },
	{ label: 'Personal demographic information', placeholder: '' },
	{ label: 'Social, economic,and workplace research', placeholder: 'On' },
	{ label: 'Data for Generative AI Improvement', placeholder: 'On' },
];
const WhoCanReachYou = [
	{ label: 'Invitations to connect', placeholder: '' },
	{ label: 'Invitations from your network', placeholder: '' },
	{ label: 'Messages', placeholder: '' },
	{ label: 'Reasearch invites', placeholder: '' },
];
const MessagingExperience = [
	{ label: 'Focused Inbox', placeholder: 'On' },
	{ label: 'Read recipts and typing indicators', placeholder: '' },
	{ label: 'Messaging suggestions', placeholder: 'On' },
	{ label: 'Message nudges', placeholder: 'On' },
	{ label: 'Automated detction of harmful content', placeholder: 'On' },
];
const JobSeekingPreferences = [
	{ label: 'Job application settings', placeholder: '' },
	{
		label: 'Share your profile when you click Apply for a job',
		placeholder: 'On',
	},
	{
		label:
			'Signal your intrest to recruiters at companies you have created job alerts for',
		placeholder: 'On',
	},
	{ label: 'Stored job applicants accounts', placeholder: '' },
];
const OtherApplications = [
	{ label: 'Premitted services', placeholder: '' },
	{ label: 'Microsoft Word', placeholder: 'On' },
];

// Advertising Data
const ProfileData = [
	{ label: 'Connections', placeholder: 'On' },
	{ label: 'Companies you follow', placeholder: 'On' },
	{ label: 'Groups', placeholder: 'On' },
	{ label: 'Education and Skills', placeholder: '' },
	{ label: 'Job information', placeholder: '' },
	{ label: 'Employer', placeholder: '' },
	{ label: 'Customized display format', placeholder: 'On' },
	{ label: 'Profile Location', placeholder: 'On' },
];
const ActivityInferredData = [
	{ label: 'Inferred city location', placeholder: '' },
	{ label: 'Intrests and traits', placeholder: '' },
	{ label: 'Age range', placeholder: '' },
	{ label: 'Gender', placeholder: '' },
];
const ThirdPartyData = [
	{ label: 'Ads beyond LinkedIn', placeholder: 'On' },
	{ label: 'Interactoins with bussinesses', placeholder: '' },
	{ label: 'AD-related action', placeholder: '' },
];
// Notification

const NotificationData = [
	{ label: 'Searching for a job', placeholder: '' },
	{ label: 'Hiring someone', placeholder: '' },
	{ label: 'Connecting with others', placeholder: '' },
	{ label: 'Network catch-up updates', placeholder: '' },
	{ label: 'POsting and commenting', placeholder: '' },
	{ label: 'Messaging', placeholder: '' },
	{ label: 'Groups', placeholder: '' },
	{ label: 'Pages', placeholder: '' },
	{ label: 'Attending ebents', placeholder: '' },
	{ label: 'News and reports', placeholder: '' },
	{ label: 'Updating your profile', placeholder: '' },
	{ label: 'Verfications', placeholder: '' },
	{ label: 'Games', placeholder: '' },
];
export {
	ProfileInformationData,
	Display,
	GeneralPreferences,
	SyncingOptions,
	SubscriptionsPayments,
	AccountManagement,
	getSigninSecurityData,
	VisibilityProfileNetwork,
	VisibilityLinkedInActivity,
	HowLinkedInUsesyourData,
	WhoCanReachYou,
	MessagingExperience,
	JobSeekingPreferences,
	OtherApplications,
	NotificationData,
	ProfileData,
	ActivityInferredData,
	ThirdPartyData,
};
