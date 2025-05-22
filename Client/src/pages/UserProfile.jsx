/** @format */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useUser";
import { useLocation } from "react-router-dom";
import { getUserByID } from "../api/userAPI";
import { userTypes } from "../staticData/userTypes.js";
import ProfileCard from "../components/profile/ProfileCard/ProfileCard";
import Analytics from "../components/profile/Analytics/Analytics";
import ProfileLangURL from "../components/profile/ProfileLangURL";
import Connection from "../components/Home/Connections/Connection.jsx";
import About from "../components/profile/About";
import Activity from "../components/profile/Activity/Activity";
import LoadingScreen from "../components/util/LoadingScreen";
import Education from "../components/profile/Education/Education";
import Experience from "../components/profile/Experience/Experience";
import Skills from "../components/profile/Skills";
import ProfileFooter from "../components/util/ProfilUtil/ProfileFooter";
import useToken from "../hooks/useToken";
function UserProfile({ type }) {
  const pageSpcs = {
    title: "More profiles for you",
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const visitedId = queryParams.get("visitedId");
  const token = useToken();
  const user = useUser();
  const userId = type === "Me" ? user._id : visitedId;
  const {
    data: userDetails = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Users", userId],
    queryFn: () => getUserByID(userId, token, userTypes.FULL_USER),
  });
  if (isLoading) return <LoadingScreen />;
  if (error) return <h1>Error:{error}</h1>;

  return (
    <div className="flex gap-4 md:mt-5 md:px-[5rem]">
      <div className="flex w-full flex-col gap-1 md:gap-4">
        <ProfileCard type={type} userDetails={userDetails} />
        {type === "Me" && <Analytics />}

        {[
          {
            condition: userDetails?.about,
            component: <About about={userDetails.about} type={type} />,
          },
          {
            condition:
              userDetails?.posts?.length > 0 ||
              userDetails?.comments?.length > 0 ||
              user?.posts?.length > 0 ||
              user?.comments?.length > 0,
            component: (
              <Activity
                connectionCount={userDetails.connectionCount}
                username={userDetails.username}
                posts={userDetails.posts}
                comments={userDetails.comments}
              />
            ),
          },

          {
            condition: userDetails?.experiences?.length,
            component: <Experience userDetails={userDetails} />,
          },
          {
            condition: userDetails?.education?.length,
            component: <Education userDetails={userDetails} />,
          },
          {
            condition: userDetails?.skills?.length,
            component: <Skills Skills={userDetails.skills} type={type} />,
          },
        ].map((item, index) =>
          item.condition ? (
            <React.Fragment key={index}>{item.component}</React.Fragment>
          ) : null,
        )}

        <ProfileFooter />
      </div>

      <div className="hidden w-fit shrink-0 flex-col gap-[1rem] lg:flex">
        {type === "Me" ? <ProfileLangURL /> : null}

        <Connection pageSpecs={pageSpcs} />
      </div>
    </div>
  );
}

export default UserProfile;
