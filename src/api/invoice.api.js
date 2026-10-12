import api from "./axios";

export const getInvoiceApi = () => api.get("/user/v1/invoice/get");

export const signInvoiceApi = (data) =>
  api.post("/user/v1/invoice/sign-invoice", data);

export const generateInvoicePdfApi = () =>
  api.get("/user/v1/invoice/generate-invoice-pdf");
