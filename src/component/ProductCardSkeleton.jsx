export default function ProductCardSkeleton({ mobileStacked = false }) {
  return (
    <div aria-hidden="true" className="rounded-xl border border-border overflow-hidden bg-white min-w-0">
      <div className="skeleton-shimmer aspect-square m-3 rounded-lg" />
      <div className="space-y-3 p-3 sm:p-4">
        <div className="h-3 skeleton-shimmer rounded w-1/2" />
        <div className="h-4 skeleton-shimmer rounded w-full" />
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-6 skeleton-shimmer rounded w-2/3" />
        <div className="h-8 skeleton-shimmer rounded w-full" />
        <div className={`grid ${mobileStacked ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"} gap-2 pt-1`}>
          <div className={`${mobileStacked ? "h-11 sm:h-9" : "h-9"} skeleton-shimmer rounded-lg`} />
          <div className={`${mobileStacked ? "h-11 sm:h-9" : "h-9"} skeleton-shimmer rounded-lg`} />
        </div>
      </div>
    </div>
  );
}
