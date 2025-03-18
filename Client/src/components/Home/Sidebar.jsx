/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/sllices/userSlice";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import { useNavigation } from "../../hooks/useNavigation";
function Sidebar() {
  const user = useSelector(selectUser);
  const { NavigateToProfile } = useNavigation();

  const recentItems = (topic) => (
    <div key={topic} className="flex-col">
      <p className="hover:bg-whitesmoke hover:text-red mx-[.625rem] gap-2 hover:cursor-pointer hover:rounded-lg">
        #{topic}
      </p>
    </div>
  );
  const ProfileInsight = ({ profileData }) => {
    return (
      <div className="flex w-full cursor-pointer items-center border-gray-300 p-2 hover:bg-gray-100">
        <p className="text-gray-600">{profileData.Title}</p>
        <p className="ml-auto font-semibold text-[#0a66c2]">
          {profileData.Num}
        </p>
      </div>
    );
  };
  const recentData = [
    "reactJS",
    "Programming",
    "ChatGPT",
    "NextJS",
    "AngularJS",
  ];
  const profileData = [
    { Title: "Profile viwers", Num: "200" },
    { Title: "Posts Impressions", Num: "150" },
  ];
  return (
    <div className="rounded-lg">
      <div
        onClick={NavigateToProfile}
        className="border-lightslategray relative flex flex-col items-center rounded-t-lg border border-t-0 bg-white pb-2.5"
      >
        <div className="relative h-[5rem] w-full cursor-pointer">
          <img
            src={user?.coverPicture}
            alt=""
            className="h-full w-full rounded-t-lg object-cover"
          />
          <img
            src={user?.profilePicture}
            alt="profilePicture"
            className="absolute -bottom-10 left-1/2 z-10 h-20 w-20 -translate-x-1/2 transform rounded-full border-2 border-white object-cover"
          />
        </div>

        <button className="mt-10 flex flex-col items-center">
          <h2 className="text-lg text-black hover:underline">
            {user?.firstName} {user?.lastName}
          </h2>
        </button>

        <span className="text-center text-xs text-gray-600">
          {user?.bio || "Software Engineer"}
        </span>
      </div>
      <div className="flex flex-col gap-[0.1rem]">
        {" "}
        <div className="border-lightgray rounded-b-xl border bg-white text-xs">
          {profileData.map((data, index) => (
            <ProfileInsight key={index} profileData={data} />
          ))}
          <div className="flex w-full cursor-pointer flex-col gap-2 border-t border-gray-300 bg-white p-2 underline hover:bg-gray-100 hover:no-underline">
            <h3 className="text-xs text-gray-600">
              Unlock premium features & insights
            </h3>
            <div className="flex items-center gap-1">
              {" "}
              <WorkspacePremiumOutlinedIcon style={{ color: "#e6c611" }} />
              <p className="text-xs font-bold text-gray-600">Try it for 0EGP</p>
            </div>
          </div>
          <div className="flex items-center border-t border-gray-300 p-2 font-semibold hover:bg-gray-100">
            <TurnedInOutlinedIcon style={{ color: "gray" }} />
            <p>Saved Items</p>
          </div>
        </div>
      </div>

      <div className="border-lightgray mt-2.5 rounded-lg border bg-white p-2.5 text-left">
        <p className="pb-2.5 text-sm">Recent</p>
        {recentData.map(recentItems)}
      </div>
    </div>
  );
}

export default Sidebar;
