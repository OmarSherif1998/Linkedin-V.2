/** @format */

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChooseOptionButton from "./util/ChooseOptionButton";
import useThemeClasses from "../../hooks/useThemeClasses";
function SubSectionForm({ StaticDate, title }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  return (
    <section className={`rounded-lg ${componentBGColorClass}`}>
      {title && (
        <h1 className={`${textColorClass} my-5 px-5 text-lg font-semibold`}>
          {title}
        </h1>
      )}

      {StaticDate?.map((data, idx) => {
        return (
          <section key={idx} className="hover:cursor-pointer">
            <ChooseOptionButton
              label={data.label}
              placeholder={data.placeholder}
              Arrow={ArrowForwardIcon}
              path={data.path}
            />

            {StaticDate.length > idx ? (
              <div className="w-full border-t-[0.5px] border-gray-50 border-opacity-5" />
            ) : null}
          </section>
        );
      })}
    </section>
  );
}

export default SubSectionForm;
