/** @format */
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShieldIcon from "@mui/icons-material/Shield";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
//Settings Options

const sidebarData = [
  {
    label: "Account preferences",
    path: "accountPreferences",
    Icon: PersonIcon,
  },
  { label: "Sign in & security", path: "sign-in-and-security", Icon: LockIcon },
  { label: "Visibility", path: "visibility", Icon: VisibilityIcon },
  { label: "Data privacy", path: "dataPrivacy", Icon: ShieldIcon },
  { label: "Advertising data", path: "ads", Icon: NewspaperIcon },
  { label: "Notifications", path: "notifications", Icon: NotificationsIcon },
];
//Account Preferences
const ProfileInformationData = [
  { path: "", label: "Name, location, and industry", placeholder: "" },
  { path: "", label: "Personal Demographic information", placeholder: "" },
  { path: "", label: "Verification", placeholder: "" },
];
const Display = [{ path: "darkMode", label: "Dark mode", placeholder: "" }];
const GeneralPreferences = [
  { path: "", label: "Language", placeholder: "" },
  { path: "", label: "Content Language", placeholder: "" },
  { path: "", label: "Autoplay videos", placeholder: "" },
  { path: "", label: "Sound effcts", placeholder: "" },
  { path: "", label: "Showing profile photos", placeholder: "" },
  { path: "", label: "Prefferred Feed View", placeholder: "" },
  { path: "", label: "People you unfollowed", placeholder: "" },
];
const SyncingOptions = [
  { path: "", label: "Sync calendar", placeholder: "" },
  { path: "", label: "Sync contacts", placeholder: "" },
];

const SubscriptionsPayments = [
  { path: "", label: "Reactivate", placeholder: "" },
  { path: "", label: "Manage Premium account", placeholder: "" },
  { path: "", label: "View purchase history", placeholder: "" },
];
const AccountManagement = [
  { path: "", label: "Hibernate account", placeholder: "" },
  { path: "", label: "Close account", placeholder: "" },
];

// Signin & Security Data

const getSigninSecurityData = (user) => [
  {
    path: "",
    label: "Email addresses",
    placeholder: user?.email || "Not provided",
  },
  {
    path: "",
    label: "Phone numbers",
    placeholder: user?.phoneNumber || "Not provided",
  },
  { path: "resetPassword", label: "Change password", placeholder: "" },
  { path: "", label: "Pass key", placeholder: "" },
  { path: "", label: "Where you are signed in", placeholder: "" },
  { path: "", label: "Devices remember your password", placeholder: "" },
  { path: "", label: "Two Step Verification", placeholder: "Off" },
];

// Visibility

const VisibilityProfileNetwork = [
  { path: "", label: "Profile vieiwng options", placeholder: "Private mode" },
  { path: "", label: "Page visit visibility", placeholder: "On" },
  { path: "", label: "Edit your public profile", placeholder: "" },
  {
    path: "",
    label: "Who can see or download your email address",
    placeholder: "",
  },
  { path: "", label: "Who can see your connections", placeholder: " On" },
  {
    path: "",
    label: "Who can see memebers you follow",
    placeholder: "Anyone of LinkedIn",
  },
  { path: "", label: "Who can see your last name", placeholder: "" },
  {
    path: "",
    label: "Representing your organizatiopns and interests",
    placeholder: "",
  },
  { path: "", label: "Page owners exporting your data", placeholder: "" },
  {
    path: "",
    label: "Profile discoveryand visibility off LinkedIn",
    placeholder: "",
  },
  { path: "", label: "Profile discovery using email address", placeholder: "" },
  { path: "", label: "Profile discovery using phone number", placeholder: "" },
  { path: "", label: "Blocking", placeholder: "" },
];
const VisibilityLinkedInActivity = [
  {
    path: "",
    label: "Manage active status",
    placeholder: "Your connections only",
  },
  {
    path: "",
    label:
      "Share job changes, education changes, and work anniversaries from profile",
    placeholder: "On",
  },
  {
    path: "",
    label: "Notify connections when you are in the news",
    placeholder: "On",
  },
  {
    path: "",
    label: "Mentioned by others",
    placeholder: "On",
  },
  {
    path: "",
    label: "Followers",
    placeholder: "",
  },
];

