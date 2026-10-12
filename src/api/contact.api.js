import api from "./axios";

export const sendContactInquiryApi = (data) =>
  api.post("/public/v1/contact-inquiry", data);
