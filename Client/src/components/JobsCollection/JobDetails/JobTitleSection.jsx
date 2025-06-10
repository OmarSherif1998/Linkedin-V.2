import timeAgo from "../../../functions/timeAgo";
import useThemeClasses from "../../../hooks/useThemeClasses";

function JobTitleSection({ title, city, country, createdAt }) {
  const { textColorClass } = useThemeClasses();

  return (
    <div className="flex flex-col">
      <h1 className={`md:text-2xl ${textColorClass}`}>{title}</h1>
      <section className="flex gap-1 text-gray-500">
        <p> {city}, </p>
        <p>{country} ·</p>
        <p> {timeAgo(createdAt)}</p>
      </section>
    </div>
  );
}

export default JobTitleSection;
