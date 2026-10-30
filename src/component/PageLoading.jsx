import { LoadingRegion, Skeleton } from "./common/LoadingSkeletons";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function PageLoading() {
  return (
    <LoadingRegion label="Loading Gomzi Nutrition" className="bg-light min-h-[70vh] py-8 sm:py-12">
      <div className="site-container space-y-7">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-9 sm:h-12 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-3/4 max-w-xl" />
        <div className="flex flex-wrap gap-3">
          {[0, 1, 2].map(index => <Skeleton key={index} className="h-10 w-24 sm:w-32 rounded-full" />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[0, 1, 2, 3].map(index => <ProductCardSkeleton key={index} />)}
        </div>
      </div>
    </LoadingRegion>
  );
}
