import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CheckoutSummary from "../component/checkout/CheckoutSummary";
import CheckoutForm from "../component/checkout/CheckoutForm";
import useCart from "../hooks/useCart";
import useCoupon from "../hooks/useCoupon";
import { ShieldCheck, ShoppingBag, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

export default function Checkouts() {
  const { items, loading } = useCart();
  const { coupon, saveCoupon, clearCoupon } = useCoupon();
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f6] font-modelica">
        <div className="w-10 h-10 border-3 border-[#5C3124]/20 border-t-[#5C3124] rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Securing Checkout Session...
        </p>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return <Navigate to="/gomzi-supplement" replace />;
  }

  const totalQty = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.discountPrice || item.price || 0) * (item.quantity || 1),
    0
  );

  let couponDiscount = 0;
  if (coupon) {
    if (coupon.discount_type === "percent") {
      couponDiscount = (totalAmount * coupon.discount) / 100;
    } else if (coupon.discount_type === "fixed") {
      couponDiscount = coupon.discount;
    }
    couponDiscount = Math.min(couponDiscount, totalAmount);
  }
  const finalTotal = totalAmount - couponDiscount;

  return (
    <div className="min-h-screen bg-white font-modelica text-[#1c1c28]">
      {/* ── TOP CHECKOUT BRAND HEADER ── */}
      <header className="border-b border-[#ebdcd7] bg-white sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Return Link */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="flex items-center">
              <img
                src="/images/rag-icon-logo.png"
                alt="Gomzi Supplement by RAG"
                className="h-8 sm:h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/gomzi-supplements-dark.webp";
                }}
              />
            </Link>

            <span className="hidden sm:inline-block w-px h-6 bg-[#ebdcd7]" />

            <Link
              to="/cart"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#5C3124] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Cart</span>
            </Link>
          </div>

          {/* Security Guarantee Pill */}
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-[#faf8f6] px-3.5 py-1.5 rounded-full border border-[#ebdcd7]">
            <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted Checkout</span>
            <span className="sm:hidden">100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* ── MOBILE COLLAPSIBLE ORDER SUMMARY ACCORDION (< lg) ── */}
      <div className="lg:hidden border-b border-[#ebdcd7] bg-[#faf8f6]">
        <button
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1c1c28] cursor-pointer"
        >
          <div className="flex items-center gap-2 text-[#5C3124]">
            <ShoppingBag size={16} />
            <span>
              {mobileSummaryOpen ? "Hide order summary" : "Show order summary"} ({totalQty} {totalQty === 1 ? "item" : "items"})
            </span>
            {mobileSummaryOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>

          <span className="font-toma text-base font-black text-[#1c1c28]">
            ₹{finalTotal.toLocaleString()}
          </span>
        </button>

        {mobileSummaryOpen && (
          <div className="px-4 py-5 border-t border-[#ebdcd7] bg-white animate-fadeIn">
            <CheckoutSummary
              coupon={coupon}
              setCoupon={saveCoupon}
              clearCoupon={clearCoupon}
              isMobile
            />
          </div>
        )}
      </div>

      {/* ── MAIN 2-COLUMN CHECKOUT GRID ── */}
      <main className="max-w-[1280px] mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column (7/12): Delivery & Payment Form */}
        <div className="lg:col-span-7 xl:col-span-7 px-4 sm:px-8 lg:px-10 xl:px-12 py-8 lg:py-12 border-b lg:border-b-0 lg:border-r border-[#ebdcd7]">
          <CheckoutForm coupon={coupon} finalTotal={finalTotal} />
        </div>

        {/* Right Column (5/12): Sticky Order Summary (Desktop) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 bg-[#faf8f6] px-6 lg:px-8 xl:px-10 py-8 lg:py-12">
          <div className="sticky top-28">
            <CheckoutSummary
              coupon={coupon}
              setCoupon={saveCoupon}
              clearCoupon={clearCoupon}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
