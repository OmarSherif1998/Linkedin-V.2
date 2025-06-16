import useThemeClasses from "../../../hooks/useThemeClasses";
import PremiumComponent from "../../util/PremiumComponent";

function PremiumCard() {
  const { componentBGColorClass, borderClass, darkMode, textColorClass } =
    useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} flex w-full cursor-pointer flex-col gap-2 rounded-xl ${borderClass} border-t border-gray-300 p-2 underline ${
        darkMode ? `hover:bg-gray-800` : "hover:bg-gray-100"
      } hover:no-underline`}
    >
      <h3 className={`text-xs ${darkMode ? textColorClass : "text-gray-600"}`}>
        Unlock premium features & insights
      </h3>
      <div className="flex items-center gap-1">
        <PremiumComponent />
        <p
          className={`${
            darkMode ? textColorClass : "text-gray-600"
          } text-xs font-bold`}
        >
          Try it for 0EGP
        </p>
      </div>
    </div>
  );
}

export default PremiumCard;
