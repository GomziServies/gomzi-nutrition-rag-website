import { createBrowserRouter, Outlet } from "react-router-dom";
import ScrollToTop from "../component/common/ScrollToTop";
import Wrapper from "../HOC/Wrapper";
import Landing from "../pages/Landing";
import Allproducts from "../pages/Allproducts";
import FAQ from "../pages/FAQ";
import ProductDetailPage from "../pages/Productdetailpage";
import Ingredients from "../pages/Ingredients";
import Ambassador from "../pages/About/Ambassador";
import About from "../pages/About/About";
import ContactUs from "../pages/About/Contact-Us";
import Inquiry from "../pages/Inquiry/Inquiry";
import Cart from "../component/ui/Cart";
import Checkouts from "../pages/Checkouts";
import Blog from "../pages/Blog";
import BlogDetail from "../component/ui/BlogDetail";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ProfilePage from "../pages/Profile/ProfilePage";
import ThankYou from "../pages/Thank-you";
import PrivacyPolicy from "../pages/About/LegalPrivacy";
import TermsConditions from "../pages/About/LegalTerms";
import RefundPolicy from "../pages/About/ReturnsPolicy";
import ShippingPolicy from "../pages/About/DeliveryPolicy";
import CategoriesSection from "../pages/Categories";
import WholesaleB2B from "../pages/WholesaleB2B";

const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export const Route = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <Wrapper />,
        children: [
          {
            path: "/",
            element: <Landing />,
          },

      {
        path: "/gomzi-supplement",
        element: <Allproducts />,
      },

      {
        path: "/gomzi-supplement/:categorySlug",
        element: <Allproducts />,
      },

      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },

      {
        path: "/faq",
        element: <FAQ />,
      },

      {
        path: "/product/:slug",
        element: <ProductDetailPage />,
      },

      {
        path: "/ingredients",
        element: <Ingredients />,
      },

      {
        path: "/about/ambassador",
        element: <Ambassador />,
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/profile",
        element: <ProfilePage />,
      },

      {
        path: "/contact-us",
        element: <ContactUs />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      // =========================
      // BLOG
      // =========================

      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetail />,
      },

      // =========================

      {
        path: "/thank-you",
        element: <ThankYou />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },

      {
        path: "/terms-and-conditions",
        element: <TermsConditions />,
      },

      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },

      {
        path: "/shipping-policy",
        element: <ShippingPolicy />,
      },

      {
        path: "/category",
        element: <CategoriesSection />,
      },

      {
        path: "/wholesale",
        element: <WholesaleB2B />,
      },

      {
        path: "/b2b",
        element: <WholesaleB2B />,
      },

      {
        path: "/gym-supply",
        element: <WholesaleB2B />,
      },

      {
        path: "/b2b-wholesale",
        element: <WholesaleB2B />,
      },
    ],
  },

  // Standalone Inquiry Portal (outside Wrapper without site header & footer)
  {
    path: "/inquiry",
    element: <Inquiry />,
  },
  {
    path: "/contact-us/inquiry",
    element: <Inquiry />,
  },

  // Checkout intentionally outside Wrapper
  {
    path: "/checkouts",
    element: <Checkouts />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
    ],
  },
]);
