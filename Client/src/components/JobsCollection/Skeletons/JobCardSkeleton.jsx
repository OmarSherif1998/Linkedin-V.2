// JobCardSkeleton.jsx
function JobCardSkeleton() {
  return (
    <div className="w-full p-4 rounded-lg animate-pulse bg-zinc-800">
      <div className="w-1/3 h-4 mb-2 rounded bg-zinc-700" />
      <div className="w-2/3 h-4 mb-2 rounded bg-zinc-700" />
      <div className="w-1/2 h-3 rounded bg-zinc-700" />
    </div>
  );
}

export default JobCardSkeleton;
