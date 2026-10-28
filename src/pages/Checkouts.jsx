import useBranding from "../content/useBranding";
import CheckoutSummary from "../component/checkout/CheckoutSummary";
import CheckoutForm from "../component/checkout/CheckoutForm";
import useCart from "../hooks/useCart";
import useCoupon from "../hooks/useCoupon";
import useAuth from "../hooks/useAuth";
import PageLoading from "../component/PageLoading";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export default function Checkouts() {
  const branding = useBranding();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { items, loading } = useCart();

  const { coupon, saveCoupon, clearCoupon } = useCoupon();

  if (loading || authLoading) return <PageLoading />;
  if (!isAuthenticated) return <Navigate to="/login?redirect=/checkouts" replace />;

  if (!loading && items.length === 0) {
    return <Navigate to="/gomzi-supplement" replace />;
  }

  return (
    <div className="site-form bg-light min-h-screen text-text">
      <header className="border-b border-border bg-light">
        <div className="site-container py-5 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" aria-label="Gomzi Nutrition home"><img src={branding.logo} alt="Gomzi Nutrition" className="h-10 w-auto object-contain" /></Link>
          <h1 className="font-bold text-lg flex items-center gap-2"><ShieldCheck size={20} className="text-primary" /> Checkout</h1>
          <Link to="/cart" className="text-sm text-primary flex items-center gap-2"><ArrowLeft size={16} /> Back to cart</Link>
        </div>
      </header>
      <div className="site-container grid grid-cols-1 lg:grid-cols-2 items-start gap-6 py-6 md:py-10">
        <CheckoutForm coupon={coupon} />
        <CheckoutSummary
          coupon={coupon}
          setCoupon={saveCoupon}
          clearCoupon={clearCoupon}
        />
      </div>
      <footer className="border-t border-border p-6 flex justify-center flex-wrap gap-6 text-xs text-stone-500">
        <Link to="/shipping-policy">Shipping policy</Link><Link to="/refund-policy">Returns & refunds</Link><Link to="/privacy-policy">Privacy policy</Link><Link to="/contact-us">Need help?</Link>
      </footer>
    </div>
  );
}