// Data Privacy

const HowLinkedInUsesyourData = [
  { path: "", label: "Manage your data anad activity ", placeholder: "" },
  { path: "", label: "Get a copy of your data", placeholder: "" },
  { path: "", label: "Mnagae cookie preferences", placeholder: "On" },
  { path: "", label: "Search history", placeholder: "" },
  { path: "", label: "Personal demographic information", placeholder: "" },
  {
    path: "",
    label: "Social, economic,and workplace research",
    placeholder: "On",
  },
  { path: "", label: "Data for Generative AI Improvement", placeholder: "On" },
];
const WhoCanReachYou = [
  { path: "", label: "Invitations to connect", placeholder: "" },
  { path: "", label: "Invitations from your network", placeholder: "" },
  { path: "", label: "Messages", placeholder: "" },
  { path: "", label: "Reasearch invites", placeholder: "" },
];
const MessagingExperience = [
  { path: "", label: "Focused Inbox", placeholder: "On" },
  { path: "", label: "Read recipts and typing indicators", placeholder: "" },
  { path: "", label: "Messaging suggestions", placeholder: "On" },
  { path: "", label: "Message nudges", placeholder: "On" },
  {
    path: "",
    label: "Automated detction of harmful content",
    placeholder: "On",
  },
];
const JobSeekingPreferences = [
  { path: "", label: "Job application settings", placeholder: "" },
  {
    path: "",
    label: "Share your profile when you click Apply for a job",
    placeholder: "On",
  },
  {
    path: "",
    label:
      "Signal your intrest to recruiters at companies you have created job alerts for",
    placeholder: "On",
  },
  { path: "", label: "Stored job applicants accounts", placeholder: "" },
];
const OtherApplications = [
  { path: "", label: "Premitted services", placeholder: "" },
  { path: "", label: "Microsoft Word", placeholder: "On" },
];

// Advertising Data
const ProfileData = [
  { path: "", label: "Connections", placeholder: "On" },
  { path: "", label: "Companies you follow", placeholder: "On" },
  { path: "", label: "Groups", placeholder: "On" },
  { path: "", label: "Education and Skills", placeholder: "" },
  { path: "", label: "Job information", placeholder: "" },
  { path: "", label: "Employer", placeholder: "" },
  { path: "", label: "Customized display format", placeholder: "On" },
  { path: "", label: "Profile Location", placeholder: "On" },
];
const ActivityInferredData = [
  { path: "", label: "Inferred city location", placeholder: "" },
  { path: "", label: "Intrests and traits", placeholder: "" },
  { path: "", label: "Age range", placeholder: "" },
  { path: "", label: "Gender", placeholder: "" },
];
const ThirdPartyData = [
  { path: "", label: "Ads beyond LinkedIn", placeholder: "On" },
  { path: "", label: "Interactoins with bussinesses", placeholder: "" },
  { path: "", label: "AD-related action", placeholder: "" },
];
// Notification

const NotificationData = [
  { path: "", label: "Searching for a job", placeholder: "" },
  { path: "", label: "Hiring someone", placeholder: "" },
  { path: "", label: "Connecting with others", placeholder: "" },
  { path: "", label: "Network catch-up updates", placeholder: "" },
  { path: "", label: "Posting and commenting", placeholder: "" },
  { path: "", label: "Messaging", placeholder: "" },
  { path: "", label: "Groups", placeholder: "" },
  { path: "", label: "Pages", placeholder: "" },
  { path: "", label: "Attending events", placeholder: "" },
  { path: "", label: "News and reports", placeholder: "" },
  { path: "", label: "Updating your profile", placeholder: "" },
  { path: "", label: "Verfications", placeholder: "" },
  { path: "", label: "Games", placeholder: "" },
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
  sidebarData,
};
