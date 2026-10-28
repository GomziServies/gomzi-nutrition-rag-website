import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { WebsiteContentProvider } from "./content/WebsiteContent";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
const application = (
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

// Disable browser auto-scroll restoration on refresh so user always starts at top
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <WebsiteContentProvider>
      {googleClientId
        ? <GoogleOAuthProvider clientId={googleClientId}>{application}</GoogleOAuthProvider>
        : application}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      </WebsiteContentProvider>
    </HelmetProvider>
  </StrictMode>,
);
