import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Package,
  ShoppingBag,
  CreditCard,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { getOrdersApi } from "../../../api/order.api";
import { getProductImageUrl } from "../../../utils/productAdapter";

function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrdersApi();
      if (response?.data?.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (id) => {
    setOpenOrder(openOrder === id ? null : id);
  };

  const getStatusBadge = (status) => {
    const s = String(status || "").toUpperCase();
    if (s === "SUCCESS" || s === "DELIVERED" || s === "COMPLETED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {status}
        </span>
      );
    }
    if (s === "PENDING" || s === "PROCESSING" || s === "CONFIRMED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        {status || "FAILED"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Fetching Order History...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-primary-border">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            Order History & Tracking
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Monitor real-time shipment status and view itemized invoices for past orders.
          </p>
        </div>

        <span className="text-xs font-bold text-primary bg-[#f5eeeb] px-3.5 py-1.5 rounded-xl border border-primary-border self-start sm:self-auto">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"} Placed
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-bg-cream rounded-2xl md:rounded-3xl border border-dashed border-primary-border p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-primary-border flex items-center justify-center text-primary mb-4 shadow-sm">
              <ShoppingBag size={28} />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-text mb-2">
              No Orders Found
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed mb-6">
              You haven't placed any orders yet. Discover our certified whey protein, mass gainers, and sports supplements to jumpstart your goals.
            </p>

            <Link
              to="/gomzi-supplement"
              className="inline-flex items-center gap-2 btn-gradient text-white px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 border border-amber-400/30 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Products</span>
              <ArrowRight size={15} className="relative z-10 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ) : (
          /* Orders Cards */
          orders.map((order, index) => {
            const isOpen = openOrder === order._id;
            const orderDate = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Recent";

            return (
              <div
                key={order._id || index}
                className="bg-white rounded-2xl border border-primary-border overflow-hidden transition-all duration-200 shadow-sm hover:border-primary/40"
              >
                {/* Clickable Order Header */}
                <div
                  onClick={() => toggleOrder(order._id)}
                  className="cursor-pointer p-5 sm:p-6 bg-white hover:bg-bg-cream transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Order Info & Product Preview */}
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-sm sm:text-base font-black text-text tracking-tight">
                          #{order.receipt_id || String(order._id).slice(-8).toUpperCase()}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={13} />
                        <span>Placed on {orderDate}</span>
                      </div>

                      {/* Product Chips Preview */}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {order.CART?.slice(0, 3).map((item, itemIdx) => (
                          <span
                            key={itemIdx}
                            className="bg-[#f5eeeb] text-primary border border-primary-border px-2.5 py-1 rounded-lg text-xs font-bold truncate max-w-[220px]"
                          >
                            {item.name}
                          </span>
                        ))}
                        {order.CART?.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-bold">
                            +{order.CART.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Amount & Dropdown Toggle */}
                    <div className="flex items-center justify-between lg:justify-end gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                          Total Amount
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-text">
                          ₹{Number(order.amount || 0).toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden ${
                          isOpen
                            ? "bg-gradient-to-r from-primary to-primary-hover text-white border border-amber-400/30 shadow-xs"
                            : "bg-bg-cream border border-primary-border text-gray-700 hover:text-primary hover:border-primary/40"
                        }`}
                      >
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isOpen && (
                  <div className="border-t border-primary-border p-5 sm:p-6 bg-[#fcfbfa] flex flex-col gap-6 animate-fadeIn">
                    {/* Itemized Products */}
                    <div className="flex flex-col gap-3">
                      <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-500">
                        Ordered Items ({order.CART?.length || 0})
                      </h4>

                      <div className="flex flex-col gap-2.5">
                        {order.CART?.map((item, itemIdx) => {
                          const matchedItem = order.multiple_items?.find(
                            (m) => m.item_id === item._id || m.product_id === item._id
                          );
                          const qty = matchedItem?.quantity || item.quantity || 1;
                          const imgSrc = getProductImageUrl(item);

                          return (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white border border-primary-border"
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <img
                                  src={imgSrc}
                                  alt={item.name}
                                  className="w-12 h-12 object-contain rounded-lg bg-bg-cream p-1 border border-gray-200 shrink-0"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/images/product-placeholder.webp";
                                  }}
                                />
                                <div className="min-w-0">
                                  <h5 className="font-bold text-xs sm:text-sm text-text truncate">
                                    {item.name}
                                  </h5>
                                  <span className="text-[11px] text-gray-500 font-medium">
                                    Qty: {qty}
                                  </span>
                                </div>
                              </div>

                              <span className="font-bold text-sm sm:text-base text-text shrink-0">
                                ₹{(Number(item.price || 0) * qty).toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Payment Card */}
                      <div className="bg-white rounded-xl p-4 border border-primary-border flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold mb-2">
                          <CreditCard size={15} className="text-primary" />
                          <span>Payment Method</span>
                        </div>
                        <span className="font-bold text-sm text-text uppercase">
                          {order.purchase_mode || "Online Gateway"}
                        </span>
                      </div>

                      {/* Shipment Status Card */}
                      <div className="bg-white rounded-xl p-4 border border-primary-border flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold mb-2">
                          <Package size={15} className="text-primary" />
                          <span>Fulfillment Status</span>
                        </div>
                        <span className="font-bold text-sm text-emerald-600">
                          {order.user_meal_product?.tracking?.slice(-1)[0]?.shipment_status ||
                            order.status ||
                            "In Process"}
                        </span>
                      </div>

                      {/* Total Paid Card */}
                      <div className="bg-primary text-white rounded-xl p-4 shadow-sm flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                          Total Invoice
                        </span>
                        <span className="text-2xl font-black mt-1">
                          ₹{Number(order.amount || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    {order.notes?.address_line_1 && (
                      <div className="bg-white rounded-xl p-4 border border-primary-border">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold mb-1.5">
                          <MapPin size={15} className="text-primary" />
                          <span>Delivery Destination</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {order.notes.address_line_1}
                          {order.notes.address_line_2 ? `, ${order.notes.address_line_2}` : ""}
                          {order.notes.city ? `, ${order.notes.city}` : ""}
                          {order.notes.state ? `, ${order.notes.state}` : ""}
                          {order.notes.pin_code ? ` - ${order.notes.pin_code}` : ""}
                          {order.notes.country ? `, ${order.notes.country}` : ""}
                        </p>
                      </div>
                    )}

                    {/* Visual 5-Stage Tracking Timeline */}
                    <div className="bg-white rounded-xl p-5 border border-primary-border flex flex-col gap-4">
                      <h4 className="font-bold text-xs sm:text-sm text-text flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Live Shipment Timeline</span>
                      </h4>

                      <div className="grid grid-cols-5 gap-2 relative pt-2">
                        {[
                          { label: "Placed", key: "PLACED" },
                          { label: "Confirmed", key: "CONFIRMED" },
                          { label: "Shipped", key: "SHIPPED" },
                          { label: "Out for Delivery", key: "OUT FOR DELIVERY" },
                          { label: "Delivered", key: "DELIVERED" },
                        ].map((step, stepIdx) => {
                          const isDone =
                            order.user_meal_product?.tracking?.some(
                              (t) => t.shipment_status === step.key
                            ) ||
                            (order.status === "SUCCESS" && stepIdx <= 1);

                          return (
                            <div
                              key={stepIdx}
                              className="flex flex-col items-center text-center gap-1.5"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                  isDone
                                    ? "bg-emerald-500 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-400 border border-gray-200"
                                }`}
                              >
                                {isDone ? "✓" : stepIdx + 1}
                              </div>
                              <span
                                className={`text-[10px] sm:text-xs font-bold leading-tight ${
                                  isDone ? "text-text" : "text-gray-400"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default OrdersSection;
