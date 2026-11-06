import React, { Suspense, useEffect, useLayoutEffect } from "react";
import PageLoading from "../component/PageLoading";
import { Outlet, useLocation } from "react-router-dom";
import HkTopBar from "../component/healthkart/HkTopBar";
import HkHeader from "../component/healthkart/HkHeader";
import HkFooter from "../component/healthkart/HkFooter";

// Safe layout effect for both SSR (server) and CSR (browser)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Wrapper = () => {
  const location = useLocation();

  // Scroll to top immediately on route or search query change
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Double safeguard for lazy-loaded route chunk mounting
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.search, location.key]);

  // Ensure refresh/reload always starts at the top of the page
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.addEventListener("beforeunload", resetScroll);
    resetScroll();

    return () => {
      window.removeEventListener("beforeunload", resetScroll);
    };
  }, []);

  return (
    <div className="storefront min-h-screen bg-light text-text">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <HkTopBar />
      <HkHeader />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageLoading />}><Outlet /></Suspense>
      </main>
      <HkFooter />
    </div>
  );
};

export default Wrapper;
