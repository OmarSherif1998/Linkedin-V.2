/** @format */
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import useThemeClasses from "../../hooks/useThemeClasses";
function SearchButton() {
  const { hoverColorClass, iconColorClass } = useThemeClasses();
  return (
    <nav className="flex items-center justify-between gap-2 px-2">
      <SearchIcon
        fontSize="large"
        className={`${hoverColorClass} mt-2 cursor-pointer rounded-full p-2`}
        style={{ color: iconColorClass }}
      />
      <input
        type="text"
        placeholder="Search messages"
        className="mt-2 w-full rounded-lg bg-gray-200 p-1"
      />
      <TuneIcon
        fontSize="large"
        className={`mt-2 cursor-pointer ${hoverColorClass} rounded-full p-2`}
        style={{ color: iconColorClass }}
      />
    </nav>
  );
}

export default SearchButton;
