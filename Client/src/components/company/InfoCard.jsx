import useThemeClasses from "../../hooks/useThemeClasses";
import LoadingSpinner from "../util/LoadingSpinner";

function InfoCard({ label, value, ticker, isStockLoading }) {
  const { textColorClass, componentBGColorClass } = useThemeClasses();

  const isLink = typeof value === "string" && value.startsWith("http");
  if (isStockLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div
      className={`flex w-full flex-col rounded-lg border border-gray-300 p-1 shadow-sm md:p-4 ${componentBGColorClass}`}
    >
      <span
        className={`block text-[8px] font-semibold md:mb-1 md:text-sm ${textColorClass}`}
      >
        {label}
      </span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className={`break-words text-[8px] text-blue-600 underline hover:text-blue-800 md:text-sm`}
        >
          {value}
        </a>
      ) : (
        <span
          className={`ml-5 flex gap-5 break-words text-[8px] md:gap-10 md:text-sm ${textColorClass}`}
        >
          <p> {ticker}</p> <p className="font-semibold"> ${value || "N/A"}</p>
        </span>
      )}
    </div>
  );
}

export default InfoCard;
