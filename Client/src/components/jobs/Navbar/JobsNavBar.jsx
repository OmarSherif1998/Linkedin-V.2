import { Search, FilterList } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { headerInputs } from "../../../staticData/HeaderData";
import useUser from "../../../hooks/useUser";
import useThemeClasses from "../../../hooks/useThemeClasses";
import FilterCarousel from "./FilterCarousel";
import linkedInLogo from "../../../images/linkedin_Square.png";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Headeroptions from "../../Options/Headeroptions";
function JobsNavBar({
  quickFilter,
  setQuickFilter,
  setFilters,
  search,
  setSearch,
}) {
  const { componentBGColorClass, textColorClass, borderClass } =
    useThemeClasses();
  const { location } = useUser();
  const URL = useLocation();
  const pathName = URL.pathname;

  return (
    <div
      className={`mb-1 shadow-2xl ${componentBGColorClass} ${borderClass} px-4 pt-4 shadow-sm`}
    >
      <div className="align-center mx-auto flex w-[70%] gap-4">
        <img src={linkedInLogo} alt="linkedInLogo" className="size-10" />
        <div className="flex items-center flex-1 gap-2 px-4 py-2 border border-gray-300 rounded-full">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search job titles, keywords, or companies"
            className={`w-full bg-transparent outline-none ${textColorClass}`}
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full">
          <FmdGoodIcon className="text-gray-500" />
          <input
            type="text"
            placeholder={location || "Egypt"}
            className={`w-full bg-transparent outline-none ${textColorClass}`}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full">
          <FilterList className="text-gray-500" />
          <span className={textColorClass}>Filters</span>
        </button>
        {headerInputs.map((data, idx) => {
          return (
            <Headeroptions
              key={idx}
              Icon={data.Icon}
              title={data.title}
              avatar={data.avatar}
              pathName={pathName}
            />
          );
        })}
      </div>

      <FilterCarousel
        quickFilter={quickFilter}
        setQuickFilter={setQuickFilter}
      />
    </div>
  );
}

export default JobsNavBar;
