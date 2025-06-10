import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { barData } from "../../../staticData/FilterBarData";
import useThemeClasses from "../../../hooks/useThemeClasses";
function FilterCarousel({ quickFilter, setQuickFilter }) {
  const scrollRef = useRef();
  const { textColorClass } = useThemeClasses();
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
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
    <div className="relative mx-auto flex w-[70%] items-center gap-3 pt-4">
      <button
        onClick={() => scroll("left")}
        className={`rounded-full bg-zinc-800 p-2 text-white hover:bg-zinc-700`}
      >
        <FaChevronLeft className="size-[10px]" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-hidden scroll-smooth"
      >
        {barData.map((data, index) => (
          <div
            key={index}
            className={`${textColorClass} flex shrink-0 cursor-pointer items-center gap-2 ${quickFilter === data.name ? "border-b-2" : ""} px-4`}
            onClick={() => setQuickFilter(data.name)}
          >
            {data.logo}
            <span className="font-semibold md:text-lg">{data.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="p-2 text-white rounded-full bg-zinc-800 hover:bg-zinc-700"
      >
        <FaChevronRight className="size-[10px]" />
      </button>
    </div>
  );
}

export default FilterCarousel;
