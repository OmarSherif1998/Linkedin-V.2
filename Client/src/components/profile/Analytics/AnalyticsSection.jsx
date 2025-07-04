/** @format */

import useThemeClasses from "../../../hooks/useThemeClasses";

const AnalyticsSection = ({
  icon: Icon,
  title,
  description,
  additionalInfo,
}) => {
  const { hoverColorClass } = useThemeClasses();
  const random = Math.floor(Math.random() * 100);
  return (
    <div
      className={`${hoverColorClass} w-full cursor-pointer rounded-lg border border-gray-200 p-2 shadow-md md:p-4`}
    >
      <section className="flex gap-1">
        <Icon />
        <h1 className="text-base font-semibold md:text-lg">
          {random + " "}
          {title}
        </h1>
      </section>
      <p className="text-sm text-gray-500 md:text-base">
        {description}
        {additionalInfo && <br />}
        {additionalInfo && (
          <span className="text-xs text-gray-400 md:text-sm">
            {additionalInfo}
          </span>
        )}
      </p>
    </div>
  );
};

export default AnalyticsSection;
