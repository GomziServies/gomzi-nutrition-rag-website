import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useCart from "./useCart";
import { createOrder } from "../services/order.service";
import { successToast, errorToast } from "../utils/toast";
import { clearCart } from "../services/cartStorage.service";

const useCheckout = (coupon) => {
  const { user } = useAuth();
  const { items } = useCart();

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
  }, [user]);

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
          ...(item.variation_id && {
            variation_id: item.variation_id,
          }),
        })),
      };
      const coupon = JSON.parse(localStorage.getItem("checkout_coupon"));

      payload.coupon_id = coupon?._id ? [coupon._id] : [];
      const result = await createOrder(payload);
      if (!result.success) {
        errorToast(result.message);
        return {
          success: false,
        };
      }
      localStorage.removeItem("checkout_coupon");
      try {
        await clearCart();
      } catch (clearErr) {
        console.warn("Cart clearing error:", clearErr);
      }
      successToast(result.message);
      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
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
