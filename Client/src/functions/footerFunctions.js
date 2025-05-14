/** @format */
import InputOption from "../components/Options/InputOption";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const ColumnList = ({ data }) => {
  return (
    <ul>
      {data.map((col, index) => (
        <li
          key={index}
          className={`hover:cursor-pointer ${
            col.title ? "font-bold" : "font-normal hover:text-blue-900"
          }`}
        >
          {col.name}
        </li>
      ))}
    </ul>
  );
};
const SubColumnList = ({ data }) => {
  return (
    <ul className="flex w-screen items-center gap-[0.5rem] md:pl-[1.25rem]">
      <li>
        <img
          src={require("../images/linkedin - black.png")}
          alt=""
          className="mt-[0.25rem] h-[1rem] md:w-[4.5rem]"
        />
      </li>
      {data.map((col, index) => (
        <li key={index} className="cursor-pointer hover:text-blue-800">
          {col.name}
        </li>
      ))}
      <li>
        <InputOption Icon={KeyboardArrowDownIcon} />
      </li>
    </ul>
  );
};

export { ColumnList, SubColumnList };
