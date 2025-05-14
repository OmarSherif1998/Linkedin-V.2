import useThemeClasses from "../../../hooks/useThemeClasses";
import options from "../../../staticData/OptionCardData";
function OptionsCard() {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();
  return (
    <div
      className={`flex flex-col rounded-xl ${borderClass} ${componentBGColorClass} border-t border-gray-300 p-2 font-semibold`}
    >
      {options.map((item, idx) => {
        return (
          <div
            key={idx}
            className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:underline ${textColorClass}`}
          >
            <item.icon fontSize="small" />
            <p className="text-sm">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default OptionsCard;
