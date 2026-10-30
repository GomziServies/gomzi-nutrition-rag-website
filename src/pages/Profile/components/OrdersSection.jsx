import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getOrdersApi } from "../../../api/order.api";
import { Link } from "react-router-dom";
import { OrderListSkeleton } from "../../../component/common/LoadingSkeletons";

function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setError("");
      const response = await getOrdersApi();
      setOrders(response.data.data || []);
    } catch {
      setError("We couldn't load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const toggleOrder = (id) => {
    setOpenOrder(openOrder === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {loading ? (
          <OrderListSkeleton />
        ) : error ? (
          <div role="alert" className="site-surface p-10 text-center">
            <p className="text-text-light">{error}</p>
            <button type="button" onClick={() => { setLoading(true); loadOrders(); }} className="site-button mt-5">Try again</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-border p-10 text-center">
            <div className="text-6xl mb-4">🛍️</div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Orders Found
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet. Start shopping and discover our
              amazing products.
            </p>

            <Link
              to="/gomzi-supplement"
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-hover transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {orders.map((order, index) => {
              const isOpen = openOrder === order._id;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md border border-border overflow-hidden transition-all duration-300"
                >
                  {/* HEADER */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(order._id)}
                    aria-expanded={isOpen}
                    aria-controls={`order-${order._id}`}
                    className="w-full cursor-pointer p-6 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                      {/* LEFT */}
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-black">
                          #{order.receipt_id}
                        </h2>

                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <div className="flex gap-3 mt-4 flex-wrap">
                          {order.CART?.slice(0, 2).map((item) => (
                            <div
                              key={`${order._id}-${item._id}`}
                              className="bg-gray-100 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
                            >
                              {item.name}
                            </div>
                          ))}

                          {order.CART?.length > 2 && (
                            <div className="bg-primary text-white px-4 py-2 rounded-full text-sm">
                              +{order.CART.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full xl:w-auto">
                        {/* TOTAL */}
                        <div className="text-right">
                          <p className="text-gray-500 text-sm">Total</p>

                          <h3 className="text-xl md:text-2xl font-bold">
                            ₹{order.amount.toLocaleString()}
                          </h3>
                        </div>

                        {/* STATUS */}
                        <div>
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold ${
                              order.status === "SUCCESS"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* ICON */}
                        <div>
                          {isOpen ? (
                            <ChevronUp size={28} />
                          ) : (
                            <ChevronDown size={28} />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* EXPANDED CONTENT */}
                  <div
                    id={`order-${order._id}`}
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-border p-4 md:p-6">
                      {/* PRODUCTS */}
                      <div>
                        <h3 className="text-xl font-bold mb-5">Products</h3>

                        <div className="space-y-4">
                          {order.CART?.map((item, index) => {
                            const matchedItem = order.multiple_items?.find(
                              (m) => m.item_id === item._id,
                            );

                            return (
                              <div
                                key={`${order._id}-${item._id}-${index}`}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 rounded-2xl p-4"
                              >
                                <div className="flex items-center gap-4">
                                  {/* IMAGE */}
                                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl">
                                    🥗
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-sm md:text-base">
                                      {item.name}
                                    </h4>

                                    <p className="text-xs md:text-sm text-gray-500">
                                      Quantity: {matchedItem?.quantity || 1}
                                    </p>
                                  </div>
                                </div>

                                <h3 className="text-lg md:text-xl font-bold">
                                  ₹{item.price.toLocaleString()}
                                </h3>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* ORDER DETAILS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div className="bg-primary text-white rounded-2xl p-5">
                          <p className="text-gray-400 text-sm">Total Amount</p>

                          <h3 className="text-xl sm:text-2xl font-bold mt-2">
                            ₹{order.amount.toLocaleString()}
                          </h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4">
                          <p className="text-gray-500 text-sm">
                            Payment Method
                          </p>

                          <h3 className="font-bold text-lg mt-2">
                            {order.purchase_mode}
                          </h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4">
                          <p className="text-gray-500 text-sm">Order Status</p>

                          <h3 className="font-bold text-lg mt-2 text-primary">
                            {
                              order.user_meal_product?.tracking?.[
                                order.user_meal_product.tracking.length - 1
                              ]?.shipment_status
                            }
                          </h3>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="mt-8 bg-gray-50 rounded-2xl p-4">
                        <h3 className="font-bold text-lg mb-3">
                          Shipping Address
                        </h3>

                        <p className="text-gray-600 leading-7">
                          {order.notes?.address_line_1},{" "}
                          {order.notes?.address_line_2}, {order.notes?.city},{" "}
                          {order.notes?.state} - {order.notes?.pin_code},{" "}
                          {order.notes?.country}
                        </p>
                      </div>

                      {/* TRACKER */}
                      <div className="mt-10">
                        <h3 className="text-xl font-bold mb-6">
                          Order Tracking
                        </h3>

                        <div className="overflow-x-auto pb-3 scrollbar-hide">
                        <div className="flex min-w-[620px] items-center justify-between relative">
                          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>

                          {[
                            "PLACED",
                            "CONFIRMED",
                            "SHIPPED",
                            "OUT FOR DELIVERY",
                            "DELIVERED",
                          ].map((step, index) => {
                            const completed =
                              order.user_meal_product?.tracking?.some(
                                (t) => t.shipment_status === step,
                              );

                            return (
                              <div
                                key={index}
                                className="relative z-10 flex flex-col items-center flex-1"
                              >
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 ${
                                    completed
                                      ? "bg-green-500 border-green-500 text-white"
                                      : "bg-white border-gray-300 text-gray-400"
                                  }`}
                                >
                                  ✓
                                </div>

                                <p
                                  className={`mt-3 text-sm text-center font-semibold ${
                                    completed ? "text-black" : "text-gray-400"
                                  }`}
                                >
                                  {step}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default OrdersSection;
