import React from "react";
import useThemeClasses from "../../../../hooks/useThemeClasses";

function NewChatNav({
  handleChatParticpantsTabOpen,
  CloseIcon,
  closeChatTab,
  newChatID,
}) {
  const {
    componentBGColorClass,
    textColorClass,
    iconColorClass,
    hoverColorClass,
  } = useThemeClasses();
  return (
    <nav
      onClick={handleChatParticpantsTabOpen}
      className={`z-10 mb-1 flex items-center justify-between rounded-t-md border-b ${componentBGColorClass} p-2`}
    >
      <h2 className={`text-md ${textColorClass}`}>New message </h2>{" "}
      {/* log the chatID next to new message if debugging is needed */}
      <CloseIcon
        fontSize="large"
        className={` ${hoverColorClass} cursor-pointer rounded-full p-2`}
        onClick={() => closeChatTab(newChatID)}
        style={{ color: iconColorClass }}
      />
    </nav>
  );
}

export default NewChatNav;
