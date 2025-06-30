import useThemeClasses from '../../../hooks/useThemeClasses';

function JobDetailsSkeleton() {
  const { skeletonPrimaryBGColorClass, skeletonSecondaryBGColorClass } =
    useThemeClasses();
  return (
    <div
      className={`flex h-full w-full animate-pulse flex-col gap-5 overflow-auto rounded-xl p-5 ${skeletonPrimaryBGColorClass}`}
    >
      {/* Header */}
      <div className='flex items-center gap-4'>
        <div
          className={`h-14 w-14 rounded-full ${skeletonSecondaryBGColorClass}`}
        />
        <div className='flex flex-col gap-2'>
          <div
            className={`h-4 w-40 rounded ${skeletonSecondaryBGColorClass}`}
          />
          <div
            className={`h-3 w-24 rounded ${skeletonSecondaryBGColorClass}`}
          />
        </div>
      </div>

      {/* Title Section */}
      <div className='flex flex-col gap-2'>
        <div className={`h-4 w-2/3 rounded ${skeletonSecondaryBGColorClass}`} />
        <div className={`h-3 w-1/4 rounded ${skeletonSecondaryBGColorClass}`} />
        <div className={`h-3 w-1/3 rounded ${skeletonSecondaryBGColorClass}`} />
      </div>

      {/* Badges */}
      <div className='flex gap-2'>
        <div
          className={`h-6 w-20 rounded-full ${skeletonSecondaryBGColorClass}`}
        />
        <div
          className={`h-6 w-20 rounded-full ${skeletonSecondaryBGColorClass}`}
        />
      </div>

      {/* Actions */}
      <div className='flex gap-3'>
        <div className={`h-9 w-24 rounded ${skeletonSecondaryBGColorClass}`} />
        <div className={`h-9 w-24 rounded ${skeletonSecondaryBGColorClass}`} />
      </div>

      {/* Premium Section */}
      <div
        className={`h-20 w-full rounded-lg ${skeletonSecondaryBGColorClass}`}
      />

      {/* About Section */}
      <div className='flex flex-col gap-3'>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-full rounded ${skeletonSecondaryBGColorClass}`}
          />
        ))}
      </div>
    </div>
  );
}

export default JobDetailsSkeleton;
