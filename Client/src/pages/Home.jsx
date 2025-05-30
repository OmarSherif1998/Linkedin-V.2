/** @format */

import React from "react";
import useUser from "../hooks/useUser";
import Feed from "../components/Home/Feed";
import Sidebar from "../components/Home/Sidebar/Sidebar";
import Connection from "../components/Home/Connections/Connection";
import Chat from "./Chat";
import LoggedUserFooter from "../components/util/LoggedUserFooter";
import CompaniesList from "../components/company/CompaniesList";

function Home() {
  const user = useUser();

  const pageSpcs = {
    width: "fit",
    title: " Add to your feed",
  };
  return (
    <div className="w-full lg:flex lg:justify-between lg:px-10">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <Feed user={user} />
      <div className="hidden w-[20%] gap-2 md:flex md:flex-col">
        <Connection pageSpecs={pageSpcs} />
        <CompaniesList />
        <LoggedUserFooter />
      </div>

      <div className="hidden lg:fixed lg:bottom-0 lg:right-0 lg:z-50 lg:block">
        <Chat />
      </div>
    </div>
  );
}

export default Home;
