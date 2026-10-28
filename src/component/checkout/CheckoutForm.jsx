import { FiShoppingBag } from "react-icons/fi";
import { useEffect, useMemo, useState, useId } from "react";
import useCheckout from "../../hooks/useCheckout";
import SearchableSelect from "../SearchableSelect";
import { states, getCities } from "../../utils/indiaLocation";
import { Link } from "react-router-dom";
import { errorToast, infoToast } from "../../utils/toast";

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

export default function CheckoutForm({ coupon }) {
  const [payMethod, setPayMethod] = useState("ONLINE");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = useMemo(() => selectedState ? getCities(selectedState.value) : [], [selectedState]);
  const { formData, updateField, placeOrder, loading, updatePaymentMode } =
    useCheckout(coupon);
  useEffect(() => {
    loadRazorpay();
  }, []);


  return (
    <div className="site-surface min-w-0 px-4 py-6 sm:p-6 order-2 lg:order-1">
      <section className="mb-7">
        <h2 className="text-[22px] font-bold text-gray-900 mb-3.5">Contact</h2>

        <FloatingInput
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(value) => updateField("email", value)}
        />
      </section>

      {/* Delivery */}
      <section className="mb-7">
        <h2 className="text-[22px] font-bold text-gray-900 mb-3.5">Delivery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <FloatingInput
            label="First name"
            name="first_name"
            autoComplete="given-name"
            required
            value={formData.first_name}
            onChange={(value) => updateField("first_name", value)}
          />
          <FloatingInput
            label="Last name"
            name="last_name"
            autoComplete="family-name"
            required
            value={formData.last_name}
            onChange={(value) => updateField("last_name", value)}
          />
        </div>
        {/* <div className="mb-3">
          <FloatingInput label="Company (optional)" />
        </div> */}
        <div className="mb-3">
          <FloatingInput
            label="Address"
            name="address_line_1"
            autoComplete="address-line1"
            required
            value={formData.address_line_1}
            onChange={(value) => updateField("address_line_1", value)}
          />
        </div>
        <div className="mb-3">
          <FloatingInput
            label="Apartment, suite, etc. (optional)"
            name="address_line_2"
            autoComplete="address-line2"
            value={formData.address_line_2}
            onChange={(value) => updateField("address_line_2", value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <SearchableSelect
            label="State"
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
          <SearchableSelect
            label="City"
            value={selectedCity}
            options={cities}
            isDisabled={!selectedState}
            onChange={(option) => {
              setSelectedCity(option);
              updateField("city", option.label);
            }}
          />
          <FloatingInput
            label="Postal code"
            name="pin_code"
            autoComplete="postal-code"
            inputMode="numeric"
            required
            value={formData.pin_code}
            onChange={(value) => updateField("pin_code", value)}
          />
          <div className="relative w-full border border-border rounded-md bg-gray-50">
            <label className="absolute left-3.5 top-1.5 text-[10px] text-gray-500 font-medium">
              Country / Region
            </label>

            <div className="pt-6 pb-2 px-3.5 text-[14px] text-gray-800">
              🇮🇳 India
            </div>
          </div>
        </div>
        <div className="mb-3">
          <FloatingInput
            label="Phone"
            type="tel"
            name="mobile"
            autoComplete="tel"
            inputMode="tel"
            required
            value={formData.mobile}
            onChange={(value) => updateField("mobile", value)}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 7h.01M10.5 11c.3-.9 1.5-1 1.5-1s1.5.1 1.5 1.5c0 1.4-1.5 2-1.5 3v.5" />
              </svg>
            }
          />
        </div>
        <CustomCheckbox label="Save this information for next time" />
      </section>

      {/* Shipping Method */}
      {/* <section className="mb-7">
        <h2 className="text-[18px] font-bold text-gray-900 mb-3">
          Shipping method
        </h2>
        <div className="p-4 bg-gray-50 border border-border rounded text-[14px] text-gray-400 text-center">
          Enter your shipping address to view available shipping methods.
        </div>
      </section> */}

      {/* Payment */}
      <section className="mb-7">
        <h2 className="text-base font-bold text-gray-900 mb-1">Payment</h2>
        <p className="text-xs text-gray-400 mb-3.5">
          All transactions are secure and encrypted.
        </p>

        <PayRadio
          active={payMethod === "ONLINE"}
          onClick={() => {
            setPayMethod("ONLINE");
            updatePaymentMode("ONLINE");
          }}
          label="Online Payment"
          right={<span className="font-bold text-[#3395ff]">Razorpay</span>}
        >
          <div className="bg-gray-50 border border-border rounded-md px-4 py-4 text-center text-[13px] text-gray-500">
            You'll be redirected to razorpay to complete your purchase
          </div>
        </PayRadio>

        <PayRadio
          active={payMethod === "Cash On Delivery"}
          onClick={() => {
            setPayMethod("Cash On Delivery");
            updatePaymentMode("Cash On Delivery");
          }}
          label="Cash on Delivery"
          right={<CashIcon />}
        >
          <div className="bg-green-50 border border-green-200 rounded-md px-4 py-3 flex items-start gap-3">
            <span className="text-green-600 mt-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <p className="text-[12px] text-green-700 leading-relaxed">
              Pay in cash when your order is delivered to your door. No advance
              payment required.
            </p>
          </div>
        </PayRadio>
      </section>

      {/* Billing Address - shown for PayPal & COD */}
      {/* {(payMethod === "ONLINE" || payMethod === "Cash On Delivery") && (
        <section className="mb-7">
          <h2 className="text-base font-bold text-gray-900 mb-3">
            Billing address
          </h2>
          <PaypalBillingAddress />
        </section>
      )} */}

      {/* Submit Button */}
      {payMethod === "ONLINE" ? (
        <button
          onClick={async () => {
            const loaded = await loadRazorpay();

            if (!loaded) {
              errorToast("Secure payment could not load. Please check your connection and try again.");
              return;
            }

            const result = await placeOrder();

            if (!result?.success) return;

            const options = {
              ...result.data,

              handler(response) {
                window.location.href =
                  "/thank-you?order_id=" + response.razorpay_order_id;
              },

              modal: {
                ondismiss() {
                  infoToast("Payment was cancelled. Your cart is still saved.");
                },
              },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();
          }}
          type="button"
          disabled={loading}
          className="w-full py-4 rounded-md text-white font-bold bg-[#3395ff]"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      ) : payMethod === "Cash On Delivery" ? (
        <button
          type="button"
          disabled={loading}
          className="w-full py-4 rounded-md text-white font-bold bg-[#3395ff]"
          onClick={async () => {
            const result = await placeOrder();
            if (result?.success) {
              window.location.href =
                "/thank-you?receipt_id=" + result.data.receipt_id;
            }
          }}
        >
          {loading ? "Placing Order..." : "Place Order"} - Cash on Delivery
        </button>
      ) : (
        <button className="w-full py-4 bg-primary text-white rounded-md text-[15px] font-bold tracking-wide hover:bg-hover transition-colors shadow-md">
          Pay now
        </button>
      )}

      {/* Footer Links */}
      <div className="flex flex-wrap gap-3 mt-5 justify-center">
        {[
          ["Refund policy", "/refund-policy"],
          ["Shipping", "/shipping-policy"],
          ["Privacy policy", "/privacy-policy"],
          ["Terms of service", "/terms-and-conditions"],
          ["Contact support", "/contact-us"],
        ].map(([label, to]) => (
          <Link
            key={to}
            to={to}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors no-underline"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function FloatingInput({ label, value = "", onChange = () => {}, type = "text", icon, name, autoComplete, inputMode, required = false }) {
  const inputId = useId();
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value?.length > 0;

  return (
    <div
      className={`relative w-full border rounded-md transition-all duration-150 bg-white ${
        focused ? "border-primary ring-1 ring-primary/20" : "border-border"
      }`}
    >
      <label htmlFor={inputId}
        className={`absolute left-3.5 transition-all duration-150 pointer-events-none select-none ${
          isFloated
            ? "top-1.5 text-[10px] text-gray-500 font-medium"
            : "top-1/2 -translate-y-1/2 text-[14px] text-gray-400"
        }`}
      >
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-transparent outline-none text-[14px] text-gray-800 px-3.5 ${
          isFloated ? "pt-5 pb-1.5" : "pt-3.5 pb-3.5"
        } ${icon ? "pr-10" : ""}`}
      />

      {icon && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
}

function FloatingSelect({ topLabel, options }) {
  const selectId = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`relative w-full border rounded-md bg-white transition-all duration-150 ${focused ? "border-primary ring-1 ring-primary/20" : "border-border"}`}
    >
      <label htmlFor={selectId} className="absolute left-3.5 top-1.5 text-[10px] text-gray-500 font-medium pointer-events-none select-none">
        {topLabel}
      </label>
      <select id={selectId}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent outline-none text-[14px] text-gray-800 px-3.5 pt-6 pb-2 appearance-none cursor-pointer pr-10"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 7.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

function CustomCheckbox({ label, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} className="sr-only" />
      <div
        className={`w-4 h-4 border rounded flex items-center justify-center shrink-0 transition-all ${checked ? "bg-primary border-gray-800" : "bg-white border-gray-400"}`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-[13px] text-gray-700">{label}</span>
    </label>
  );
}

function PayPalLogo() {
  return (
    <span
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "15px",
        fontWeight: 800,
      }}
    >
      <span style={{ color: "#003087" }}>Pay</span>
      <span style={{ color: "#009cde" }}>Pal</span>
    </span>
  );
}

function CashIcon() {
  return (
    <div className="flex items-center justify-center w-9 h-6 border border-border rounded bg-white">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4B7A4A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    </div>
  );
}

function PaypalBillingAddress() {
  const [billingOption, setBillingOption] = useState("same");

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <div
        onClick={() => setBillingOption("same")}
        className={`cursor-pointer px-4 py-3.5 flex items-center gap-2.5 transition-all ${billingOption === "same" ? "bg-gray-50 border-b border-border" : "bg-white border-b border-border"}`}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${billingOption === "same" ? "border-gray-800" : "border-border"}`}
        >
          {billingOption === "same" && (
            <div className="w-2 h-2 rounded-full bg-primary" />
          )}
        </div>
        <span className="text-[13px] font-medium text-gray-800">
          Same as shipping address
        </span>
      </div>

      <div
        onClick={() => setBillingOption("different")}
        className="cursor-pointer px-4 py-3.5 bg-white"
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${billingOption === "different" ? "border-gray-800" : "border-border"}`}
          >
            {billingOption === "different" && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <span className="text-[13px] font-medium text-gray-800">
            Use a different billing address
          </span>
        </div>

        {billingOption === "different" && (
          <div className="mt-4 flex flex-col gap-2.5">
            <FloatingSelect
              topLabel="Country/Region"
              options={[
                "Lithuania",
                "Latvia",
                "Estonia",
                "Germany",
                "France",
                "Poland",
                "India",
              ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FloatingInput label="First name" />
              <FloatingInput label="Last name" />
            </div>
            <FloatingInput label="Company (optional)" />
            <FloatingInput label="Address" />
            <FloatingInput label="Apartment, suite, etc. (optional)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FloatingInput label="City" />
              <FloatingInput label="Postal code" />
            </div>
            <FloatingInput
              label="Phone (optional)"
              type="tel"
              icon={
                <span className="text-gray-400 text-[9px] border border-border rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  ?
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PayRadio({ active, onClick, label, right, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full text-left cursor-pointer px-4 py-3.5 border rounded-md mb-2 transition-all ${active ? "border-gray-700 bg-gray-50 shadow-sm" : "border-border bg-white"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${active ? "border-gray-800" : "border-border"}`}
          >
            {active && <div className="w-2 h-2 rounded-full bg-primary" />}
          </div>
          <span className="text-[13px] font-medium text-gray-800">{label}</span>
        </div>
        {right && <div className="flex items-center gap-1.5">{right}</div>}
      </div>
      {active && children && <div className="mt-3.5">{children}</div>}
    </button>
  );
}
