import { Link, useNavigate } from "react-router-dom";
import PageLoading from "../component/PageLoading";
import { GymAccessOffer } from "../component/common/GymAccessOffer";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { getOrdersApi, getRazorpayOrderApi } from "../api/order.api";
import { useSearchParams } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const receipt_id = searchParams.get("receipt_id");
  const gateway_order_id = searchParams.get("order_id");

  const [showConfetti, setShowConfetti] = useState(true);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer;
    let attempts = 0;
    const loadOrder = async () => {
      if (!receipt_id && !gateway_order_id) {
        setLoading(false);
        return;
      }

      try {
        const res = receipt_id
          ? await getOrdersApi(receipt_id)
          : await getRazorpayOrderApi(gateway_order_id);
        if (!cancelled && res?.data?.response === "OK") {
          const currentOrder = res.data.data?.[0];
          setOrder(currentOrder || null);
          if (currentOrder?.status === "PENDING" && attempts++ < 10) {
            timer = setTimeout(loadOrder, 2000);
          }
        }
      } catch {
        if (!cancelled) setOrder(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadOrder();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [receipt_id, gateway_order_id, refresh]);

  if (loading) {
    return <PageLoading />;
  }

  if (!order) {
    return (
      <section className="site-container py-12 md:py-16">
        <div className="site-surface max-w-lg mx-auto p-6 sm:p-10 text-center">
          <h1 className="font-toma text-2xl">We couldn't find this order</h1>
          <p className="text-sm text-text-light leading-7 mt-3">Check your order history for the latest details, or contact our team for help.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link to="/profile" className="site-button">My account</Link>
            <Link to="/contact-us" className="site-button site-button-outline">Contact us</Link>
          </div>
        </div>
      </section>
    );
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  const estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-light px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {showConfetti && order.status === "SUCCESS" && <Confetti recycle={false} numberOfPieces={350} />}
        {/* Success Card */}
        <div className="site-surface p-8 text-center">
          {order.status === "SUCCESS" && <div className="relative flex justify-center mb-8">
            {/* Pulsing circles */}
            <div className="absolute w-28 h-28 rounded-full bg-green-200 animate-ping opacity-20" />

            <div className="relative w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>}

          <h1 className="font-toma text-4xl text-primary mb-3">{order.status === "SUCCESS" ? "Thank You!" : order.status === "PENDING" ? "Payment confirmation pending" : `Order ${order.status.toLowerCase()}`}</h1>

          <p className="text-text-light max-w-lg mx-auto mb-6">
            {order.status === "SUCCESS" ? "Your order has been placed successfully. You can follow its progress in My Orders." : order.status === "PENDING" ? "We're waiting for payment confirmation. Please check this order before making another payment." : "Check My Orders for the latest payment and delivery details."}
          </p>

          <div className="inline-flex items-center gap-2 bg-bg-light px-5 py-3 rounded-lg">
            <span className="font-semibold text-primary">Order ID:</span>
            <span className="font-bold text-primary">#{order.receipt_id || order.id || order._id}</span>
          </div>
          {order.status === "PENDING" && <button type="button" className="site-button mt-4" onClick={() => setRefresh((value) => value + 1)}>Check payment status</button>}
        </div>

        {order.status === "SUCCESS" && <GymAccessOffer offer={order.notes?.gym_access_offer} confirmed />}

        {/* Summary */}
        <div className="mt-8 site-surface p-6">
          <h2 className="font-toma text-2xl text-primary mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-text-light">Items</span>
              <span className="font-semibold">{order.CART?.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-light">Payment Method</span>
              <span className="font-semibold">{order.purchase_mode}</span>
            </div>

            <div className="border-t border-border pt-4 flex justify-between">
              <span className="font-bold text-lg">{order.purchase_mode === "Cash On Delivery" ? "Amount due on delivery" : order.status === "SUCCESS" ? "Total Paid" : "Order Total"}</span>
              <span className="font-toma font-bold text-xl text-primary">
                ₹{order.amount}
              </span>
            </div>
          </div>
        </div>
        {order.status === "SUCCESS" && <div className="bg-bg-light rounded-xl p-4 border shadow-md mt-8 border-border">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚚</span>

            <div>
              <p className="font-semibold text-primary">Estimated Delivery</p>

              <p className="text-text-light text-sm">{estimatedDelivery}</p>
            </div>
          </div>
        </div>}

        {/* <div className="bg-bg-light border border-border rounded-xl p-4 mt-8 shadow-md">
          <div className="flex gap-3">
            <span className="text-2xl">📩</span>

            <div>
              <h3 className="font-semibold text-primary">Confirmation Sent</h3>

              <p className="text-text-light text-sm mt-1">
                We've sent your order confirmation and invoice to:
              </p>

              <p className="font-semibold text-primary mt-2">{order.email}</p>
            </div>
          </div>
        </div> */}
        <div className="mt-8 site-surface p-6">
          <h2 className="font-toma text-2xl text-primary mb-5">
            Delivery Address
          </h2>

          <div className="space-y-2">
            {/* <p>
              {order.user_id?.first_name} {order.user_id?.last_name}
            </p> */}

            <p>{order.notes?.address_line_1}</p>

            <p>{order.notes?.address_line_2}</p>

            <p>
              {order.notes?.city}, {order.notes?.state}
            </p>

            <p>
              {order.notes?.country} - {order.notes?.pin_code}
            </p>

            <p>{[order.notes?.first_name, order.notes?.last_name].filter(Boolean).join(" ")}</p>
            <p>{order.notes?.mobile || order.user_id?.mobile}</p>
          </div>
        </div>

        {/* Order Timeline */}
        {order.status === "SUCCESS" && <div className="mt-8 site-surface p-6">
          <h2 className="font-toma text-2xl text-primary mb-5">What's Next?</h2>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                ✓
              </div>

              <div>
                <p className="font-semibold">Order Confirmed</p>
                <p className="text-xs text-text-light">Just now</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                2
              </div>

              <div>
                <p className="font-semibold">Preparing Your Order</p>
                <p className="text-xs text-text-light">Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-60">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
                3
              </div>

              <div>
                <p className="font-semibold">Shipped</p>
                <p className="text-xs text-text-light">
                  You'll receive tracking details
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-60">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
                4
              </div>

              <div>
                <p className="font-semibold">Delivered</p>
                <p className="text-xs text-text-light">{estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>}

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/gomzi-supplement")}
            className="flex-1 py-4 border border-border rounded-lg font-semibold text-primary hover:bg-bg-light transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
