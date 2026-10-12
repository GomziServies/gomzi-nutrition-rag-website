import api from "./axios";

export const loginApi = (data) => api.post("/user/v1/account/login", data);

export const otpSend = (data) =>
  api.post("/user/v1/account/authorization", data);

export const otpVerify = (data) =>
  api.post("/user/v1/account/authorization/verify", data);

export const registerApi = (data) =>
  api.post("/user/v1/account/create-account", data);

export const verifyEmailApi = (data) =>
  api.post(`/user/v1/account/email-verification?token=${data.token}`);

export const getProfileApi = () => api.get("/user/v1/account/profile");

export const updateProfileApi = (data) =>
  api.post("/user/v1/account/update-profile", data);

export const changePasswordApi = (data) =>
  api.post("/user/v1/account/change-password", data);

export async function googleLogin(idToken) {
  return api.post("/user/v1/account/google-login", {
    idToken,
  });
}
