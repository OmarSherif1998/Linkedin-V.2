/** @format */

import React from "react";
function PremiumAd() {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white p-3 shadow-lg md:p-5">
      <section className="flex flex-col gap-2">
        <h1 className="flex justify-between text-xs font-semibold md:text-lg">
          Job search smarter
        </h1>

        <h3 className="text-[9px] text-gray-900 md:text-lg">
          See who has viewed your profile and directly message recruiters with
          InMail.
        </h3>
      </section>

      <button className="w-fit rounded-full bg-LightGold px-4 py-1 text-[9px] hover:bg-gold md:text-base">
        Try Premium for EGP0
      </button>

      <h5 className="text-xs font-thin md:text-sm">
        1-month free trial. We will send you a reminder 7 days before your trial
        ends.
      </h5>
    </div>
  );
}

export default PremiumAd;
