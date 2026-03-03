export default function TableSkeleton() {
  return (
    <div className="space-y-8 pb-10 md:pb-14 animate-pulse">
      {/* Filter bar skeleton */}
      <div className="w-full flex justify-between md:items-center flex-col lg:flex-row gap-5">
        <div className="flex gap-2 items-center">
          <div className="h-9 w-20 rounded-md bg-muted" />
          <div className="h-9 w-24 rounded-md bg-muted" />
          <div className="h-9 w-24 rounded-md bg-muted" />
        </div>
        <div className="h-9 w-48 rounded-md bg-muted" />
      </div>

      {/* Table skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-full rounded-md bg-muted" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 w-full rounded-md bg-muted opacity-70" />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-8 rounded-md bg-muted" />
        ))}
      </div>
    </div>
  );
}
