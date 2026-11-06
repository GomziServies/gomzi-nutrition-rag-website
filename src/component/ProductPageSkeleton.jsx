import { ProductDetailSkeleton } from "./common/SkeletonLoaders";
import { LoadingRegion } from "./common/LoadingSkeletons";

export default function ProductPageSkeleton() {
  return <LoadingRegion label="Loading product details"><ProductDetailSkeleton /></LoadingRegion>;
}
