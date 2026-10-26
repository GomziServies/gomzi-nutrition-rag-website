import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Universal ScrollToTop
 * Forces scroll position to (0, 0) on:
 * 1. Initial page load / F5 page refresh (defeating browser scroll restoration)
 * 2. Route transitions, search param changes, and navigation key updates
 * 3. Asynchronous post-render layout shifts (Swiper, images, dynamic product grids)
 */
export default function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();

  const resetScroll = () => {
    if (typeof window === "undefined") return;
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } catch {
      window.scrollTo(0, 0);
    }
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    const root = document.getElementById("root");
    if (root) root.scrollTop = 0;
  };

  // Mount effect: Disable browser automatic scroll restoration and catch page reload
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    resetScroll();

    const handleBeforeUnload = () => {
      resetScroll();
    };

    const handlePageShow = () => {
      resetScroll();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("load", resetScroll);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("load", resetScroll);
    };
  }, []);

  // Route / Location change effect
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Execute immediately
    resetScroll();

    // Multi-staged micro-resets to counteract asynchronous layout shifts
    const timeouts = [0, 50, 150, 300].map((delay) =>
      setTimeout(resetScroll, delay)
    );

    const rafId = requestAnimationFrame(resetScroll);

    return () => {
      cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
    };
  }, [pathname, search, hash, key]);

  return null;
}
