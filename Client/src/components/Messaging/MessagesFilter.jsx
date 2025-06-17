import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import useThemeClasses from "../../hooks/useThemeClasses";
function MessagesFilter() {
  const buttons = ["Jobs", "Unread", "My Connections", " InMail", "Starred"];
  const [isActive, setIsActive] = useState("Focused");
  return (
    <div className="flex items-center gap-3 py-2">
      <section>
        <CustomButton
          label="Focused"
          Icon={ArrowDropDownIcon}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </section>
      <section className="flex gap-1 overflow-x-auto whitespace-nowrap border-l pl-3">
        {buttons.map((data, idx) => {
          return (
            <CustomButton
              label={data}
              isActive={isActive}
              key={idx}
              setIsActive={setIsActive}
            />
          );
        })}
      </section>
    </div>
  );
}

export default MessagesFilter;

function CustomButton({ Icon, label, isActive, setIsActive }) {
  const { darkMode, textColorClass } = useThemeClasses();

  return (
    <button
      onClick={() => setIsActive(label)}
      className={`flex w-fit flex-shrink-0 items-center rounded-2xl text-sm hover:bg-green-700 ${isActive === label ? "bg-green-700 text-white" : `border border-gray-400 ${darkMode ? textColorClass : "text-gray-800"}`} px-3 py-1`}
    >
      {label} {Icon && <Icon />}
    </button>
  );
}
