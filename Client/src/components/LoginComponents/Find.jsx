/** @format */

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputOption from "../Options/InputOption";
import person3 from "../../images/person3.jpg";

const BtnList = ({ data }) => {
  return data.map((item, index) => (
    <button
      key={index}
      className="flex h-[3.125rem] w-[20.625rem] cursor-pointer items-center justify-between border-none bg-[#eae6df] px-[1.25rem] hover:bg-[#c7d5ea] hover:text-white"
    >
      <p className="font-system pt-[0.5rem] text-base font-medium italic">
        {item}
      </p>
      <InputOption Icon={ArrowForwardIosIcon} />
    </button>
  ));
};

function Find() {
  const btnData = [
    "Find a wroker or classmate",
    "Find a new job",
    "Find a course or training",
  ];
  return (
    <div className="hidden w-full flex-wrap items-center justify-center py-[2.5rem] md:flex">
      <div className="mr-auto flex h-[43.75rem] w-full flex-col flex-wrap content-around items-start justify-center bg-[#34568b] lg:w-1/2">
        <div className="c7heading">
          <h1 className="pb-[0.25rem] text-5xl font-light italic text-white">
            Who is LinkedIn for?
          </h1>
          <h2 className="pb-[1.5rem] text-3xl font-light italic text-white">
            Anyone looking to navigate their professional life.
          </h2>
        </div>
        <div className="flex flex-col items-center gap-[1rem]">
          {<BtnList data={btnData} />}
        </div>
      </div>
      <div className="flex-grow-[0.5]">
        <img src={person3} alt="" className="w-[43.75rem] lg:w-[34.375rem]" />
      </div>
    </div>
  );
}

export default Find;
