/** @format */

import { useState } from 'react';
import useThemeClasses from '../../../hooks/useThemeClasses';

const Nav = () => {
  const [activeButton, setActiveButton] = useState('Catch Up'); // Initial active button
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();

  return (
    <nav
      className={`${componentBGColorClass} flex justify-around text-xs font-semibold md:rounded-lg md:text-lg md:shadow-lg`}
    >
      {['Catch Up', 'Grow'].map((buttonLabel, index) => (
        <button
          key={index}
          onClick={() => setActiveButton(buttonLabel)}
          className={`${hoverColorClass} ${index === 0 ? 'rounded-l-md' : 'rounded-r-md'} ${
            activeButton === buttonLabel
              ? `w-[50%] border-b-2 border-green-600 py-3 text-green-600`
              : `w-[50%] py-3 ${textColorClass}`
          }`}
        >
          {buttonLabel}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
