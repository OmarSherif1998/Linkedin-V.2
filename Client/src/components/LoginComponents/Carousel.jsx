/** @format */

import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CarouselItems from "../../staticData/CarouselItems.js";
import InputOption from "../Options/InputOption.jsx";

const Carousel = () => {
  const [counter, setCounter] = useState(0);
  const maxIndex = CarouselItems.length - 1;

  const updateCount = (direction) => {
    if (direction === "next") {
      setCounter((prevCounter) =>
        prevCounter < maxIndex ? prevCounter + 1 : 0,
      );
    } else if (direction === "prev") {
      setCounter((prevCounter) =>
        prevCounter > 0 ? prevCounter - 1 : maxIndex,
      );
    }
  };

  return (
    <div className="hidden h-[45rem] w-full items-center justify-center gap-[5rem] bg-[#f3f2f0] px-[5rem] py-[2.5rem] md:flex 2xl:h-[37.5rem]">
      <button
        onClick={() => updateCount("prev")}
        className="rounded-full p-[1rem] opacity-80 hover:opacity-50"
      >
        <InputOption Icon={ArrowBackIosNewIcon} />
      </button>

      <div className="flex w-[30%] flex-col">
        <h2 className="font-sans text-[1.75rem] font-normal leading-[1.25] text-[#8f5849] 2xl:text-[2.5rem]">
          {CarouselItems[counter].header}
        </h2>
        <p className="font-sans text-[1.25rem] font-light 2xl:text-[1.875rem]">
          {CarouselItems[counter].paragraph}
        </p>
      </div>

      <img
        src={CarouselItems[counter].image}
        alt={CarouselItems[counter].header}
        className="size-[25rem] object-cover 2xl:size-[31.25rem]"
      />

      <button
        onClick={() => updateCount("next")}
        className="rounded-full p-[1rem] opacity-80 hover:opacity-50"
      >
        <InputOption Icon={ArrowForwardIosIcon} />
      </button>
    </div>
  );
};

export default Carousel;
