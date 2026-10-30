import { getProductImageUrl } from "../../data/homeProducts";
import useCart from "../../hooks/useCart";
import { X, ShoppingBag, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoginModal from "../auth/LoginModal";

import CartGymAccessOffer from "../common/GymAccessOffer";

export default function CartSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { isAuthenticated, fetchProfile } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    navigate("/checkouts");
  };
  const { items, loading, error, changeQuantity, deleteItem, cartId, fetchCart } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * (Number(item.discountPrice) || 0),
    0,
  );

  useEffect(() => {
    if (open) {
      fetchCart();
    }
  }, [open, fetchCart]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[70] transition-opacity
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        inert={!open}
        aria-hidden={!open}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal={open ? true : undefined}
        className={`fixed top-0 right-0 h-dvh flex flex-col w-full sm:w-[420px]
          bg-white z-[80] shadow-2xl transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-border shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl">Cart ({items.length})</h2>
            {loading && <Loader2 size={16} className="animate-spin text-primary" />}
          </div>

          <button onClick={onClose} aria-label="Close cart" className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        {items.length > 0 && <div className="px-4 shrink-0 max-h-[35vh] overflow-y-auto"><CartGymAccessOffer /></div>}

        {/* Items */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          {error && items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <p className="text-sm font-semibold text-red-600 mb-2">{error}</p>
              <button
                onClick={() => fetchCart()}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-hover transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <ShoppingBag size={48} className="text-gray-300 mb-3" />
              <p className="text-base font-semibold text-gray-700 mb-1">Your cart is empty</p>
              <p className="text-xs text-gray-400 mb-5">Explore our clean, lab-tested supplements.</p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/gomzi-supplement");
                }}
                className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-hover transition-colors cursor-pointer"
              >
                Explore Supplements
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.name}-${item._id}`}
                className="flex gap-3 py-4 border-b border-border"
              >
                <img
                  src={getProductImageUrl(item.image)}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-contain bg-bg-light"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm break-words">{item.name}</h4>

                  {item.flavour && <p className="text-sm text-gray-500">{item.flavour}</p>}

                  <p className="font-bold mt-1">₹{item.discountPrice}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="h-9 w-9 rounded-lg border border-border text-primary font-bold cursor-pointer hover:bg-gray-50 flex items-center justify-center"
                      onClick={() => changeQuantity(item, -1)}
                    >
                      −
                    </button>

                    <span className="font-semibold text-sm">{item.quantity}</span>

                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      className="h-9 w-9 rounded-lg border border-border text-primary font-bold cursor-pointer hover:bg-gray-50 flex items-center justify-center"
                      onClick={() => changeQuantity(item, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  aria-label={`Remove ${item.name}`}
                  onClick={() => deleteItem(cartId, item._id)}
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-5 border-t border-border bg-bg-light">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <span className="font-bold text-lg">₹{subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-primary hover:bg-hover text-white py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Checkout
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="w-full mt-3 border border-border py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            View Cart
          </button>
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
