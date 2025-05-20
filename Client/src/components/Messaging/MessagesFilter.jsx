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
      <section className="hidden gap-1 pl-3 border-l md:flex">
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
      className={`flex w-fit items-center rounded-full hover:bg-green-700 ${isActive === label ? "bg-green-700 text-white" : `border border-gray-400 ${darkMode ? textColorClass : "text-gray-800"}`} px-3 py-1`}
    >
      {label} {Icon && <Icon />}
    </button>
  );
}
