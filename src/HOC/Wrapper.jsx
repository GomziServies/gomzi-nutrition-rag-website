// src/HOC/Wrapper.jsx
// App layout wrapper with rock-solid scroll restoration across route transitions and back navigation.

import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import PageLoading from "../component/PageLoading";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import HkTopBar from "../component/healthkart/HkTopBar";
import HkHeader from "../component/healthkart/HkHeader";
import HkFooter from "../component/healthkart/HkFooter";
import useContactDetails from "../content/useContactDetails";

// Safe layout effect for both SSR (server) and CSR (browser)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Wrapper = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const contact = useContactDetails();
  const isRestoringRef = useRef(false);

  // Global capture for ANY product card / product link clicks across the app.
  // Synchronously captures exact scroll position at the moment of click before navigation starts.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleGlobalClick = (event) => {
      const link = event.target.closest('a[href*="/product/"]');
      if (link) {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        if (y > 0) {
          sessionStorage.setItem("homepage_last_scroll", String(y));
          sessionStorage.setItem(`scroll_pos_${window.location.pathname}`, String(y));
        }
        sessionStorage.setItem("navigated_from_home_to_product", "true");
        sessionStorage.setItem("last_browse_path", window.location.pathname);

        const card = link.closest("[data-product-id], [data-product-slug], article");
        if (card) {
          const id = card.dataset?.productId || card.getAttribute("data-product-id");
          const slug = card.dataset?.productSlug || card.getAttribute("data-product-slug");
          if (id) sessionStorage.setItem("last_clicked_product_id", String(id));
          if (slug) sessionStorage.setItem("last_clicked_product_slug", String(slug));
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  // Continuously record scroll position for current route (only when not actively restoring and y > 0)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const savePosition = () => {
      if (isRestoringRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isRestoringRef.current) {
            ticking = false;
            return;
          }
          const y = window.scrollY || document.documentElement.scrollTop || 0;
          if (y > 0) {
            sessionStorage.setItem(`scroll_pos_${location.key}`, String(y));
            sessionStorage.setItem(`scroll_pos_${location.pathname}`, String(y));
            if (location.pathname === "/") {
              sessionStorage.setItem("homepage_last_scroll", String(y));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", savePosition, { passive: true });
    return () => {
      if (!isRestoringRef.current) {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        if (y > 0) {
          sessionStorage.setItem(`scroll_pos_${location.key}`, String(y));
          sessionStorage.setItem(`scroll_pos_${location.pathname}`, String(y));
          if (location.pathname === "/") {
            sessionStorage.setItem("homepage_last_scroll", String(y));
          }
        }
      }
      window.removeEventListener("scroll", savePosition);
    };
  }, [location.key, location.pathname]);

  // Handle scroll behavior on route transitions:
  // - Hash anchor: scroll to element
  // - POP (Back/Forward) or returning from product details: restore exact position or product card
  // - PUSH (New page navigation): scroll to top
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Hash anchor link
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // 2. Check if this is a Back/Forward navigation (POP) OR return to browse page from product details
    const isPop = navigationType === "POP";
    const fromProduct = sessionStorage.getItem("navigated_from_home_to_product") === "true";
    const lastBrowsePath = sessionStorage.getItem("last_browse_path") || "/";
    const isReturningToBrowse =
      fromProduct && (location.pathname === "/" || location.pathname === lastBrowsePath);

    if (isPop || isReturningToBrowse) {
      const savedKeyY = sessionStorage.getItem(`scroll_pos_${location.key}`);
      const savedPathY = sessionStorage.getItem(`scroll_pos_${location.pathname}`);
      const savedHomeY = location.pathname === "/" ? sessionStorage.getItem("homepage_last_scroll") : null;

      const targetY = savedHomeY
        ? Number(savedHomeY)
        : savedPathY !== null
        ? Number(savedPathY)
        : savedKeyY !== null
        ? Number(savedKeyY)
        : 0;

      const targetProductId = sessionStorage.getItem("last_clicked_product_id");
      const targetProductSlug = sessionStorage.getItem("last_clicked_product_slug");

      if (targetY > 0 || targetProductId || targetProductSlug) {
        isRestoringRef.current = true;
        let userInteracted = false;

        const onUserInteract = () => {
          userInteracted = true;
          isRestoringRef.current = false;
          sessionStorage.removeItem("navigated_from_home_to_product");
        };

        window.addEventListener("wheel", onUserInteract, { passive: true, once: true });
        window.addEventListener("touchstart", onUserInteract, { passive: true, once: true });
        window.addEventListener("keydown", onUserInteract, { passive: true, once: true });
        window.addEventListener("mousedown", onUserInteract, { passive: true, once: true });

        const tryRestore = () => {
          if (userInteracted) return true;

          // Step A: If the exact clicked product element is in the DOM, scroll directly to it!
          if (targetProductId || targetProductSlug) {
            const el =
              (targetProductId && document.getElementById(`product-card-${targetProductId}`)) ||
              (targetProductSlug && document.getElementById(`product-card-${targetProductSlug}`)) ||
              (targetProductId && document.querySelector(`[data-product-id="${targetProductId}"]`)) ||
              (targetProductSlug && document.querySelector(`[data-product-slug="${targetProductSlug}"]`));

            if (el) {
              el.scrollIntoView({ block: "center", behavior: "instant" });
              const current = window.scrollY || document.documentElement.scrollTop || 0;
              if (current > 0) {
                return true;
              }
            }
          }

          // Step B: Target Y coordinate restoration (waits until DOM height can accommodate targetY)
          if (targetY > 0) {
            const docHeight = document.documentElement.scrollHeight;
            const viewHeight = window.innerHeight;
            const maxScroll = Math.max(docHeight - viewHeight, 0);

            if (maxScroll >= targetY - 60) {
              window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
              document.documentElement.scrollTop = targetY;
              document.body.scrollTop = targetY;
              const current = window.scrollY || document.documentElement.scrollTop || 0;
              if (Math.abs(current - targetY) < 70) {
                return true;
              }
            } else if (maxScroll > 0) {
              // Asynchronously scroll as far down as possible so user doesn't see top of page
              window.scrollTo({ top: maxScroll, left: 0, behavior: "instant" });
              document.documentElement.scrollTop = maxScroll;
              document.body.scrollTop = maxScroll;
            }
          }

          return false;
        };

        // Try immediately
        if (tryRestore()) {
          isRestoringRef.current = false;
          sessionStorage.removeItem("navigated_from_home_to_product");
          return () => {
            window.removeEventListener("wheel", onUserInteract);
            window.removeEventListener("touchstart", onUserInteract);
            window.removeEventListener("keydown", onUserInteract);
            window.removeEventListener("mousedown", onUserInteract);
          };
        }

        // Multi-stage polling + MutationObserver while products, images, and carousels render
        const startTime = Date.now();
        const intervalId = setInterval(() => {
          const elapsed = Date.now() - startTime;
          if (userInteracted || elapsed > 3000 || tryRestore()) {
            clearInterval(intervalId);
            isRestoringRef.current = false;
            sessionStorage.removeItem("navigated_from_home_to_product");
          }
        }, 50);

        let observer = null;
        if (typeof MutationObserver !== "undefined" && document.body) {
          observer = new MutationObserver(() => {
            if (userInteracted || tryRestore()) {
              if (observer) observer.disconnect();
              clearInterval(intervalId);
              isRestoringRef.current = false;
              sessionStorage.removeItem("navigated_from_home_to_product");
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
          clearInterval(intervalId);
          if (observer) observer.disconnect();
          window.removeEventListener("wheel", onUserInteract);
          window.removeEventListener("touchstart", onUserInteract);
          window.removeEventListener("keydown", onUserInteract);
          window.removeEventListener("mousedown", onUserInteract);
          isRestoringRef.current = false;
        };
      }
      return;
    }

    // 3. New navigation (PUSH): Scroll to top immediately
    sessionStorage.removeItem("navigated_from_home_to_product");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.search, location.key, navigationType]);

  // Set manual scroll restoration so our intelligent restoration takes precedence
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="storefront min-h-screen bg-light text-text relative">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <HkTopBar />
      <HkHeader />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageLoading />}><Outlet /></Suspense>
      </main>
      <HkFooter />

      {/* Floating WhatsApp Quick Support Action Button */}
      {contact?.whatsappUrl && (
        <a
          href={contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Gomzi Nutrition on WhatsApp"
          className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:p-3.5 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.83 2.42-1.46 0-2.88-.38-4.14-1.11l-.3-.17-3.08.81.82-3-.19-.31a8.21 8.21 0 01-1.26-4.48c0-4.54 3.7-8.24 8.24-8.24zm-3.57 4.14c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.82 1.18 3.01.14.19 2 3.19 4.93 4.33 2.43.95 2.93.76 3.46.71.53-.05 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33-.29-.14-1.71-.85-1.98-.95-.26-.1-.45-.14-.64.14-.19.29-.74.95-.9 1.14-.17.19-.33.22-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01z" />
          </svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
            Chat with us
          </span>
        </a>
      )}
    </div>
  );
};

export default Wrapper;
