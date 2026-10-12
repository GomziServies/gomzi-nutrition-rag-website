import CheckoutSummary from "../component/checkout/CheckoutSummary";
import CheckoutForm from "../component/checkout/CheckoutForm";
import useCart from "../hooks/useCart";
import useCoupon from "../hooks/useCoupon";
import { Navigate } from "react-router-dom";

export default function Checkouts() {
  const { items, loading } = useCart();

  const { coupon, saveCoupon, clearCoupon } = useCoupon();

  if (loading) return null;

  if (!loading && items.length === 0) {
    return <Navigate to="/gomzi-supplement" replace />;
  }

  return (
    <div className="font-sans bg-white min-h-screen text-gray-800">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <CheckoutForm coupon={coupon} />
        <CheckoutSummary
          coupon={coupon}
          setCoupon={saveCoupon}
          clearCoupon={clearCoupon}
        />
      </div>
    </div>
  );
}
