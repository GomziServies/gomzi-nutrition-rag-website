import React from "react";

/**
 * 1. ProductCardSkeleton
 * Pixel-perfect match for Gomzi Nutrition product cards:
 * - Rounded-3xl card border
 * - Top Tag & Wishlist circle
 * - Aspect-square image container with floating rating badge
 * - Authenticity line, title, prices, and full-width CTA button
 */
export const ProductCardSkeleton = ({ className = "", variant = "vertical" }) => {
  if (variant === "horizontal") {
    return (
      <div
        className={`bg-white rounded-xl sm:rounded-2xl border border-gray-200/90 p-3 sm:p-4 flex flex-col justify-between shadow-xs ${className}`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl skeleton-shimmer shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 w-full rounded skeleton-shimmer" />
            <div className="h-4 w-2/3 rounded skeleton-shimmer" />
            <div className="h-5 w-24 rounded skeleton-shimmer mt-2" />
            <div className="h-3.5 w-32 rounded skeleton-shimmer mt-1" />
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-gray-100 grid grid-cols-2 gap-2 sm:gap-3">
          <div className="h-9 rounded-lg skeleton-shimmer" />
          <div className="h-9 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200/80 p-3 sm:p-4.5 flex flex-col justify-between shadow-xs ${className}`}
    >
      <div>
        {/* Top Tag & Wishlist */}
        <div className="flex items-center justify-between w-full mb-2">
        <div className="h-5 w-20 rounded-full skeleton-shimmer" />
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full skeleton-shimmer shrink-0" />
      </div>

      {/* Product Image Box */}
      <div className="relative w-full aspect-square rounded-2xl skeleton-shimmer my-2 flex items-center justify-center overflow-hidden">
        {/* Rating Badge Placeholder */}
        <div className="absolute bottom-2 left-2 h-5 w-16 rounded-md bg-white/70 backdrop-blur-xs" />
      </div>

      {/* Subtitle / Authenticity Line */}
      <div className="h-3 w-36 rounded skeleton-shimmer mt-2.5 mb-1.5" />

      {/* Title (2 lines) */}
      <div className="space-y-1.5 min-h-[36px] sm:min-h-[40px] mb-2.5">
        <div className="h-3.5 sm:h-4 w-full rounded skeleton-shimmer" />
        <div className="h-3.5 sm:h-4 w-3/4 rounded skeleton-shimmer" />
      </div>

      {/* Price Block */}
      <div className="flex items-baseline gap-2 mb-3.5">
        <div className="h-5 sm:h-6 w-16 rounded skeleton-shimmer" />
        <div className="h-3.5 w-12 rounded skeleton-shimmer" />
        <div className="h-4 w-14 rounded skeleton-shimmer" />
      </div>
    </div>

    {/* CTA Button */}
    <div className="w-full h-10 sm:h-11 rounded-xl skeleton-shimmer" />
  </div>
  );
};

/**
 * 2. HeroSkeleton
 * Matches the Hero Section banner dimensions with desktop/mobile overlay placeholders
 */
export const HeroSkeleton = () => (
  <div className="relative w-full overflow-hidden select-none">
    {/* Dark Luxury Shimmering Banner Container */}
    <div className="w-full aspect-[16/7] md:aspect-[21/9] lg:aspect-[2.6/1] skeleton-shimmer-dark relative">
      {/* Desktop Overlay Placeholder (lg+) */}
      <div className="hidden lg:flex absolute left-[3.2%] top-[14%] max-w-[50%] flex-col gap-3 pointer-events-none">
        <div className="h-10 xl:h-14 2xl:h-16 w-3/4 rounded-xl bg-white/10 backdrop-blur-xs" />
        <div className="h-10 xl:h-14 2xl:h-16 w-full rounded-xl bg-white/10 backdrop-blur-xs" />
        <div className="h-10 xl:h-14 2xl:h-16 w-2/3 rounded-xl bg-white/10 backdrop-blur-xs" />
        <div className="h-5 xl:h-6 w-1/2 rounded-md bg-white/10 mt-2" />
        <div className="flex gap-4 mt-4">
          <div className="h-12 w-40 rounded-2xl bg-white/15" />
          <div className="h-12 w-48 rounded-2xl bg-white/10" />
        </div>
      </div>

      {/* Mobile Overlay Placeholder (<lg) */}
      <div className="lg:hidden absolute top-[6%] left-1/2 -translate-x-1/2 w-full px-4 flex flex-col items-center gap-2">
        <div className="h-5 sm:h-7 w-48 rounded-md bg-white/10" />
        <div className="h-5 sm:h-7 w-64 rounded-md bg-white/10" />
        <div className="h-3 sm:h-4 w-52 rounded-md bg-white/10 mt-1" />
      </div>

      {/* Mobile Bottom Buttons Placeholder */}
      <div className="lg:hidden absolute bottom-[5%] left-1/2 -translate-x-1/2 w-full px-4 flex justify-center gap-2.5">
        <div className="h-9 w-32 rounded-xl bg-white/15" />
        <div className="h-9 w-36 rounded-xl bg-white/10" />
      </div>
    </div>
  </div>
);

/**
 * 3. BannerSliderSkeleton
 * Generic full-width promotional banner slider skeleton
 */
export const BannerSliderSkeleton = ({
  aspect = "aspect-[16/6] sm:aspect-[21/7]",
  className = "",
}) => (
  <div className={`w-full py-6 sm:py-10 bg-white ${className}`}>
    <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
      <div className={`w-full ${aspect} rounded-2xl sm:rounded-3xl skeleton-shimmer shadow-xs overflow-hidden`} />
    </div>
  </div>
);

/**
 * 4. BestSellingSectionSkeleton
 * Shimmering carousel rail matching BestSellingSection with 2 columns on mobile and 4 on desktop
 */
export const BestSellingSectionSkeleton = () => (
  <section className="w-full py-8 sm:py-16 bg-white overflow-hidden">
    <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-5 sm:mb-8 gap-3 sm:gap-4">
        <div>
          <div className="h-5 w-32 rounded-full skeleton-shimmer mb-2" />
          <div className="h-7 sm:h-9 w-48 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-64 sm:w-96 rounded skeleton-shimmer mt-2" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full skeleton-shimmer" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full skeleton-shimmer" />
        </div>
      </div>

      {/* Cards Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton className="hidden md:flex" />
        <ProductCardSkeleton className="hidden lg:flex" />
      </div>

      {/* Bottom Button */}
      <div className="mt-7 sm:mt-9 flex justify-center">
        <div className="h-10 w-48 rounded-full skeleton-shimmer" />
      </div>
    </div>
  </section>
);

/**
 * 5. TrendingDealsSectionSkeleton
 * Matches Trending Deals 4-column card grid
 */
export const TrendingDealsSectionSkeleton = () => (
  <section className="w-full py-10 sm:py-14 bg-gradient-to-b from-[#fdfbf9] to-white border-y border-[#f0ded8]/60 overflow-hidden">
    <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <div className="h-5 w-32 rounded-full skeleton-shimmer mb-2" />
          <div className="h-8 w-64 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-72 sm:w-96 rounded skeleton-shimmer mt-2" />
        </div>
        <div className="hidden sm:block h-6 w-28 rounded skeleton-shimmer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-primary-border/80 shadow-xs p-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-full aspect-square rounded-xl skeleton-shimmer mb-3" />
              <div className="h-3 w-24 rounded skeleton-shimmer mb-2" />
              <div className="h-4 w-full rounded skeleton-shimmer mb-2" />
              <div className="h-4 w-2/3 rounded skeleton-shimmer mb-3" />
              <div className="h-6 w-20 rounded skeleton-shimmer" />
            </div>
            <div className="h-10 w-full rounded-xl skeleton-shimmer mt-4" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * 6. BrandShowcaseSkeleton
 * Matches stacked brand showcase: company banner + 5 products
 */
export const BrandShowcaseSkeleton = ({ count = 2 }) => (
  <section className="w-full py-10 sm:py-14 bg-[#f7f5f2] border-t border-b border-gray-200/60 overflow-hidden">
    <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
      <div className="space-y-16">
        {[...Array(count)].map((_, bIdx) => (
          <div key={bIdx} className="space-y-6">
            {/* Banner Skeleton */}
            <div className="w-full aspect-[16/6] sm:aspect-[21/6] rounded-2xl sm:rounded-3xl skeleton-shimmer shadow-xs" />

            {/* Sub-heading */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 rounded-full skeleton-shimmer" />
                <div className="h-6 w-60 rounded skeleton-shimmer" />
              </div>
              <div className="h-4 w-24 rounded skeleton-shimmer" />
            </div>

            {/* 5-Product Row Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
              {[...Array(5)].map((_, pIdx) => (
                <ProductCardSkeleton
                  key={pIdx}
                  className={pIdx >= 4 ? "hidden sm:flex" : "flex"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * 7. CategoryGridSkeleton
 * Category listing grid skeleton
 */
export const CategoryGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="flex h-full w-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-white"
      >
        <div className="flex h-[145px] xs:h-[165px] sm:h-[200px] md:h-[220px] w-full shrink-0 items-center justify-center bg-bg-light p-2.5 sm:p-4">
          <div className="h-full w-full rounded-lg skeleton-shimmer" />
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="mb-2 flex min-h-[38px] sm:min-h-[56px] flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
            <div className="h-4 sm:h-5 w-24 sm:w-28 rounded skeleton-shimmer" />
            <div className="h-3 sm:h-4 w-12 sm:w-16 shrink-0 rounded skeleton-shimmer" />
          </div>
          <div className="mb-1 h-3 sm:h-4 w-full rounded skeleton-shimmer" />
          <div className="h-3 sm:h-4 w-4/5 rounded skeleton-shimmer" />
          <div className="mt-auto pt-2.5 sm:pt-4">
            <div className="divider mb-2.5 sm:mb-4" />
            <div className="h-3.5 sm:h-4 w-24 sm:w-28 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * 8. ProductDetailSkeleton
 * High-fidelity skeleton loader for single product details page
 */
export const ProductDetailSkeleton = () => (
  <div className="bg-bg-cream min-h-screen py-6 sm:py-10">
    <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
      {/* Breadcrumb */}
      <div className="h-4 w-60 rounded skeleton-shimmer mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full aspect-square rounded-3xl skeleton-shimmer" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl skeleton-shimmer" />
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-6 space-y-5">
          <div className="h-5 w-28 rounded-full skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-8 sm:h-10 w-full rounded-lg skeleton-shimmer" />
            <div className="h-8 sm:h-10 w-3/4 rounded-lg skeleton-shimmer" />
          </div>
          <div className="h-4 w-36 rounded skeleton-shimmer" />
          <div className="flex gap-3 items-baseline">
            <div className="h-8 w-24 rounded-lg skeleton-shimmer" />
            <div className="h-5 w-20 rounded skeleton-shimmer" />
            <div className="h-6 w-20 rounded skeleton-shimmer" />
          </div>
          <div className="border-t border-b border-gray-200 py-4 space-y-2">
            <div className="h-4 w-full rounded skeleton-shimmer" />
            <div className="h-4 w-5/6 rounded skeleton-shimmer" />
          </div>
          {/* Flavor/Size Selection */}
          <div className="space-y-3">
            <div className="h-4 w-24 rounded skeleton-shimmer" />
            <div className="flex gap-2.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-24 rounded-xl skeleton-shimmer" />
              ))}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="h-12 rounded-xl skeleton-shimmer" />
            <div className="h-12 rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
