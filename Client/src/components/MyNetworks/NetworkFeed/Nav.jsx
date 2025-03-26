/** @format */

import { useState } from "react";

const Nav = () => {
  const [activeButton, setActiveButton] = useState("Grow"); // Initial active button

  return (
    <nav className="flex justify-around bg-white text-xs font-semibold md:rounded-lg md:text-lg md:shadow-lg">
      <button
        onClick={() => setActiveButton("Catch Up")}
        className={`${
          activeButton === "Catch Up"
            ? "w-[50%] border-b-2 border-green-600 py-3 text-green-600"
            : "w-[50%] py-3"
        }`}
      >
        Catch Up
      </button>

      <button
        onClick={() => setActiveButton("Grow")}
        className={`${
          activeButton === "Grow"
            ? "w-[50%] border-b-2 border-green-600 py-3 text-green-600"
            : "w-[50%] py-3"
        }`}
      >
        Grow
      </button>
    </nav>
  );
};

export default Nav;
