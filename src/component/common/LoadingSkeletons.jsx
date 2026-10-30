import ProductCardSkeleton from "../ProductCardSkeleton";

export function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={`skeleton-shimmer rounded-lg ${className}`} />;
}

export function LoadingRegion({ label = "Loading content", className = "", children }) {
  return (
    <div role="status" aria-label={label} aria-busy="true" className={className}>
      <span className="sr-only">{label}…</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4, label = "Loading products", className = "" }) {
  return (
    <LoadingRegion label={label} className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: count }, (_, index) => <ProductCardSkeleton key={index} />)}
      </div>
    </LoadingRegion>
  );
}

function SummarySkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 space-y-5">
      <Skeleton className="h-6 w-40 max-w-full" />
      {[0, 1, 2].map(index => (
        <div key={index} className="flex justify-between gap-8">
          <Skeleton className="h-4 w-28" /><Skeleton className="h-4 w-16" />
        </div>
      ))}
      <div className="border-t border-border pt-5"><Skeleton className="h-7 w-32" /></div>
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export function CartSkeleton() {
  return (
    <LoadingRegion label="Loading your cart" className="site-container py-6 sm:py-8 min-h-[60vh]">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
          <Skeleton className="h-7 w-40 mb-6" />
          {[0, 1, 2].map(index => (
            <div key={index} className="flex gap-4 py-5 border-t border-border">
              <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 shrink-0" />
              <div className="flex-1 min-w-0 space-y-3 py-1">
                <Skeleton className="h-5 w-full" /><Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-20" /><Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
        <SummarySkeleton />
      </div>
    </LoadingRegion>
  );
}

export function CheckoutSkeleton() {
  return (
    <LoadingRegion label="Loading checkout" className="bg-light min-h-screen">
      <div className="border-b border-border">
        <div className="site-container py-5 flex justify-between gap-6">
          <Skeleton className="h-10 w-32" /><Skeleton className="h-8 w-28" />
        </div>
      </div>
      <div className="site-container grid lg:grid-cols-2 gap-6 py-6 md:py-10 items-start">
        <div className="rounded-2xl border border-border bg-white p-5 sm:p-8 space-y-6">
          <Skeleton className="h-7 w-48 max-w-full" />
          <Skeleton className="h-12 w-full" />
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map(index => <Skeleton key={index} className="h-12 w-full" />)}
          </div>
          <Skeleton className="h-12 w-full" /><Skeleton className="h-14 w-full" />
        </div>
        <SummarySkeleton />
      </div>
    </LoadingRegion>
  );
}

export function OrderListSkeleton() {
  return (
    <LoadingRegion label="Loading your orders">
      <div className="space-y-4">
        {[0, 1, 2].map(index => (
          <div key={index} className="rounded-2xl border border-border bg-white p-5 sm:p-6 space-y-5">
            <div className="flex justify-between gap-5"><Skeleton className="h-5 w-40" /><Skeleton className="h-6 w-20" /></div>
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between gap-5"><Skeleton className="h-4 w-24" /><Skeleton className="h-7 w-24" /></div>
          </div>
        ))}
      </div>
    </LoadingRegion>
  );
}
