/** @format */

import CloseIcon from "@mui/icons-material/Close";
import NotifyNetwork from "./NotifyNetwork";
import useThemeClasses from "../../../hooks/useThemeClasses";

function FormNav({ closeForm, Title, formVersion }) {
  const { textColorClass, iconColorClass, hoverColorClass } = useThemeClasses();
  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <h1 className={`${textColorClass} text-lg font-semibold`}>{Title}</h1>
        <CloseIcon
          className={`${hoverColorClass} m-1 cursor-pointer rounded-full p-1`}
          onClick={closeForm}
          fontSize="large"
          style={{ color: iconColorClass }}
        />{" "}
      </div>
      {Title === "Add a new experience" || Title === "Add Education" ? (
        <NotifyNetwork formVersion={formVersion} />
      ) : null}
      <span className="flex gap-1 pt-2 text-xs font-thin text-gray-400">
        <p className="text-red-500">*</p> Indicates required
      </span>
    </div>
  );
}

export default FormNav;
