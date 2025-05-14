import useThemeClasses from "../../../hooks/useThemeClasses";

const RecentItems = (topic) => {
  const { textColorClass } = useThemeClasses();
  return (
    <div key={topic} className="flex-col">
      <p
        className={`hover:bg-gray-700 ${textColorClass} mx-[.625rem] gap-2 hover:cursor-pointer`}
      >
        #{topic}
      </p>
    </div>
  );
};

export default RecentItems;
