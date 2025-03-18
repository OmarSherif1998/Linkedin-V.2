/** @format */

import React from "react";

function Column({ colData }) {
  return (
    <ul className="mb-2 text-xs font-semibold text-black text-opacity-60">
      {colData.map((data, idx) => {
        return (
          <li className="pb-2" key={idx}>
            {data.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Column;
