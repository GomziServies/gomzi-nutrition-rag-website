let loadingScript;

export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  if (loadingScript) return loadingScript;
  loadingScript = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    let settled = false;
    const finish = (loaded) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (!loaded) {
        script.remove();
        loadingScript = null;
      }
      resolve(loaded);
    };
    const timer = setTimeout(() => finish(false), 10000);
    script.onload = () => finish(Boolean(window.Razorpay));
    script.onerror = () => finish(false);
    document.body.appendChild(script);
  });
  return loadingScript;
}
