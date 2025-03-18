/** @format */

const WebsiteInfo = () => (
  <div className="flex flex-col gap-3">
    <div>
      {" "}
      <h1 className="text-xl font-semibold">Website</h1>
      <span className="font-semibold text-gray-500">
        Add a link that will appear at the top of your profile{" "}
      </span>
    </div>
    <div className="flex flex-col">
      <span>Link</span>
      <input
        type="text"
        className="w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin"
      />
    </div>
  </div>
);

export default WebsiteInfo;
