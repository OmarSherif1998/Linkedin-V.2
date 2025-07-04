/** @format */

import useNavigation from "../../hooks/useNavigation";

function FooterOptions({ Icon, title, onPostClick }) {
  const { NavigateToMyNetwork, NavigateToHome, NavigateToJobs } =
    useNavigation();

  const handleClick = () => {
    if (title === "Home") NavigateToHome();
    else if (title === "My Network") NavigateToMyNetwork();
    else if (title === "Post") onPostClick();
    else if (title === "Jobs") NavigateToJobs();
  };

  return (
    <div
      className="flex cursor-pointer flex-col items-center"
      onClick={handleClick}
    >
      <Icon className="text-gray-500" />
    </div>
  );
}

export default FooterOptions;
