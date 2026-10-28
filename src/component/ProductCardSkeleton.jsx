const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg aspect-square mb-3"></div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        <div className="flex justify-between items-center mt-3">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
