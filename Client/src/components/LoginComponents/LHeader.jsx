/** @format */

import Headeroptions from "../Options/Headeroptions";
import { LHeaderData } from "../../staticData/LHeaderData";
import useNavigation from "../../hooks/useNavigation";
function LHeader() {
  const { NavigateToSignup } = useNavigation();
  return (
    <div className="flex justify-between gap-[1.25rem] p-[1.25rem]">
      <img
        src={require("../../images/linkedin.png")}
        alt=""
        className="h-[2rem] w-[7.25rem]"
      />

      <div className="flex gap-[1.25rem]">
        <div className="hidden gap-[1.25rem] md:flex">
          {LHeaderData.map((data, idx) => (
            <Headeroptions key={idx} title={data.title} Icon={data.icon} />
          ))}
        </div>

        <button
          className="w-[5rem] rounded-full border border-LinkedInBlue text-sm hover:cursor-pointer hover:bg-gray-100 md:w-[7rem]"
          onClick={NavigateToSignup}
        >
          Join now
        </button>
        <button className="w-[5rem] rounded-full border border-LinkedInBlue text-sm hover:cursor-pointer hover:bg-LinkedInBlue hover:text-white md:w-[7rem]">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default LHeader;
