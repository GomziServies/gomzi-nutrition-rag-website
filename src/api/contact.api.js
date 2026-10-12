import api from "./axios";

export const sendContactInquiryApi = (data) =>
  api.post("/public/v1/contact-inquiry", data);

export const uploadFileApi = (file, directory = "contact-inquiry") => {
  const formData = new FormData();
  formData.append("files", file);
  formData.append("directory", directory);

  return api.post("/public/v1/file-upload", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
};

export const sendInquiryOtpApi = (data) =>
  api.post("/public/v1/inquiry-otp/send", data);

export const verifyInquiryOtpApi = (data) =>
  api.post("/public/v1/inquiry-otp/verify", data);

