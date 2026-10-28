import { lazy } from "react";
import NotFound, { RouteError } from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../HOC/Wrapper";
import Landing from "../pages/Landing";
const Allproducts = lazy(() => import("../pages/Allproducts"));
const Deals = lazy(() => import("../pages/Deals"));
const WholesaleB2B = lazy(() => import("../pages/WholesaleB2B"));
const FAQ = lazy(() => import("../pages/FAQ"));
const ProductDetailPage = lazy(() => import("../pages/Productdetailpage"));
const Ingredients = lazy(() => import("../pages/Ingredients"));
const Ambassador = lazy(() => import("../pages/About/Ambassador"));
const About = lazy(() => import("../pages/About/About"));
const ContactUs = lazy(() => import("../pages/About/Contact-Us"));
const Inquiry = lazy(() => import("../pages/Inquiry/Inquiry"));
const Cart = lazy(() => import("../component/ui/Cart"));
const Checkouts = lazy(() => import("../pages/Checkouts"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../component/ui/BlogDetail"));
const LoginPage = lazy(() => import("../pages/Auth/Login"));
const RegisterPage = lazy(() => import("../pages/Auth/Register"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail"));
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));
const ThankYou = lazy(() => import("../pages/Thank-you"));
const PrivacyPolicy = lazy(() => import("../pages/About/LegalPrivacy"));
const TermsConditions = lazy(() => import("../pages/About/LegalTerms"));
const RefundPolicy = lazy(() => import("../pages/About/ReturnsPolicy"));
const ShippingPolicy = lazy(() => import("../pages/About/DeliveryPolicy"));
const CategoriesSection = lazy(() => import("../pages/Categories"));

export const Route = createBrowserRouter([
  {
    element: <Wrapper />,
    errorElement: <RouteError />,
    children: [
      { path: "/wholesale", element: <WholesaleB2B /> },
      { path: "/deals", element: <Deals /> },
      { path: "*", element: <NotFound /> },
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
]);
