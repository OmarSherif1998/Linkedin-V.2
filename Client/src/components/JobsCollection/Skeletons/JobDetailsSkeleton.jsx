function JobDetailsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-5 p-5 overflow-auto animate-pulse rounded-xl bg-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="rounded-full h-14 w-14 bg-zinc-700" />
        <div className="flex flex-col gap-2">
          <div className="w-40 h-4 rounded bg-zinc-700" />
          <div className="w-24 h-3 rounded bg-zinc-700" />
        </div>
      </div>

      {/* Title Section */}
      <div className="flex flex-col gap-2">
        <div className="w-2/3 h-4 rounded bg-zinc-700" />
        <div className="w-1/4 h-3 rounded bg-zinc-700" />
        <div className="w-1/3 h-3 rounded bg-zinc-700" />
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <div className="w-20 h-6 rounded-full bg-zinc-700" />
        <div className="w-20 h-6 rounded-full bg-zinc-700" />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <div className="w-24 rounded h-9 bg-zinc-700" />
        <div className="w-24 rounded h-9 bg-zinc-700" />
      </div>

      {/* Premium Section */}
      <div className="w-full h-20 rounded-lg bg-zinc-700" />

      {/* About Section */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-full h-3 rounded bg-zinc-700" />
        ))}
      </div>
    </div>
  );
}

export default JobDetailsSkeleton;
