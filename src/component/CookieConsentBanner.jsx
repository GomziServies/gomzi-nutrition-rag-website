import React, { useEffect, useState } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import api from "../api/axios";
import { getCachedUser } from "../utils/storage";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only display if user has not yet consented or declined
    const existingConsent = localStorage.getItem("rag_cookie_consent");
    if (!existingConsent) {
      // Small delay for smooth entry
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const getDeviceDetails = () => {
    const ua = navigator.userAgent || "";
    let device_type = "Desktop";
    if (/Mobi|Android/i.test(ua)) device_type = "Mobile";
    else if (/iPad|Tablet/i.test(ua)) device_type = "Tablet";

    let browser = "Chrome";
    if (/Edg/i.test(ua)) browser = "Edge";
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
    else if (/Firefox/i.test(ua)) browser = "Firefox";
    else if (/Chrome/i.test(ua)) browser = "Chrome";

    let os = "Windows";
    if (/Android/i.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
    else if (/Mac/i.test(ua)) os = "macOS";
    else if (/Linux/i.test(ua)) os = "Linux";
    else if (/Windows/i.test(ua)) os = "Windows";

    // Parse UTM Parameters or Meta Ad click
    const params = new URLSearchParams(window.location.search);
    let utm_source = params.get("utm_source");
    if (!utm_source && params.has("fbclid")) {
      utm_source = "Meta Ads";
    }
    if (!utm_source && document.referrer) {
      if (/facebook|instagram/i.test(document.referrer)) utm_source = "Meta Ads";
      else if (/google/i.test(document.referrer)) utm_source = "Google Organic";
      else utm_source = "Referral";
    }

    return {
      device_type,
      browser,
      os,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      utm_source: utm_source || "Direct Traffic",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      landing_page: window.location.pathname || "/",
      referrer: document.referrer || "Direct",
    };
  };

  const handleConsent = async (choice) => {
    try {
      localStorage.setItem("rag_cookie_consent", choice);
      setVisible(false);

      // Persistent session ID
      let sessionId = localStorage.getItem("rag_visitor_session_id");
      if (!sessionId) {
        sessionId = `VIS_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem("rag_visitor_session_id", sessionId);
      }

      // Identity Stitching: check for returning customer profile or stored contact
      const cached = getCachedUser();
      const returningPhone =
        cached?.mobile || localStorage.getItem("rag_last_phone") || "";
      const returningEmail =
        cached?.email || localStorage.getItem("rag_last_email") || "";
      const returningName =
        (cached?.first_name ? `${cached.first_name} ${cached.last_name || ""}`.trim() : null) ||
        localStorage.getItem("rag_last_name") ||
        "";

      const deviceData = getDeviceDetails();
      const payload = {
        session_id: sessionId,
        cookie_consent: choice,
        phone_number: returningPhone,
        email: returningEmail,
        full_name: returningName,
        is_identified: Boolean(returningPhone || returningEmail),
        ...deviceData,
      };

      // Send to backend public visitor log endpoint
      await api.post("/public/v1/visitor-cookie-log", payload);
    } catch (err) {
      // Fail silently so user browsing is never interrupted
      console.warn("Cookie log sync notice:", err?.message);
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        maxWidth: "540px",
        margin: "0 auto",
        zIndex: 9999,
        background: "#0F172A",
        color: "#F8FAFC",
        borderRadius: "16px",
        padding: "18px 20px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        animation: "slideUp 0.3s ease-out",
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(245, 158, 11, 0.15)",
            color: "#F59E0B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
          <Cookie size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
            We Value Your Privacy & Cookies
          </h4>
          <p style={{ margin: 0, fontSize: "12.5px", lineHeight: "1.45", color: "#94A3B8" }}>
            We use cookies to analyze store traffic, remember your preferences, and deliver personalized supplement
            recommendations.
          </p>
        </div>
        <button
          onClick={() => handleConsent("REJECTED")}
          style={{
            background: "transparent",
            border: "none",
            color: "#64748B",
            cursor: "pointer",
            padding: "2px",
          }}
          title="Dismiss">
          <X size={18} />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px" }}>
        <button
          onClick={() => handleConsent("REJECTED")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "transparent",
            color: "#CBD5E1",
            fontSize: "12.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}>
          Reject Non-Essential
        </button>
        <button
          onClick={() => handleConsent("ACCEPTED")}
          style={{
            padding: "7px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#10B981",
            color: "#FFFFFF",
            fontSize: "12.5px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
          }}>
          Accept All Cookies
        </button>
      </div>
    </div>
  );
}
