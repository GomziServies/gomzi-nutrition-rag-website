const ProductPageSkeleton = () => {
  return (
    <div className="animate-pulse bg-[var(--color-bg)] min-h-screen">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16 py-8">
        {/* Breadcrumb */}
        <div className="h-4 bg-gray-200 rounded w-64 mb-8" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Images */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-200 rounded-2xl h-[500px]" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-200 rounded-xl aspect-square" />
              <div className="bg-gray-200 rounded-xl aspect-square" />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Rating */}
            <div className="h-5 bg-gray-200 rounded w-40" />

            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-10 bg-gray-200 rounded w-1/2" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-11/12" />
              <div className="h-4 bg-gray-200 rounded w-9/12" />
            </div>

            {/* Product Option */}
            <div className="border rounded-xl p-5">
              <div className="flex justify-between">
                <div>
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>

                <div>
                  <div className="h-7 bg-gray-200 rounded w-24 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="h-14 bg-gray-200 rounded-xl" />

            {/* Benefits */}
            <div className="flex gap-4">
              <div className="h-8 bg-gray-200 rounded w-24" />
              <div className="h-8 bg-gray-200 rounded w-24" />
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>

            {/* Accordion */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-16 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
