import { getProductImageUrl } from "../../data/homeProducts";
import useCart from "../../hooks/useCart";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoginModal from "../auth/LoginModal";

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
  const { items, changeQuantity, deleteItem, cartId, fetchCart } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.discountPrice,
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
          <h2 className="font-bold text-xl">Cart ({items.length})</h2>

          <button onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          {items.map((item) => (
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

                <p className="text-sm text-gray-500">{item.flavour}</p>

                <p className="font-bold mt-1">₹{item.discountPrice}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button aria-label={`Decrease quantity of ${item.name}`} className="h-9 w-9 rounded-lg border border-border text-primary" onClick={() => changeQuantity(item, -1)}>−</button>

                  <span>{item.quantity}</span>

                  <button aria-label={`Increase quantity of ${item.name}`} className="h-9 w-9 rounded-lg border border-border text-primary" onClick={() => changeQuantity(item, 1)}>+</button>
                </div>
              </div>

              <button
                aria-label={`Remove ${item.name}`}
                onClick={() => deleteItem(cartId, item._id)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-5 border-t border-border bg-bg-light">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-bold">₹{subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-primary hover:bg-hover text-white py-4 rounded-lg font-bold"
          >
            Checkout
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full mt-3 border py-3 rounded-lg"
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
