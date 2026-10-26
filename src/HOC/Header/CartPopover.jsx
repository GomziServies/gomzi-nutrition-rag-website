import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

/**
 * HealthKart-inspired Cart Popover Dropdown
 * Displays live cart contents, item count, pricing, and direct checkout CTA.
 *
 * @param {Object} props
 * @param {Array} props.items - Normalized cart items
 * @param {number} props.cartCount - Total quantity of items in cart
 * @param {string|null} props.cartId - Cart ID for mutations
 * @param {Function} props.deleteItem - Item removal handler
 * @param {Function} props.onClose - Popover dismissal callback
 */
export default function CartPopover({
  items = [],
  cartCount = 0,
  cartId,
  deleteItem,
  onClose,
}) {
  const navigate = useNavigate();

  // Compute cart subtotal in INR (O(N) complexity)
  const subtotal = items.reduce((acc, item) => {
    const unitPrice = Number(item.discountPrice || item.price || 0);
    const qty = Number(item.quantity || 1);
    return acc + unitPrice * qty;
  }, 0);

  const handleProceed = () => {
    if (onClose) onClose();
    navigate("/cart");
  };

  return (
    <div
      id="cartPop"
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#dbdee9] z-[999999] overflow-hidden text-text animate-in fade-in slide-in-from-top-2 duration-200"
      role="dialog"
      aria-label="Shopping Cart Preview"
    >
      {/* Popover Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#f8fafb] border-b border-[#e3e3e3]">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-text">
            My Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
          </span>
        </div>
        <Link
          to="/cart"
          onClick={onClose}
          className="text-xs font-semibold text-primary hover:underline"
        >
          View Full Cart
        </Link>
      </div>

      {/* Popover Body */}
      {items.length === 0 ? (
        <div className="p-8 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-bg-page flex items-center justify-center mb-3 text-gray-400">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-text mb-1">
            Your Cart is Empty!
          </p>
          <p className="text-xs text-[#77777e] mb-4 max-w-xs">
            Explore authentic supplements, proteins, and vitamins formulated by RAG.
          </p>
          <button
            onClick={() => {
              if (onClose) onClose();
              navigate("/gomzi-supplement");
            }}
            className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer border-none shadow-sm"
          >
            Explore Supplements
          </button>
        </div>
      ) : (
        <>
          {/* Scrollable Cart Items List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 px-4 py-2 scrollbar-thin">
            {items.map((item) => {
              const itemPrice = Number(item.discountPrice || item.price || 0);
              const itemId = item._id || item.item_id;

              return (
                <div
                  key={`${itemId}-${item.variation_id || "std"}`}
                  className="py-3 flex items-center gap-3 group"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={item.image || "/images/product-placeholder.webp"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/product-placeholder.webp";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-text truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    {(item.variationName || item.flavour) && (
                      <p className="text-[11px] text-[#77777e] truncate mt-0.5">
                        {item.variationName || item.flavour}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs font-bold text-text">
                        ₹{itemPrice.toLocaleString("en-IN")}{" "}
                        <span className="text-[11px] font-normal text-gray-500">
                          × {item.quantity}
                        </span>
                      </span>

                      {/* Delete Item */}
                      {deleteItem && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(cartId, item.item_id || item._id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer bg-transparent border-none rounded"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Popover Footer with Subtotal and Action */}
          <div className="p-4 bg-[#fbfbfb] border-t border-[#e3e3e3] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-text">
              <span>Subtotal:</span>
              <span className="text-sm font-bold text-primary">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={handleProceed}
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
            >
              <span>Proceed to Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
