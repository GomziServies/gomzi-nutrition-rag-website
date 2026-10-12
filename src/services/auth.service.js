import { loginApi, otpSend, otpVerify, registerApi } from "../api/auth.api";

export const registerUser = async (payload) => {
  try {
    const response = await registerApi(payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await loginApi(payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const sendOTP = async (payload) => {
  try {
    const response = await otpSend(payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const verifyOTP = async (payload) => {
  try {
    const response = await otpVerify(payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
