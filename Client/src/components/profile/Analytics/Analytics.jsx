/** @format */
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SearchIcon from "@mui/icons-material/Search";
import AnalyticsSection from "./AnalyticsSection";
import EastIcon from "@mui/icons-material/East";
import useThemeClasses from "../../../hooks/useThemeClasses";
function Analytics() {
  const {
    componentBGColorClass,
    textColorClass,
    iconColorClass,
    hoverColorClass,
  } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} ${textColorClass} flex flex-col gap-[1rem] border-gray-400 md:rounded-xl md:border md:shadow-lg`}
    >
      <header className="px-5 py-2 font-sans text-lg font-semibold">
        Analytics
        <span
          className={`${textColorClass} flex items-center gap-1 text-[12px] font-thin`}
        >
          <RemoveRedEyeOutlinedIcon
            sx={{ fontSize: 20 }}
            style={{ color: iconColorClass }}
          />
          Private to you{" "}
        </span>
      </header>
      <section className="flex flex-col justify-between gap-5 px-5 md:flex-row">
        <AnalyticsSection
          icon={PeopleIcon}
          title="Profile views"
          description="Discover who's viewed your profile."
        />
        <AnalyticsSection
          icon={LeaderboardIcon}
          title="Post impressions"
          description="Check out who's engaging with your posts."
          additionalInfo="Past 7 days"
        />
        <AnalyticsSection
          icon={SearchIcon}
          title="Search appearances"
          description="See how many people found you in search."
        />
      </section>
      <button
        className={`${hoverColorClass} flex w-full items-center justify-center gap-1 rounded-b-xl py-2 font-medium ${textColorClass}`}
      >
        {" "}
        Show all analytics <EastIcon />
      </button>
    </div>
  );
}

export default Analytics;
