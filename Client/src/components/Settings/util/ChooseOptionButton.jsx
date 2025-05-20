/** @format */

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveSection } from "../../../Redux/sllices/settingsSlice";
import useThemeClasses from "../../../hooks/useThemeClasses";
function ChooseOptionButton({ label, placeholder, Arrow, path }) {
  const { textColorClass } = useThemeClasses();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center justify-between h-full px-5 my-3"
      onClick={() => {
        if (path) {
          navigate(path);
          dispatch(setActiveSection(label));
        }
      }}
    >
      <p className={`${textColorClass} text-opacity-75 hover:underline`}>
        {label}
      </p>
      <section className="flex items-center gap-3">
        {placeholder ? (
          <span className={`${textColorClass} text-opacity-60`}>
            {placeholder}
          </span>
        ) : null}
        <Arrow className="text-gray-500" fontSize={"small"} />
      </section>
    </div>
  );
}

export default ChooseOptionButton;
