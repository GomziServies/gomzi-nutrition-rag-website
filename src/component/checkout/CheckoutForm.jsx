import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCheckout from "../../hooks/useCheckout";
import SearchableSelect from "../SearchableSelect";
import { states, getCities } from "../../utils/indiaLocation";
import { clearCart } from "../../services/cartStorage.service";
import {
  Mail,
  User,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Banknote,
} from "lucide-react";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export default function CheckoutForm({ coupon, finalTotal = 0 }) {
  const [payMethod, setPayMethod] = useState("ONLINE");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [saveInfo, setSaveInfo] = useState(true);

  const { formData, updateField, placeOrder, loading, updatePaymentMode } =
    useCheckout(coupon);

  useEffect(() => {
    loadRazorpay();
  }, []);

  // Sync state dropdown when formData.state changes
  useEffect(() => {
    if (formData.state && !selectedState) {
      const matched = states.find(
        (s) => s.label.toLowerCase() === formData.state.toLowerCase()
      );
      if (matched) {
        setSelectedState(matched);
      }
    }
  }, [formData.state, selectedState]);

  // Load cities when state changes
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }
    const cityList = getCities(selectedState.value);
    setCities(cityList);

    if (formData.city && !selectedCity) {
      const matchedCity = cityList.find(
        (c) => c.label.toLowerCase() === formData.city.toLowerCase()
      );
      if (matchedCity) {
        setSelectedCity(matchedCity);
      }
    }
  }, [selectedState, formData.city, selectedCity]);

  // Handle Online Razorpay Submission
  const handleOnlinePayment = async () => {
    if (!formData.email?.trim() || !formData.first_name?.trim() || !formData.address_line_1?.trim() || !formData.mobile?.trim()) {
      alert("Please fill in all required contact and shipping details.");
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Failed to load Razorpay payment gateway. Please check your internet connection.");
      return;
    }

    const result = await placeOrder();
    if (!result?.success) return;

    const options = {
      ...result.data,
      handler: async (response) => {
        try {
          await clearCart();
        } catch (e) {
          console.error("Cart clear error:", e);
        }
        window.location.href = "/thank-you?order_id=" + response.razorpay_order_id;
      },
      modal: {
        ondismiss() {
          console.log("Payment window dismissed");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Handle Cash on Delivery Submission
  const handleCodPayment = async () => {
    if (!formData.email?.trim() || !formData.first_name?.trim() || !formData.address_line_1?.trim() || !formData.mobile?.trim()) {
      alert("Please fill in all required contact and shipping details.");
      return;
    }

    const result = await placeOrder();
    if (result?.success) {
      try {
        await clearCart();
      } catch (e) {
        console.error("Cart clear error:", e);
      }
      window.location.href = "/thank-you?receipt_id=" + result.data.receipt_id;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ── 1. CONTACT INFORMATION ── */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-text tracking-tight flex items-center gap-2">
            <Mail size={18} className="text-primary" />
            <span>Contact Information</span>
          </h2>
          <Link
            to="/login"
            className="text-xs font-bold text-primary hover:underline"
          >
            Already have an account? Log in
          </Link>
        </div>

        <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Email address (for order confirmation & tracking)"
            className="w-full bg-transparent text-xs sm:text-sm px-4 py-3.5 outline-none text-text placeholder:text-gray-400"
          />
        </div>
      </section>

      {/* ── 2. DELIVERY DESTINATION ── */}
      <section className="flex flex-col gap-3.5">
        <h2 className="text-lg sm:text-xl font-black text-text tracking-tight flex items-center gap-2">
          <MapPin size={18} className="text-primary" />
          <span>Shipping Address</span>
        </h2>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
            <input
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => updateField("first_name", e.target.value)}
              placeholder="First name *"
              className="w-full bg-transparent text-xs sm:text-sm px-4 py-3.5 outline-none text-text placeholder:text-gray-400"
            />
          </div>

          <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => updateField("last_name", e.target.value)}
              placeholder="Last name"
              className="w-full bg-transparent text-xs sm:text-sm px-4 py-3.5 outline-none text-text placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Street Address Line 1 */}
        <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
          <input
            type="text"
            required
            value={formData.address_line_1}
            onChange={(e) => updateField("address_line_1", e.target.value)}
            placeholder="Address (House/Flat No., Building, Street) *"
            className="w-full bg-transparent text-xs sm:text-sm px-4 py-3.5 outline-none text-text placeholder:text-gray-400"
          />
        </div>

        {/* Address Line 2 */}
        <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
          <input
            type="text"
            value={formData.address_line_2}
            onChange={(e) => updateField("address_line_2", e.target.value)}
            placeholder="Apartment, suite, landmark (optional)"
            className="w-full bg-transparent text-xs sm:text-sm px-4 py-3.5 outline-none text-text placeholder:text-gray-400"
          />
        </div>

        {/* State & City Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="[&>div>div]:!rounded-xl [&>div>div]:!border-primary-border [&>div>div]:focus-within:!border-primary">
            <SearchableSelect
              label="State *"
              value={selectedState}
              options={states}
              onChange={(option) => {
                setSelectedState(option);
                updateField("state", option.label);
                updateField("state_code", option.value);
                setSelectedCity(null);
                updateField("city", "");
              }}
            />
          </div>

          <div className="[&>div>div]:!rounded-xl [&>div>div]:!border-primary-border [&>div>div]:focus-within:!border-primary">
            <SearchableSelect
              label="City *"
              value={selectedCity}
              options={cities}
              isDisabled={!selectedState}
              onChange={(option) => {
                setSelectedCity(option);
                updateField("city", option.label);
              }}
            />
          </div>
        </div>

        {/* PIN Code & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
            <input
              type="text"
              required
              maxLength={6}
              value={formData.pin_code}
              onChange={(e) => updateField("pin_code", e.target.value)}
              placeholder="6-Digit Postal PIN Code *"
              className="w-full bg-transparent text-xs sm:text-sm px-4 py-3.5 outline-none text-text placeholder:text-gray-400"
            />
          </div>

          <div className="relative flex items-center bg-gray-50 border border-primary-border rounded-xl px-4 py-3.5 select-none">
            <span className="text-xs sm:text-sm text-gray-700 font-bold flex items-center gap-2">
              <span>🇮🇳</span>
              <span>India (Domestic Express)</span>
            </span>
          </div>
        </div>

        {/* Mobile Phone */}
        <div className="relative flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl transition-all">
          <div className="pl-4 pr-1 text-xs font-bold text-gray-500 flex items-center gap-1 select-none">
            <span>🇮🇳</span>
            <span className="text-gray-700">+91</span>
          </div>
          <input
            type="tel"
            required
            maxLength={10}
            value={formData.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
            placeholder="10-digit mobile number for delivery updates *"
            className="w-full bg-transparent text-xs sm:text-sm px-2 py-3.5 outline-none text-text placeholder:text-gray-400"
          />
        </div>

        {/* Save Info Checkbox */}
        <label
          onClick={() => setSaveInfo(!saveInfo)}
          className="flex items-center gap-2.5 mt-1 cursor-pointer select-none"
        >
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              saveInfo ? "bg-primary border-primary" : "bg-white border-gray-300"
            }`}
          >
            {saveInfo && <CheckCircle2 size={12} className="text-white" />}
          </div>
          <span className="text-xs font-medium text-gray-600">
            Save this address for fast 1-click checkout on future orders
          </span>
        </label>
      </section>

      {/* ── 3. SHIPPING METHOD ── */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl font-black text-text tracking-tight flex items-center gap-2">
          <Truck size={18} className="text-primary" />
          <span>Shipping Method</span>
        </h2>

        <div className="p-4 rounded-xl border border-primary-border bg-bg-cream flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <Truck size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-text">
                Priority Pan-India Express (Bluedart / Delhivery)
              </p>
              <p className="text-[11px] text-gray-500">
                Estimated Delivery: 2-4 business days with live SMS tracking
              </p>
            </div>
          </div>

          <span className="text-xs font-extrabold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            FREE
          </span>
        </div>
      </section>

      {/* ── 4. PAYMENT METHOD ── */}
      <section className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg sm:text-xl font-black text-text tracking-tight flex items-center gap-2">
            <CreditCard size={18} className="text-primary" />
            <span>Payment Method</span>
          </h2>
          <p className="text-xs text-gray-500">
            All transactions are 100% encrypted and secured by Razorpay.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Option 1: Online Payment (Razorpay) */}
          <div
            onClick={() => {
              setPayMethod("ONLINE");
              updatePaymentMode("ONLINE");
            }}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              payMethod === "ONLINE"
                ? "border-primary bg-[#fdfaf9] ring-2 ring-primary/15 shadow-sm"
                : "border-primary-border bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    payMethod === "ONLINE" ? "border-primary" : "border-gray-300"
                  }`}
                >
                  {payMethod === "ONLINE" && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-text block">
                    Online Payment (Instant & Recommended)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    UPI (Google Pay, PhonePe, Paytm), Cards, NetBanking, Wallets
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#3395ff] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wider shrink-0">
                Razorpay
              </span>
            </div>

            {payMethod === "ONLINE" && (
              <div className="mt-3 pt-3 border-t border-primary-border/80 flex items-center gap-2 text-[11px] text-gray-600">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>
                  After clicking "Pay Securely", you will complete payment via 256-bit encrypted Razorpay modal.
                </span>
              </div>
            )}
          </div>

          {/* Option 2: Cash On Delivery */}
          <div
            onClick={() => {
              setPayMethod("Cash On Delivery");
              updatePaymentMode("Cash On Delivery");
            }}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              payMethod === "Cash On Delivery"
                ? "border-primary bg-[#fdfaf9] ring-2 ring-primary/15 shadow-sm"
                : "border-primary-border bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    payMethod === "Cash On Delivery" ? "border-primary" : "border-gray-300"
                  }`}
                >
                  {payMethod === "Cash On Delivery" && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-text block">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Pay via cash or UPI QR code to the courier at your doorstep
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider shrink-0">
                Doorstep
              </span>
            </div>

            {payMethod === "Cash On Delivery" && (
              <div className="mt-3 pt-3 border-t border-primary-border/80 flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50/50 p-2.5 rounded-lg">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>Zero advance deposit required. Please keep exact cash ready upon delivery.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. SUBMIT ORDER BUTTON ── */}
      <div className="flex flex-col gap-3">
        {payMethod === "ONLINE" ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleOnlinePayment}
            className="group relative overflow-hidden w-full py-4 rounded-xl text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 btn-gradient border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <Lock size={15} className="relative z-10 text-amber-300" />
                <span className="relative z-10">Pay Securely ₹{finalTotal.toLocaleString()}</span>
                <ArrowRight size={16} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleCodPayment}
            className="group relative overflow-hidden w-full py-4 rounded-xl text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 btn-gradient border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Placing COD Order...</span>
              </>
            ) : (
              <>
                <Banknote size={16} className="relative z-10 text-amber-300" />
                <span className="relative z-10">Place Order (Cash On Delivery) ₹{finalTotal.toLocaleString()}</span>
                <ArrowRight size={16} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        )}

        {/* Micro Security Badges */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-medium pt-1">
          <span className="flex items-center gap-1">
            <Lock size={12} className="text-emerald-600" /> 256-Bit SSL
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-600" /> 100% Authentic Guarantee
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Truck size={12} className="text-emerald-600" /> Free Shipping
          </span>
        </div>
      </div>

      {/* ── 6. POLICY LINKS FOOTER ── */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
        <Link to="/refund-policy" className="hover:text-primary underline transition-colors">
          Refund Policy
        </Link>
        <Link to="/shipping-policy" className="hover:text-primary underline transition-colors">
          Shipping Policy
        </Link>
        <Link to="/privacy-policy" className="hover:text-primary underline transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms-and-conditions" className="hover:text-primary underline transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
