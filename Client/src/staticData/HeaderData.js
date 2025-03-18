/** @format */

import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const headerInputs = [
  { Icon: HomeIcon, title: "Home" },
  { Icon: SupervisorAccountIcon, title: "My Network" },
  { Icon: BusinessCenterIcon, title: "Jobs" },
  { Icon: ChatIcon, title: "Messaging" },
  { Icon: NotificationsIcon, title: "Notifications" },
  { avatar: true, title: "Me" }, // Avatar with dropdown should be styled to include a small down arrow
];
const PreumiumInput = [
  { Icon: ViewCompactIcon, title: "For Business", isDropdown: true }, // Add dropdown functionality
  { Icon: WorkspacePremiumIcon, title: "Try for 0EGP", isSpecial: true }, // Style this differently if needed
];

export { headerInputs, PreumiumInput };
