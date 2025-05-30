/** @format */

import ManageSidebar from "../components/MyNetworks/ManageSidebar";
import NetworkFeed from "../components/MyNetworks/NetworkFeed";
import LoggedUserFooter from "../components/util/LoggedUserFooter";

function MyNetwork() {
  return (
    <div className="flex w-full gap-5 md:px-10">
      <div className="hidden h-full min-w-[45%] flex-col justify-between md:flex md:w-[30%]">
        <ManageSidebar />
        <LoggedUserFooter />
      </div>

      {/* Main Content Area */}
      <div className="w-full overflow-y-auto md:w-[70%]">
        <NetworkFeed />
      </div>
    </div>
  );
}

export default MyNetwork;
