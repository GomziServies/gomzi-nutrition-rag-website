import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { getOrdersApi, getRazorpayOrderApi } from "../api/order.api";
import { getProductsApi } from "../api/product.api";
import { getProductImageUrl } from "../utils/productAdapter";
import { clearCart } from "../services/cartStorage.service";
import {
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export default function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const receipt_id = searchParams.get("receipt_id");
  const gateway_order_id = searchParams.get("order_id");

  const [showConfetti, setShowConfetti] = useState(true);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Clear cart immediately upon landing on order confirmation page
  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (receipt_id) {
      fetchOrder(receipt_id);
    } else if (gateway_order_id) {
      fetchRazorpayOrder(gateway_order_id);
    } else {
      setLoading(false);
    }
  }, [receipt_id, gateway_order_id]);

  const fetchOrder = async (id) => {
    try {
      setLoading(true);
      const res = await getOrdersApi(id);
      if (res?.data?.response === "OK" && res.data.data?.length) {
        setOrder(res.data.data[0]);
      }
    } catch (error) {
      console.error("Fetch order error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRazorpayOrder = async (gwId) => {
    try {
      setLoading(true);
      const res = await getRazorpayOrderApi(gwId);
      if (res?.data?.response === "OK" && res.data.data?.length) {
        setOrder(res.data.data[0]);
      }
    } catch (error) {
      console.error("Fetch razorpay order error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Enrich order items with full product details if display images are missing
  useEffect(() => {
    if (!order?.CART || !order.CART.length) return;

    let isMounted = true;

    const enrichItems = async () => {
      let changed = false;
      const updatedCart = await Promise.all(
        order.CART.map(async (item, idx) => {
          // If already enriched with a valid image, retain
          if (item.resolvedImage) return item;

          // Check if item already has a direct valid image
          const directImg = getProductImageUrl(item);
          if (directImg && directImg !== "/images/product-placeholder.webp") {
            changed = true;
            return { ...item, resolvedImage: directImg };
          }

          // Otherwise look up product details by ID
          const matchedMeta =
            order.multiple_items?.[idx] ||
            order.multiple_items?.find(
              (m) => m.item_id === item._id || m.product_id === item._id
            );
          const productId = item._id || matchedMeta?.item_id || matchedMeta?.product_id;
          const variationId = matchedMeta?.notes?.variation_id;

          if (productId) {
            try {
              const res = await getProductsApi({ id: productId, limit: 1 });
              const prod = res?.data?.data;
              if (prod) {
                // If a variation was chosen, try to match variation image
                let varImg = null;
                if (variationId && Array.isArray(prod.variations)) {
                  const matchedVar = prod.variations.find((v) => v._id === variationId);
                  if (matchedVar?.displayImages?.[0]) {
                    varImg = matchedVar.displayImages[0];
                  }
                }

                const chosenRaw =
                  varImg ||
                  prod.displayImages?.[0] ||
                  prod.display_image?.[0] ||
                  prod.image;

                const finalUrl = chosenRaw
                  ? chosenRaw.startsWith("http") || chosenRaw.startsWith("/")
                    ? chosenRaw
                    : `https://files.fggroup.in/${chosenRaw}`
                  : getProductImageUrl(prod);

                changed = true;
                return {
                  ...item,
                  resolvedImage: finalUrl,
                  displayImages: prod.displayImages,
                };
              }
            } catch (err) {
              console.warn("Product image enrichment failed:", item.name, err);
            }
          }

          return item;
        })
      );

      if (isMounted && changed) {
        setOrder((prev) => ({ ...prev, CART: updatedCart }));
      }
    };

    enrichItems();

    return () => {
      isMounted = false;
    };
  }, [order?.CART, order?.multiple_items]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf8f6] font-modelica">
        <div className="w-10 h-10 border-3 border-[#5C3124]/20 border-t-[#5C3124] rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Confirming Your Order...
        </p>
      </div>
    );
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const orderId =
    order?.receipt_id ||
    order?.id ||
    order?._id ||
    receipt_id ||
    gateway_order_id ||
    "GOMZI-CONFIRMED";

  return (
    <div className="min-h-screen bg-[#faf8f6] px-4 py-8 md:py-14 font-modelica text-[#1c1c28]">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={250}
          colors={["#5C3124", "#ff8914", "#10b981", "#fbbf24", "#3b82f6"]}
        />
      )}

      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Success Card */}
        <div className="bg-white border border-[#ebdcd7] rounded-3xl p-6 sm:p-10 text-center shadow-sm flex flex-col items-center">
          {/* Animated Success Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 size={42} className="text-emerald-600" />
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            Payment & Order Confirmed
          </span>

          <h1 className="font-toma text-3xl sm:text-4xl font-black text-[#1c1c28] tracking-tight mb-2">
            Thank You For Fueling With Gomzi!
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed mb-6">
            Your sports nutrition order has been placed successfully. A confirmation summary has been logged and our fulfillment team is preparing your dispatch.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#f5eeeb] px-5 py-2.5 rounded-xl border border-[#ebdcd7]">
            <span className="text-xs font-bold text-gray-600">Order ID:</span>
            <span className="font-mono text-sm sm:text-base font-black text-[#5C3124]">
              #{orderId}
            </span>
          </div>
        </div>

        {/* Estimated Delivery Notification */}
        <div className="bg-white rounded-2xl border border-[#ebdcd7] p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f5eeeb] text-[#5C3124] flex items-center justify-center shrink-0 border border-[#ebdcd7]">
            <Truck size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
              Pan-India Express Dispatch
            </span>
            <p className="font-bold text-xs sm:text-sm text-[#1c1c28]">
              Estimated Delivery by <span className="text-[#5C3124] font-extrabold">{estimatedDelivery}</span>
            </p>
          </div>
        </div>

        {/* Order Details & Items Summary */}
        {order && (
          <div className="bg-white border border-[#ebdcd7] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-5">
            <h2 className="font-toma text-xl font-black text-[#1c1c28] tracking-tight flex items-center gap-2 pb-3 border-b border-[#ebdcd7]">
              <Package size={18} className="text-[#5C3124]" />
              <span>Order Summary</span>
            </h2>

            {/* Products List */}
            {order.CART?.length > 0 && (
              <div className="flex flex-col divide-y divide-[#ebdcd7]">
                {order.CART.map((item, idx) => {
                  const matchedMeta =
                    order.multiple_items?.[idx] ||
                    order.multiple_items?.find(
                      (m) => m.item_id === item._id || m.product_id === item._id
                    );
                  const qty = item.quantity || matchedMeta?.quantity || 1;
                  const itemPrice = item.price || (matchedMeta?.amount ? matchedMeta.amount / qty : 0);
                  const imgSrc = getProductImageUrl(item);

                  return (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-[#faf8f6] border border-[#ebdcd7] p-1.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                          <img
                            src={imgSrc}
                            alt={item.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/images/product-placeholder.webp";
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-[#1c1c28] truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 font-medium">
                            Qty: {qty}
                          </p>
                        </div>
                      </div>

                      <span className="font-bold text-xs sm:text-sm text-[#1c1c28] shrink-0">
                        ₹{(Number(itemPrice) * qty).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Total Paid & Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#ebdcd7]">
              <div className="bg-[#faf8f6] rounded-xl p-3.5 border border-[#ebdcd7]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Payment Method
                </span>
                <p className="font-bold text-xs sm:text-sm text-[#1c1c28] mt-1 uppercase">
                  {order.purchase_mode || "Online Gateway"}
                </p>
              </div>

              <div className="bg-[#5C3124] text-white rounded-xl p-3.5 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                  Total Paid
                </span>
                <p className="font-toma text-xl font-black mt-0.5">
                  ₹{Number(order.amount || 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            {order.notes?.address_line_1 && (
              <div className="bg-[#faf8f6] rounded-xl p-4 border border-[#ebdcd7]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1 flex items-center gap-1">
                  <MapPin size={12} className="text-[#5C3124]" />
                  Shipping Destination
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {order.notes.address_line_1}
                  {order.notes.address_line_2 ? `, ${order.notes.address_line_2}` : ""}
                  {order.notes.city ? `, ${order.notes.city}` : ""}
                  {order.notes.state ? `, ${order.notes.state}` : ""}
                  {order.notes.pin_code ? ` - ${order.notes.pin_code}` : ""}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/gomzi-supplement"
            className="group relative overflow-hidden flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <span className="relative z-10">Continue Shopping</span>
            <ArrowRight size={15} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          </Link>

          <Link
            to="/profile"
            className="flex-1 py-4 px-6 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-[#ebdcd7] text-xs font-extrabold uppercase tracking-wider transition-all text-center"
          >
            <span>View My Orders & Tracking</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
