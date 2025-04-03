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
      <div className="flex items-center w-full p-2 border-gray-300 cursor-pointer hover:bg-gray-100">
        <p className="text-gray-600">{profileData.Title}</p>
        <p className="ml-auto font-semibold text-[#0a66c2]">
          {profileData.Num}
        </p>
      </div>
    );
  };
  const recentData = [
    "ReactJS",
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
            className="object-cover w-full h-full rounded-t-lg"
          />
          <img
            src={user?.profilePicture}
            alt="profilePicture"
            className="absolute z-10 object-contain w-20 h-20 transform -translate-x-1/2 bg-white border rounded-full -bottom-10 left-1/2"
          />
        </div>

        <button className="flex flex-col items-center mt-10">
          <h2 className="text-lg text-black hover:underline">
            {user?.firstName} {user?.lastName}
          </h2>
        </button>

        <span className="text-xs text-center text-gray-600">
          {user?.bio || "Software Engineer"}
        </span>
      </div>
      <div className="flex flex-col gap-[0.1rem]">
        {" "}
        <div className="text-xs bg-white border border-lightgray rounded-b-xl">
          {profileData.map((data, index) => (
            <ProfileInsight key={index} profileData={data} />
          ))}
          <div className="flex flex-col w-full gap-2 p-2 underline bg-white border-t border-gray-300 cursor-pointer hover:bg-gray-100 hover:no-underline">
            <h3 className="text-xs text-gray-600">
              Unlock premium features & insights
            </h3>
            <div className="flex items-center gap-1">
              {" "}
              <WorkspacePremiumOutlinedIcon style={{ color: "#e6c611" }} />
              <p className="text-xs font-bold text-gray-600">Try it for 0EGP</p>
            </div>
          </div>
          <div className="flex items-center p-2 font-semibold border-t border-gray-300 hover:bg-gray-100">
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
