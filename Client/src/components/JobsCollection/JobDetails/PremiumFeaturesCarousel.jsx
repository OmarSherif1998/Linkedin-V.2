import { PiStarFourFill } from 'react-icons/pi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import useThemeClasses from '../../../hooks/useThemeClasses';

const premiumFeatures = [
  'Tailor my resume to this job',
  'Am I a good fit for this job?',
  'How can I best position myself for this job?',
];

function PremiumFeaturesCarousel() {
  const scrollRef = useRef();
  const [isAtStart, setIsAtStart] = useState(true);
  const { darkMode, TextColorClass, premiumCarouselTheme } = useThemeClasses();
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setIsAtStart(scrollRef.current.scrollLeft === 0);
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft += dir === 'left' ? -200 : 200;
  };
  return (
    <div className='relative flex items-center gap-3'>
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className={`rounded-full p-2 ${TextColorClass} ${premiumCarouselTheme}`}
      >
        {isAtStart ? (
          <PiStarFourFill
            className={`size-[20px] rounded-full border-gray-600 text-premiumColor`}
          />
        ) : (
          <FaChevronLeft
            className={`size-[20px] ${darkMode ? TextColorClass : 'text-gray-500'} `}
          />
        )}
      </button>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className='flex gap-2 overflow-x-hidden scroll-smooth'
      >
        {premiumFeatures.map((feature, index) => (
          <div
            key={index}
            className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm ${TextColorClass} ${darkMode ? 'bg-zinc-800 hover:hover:bg-zinc-700' : 'bg-PremiumGray bg-opacity-80 hover:bg-opacity-100'} `}
          >
            <PiStarFourFill className='text-lightPremiumColor' />
            <span
              className={`text-xs font-semibold ${darkMode ? TextColorClass : 'text-gray-500'}`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className={`rounded-full p-2 ${TextColorClass} ${darkMode ? 'bg-zinc-800 hover:hover:bg-zinc-700' : 'bg-PremiumGray bg-opacity-80 hover:bg-opacity-100'}`}
      >
        <FaChevronRight
          className={`size-[20px] ${TextColorClass} ${darkMode ? TextColorClass : 'text-gray-500'}`}
        />
      </button>
    </div>
  );
}

export default PremiumFeaturesCarousel;
