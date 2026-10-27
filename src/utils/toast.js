import toast from "react-hot-toast";

/**
 * Global Toast Utility Wrapper
 * All toast notifications dismiss automatically after 3000ms (3 seconds).
 */
export const successToast = (message, options = {}) => {
  return toast.success(message, {
    duration: 3000,
    ...options,
  });
};

export const errorToast = (message, options = {}) => {
  return toast.error(message, {
    duration: 3000,
    ...options,
  });
};

export const loadingToast = (message, options = {}) => {
  return toast.loading(message, options);
};

export const dismissToast = (id) => {
  toast.dismiss(id);
};
