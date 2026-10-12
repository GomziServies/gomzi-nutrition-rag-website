
import React from "react";
import SEO from "../component/SEO";
import PageHeading from "../HOC/Header/PageHeading";
import useProducts from "../hooks/useProducts";
import ProductCard from "../component/common/ProductCard";

const FgiitCourseOffer = () => {
  const {
    products = [],
    loading,
  } = useProducts({
    page: 1,
    limit: 100,
    category: "",
    search: "",
  });

  // Display up to five products returned by the existing API.
  const offerProducts = products.slice(0, 5);

  return (
    <main className="w-full overflow-hidden bg-white text-[#29221f]">
      <SEO
        title="FGIIT Course Offers | Exclusive Fitness Supplement Deals"
        description="Explore FGIIT course offers on fitness supplements. Discover product details and available prices on selected supplements."
      />

      <PageHeading head="Buy Supplements Get Free Course" />

      {/* Subscription Benefits */}
      <section className="mx-auto my-6 flex w-[calc(100%-32px)] max-w-7xl flex-col gap-5 rounded-lg border border-[#e9e5e2] bg-white px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center text-2xl text-[#95442c]">
            <i className="fa-regular fa-calendar-days" aria-hidden="true" />
          </div>

          <div className="text-xs leading-5 text-[#171412]">
            <p className="m-0">Monthly</p>
            <p className="m-0">Supplement Purchase</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[#e2dedb] md:block" />

        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#95442c] text-sm text-white">
            <i className="fa-solid fa-check" aria-hidden="true" />
          </div>

          <div className="text-xs leading-5 text-[#171412]">
            <p className="m-0">Course access active</p>
            <p className="m-0">during active subscription</p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[#e2dedb] md:block" />

        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#95442c] text-sm text-white">
            <i className="fa-solid fa-pause" aria-hidden="true" />
          </div>

          <div className="text-xs leading-5 text-[#171412]">
            <p className="m-0">Stop subscription,</p>
            <p className="m-0">course access will be paused</p>
          </div>
        </div>
      </section>

      {/* Offer Products */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[2px] text-[#95442c]">
              Exclusive Offers
            </p>

            <h2 className="text-2xl font-semibold leading-tight text-[#29221f] sm:text-3xl">
              Featured <span className="text-[#95442c]">Products</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
              Explore selected supplements available on our store.
            </p>
          </div>

          {!loading && offerProducts.length > 0 && (
            <p className="text-sm text-stone-500">
              {offerProducts.length} Products
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#95442c]"
              role="status"
              aria-label="Loading products"
            />

            <p className="mt-4 text-sm text-stone-500">
              Loading products...
            </p>
          </div>
        ) : offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offerProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-[#faf8f6] px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#29221f]">
              Products are not available
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-stone-500">
              No products were returned by the existing product hook.
              Please check the API response and browser console.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default FgiitCourseOffer;
