/** @format */

import React from "react";
import { ColumnList, SubColumnList } from "../../functions/footerFunctions.js";
import linkedinLogo from "../../images/linkedin.png";
import {
  column1,
  column2,
  column3,
  column4,
  column5,
} from "../../staticData/footerData.js";

function Footer() {
  return (
    <div>
      <div className="hidden flex-row justify-evenly gap-[1.25rem] bg-footerGray py-[5rem] md:flex">
        <img src={linkedinLogo} alt="" className="h-[2rem] w-[6.5rem]" />
        <ColumnList data={column1} />
        <ColumnList data={column2} />
        <ColumnList data={column3} />
        <ColumnList data={column4} />
      </div>
      <div className="justify-center hidden md:flex">
        <SubColumnList data={column5} />
      </div>
    </div>
  );
}

export default Footer;
