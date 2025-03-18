/** @format */

import { footerInputs } from "../../staticData/footerData";
import FooterOptions from "../Options/FooterOptions";

function MobileFooter() {
  return (
    <div className="fixed bottom-0 z-[999] flex h-[4rem] w-full items-center bg-white px-4">
      <div className="flex w-full justify-between">
        {footerInputs.map((data, index) => (
          <FooterOptions key={index} Icon={data.Icon} title={data.title} />
        ))}
      </div>
    </div>
  );
}

export default MobileFooter;
