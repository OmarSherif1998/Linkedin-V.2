import SettingsIcon from "@mui/icons-material/Settings";
import useThemeClasses from "../../../hooks/useThemeClasses";
import useNavigation from "../../../hooks/useNavigation";
import PremiumComponent from "../PremiumComponent";
function SettingsAndPremium({ onClose }) {
  const { textColorClass } = useThemeClasses();
  const { NavigateToSettings } = useNavigation();
  return (
    <div className={`${textColorClass} flex flex-col justify-start gap-5 p-4`}>
      <button className="flex items-center gap-2">
        <p
          className={`flex items-center gap-2 text-lg font-bold ${textColorClass}`}
        >
          <PremiumComponent /> Activate Premium
        </p>
      </button>
      <button
        onClick={() => {
          NavigateToSettings();
          onClose();
        }}
        className="flex items-center gap-2"
      >
        <SettingsIcon className="size-10 text-gray-400" />
        <p className={`text-lg font-bold ${textColorClass}`}> Settings</p>
      </button>
    </div>
  );
}

export default SettingsAndPremium;
