import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useState, useEffect } from "react";
import { checkCouponCode } from "../../api/product.api";

function CartItem({ item }) {
  return (
    <div className="flex gap-3 items-start py-3.5 border-b border-gray-100 last:border-0">
      <div className="relative shrink-0">
        <img
          src={item.image ? `https://files.fggroup.in/${item.image}` : null}
          alt={item.name}
          className="w-16 h-16 rounded-md object-cover border border-gray-200"
        />
        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {item.quantity}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-800 leading-snug">
          {item.name}
        </p>
        {item.flavour && (
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-xs text-gray-400">{item.flavour}</p>
          </div>
        )}
        {item.price > item.discountPrice && (
          <p className="mt-1 text-[11px] text-green-600 font-semibold">
            {Math.round(((item.price - item.discountPrice) / item.price) * 100)}
            % OFF
          </p>
        )}
      </div>
      <div className="text-right shrink-0">
        {item.price && (
          <p className="text-xs text-gray-300 line-through">{item.price}</p>
        )}
        <p
          className={`text-sm font-bold ${item.price === "FREE" ? "text-green-600" : "text-gray-800"}`}
        >
          {item.discountPrice}
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSummary({ coupon, setCoupon }) {
  const { items } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = items.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0,
  );

  const handleApplyCoupon = async () => {
    if (!discountCode.trim()) {
      setCouponError("Please enter coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError("");

      const data = await checkCouponCode({
        coupon_code: discountCode.trim(),
      });
      const couponData = data.data.data;

      setCoupon(couponData);
    } catch (error) {
      setCoupon(null);

      setCouponError(error?.response?.data?.message || "Invalid coupon code");
    } finally {
      setCouponLoading(false);
    }
  };

  useEffect(() => {
    if (coupon?.coupon_code) {
      setDiscountCode(coupon.coupon_code);
    }
  }, [coupon]);
  let couponDiscount = 0;

  if (coupon) {
    if (coupon.discount_type === "percent") {
      couponDiscount = (total * coupon.discount) / 100;
    } else if (coupon.discount_type === "fixed") {
      couponDiscount = coupon.discount;
    }

    couponDiscount = Math.min(couponDiscount, total);
  }

  const finalTotal = total - couponDiscount;
  const totalSavings = subtotal - finalTotal;
  return (
    <div className="px-5 py-8 md:px-10 lg:px-12 xl:px-14 bg-[#f5f5f5] order-1 lg:order-2">
      <div className="relative flex items-center justify-center mb-8">
        <img
          src="/images/rag-icon-logo.png"
          alt="Gomzi Supplement by RAG"
          className="h-8 object-contain"
        />
        <div className="absolute right-0 text-xl text-gray-700 cursor-pointer">
          <FiShoppingBag onClick={() => navigate("/cart")} />
        </div>
      </div>

      <div>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <input
          value={discountCode}
          onChange={(e) => {
            setDiscountCode(e.target.value);

            if (coupon) {
              setCoupon(null);
            }

            setCouponError("");
          }}
          placeholder="Discount code or gift card"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-gray-500"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={couponLoading}
          className="px-5 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
        >
          {couponLoading ? "Applying..." : "Apply"}
        </button>
      </div>
      {coupon && (
        <p className="mt-2 text-sm text-green-600">
          Coupon "{coupon.coupon_code}" applied successfully
        </p>
      )}

      {couponError && (
        <p className="mt-2 text-sm text-red-500">{couponError}</p>
      )}

      <div className="border-t border-gray-300 mt-6 pt-5 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">
            Subtotal · {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>

          <span className="text-sm font-semibold">
            ₹{finalTotal.toLocaleString()}
          </span>
        </div>
        {/* <div className="flex justify-between">
          <span className="flex items-center gap-2 text-sm text-gray-600">
            Shipping
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
              ?
            </span>
          </span>
          <span className="text-sm text-gray-400">Enter shipping address</span>
        </div> */}
      </div>
      {couponDiscount > 0 && (
        <div className="flex justify-between mt-2">
          <span className="text-sm text-green-600">
            Coupon ({coupon.coupon_code})
          </span>
          <span className="text-sm font-semibold text-green-600">
            -₹{couponDiscount.toLocaleString()}
          </span>
        </div>
      )}

      <div className="border-t border-gray-300 mt-5 pt-5">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-lg font-bold">Total</span>
            <p className="text-xs text-gray-500 mt-0">Free Delivery</p>
          </div>
          <div className="text-right">
            {totalSavings > 0 && (
              <div className="text-sm text-gray-400 line-through">
                ₹{subtotal.toLocaleString()}
              </div>
            )}

            <div className="text-2xl font-bold">
              ₹{finalTotal.toLocaleString()}
            </div>
          </div>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-sm text-green-600">
              Coupon ({coupon.coupon_code})
            </span>
            <span className="text-sm font-semibold text-green-600">
              -₹{couponDiscount.toLocaleString()}
            </span>
          </div>
        )}
        <div className="mt-4 flex items-center gap-2">
          <span>🏷️</span>
          <span className="text-sm font-semibold text-gray-800">
            TOTAL SAVINGS ₹{totalSavings.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
