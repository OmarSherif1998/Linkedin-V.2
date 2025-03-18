/** @format */

import { useState } from "react";

const Nav = () => {
  const [activeButton, setActiveButton] = useState("Grow"); // Initial active button

  return (
    <nav className="flex gap-10 rounded-lg bg-white p-5 text-lg font-semibold shadow-lg">
      <button
        onClick={() => setActiveButton("Grow")}
        className={`${
          activeButton === "Grow"
            ? "border-b-2 border-green-600 text-green-600"
            : ""
        }`}
      >
        Grow
      </button>
      <button
        onClick={() => setActiveButton("Catch Up")}
        className={`${
          activeButton === "Catch Up"
            ? "border-b-2 border-green-600 text-green-600"
            : ""
        }`}
      >
        Catch Up
      </button>
    </nav>
  );
};

export default Nav;
