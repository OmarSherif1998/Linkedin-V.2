/** @format */

import { useState } from "react";
import useThemeClasses from "../../hooks/useThemeClasses";
import { useQuery } from "@tanstack/react-query";
import { getStockPrice } from "../../api/companyAPI";
import InfoCard from "./InfoCard";
function CompanyOverview({ overview, ticker, website }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const [isExpanded, setIsExpanded] = useState(false); // State to track expanded/collapsed view
  const overviewText = overview || ""; // Optional chaining for undefined handling
  const characterLimit = 400; // Define the limit for trimmed text

  const { data: stockPrice, isLoading: isStockLoading } = useQuery({
    queryKey: ["stockPrice", ticker],
    queryFn: () => getStockPrice(ticker),
    enabled: !!ticker, // Only run the query if symbol is available
  });
  const stockPriceValue = stockPrice?.c; // Get the current stock price
  const data = {
    website: { label: "Contact Inormation", value: website },
    stock: { label: "Stock", value: stockPriceValue },
  };
  // Toggle function to switch between expanded and collapsed state
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the text to display based on expansion state
  const displayText = isExpanded
    ? overviewText
    : overviewText.substring(0, characterLimit) +
      (overviewText.length > characterLimit ? "..." : "");

  return (
    <div
      className={`flex min-h-[8rem] w-full flex-col gap-4 border-gray-400 ${componentBGColorClass} p-4 md:border lg:rounded-lg lg:shadow-xl`}
    >
      <section>
        <h1 className={`text-sm font-semibold md:text-lg ${textColorClass}`}>
          Overview
        </h1>{" "}
        <p className={`${textColorClass} text-xs md:text-sm`}>{displayText}</p>
        {overviewText.length > characterLimit && (
          <button
            onClick={toggleExpansion}
            className="ml-auto mt-2 flex text-gray-500 hover:text-LinkedInBlue hover:underline focus:outline-none"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </section>
      <section className="flex justify-between gap-4">
        {Object.entries(data).map(([key, item]) => (
          <InfoCard
            isStockLoading={isStockLoading}
            key={key}
            label={item.label}
            value={item.value || "N/A"}
            ticker={ticker}
          />
        ))}
      </section>
    </div>
  );
}

export default CompanyOverview;
