/** @format */

import ManageSidebar from "../components/MyNetworks/ManageSidebar";
import NetworkFeed from "../components/MyNetworks/NetworkFeed";
import LoggedUserFooter from "../components/util/LoggedUserFooter";

function MyNetwork() {
  return (
    <div className="flex w-full gap-5 md:px-10">
      <div className="top-0 hidden h-screen min-w-[45%] flex-col justify-between md:sticky md:flex md:w-[30%]">
        <ManageSidebar />
        <LoggedUserFooter />
      </div>

      {/* Scrollable Content */}
      <div className="max-h-screen w-full overflow-y-auto md:w-[70%]">
        <NetworkFeed />
      </div>
    </div>
  );
}

export default MyNetwork;
