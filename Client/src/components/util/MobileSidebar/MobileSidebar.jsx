import useThemeClasses from "../../../hooks/useThemeClasses";
import Impressions from "./Impressions";
import Navbar from "./Navbar";
import SettingsAndPremium from "./SettingsAndPremium";
import SidebarOptions from "./SidebarOptions";

const MobileSidebar = ({ isOpen, onClose }) => {
  const { componentBGColorClass } = useThemeClasses();

  if (!isOpen) return null;
  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[998] bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`${componentBGColorClass} fixed left-0 top-0 z-[999] flex h-full w-[75%] transform flex-col shadow-lg transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Navbar onClose={onClose} />
        <Impressions />
        <SidebarOptions />
        <SettingsAndPremium onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileSidebar;
