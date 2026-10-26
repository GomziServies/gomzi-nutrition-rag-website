import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import useCart from "../../../hooks/useCart";

function CartSection() {
  const { items } = useCart();
  const itemCount = items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-primary-border">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            Shopping Cart
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Review active items in your cart and proceed to secure checkout.
          </p>
        </div>

        <span className="text-xs font-bold text-primary bg-[#f5eeeb] px-3.5 py-1.5 rounded-xl border border-primary-border self-start sm:self-auto">
          {itemCount} {itemCount === 1 ? "Item" : "Items"} in Cart
        </span>
      </div>

      <div className="bg-bg-cream rounded-2xl md:rounded-3xl border border-primary-border p-8 sm:p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white border border-primary-border flex items-center justify-center text-primary mb-4 shadow-sm">
          <ShoppingCart size={28} />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-text mb-2">
          {itemCount > 0 ? "You have items in your cart" : "Your cart is currently empty"}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed mb-6">
          {itemCount > 0
            ? `You have ${itemCount} items waiting. Head to the full cart to adjust quantities, apply athlete promo codes, and complete checkout.`
            : "Browse our lab-tested whey isolate, creatine, and daily wellness formulas to power your training."}
        </p>

        <Link
          to="/cart"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-primary/20 cursor-pointer"
        >
          <span>{itemCount > 0 ? "Go to Cart & Checkout" : "Explore Supplements"}</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default CartSection;
