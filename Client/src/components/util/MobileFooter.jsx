/** @format */

import { footerInputs } from "../../staticData/footerData";
import FooterOptions from "../Options/FooterOptions";

function MobileFooter({ onPostClick }) {
  return (
    <div className="fixed bottom-0 z-[999] flex h-[4rem] w-full items-center bg-white px-4">
      <div className="flex justify-between w-full">
        {footerInputs.map((data, index) => (
          <FooterOptions
            key={index}
            Icon={data.Icon}
            title={data.title}
            onPostClick={onPostClick}
          />
        ))}
      </div>
    </div>
  );
}

export default MobileFooter;
