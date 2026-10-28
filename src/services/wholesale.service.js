import { sendContactInquiryApi } from "../api/contact.api";

export function buildWholesaleInquiryPayload(formData, source) {
  const businessName = formData.businessName?.trim();
  const name = formData.contactName?.trim();
  const email = formData.email?.trim();
  const mobile = (formData.mobile || "").replace(/\D/g, "");
  if (!businessName) throw new Error("Please provide your gym or business name.");
  if (!name) throw new Error("Please provide your contact name.");
  if (mobile.length !== 10) throw new Error("Please enter a valid 10-digit mobile number.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");

  return {
    name,
    email,
    mobile,
    subject: `B2B Wholesale Application - ${businessName}`,
    source,
    message: `[B2B Wholesale Application] Business: ${businessName} | Category: ${formData.businessType} | Volume: ${formData.estimatedVolume} | Location: ${formData.city?.trim() || "Not provided"}, ${formData.state?.trim() || "Not provided"} | Message: ${formData.message?.trim() || "Requesting wholesale catalog & price matrix."}`,
    details: {
      inquiryType: "wholesale",
      businessName,
      businessType: formData.businessType,
      estimatedVolume: formData.estimatedVolume,
      city: formData.city?.trim() || "",
      state: formData.state?.trim() || "",
    },
  };
}

export async function submitWholesaleInquiry(formData, source) {
  const response = await sendContactInquiryApi(buildWholesaleInquiryPayload(formData, source));
  if (Number(response.data?.status) >= 400) throw new Error(response.data.message || "Could not submit your application.");
  return response.data;
}
