import useThemeClasses from '../../../hooks/useThemeClasses';

// JobCardSkeleton.jsx
function JobCardSkeleton() {
  const { skeletonPrimaryBGColorClass, skeletonSecondaryBGColorClass } =
    useThemeClasses();
  return (
    <div
      className={`w-full animate-pulse rounded-lg p-4 ${skeletonPrimaryBGColorClass}`}
    >
      <div
        className={`mb-2 h-4 w-1/3 rounded ${skeletonSecondaryBGColorClass}`}
      />
      <div
        className={`mb-2 h-4 w-2/3 rounded ${skeletonSecondaryBGColorClass}`}
      />
      <div className={`h-3 w-1/2 rounded ${skeletonSecondaryBGColorClass}`} />
    </div>
  );
}

export default JobCardSkeleton;
