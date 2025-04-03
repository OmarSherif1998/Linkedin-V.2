/** @format */

import React from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SearchIcon from "@mui/icons-material/Search";
import AnalyticsSection from "./AnalyticsSection";
import EastIcon from "@mui/icons-material/East";
function Analytics() {
  return (
    <div className="flex flex-col gap-[1rem] border-gray-400 bg-white md:rounded-xl md:border md:shadow-lg">
      <header className="px-5 py-2 font-sans text-lg font-semibold">
        Analytics
        <span className="flex items-center gap-1 text-[12px] font-thin text-gray-900">
          <RemoveRedEyeOutlinedIcon sx={{ fontSize: 20 }} />
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
      <button className="flex items-center justify-center w-full gap-1 py-2 font-medium text-gray-900 rounded-b-xl hover:bg-gray-100">
        {" "}
        Show all analytics <EastIcon />
      </button>
    </div>
  );
}

export default Analytics;
