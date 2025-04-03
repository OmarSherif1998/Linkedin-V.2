import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

function MessagesFilter() {
  const buttons = ["Jobs", "Unread", "My Connections", " InMail", "Starred"];
  const [isActive, setIsActive] = useState("Focused");
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-2">
      <section>
        <CustomButton
          label="Focused"
          Icon={ArrowDropDownIcon}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </section>
      <section className="hidden gap-1 border-l pl-3 md:flex">
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
  return (
    <button
      onClick={() => setIsActive(label)}
      className={`flex w-fit items-center rounded-full ${isActive === label ? "bg-green-700 text-white" : "border border-gray-400 text-gray-800"} px-3 py-1`}
    >
      {label} {Icon && <Icon />}
    </button>
  );
}
