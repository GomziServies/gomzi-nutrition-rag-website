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
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px]
          bg-white z-50 shadow-2xl transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="font-bold text-xl">Cart ({items.length})</h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-180px)]">
          {items.map((item) => (
            <div
              key={`${item.name}-${item._id}`}
              className="flex gap-4 py-4 border-b"
            >
              <img
                src={`https://files.fggroup.in/${item.image}`}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-contain bg-gray-100"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>

                <p className="text-sm text-gray-500">{item.flavour}</p>

                <p className="font-bold mt-1">₹{item.discountPrice}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => changeQuantity(item, -1)}>−</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => changeQuantity(item, 1)}>+</button>
                </div>
              </div>

              <button
                onClick={() => deleteItem(cartId, item._id)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-bold">₹{subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="group relative overflow-hidden w-full btn-gradient border border-amber-400/30 text-white py-3.5 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer"
          >
            <span className="relative z-10">Checkout</span>
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="w-full mt-2.5 border border-[#dbdee9] hover:border-primary hover:text-primary py-3 rounded-xl font-semibold transition-colors cursor-pointer"
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
