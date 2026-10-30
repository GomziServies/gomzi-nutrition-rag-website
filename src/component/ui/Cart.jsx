import { useState } from "react";
import { getProductImageUrl } from "../../data/homeProducts";
import { CartSkeleton } from "../common/LoadingSkeletons";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import LoginModal from "../auth/LoginModal";
import useAuth from "../../hooks/useAuth";

const ProductImg = ({ src, alt, bg, label, className }) => {
  const [err, setErr] = useState(false);
  return err || !src ? (
    <div
      className={`${bg} ${className} flex flex-col items-center justify-center`}
    >
      <span className="text-[10px] font-bold text-text-light text-center px-1 leading-tight">
        {label}
      </span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover`}
      onError={() => setErr(true)}
    />
  );
};

export default function Cart() {
  const navigate = useNavigate();
  const { items, loading, error, fetchCart, deleteItem, cartId, changeQuantity } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, fetchProfile } = useAuth();
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * (item.discountPrice || 0),
    0,
  );

  const originalTotal = items.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0,
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    navigate("/checkouts");
  };
  const saving = originalTotal - subtotal;
  if (loading) return <CartSkeleton />;
  if (error) return <section role="alert" className="max-w-xl mx-auto px-5 py-24 text-center"><h1 className="text-3xl font-bold mb-4">We couldn't load your cart</h1><p className="text-stone-500 mb-6">Your saved items are safe. Please try again.</p><button onClick={() => fetchCart()} className="rounded-xl bg-primary text-white px-6 py-3">Try again</button></section>;
  if (!items || items.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 py-12 bg-light">
        <div className="text-center max-w-md">
          <img
            src="/images/empty-cart.png" // optional image
            alt="Empty Cart"
            className="w-48 mx-auto mb-6"
          />

          <h2 className="font-toma text-3xl text-primary mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-text-light mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => navigate("/gomzi-supplement")}
            className="px-6 py-3 bg-btn-dark hover:bg-hover text-btn-light rounded-md font-semibold transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="site-container min-h-[50vh] bg-light text-text">
        {/* ══ FREE SHIPPING BANNER ══ */}
        {/* <div className="py-4 bg-bg">
          <div className="bg-[#8cd7e1] rounded-md px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0 w-full">
              <p className="font-modelica font-medium text-sm sm:text-lg text-primary">
                Congratulations! You achieved free shipping!
              </p>
              <div className="mt-3 w-full h-[5px] bg-primary/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "88%" }}
                />
              </div>
            </div>
            <button
              className="w-full sm:w-auto shrink-0 bg-bg text-primary cursor-pointer font-modelica font-semibold text-sm px-5 py-3 rounded-md shadow-sm hover:bg-bg-light transition-colors border border-border"
              onClick={() => navigate("/gomzi-supplement")}
            >
              Continue shopping
            </button>
          </div>
        </div> */}

        {/* ══ MAIN CONTAINER ══ */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 py-6 sm:py-8">
          {/* ════ LEFT - Cart Items ════ */}
          <div className="site-surface flex-1 min-w-0 p-4 sm:p-6">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-4">
              <h1 className="font-toma font-bold text-xl sm:text-2xl text-text">
                Your cart
              </h1>
              <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {totalQty}
              </span>
            </div>

            {/* ── Item List ── */}
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={`${item._id || item.item_id}-${item.variation_id || "base"}`} className="py-4 sm:py-5">
                  {/* ── DESKTOP: all in one row | MOBILE: stacked ── */}
                  <div className="flex items-center gap-3 sm:gap-5">
                    {/* Product image */}
                    <div
                      className={`shrink-0 w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] rounded-lg overflow-hidden ${item.imgBg}`}
                    >
                      <ProductImg
                        src={getProductImageUrl(item.image)}
                        alt={item.name}
                        bg={item.imgBg}
                        label={item.imgLabel}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Name + flavour - grows to fill space */}
                    <div className="site-surface flex-1 min-w-0 p-4 sm:p-6">
                      <p className="font-toma font-normal text-[13px] sm:text-[17px] leading-snug">
                        {item.name}
                      </p>
                      {item.isFree && (
                        <p className="text-green-600 text-[12px] sm:text-[14px] font-semibold mt-0.5">
                          Gift for new customers!
                        </p>
                      )}
                      {item.flavour && (
                        <p className="text-text-light font-medium text-[12px] sm:text-[14px] mt-0.5">
                          {item.flavour}
                        </p>
                      )}

                      {/* Mobile only: stepper + price row */}
                      <div className="flex items-center justify-between mt-2 sm:hidden">
                        {!item.isFree ? (
                          <div className="flex items-center gap-2 border border-border rounded-md px-2 py-1">
                            <button
                              aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() => changeQuantity(item, -1)}
                              className="text-text hover:text-primary text-xl font-light transition-colors select-none leading-none"
                            >
                              −
                            </button>
                            <span className="text-[14px] font-semibold text-primary w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              aria-label={`Increase quantity of ${item.name}`}
                            onClick={() => changeQuantity(item, +1)}
                              className="text-text hover:text-primary text-xl font-light transition-colors select-none leading-none"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <div />
                        )}
                        <div className="text-right">
                          <p className="text-text-light text-[11px] line-through leading-tight">
                            ₹{item.price}
                          </p>
                          <p className="font-toma font-extrabold text-[16px] text-primary leading-tight mt-0.5">
                            ₹{item.discountPrice}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop only: Stepper - centered column */}
                    <div className="hidden sm:flex shrink-0 w-[110px] items-center justify-center">
                      {!item.isFree ? (
                        <div className="flex items-center gap-3 border border-border rounded-md px-3 py-1.5">
                          <button
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() => changeQuantity(item, -1)}
                            className="text-text hover:text-primary text-2xl font-light transition-colors select-none leading-none"
                          >
                            −
                          </button>
                          <span className="text-[15px] font-semibold text-primary w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() => changeQuantity(item, +1)}
                            className="text-text hover:text-primary text-2xl font-light transition-colors select-none leading-none"
                          >
                            +
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {/* Desktop only: Price */}
                    <div className="hidden sm:block shrink-0 text-right min-w-[90px]">
                      <p className="text-text-light text-[13px] line-through leading-tight">
                        ₹{item.price}
                      </p>
                      <p className="font-toma font-extrabold text-[18px] text-primary leading-tight mt-0.5">
                        ₹{item.discountPrice}
                      </p>
                    </div>

                    {/* Remove button */}
                    <div className="shrink-0 w-4">
                      {!item.isFree && (
                        <button
                          onClick={() => deleteItem(cartId, item._id)}
                          className="text-text-light hover:text-red-500 text-[13px] transition-colors"
                          title="Remove" aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT - Order Summary ════ */}
          <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0">
            <div className="site-surface p-4 sm:p-6 lg:sticky lg:top-48">
              <h2 className="font-toma font-extrabold text-xl text-text mb-4">
                Order summary
              </h2>

              <div className="flex justify-between items-center mb-1.5">
                <span className="text-green-600 font-bold text-sm font-modelica">
                  Saving
                </span>
                <span className="text-green-600 font-bold text-sm font-modelica">
                  −₹{saving.toFixed(2)}/-
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 mb-4 border-b border-border">
                <span className="font-semibold text-sm text-text font-modelica">
                  Subtotal
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-text-light text-xs line-through">
                    {/* €{origTotal.toFixed(2)} */}
                  </span>
                  <span className="font-toma font-extrabold text-xl text-text">
                    ₹{subtotal.toFixed(2)}/-
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <Stars filled={5} />
                <span className="text-text-light text-xs font-modelica">
                  4.8 based on 245 Reviews
                </span>
              </div>

              <button
                className="w-full py-4 bg-btn-dark hover:bg-hover text-btn-light font-toma font-bold text-[15px] rounded-md transition-colors mb-3"
                onClick={handleCheckout}
              >
                Check out
              </button>

              {/* <div className="grid grid-cols-2 gap-3 mb-3">
                <button className="py-3 rounded-md bg-[#ffc439] text-[#003087] font-bold text-sm flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
                  <span className="text-base">P</span> PayPal
                </button>
                <button className="py-3 rounded-md bg-primary hover:bg-hover text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors">
                  <span className="font-bold">G</span> Pay
                </button>
              </div> */}

              <div className="flex items-center justify-center gap-1.5 mb-5">
                <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[9px] text-white">
                  ✓
                </span>
                <p className="text-green-600 text-xs font-semibold font-modelica">
                  Add another item to boost your discount!
                </p>
              </div>

              {/* Payment icons */}
              <div className="flex justify-center">
                <img
                  src="/images/Payment_icons_mobile.png"
                  alt="Accepted payment methods"
                  className="w-full max-w-[320px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={async () => {
          await fetchProfile();
          setShowLogin(false);
          navigate("/checkouts");
        }}
      />
    </>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
