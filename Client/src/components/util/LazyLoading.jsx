/** @format */

import useThemeClasses from "../../hooks/useThemeClasses";

function LazyLoading() {
  const { componentBGColorClass } = useThemeClasses();
  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Skeleton for a post */}
      <div
        className={`w-full animate-pulse rounded-lg p-4 shadow-lg ${componentBGColorClass}`}
      >
        {/* User info skeleton */}
        <div className="mb-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-32 rounded bg-gray-300"></div>
            <div className="h-3 w-20 rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        </div>

        {/* Action buttons skeleton */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default LazyLoading;
