import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { checkCouponCode } from "../../api/product.api";
import { ShoppingBag, Tag, CheckCircle2, ShieldCheck, X, Sparkles } from "lucide-react";

function CartItem({ item }) {
  const imgSrc = item.image
    ? item.image.startsWith("http")
      ? item.image
      : `https://files.fggroup.in/${item.image}`
    : item.images?.[0]?.image_url || "/images/Gomzi_Protein_Product_HD.webp";

  const originalPrice = Number(item.price || item.discountPrice || 0);
  const discountedPrice = Number(item.discountPrice || item.price || 0);
  const qty = item.quantity || 1;

  return (
    <div className="flex items-center gap-3.5 py-3 border-b border-[#ebdcd7] last:border-0">
      {/* Product Thumbnail with Qty Badge */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-xl bg-white border border-[#ebdcd7] p-1 flex items-center justify-center overflow-hidden">
          <img
            src={imgSrc}
            alt={item.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/Gomzi_Protein_Product_HD.webp";
            }}
          />
        </div>
        <span className="absolute -top-1.5 -right-1.5 bg-[#5C3124] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
          {qty}
        </span>
      </div>

      {/* Title & Flavor Variant */}
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-bold text-[#1c1c28] leading-snug line-clamp-2">
          {item.name}
        </p>
        {item.flavour && (
          <p className="text-[11px] text-gray-500 font-medium mt-0.5">
            Flavor: <span className="text-[#5C3124] font-semibold">{item.flavour}</span>
          </p>
        )}
        {originalPrice > discountedPrice && (
          <span className="inline-block mt-0.5 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Item Total Pricing */}
      <div className="text-right shrink-0">
        {originalPrice > discountedPrice && (
          <p className="text-[11px] text-gray-400 line-through">
            ₹{(originalPrice * qty).toLocaleString()}
          </p>
        )}
        <p className="text-xs sm:text-sm font-bold text-[#1c1c28]">
          ₹{(discountedPrice * qty).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSummary({ coupon, setCoupon, clearCoupon, isMobile = false }) {
  const { items } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.price || item.discountPrice || 0) * (item.quantity || 1)),
    0
  );

  const itemsTotal = items.reduce(
    (sum, item) => sum + (Number(item.discountPrice || item.price || 0) * (item.quantity || 1)),
    0
  );

  const handleApplyCoupon = async () => {
    if (!discountCode.trim()) {
      setCouponError("Please enter a valid coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError("");

      const res = await checkCouponCode({
        coupon_code: discountCode.trim().toUpperCase(),
      });
      const couponData = res?.data?.data;

      if (couponData) {
        setCoupon(couponData);
      } else {
        setCouponError("Coupon code could not be applied");
      }
    } catch (error) {
      if (clearCoupon) clearCoupon();
      setCouponError(error?.response?.data?.message || "Invalid or expired coupon code");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    if (clearCoupon) clearCoupon();
    setDiscountCode("");
    setCouponError("");
  };

  useEffect(() => {
    if (coupon?.coupon_code) {
      setDiscountCode(coupon.coupon_code);
    }
  }, [coupon]);

  let couponDiscount = 0;
  if (coupon) {
    if (coupon.discount_type === "percent") {
      couponDiscount = (itemsTotal * coupon.discount) / 100;
    } else if (coupon.discount_type === "fixed") {
      couponDiscount = Number(coupon.discount || 0);
    }
    couponDiscount = Math.min(couponDiscount, itemsTotal);
  }

  const finalTotal = Math.max(0, itemsTotal - couponDiscount);
  const totalSavings = (subtotal - finalTotal);

  return (
    <div className="flex flex-col gap-6">
      {/* Header (Desktop only) */}
      {!isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-[#ebdcd7]">
          <h3 className="font-toma text-lg font-black text-[#1c1c28] tracking-tight flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#5C3124]" />
            <span>Order Summary ({totalItems})</span>
          </h3>
          <Link
            to="/cart"
            className="text-xs font-bold text-[#5C3124] hover:underline"
          >
            Edit Cart
          </Link>
        </div>
      )}

      {/* Itemized Cart List */}
      <div className="flex flex-col divide-y divide-[#ebdcd7] max-h-72 overflow-y-auto pr-1 scrollbar-hide">
        {items.map((item, idx) => (
          <CartItem key={item.id || item._id || idx} item={item} />
        ))}
      </div>

      {/* Coupon / Promo Code Input */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-white border border-[#ebdcd7] focus-within:border-[#5C3124] focus-within:ring-2 focus-within:ring-[#5C3124]/15 rounded-xl transition-all">
            <Tag size={15} className="ml-3.5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={discountCode}
              onChange={(e) => {
                setDiscountCode(e.target.value.toUpperCase());
                setCouponError("");
              }}
              placeholder="Promo code (e.g. GOMZI10)"
              className="w-full bg-transparent text-xs sm:text-sm px-2.5 py-3 outline-none text-[#1c1c28] uppercase placeholder:normal-case placeholder:text-gray-400"
            />
          </div>

          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={couponLoading || !discountCode.trim()}
            className="px-5 py-3 rounded-xl bg-[#5C3124] hover:bg-[#48261c] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {couponLoading ? "Applying..." : "Apply"}
          </button>
        </div>

        {/* Applied Coupon Badge */}
        {coupon && (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs text-emerald-800">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Coupon "{coupon.coupon_code}" Applied (-₹{couponDiscount.toLocaleString()})</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-emerald-600 hover:text-emerald-900 p-0.5 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {couponError && (
          <p className="text-xs font-semibold text-rose-600 pl-1">
            {couponError}
          </p>
        )}
      </div>

      {/* Transparent Invoice Pricing Breakdown */}
      <div className="flex flex-col gap-2.5 pt-4 border-t border-[#ebdcd7] text-xs sm:text-sm">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-gray-900">
            ₹{itemsTotal.toLocaleString()}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between items-center text-emerald-600 font-bold">
            <span>Coupon Discount</span>
            <span>-₹{couponDiscount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-gray-600">
          <span className="flex items-center gap-1.5">
            <span>Shipping & Express Logistics</span>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-400 line-through">₹99</span>
            <span className="font-extrabold text-emerald-600 uppercase text-xs">
              FREE
            </span>
          </div>
        </div>

        {/* Final Payable Total */}
        <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-[#ebdcd7]">
          <div>
            <span className="font-toma text-base sm:text-lg font-black text-[#1c1c28] block">
              Total Payable
            </span>
            <span className="text-[11px] text-gray-500">
              Inclusive of all taxes & GST
            </span>
          </div>

          <div className="text-right">
            {totalSavings > 0 && (
              <span className="text-xs text-gray-400 line-through block">
                ₹{subtotal.toLocaleString()}
              </span>
            )}
            <span className="font-toma text-2xl sm:text-3xl font-black text-[#5C3124]">
              ₹{finalTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Total Savings Pill */}
        {totalSavings > 0 && (
          <div className="mt-2 bg-[#f5eeeb] border border-[#ebdcd7] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-[#5C3124]">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>Total Member Savings</span>
            </span>
            <span className="font-extrabold">
              ₹{totalSavings.toLocaleString()} OFF
            </span>
          </div>
        )}
      </div>

      {/* Authentic Certified Nutrition Guarantee */}
      <div className="p-4 rounded-xl bg-white border border-[#ebdcd7] flex items-center gap-3">
        <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
        <div className="text-[11px] text-gray-600 leading-tight">
          <span className="font-bold text-[#1c1c28] block">
            100% Genuine Lab-Tested Guarantee
          </span>
          Direct dispatch from certified Gomzi facility. Every batch NABL verified.
        </div>
      </div>
    </div>
  );
}
