/** @format */

import useThemeClasses from '../../hooks/useThemeClasses';
import { footerInputs } from '../../staticData/footerData';
import FooterOptions from '../Options/FooterOptions';

function MobileFooter({ onPostClick }) {
  const { componentBGColorClass, darkMode, borderColor } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} invisible fixed bottom-0 z-[999] flex h-[4rem] w-full items-center px-4`}
    >
      <div
        className={`${darkMode ? `border-t ${borderColor} ` : ''} flex w-full justify-between pt-2`}
      >
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
