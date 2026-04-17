export interface EventSkeletonProps {
  count?: number;
}

function EventSkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-secondary/20 bg-surface shadow-sm"
      aria-hidden="true"
    >
      <div className="h-48 w-full animate-pulse bg-primary/20" />

      <div className="space-y-3 p-4">
        <div className="h-6 w-3/4 animate-pulse rounded bg-primary/20" />

        <div className="space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-secondary/20" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-secondary/20" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-secondary/20" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-secondary/20" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-secondary/20" />
        </div>

        <div className="h-4 w-20 animate-pulse rounded bg-primary/20" />
      </div>
    </div>
  );
}

export function EventSkeleton({ count = 1 }: EventSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Cargando eventos">
      {Array.from({ length: count }).map((_, index) => (
        <EventSkeletonCard key={index} />
      ))}
    </div>
  );
}
