import useThemeClasses from "../../../hooks/useThemeClasses";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
function OptionsCard() {
  const { darkMode, componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();
  return (
    <div
      className={`${
        darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
      } flex items-center rounded-xl ${borderClass} ${componentBGColorClass} border-t border-gray-300 p-2 font-semibold`}
    >
      <TurnedInOutlinedIcon style={{ color: "gray" }} />
      <p className={`${textColorClass} cursor-pointer`}>Saved Items</p>
    </div>
  );
}

export default OptionsCard;
