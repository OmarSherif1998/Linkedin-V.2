import { PiStarFourFill } from "react-icons/pi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const premiumFeatures = [
  "Tailor my resume to this job",
  "Am I a good fit for this job?",
  "How can I best position myself for this job?",
];

function PremiumFeaturesCarousel() {
  const scrollRef = useRef();
  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setIsAtStart(scrollRef.current.scrollLeft === 0);
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft += dir === "left" ? -200 : 200;
  };
  return (
    <div className="relative flex items-center gap-3">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className={`rounded-full bg-zinc-800 p-2 text-white hover:bg-zinc-700`}
      >
        {isAtStart ? (
          <PiStarFourFill className="text-premiumColor size-[20px] rounded-full border-gray-600" />
        ) : (
          <FaChevronLeft className="size-[20px]" />
        )}
      </button>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-hidden scroll-smooth"
      >
        {premiumFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full cursor-pointer shrink-0 bg-zinc-800 hover:bg-zinc-700"
          >
            <PiStarFourFill className="text-lightPremiumColor" />
            <span className="text-xs font-semibold">{feature}</span>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="p-2 text-white rounded-full bg-zinc-800 hover:bg-zinc-700"
      >
        <FaChevronRight className="size-[20px]" />
      </button>
    </div>
  );
}

export default PremiumFeaturesCarousel;
