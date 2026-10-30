import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useCart from "./useCart";
import { createOrder } from "../services/order.service";
import { successToast, errorToast } from "../utils/toast";

const useCheckout = (coupon) => {
  const { user } = useAuth();
  const { items, cartId } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "India",
    pin_code: "",
    payment_mode: "ONLINE",
  });

  useEffect(() => {
    if (!user) return;
    setFormData((prev) => ({
      ...prev,
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      coupon_id: coupon?._id || null,
      mobile: user.mobile || "",
      address_line_1: user.address?.address_line_1 || "",
      address_line_2: user.address?.address_line_2 || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      country: user.address?.country || "India",
      pin_code: user.address?.pin_code || "",
    }));
  }, [user, coupon?._id]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePaymentMode = (method) => {
    console.log(method);
    updateField(
      "payment_mode",
      method === "ONLINE" ? "ONLINE" : "Cash On Delivery",
    );
  };

  const placeOrder = async () => {
    try {
      setLoading(true);

      if (!items.length) {
        errorToast("Cart is empty");
        return;
      }

      if (!cartId) {
        errorToast("Your cart is still loading. Please try again.");
        return { success: false };
      }

      const requiredFields = [
        ["email", "Email"],
        ["first_name", "First name"],
        ["last_name", "Last name"],
        ["mobile", "Phone"],
        ["address_line_1", "Address"],
        ["city", "City"],
        ["state", "State"],
        ["pin_code", "Postal code"],
      ];
      const missing = requiredFields.find(([field]) => !String(formData[field] || "").trim());
      if (missing) {
        errorToast(`${missing[1]} is required`);
        return { success: false };
      }
      if (!/^\d{6}$/.test(String(formData.pin_code).trim())) {
        errorToast("Enter a valid 6-digit postal code");
        return { success: false };
      }

      const payload = {
        payment_mode: formData.payment_mode,

        item_type: "FG_MEAL_PRODUCT",

        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2,

        city: formData.city,
        state: formData.state,
        country: formData.country,
        pin_code: formData.pin_code,

        products: items.map((item) => ({
          product_id: item.item_id,
          quantity: item.quantity,
          ...(item.combo_id && { combo_id: item.combo_id }),
          ...(item.variation_id && {
            variation_id: item.variation_id,
          }),
        })),
      };
      let coupon = null;
      try {
        coupon = JSON.parse(localStorage.getItem("checkout_coupon"));
      } catch {
        localStorage.removeItem("checkout_coupon");
      }

      payload.coupon_id = coupon?._id ? [coupon._id] : [];
      const result = await createOrder(payload);
      if (!result.success) {
        errorToast(result.message);
        return {
          success: false,
        };
      }
      successToast(result.message);
      return {
        success: true,
        data: result.data,
        cartId,
      };
    } catch {
      errorToast("Something went wrong");

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    items,

    loading,

    formData,
    setFormData,
    updateField,

    placeOrder,

    updatePaymentMode,
  };
};

export default useCheckout;
