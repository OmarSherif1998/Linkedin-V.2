/** @format */

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
    <div className="w-full gap-5 lg:flex lg:justify-around xl:px-48 2xl:px-96">
      <div className="hidden max-w-[20%] lg:flex xl:max-w-[35%]">
        <Sidebar />
      </div>

      <div className="lg:w-[50%]">
        <Feed user={user} />
      </div>

      <div className="hidden w-[25%] gap-2 md:flex md:flex-col">
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
