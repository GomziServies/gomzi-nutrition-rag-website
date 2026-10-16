import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { googleLogin } from "../../api/auth.api";
import { setToken } from "../../utils/storage";
import { successToast, errorToast } from "../../utils/toast";
import { GoogleLogin } from "@react-oauth/google";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    birth_date: "",
  });

  // Focus States
  const [focused, setFocused] = useState({
    first_name: false,
    last_name: false,
    email: false,
    mobile: false,
    password: false,
    birth_date: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const handleFocus = (key) => setFocused((p) => ({ ...p, [key]: true }));
  const handleBlur = (key) => setFocused((p) => ({ ...p, [key]: false }));

  const checkStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setPasswordStrength(score);
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  const formatBirthDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split(" / ");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    if (!form.first_name.trim()) {
      errorToast("Please enter your first name");
      return;
    }
    if (!form.email.trim()) {
      errorToast("Please enter your email address");
      return;
    }
    if (!form.mobile.trim()) {
      errorToast("Please enter your phone number");
      return;
    }
    if (!form.password) {
      errorToast("Please choose a secure password");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        birth_date: formatBirthDate(form.birth_date),
      };

      const result = await registerUser(payload);

      if (!result.success) {
        errorToast(result.message || "Failed to create account");
        return;
      }

      successToast("Registration successful! Please check your email for verification.");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      errorToast("Something went wrong during account creation");
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Sign Up
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const result = await googleLogin(credentialResponse.credential);

      if (!result.success && !result.data?.data?.authorization) {
        errorToast(result.message || "Google registration failed");
        return;
      }

      const token = result?.data?.data?.authorization;
      if (token) {
        setToken(token);
        successToast("Account authenticated via Google!");
        window.location.replace("/");
      } else {
        errorToast("Unable to process Google authentication");
      }
    } catch (error) {
      console.error("Google sign up error:", error);
      errorToast("Google registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen max-h-screen w-full flex bg-[#faf8f6] font-modelica text-[#1c1c28] overflow-hidden">
      {/* ── LEFT PANEL: Brand Visual Showcase (Desktop) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[48%] xl:w-[46%] h-full relative overflow-hidden p-8 xl:p-10 text-white select-none shrink-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 75% 20%, #4a271c 0%, #1c0f0a 45%, #0d0705 100%)",
        }}
      >
        {/* Ambient atmospheric glows */}
        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(92, 49, 36, 0.45)" }}
        />
        <div
          className="absolute bottom-10 right-0 w-72 h-72 rounded-full pointer-events-none blur-3xl"
          style={{ background: "rgba(255, 137, 20, 0.15)" }}
        />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Brand Accent Vertical Bar */}
        <div
          className="absolute left-0 top-10 bottom-10 w-[3px] rounded-r-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #ff8914 25%, #5C3124 75%, transparent 100%)",
            boxShadow: "0 0 16px 2px rgba(255,137,20,0.4)",
          }}
        />

        {/* Top Header: Logo with #000 in place of #ffffff & Badge */}
        <div className="relative z-10 flex items-center justify-between shrink-0">
          <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
            <img
              src="/images/gomzi-supplements-dark.webp"
              alt="Gomzi Supplements by RAG"
              className="h-9 xl:h-10 object-contain object-left"
            />
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/10 text-[#ffaa5a] border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914] animate-pulse" />
            Official Store
          </span>
        </div>

        {/* Center: Hero Statement & Compact Glass Showcase Card */}
        <div className="relative z-10 flex flex-col gap-5 my-auto">
          {/* Badge & Headline */}
          <div className="flex flex-col gap-1.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-semibold text-[#ffaa5a]">
              <Sparkles size={13} className="text-[#ff8914]" />
              <span>Certified Science-Backed Nutrition</span>
            </div>

            <h1
              className="font-toma text-white leading-[1.05]"
              style={{
                fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                letterSpacing: "-1.2px",
              }}
            >
              Start Your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #ffaa5a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Transformation.
              </span>
            </h1>

            <p className="font-modelica text-xs xl:text-sm leading-relaxed text-gray-300 max-w-md">
              Join 500,000+ elite athletes fueled by pharmaceutical-grade purity, verified zero-doping standards, and clinical efficacy.
            </p>
          </div>

          {/* Elevated Glass Showcase Card */}
          <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] rounded-xl p-4 xl:p-5 shadow-2xl overflow-hidden group hover:border-[#ff8914]/40 transition-all duration-300">
            {/* Soft inner glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#5C3124]/40 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff8914]/20 transition-all duration-500" />

            <div className="relative z-10 flex items-center gap-4 xl:gap-5">
              <div className="relative shrink-0 w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center">
                <img
                  src="/images/Gomzi_Protein_Product_HD.webp"
                  alt="Gomzi Protein Isolate"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="#f59e0b" strokeWidth={0} />
                  ))}
                  <span className="text-[11px] font-semibold text-white ml-1">4.9 / 5</span>
                </div>

                <p className="text-xs text-gray-200 italic leading-snug line-clamp-2 font-light">
                  "The cleanest isolate I’ve used. Zero bloating, instant solubility, and noticeably faster muscle recovery."
                </p>

                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-semibold text-[#ffaa5a]">
                    Verified Athlete Review
                  </span>
                  <span className="text-gray-500 text-[10px]">•</span>
                  <span className="text-[10px] text-gray-400">Batch Tested</span>
                </div>
              </div>
            </div>

            {/* Quick Spec Pills */}
            <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-gray-300 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#ff8914]" /> 24g Pure Isolate
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#ff8914]" /> 5.5g BCAAs
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#ff8914]" /> 0g Added Sugar
              </span>
            </div>
          </div>

          {/* Quality Proof Points */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { title: "Informed-Choice", sub: "100% Dope-Free" },
              { title: "Clinical Dosages", sub: "Bioavailable Form" },
              { title: "Pan-India Shipping", sub: "Express 24-48h" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 backdrop-blur-sm"
              >
                <div className="font-toma text-[11px] font-bold text-white tracking-wide">
                  {item.title}
                </div>
                <div className="text-[9px] text-gray-400 font-modelica mt-0.5">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer / Copyright */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-[11px] text-gray-400 font-modelica shrink-0">
          <span>© 2026 Gomzi Supplement by RAG.</span>
          <div className="flex items-center gap-3 text-gray-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Interactive Registration Card (No Scroll) ── */}
      <div className="flex-1 h-full flex flex-col justify-center items-center px-4 sm:px-8 py-3 lg:py-4 relative overflow-y-auto lg:overflow-hidden">
        {/* Top Navigation Row: Back to store & Mobile Logo */}
        <div className="w-full max-w-[440px] flex items-center justify-between mb-2.5 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#5C3124] transition-colors py-1 px-2 rounded-lg hover:bg-black/[0.03] cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to store
          </button>

          <Link to="/" className="lg:hidden">
            <img
              src="/images/gomzi-supplements-dark.webp"
              alt="Gomzi Supplements"
              className="h-7 object-contain"
            />
          </Link>
        </div>

        {/* Registration Card Container */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-xl shadow-black/[0.03] border border-[#eee6e2] p-5 sm:p-6 xl:p-7 flex flex-col gap-3 shrink-0">
          {/* Header */}
          <div className="flex flex-col gap-0.5">
            <h2
              className="font-toma text-[#1c1c28] leading-tight font-extrabold"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                letterSpacing: "-0.6px",
              }}
            >
              Create an account
            </h2>
            <p className="font-modelica text-xs text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#5C3124] hover:text-[#48261c] underline underline-offset-2 decoration-[#5C3124]/40 hover:decoration-[#5C3124] transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Social Sign Up (Google) */}
          <div className="flex flex-col gap-1.5">
            <div className="w-full flex justify-center [&>div]:w-full [&>div>iframe]:!w-full [&>div>iframe]:!rounded-xl">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  errorToast("Google registration could not be initialized");
                }}
                shape="rectangular"
                theme="outline"
                size="large"
                text="signup_with"
                width="100%"
              />
            </div>

            <div className="flex items-center gap-3 my-0.5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-modelica text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                or register with details
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-2.5">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 font-modelica">
                  First Name
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.first_name
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <User size={14} className={focused.first_name ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="First"
                    value={form.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    onFocus={() => handleFocus("first_name")}
                    onBlur={() => handleBlur("first_name")}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 font-modelica">
                  Last Name
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.last_name
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <User size={14} className={focused.last_name ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="text"
                    placeholder="Last"
                    value={form.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                    onFocus={() => handleFocus("last_name")}
                    onBlur={() => handleBlur("last_name")}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Phone Number */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 font-modelica">
                  Email Address
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.email
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Mail size={14} className={focused.email ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="athlete@gym.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 font-modelica">
                  Phone Number
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.mobile
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Phone size={14} className={focused.mobile ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={form.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    onFocus={() => handleFocus("mobile")}
                    onBlur={() => handleBlur("mobile")}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Date of Birth & Password */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 font-modelica">
                  Date of Birth
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.birth_date
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Calendar size={14} className={focused.birth_date ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="text"
                    placeholder="DD / MM / YYYY"
                    value={form.birth_date}
                    onChange={(e) => {
                      let v = e.target.value.replace(/[^0-9]/g, "");
                      if (v.length >= 3 && v.length <= 4)
                        v = v.slice(0, 2) + " / " + v.slice(2);
                      else if (v.length >= 5)
                        v =
                          v.slice(0, 2) +
                          " / " +
                          v.slice(2, 4) +
                          " / " +
                          v.slice(4, 8);
                      handleChange("birth_date", v);
                    }}
                    onFocus={() => handleFocus("birth_date")}
                    onBlur={() => handleBlur("birth_date")}
                    maxLength={14}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 font-modelica">
                  Password
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.password
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Lock size={14} className={focused.password ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={form.password}
                    onChange={(e) => {
                      handleChange("password", e.target.value);
                      checkStrength(e.target.value);
                    }}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2 py-2 pr-8 text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Meter */}
            {form.password.length > 0 && (
              <div className="flex items-center gap-2 pt-0.5">
                <div className="flex-1 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{
                        background:
                          i <= passwordStrength
                            ? strengthColor[passwordStrength]
                            : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="font-modelica text-[10px] font-semibold"
                  style={{ color: strengthColor[passwordStrength] }}
                >
                  {strengthLabel[passwordStrength]}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1.5 py-3 rounded-xl font-toma text-white text-xs font-bold tracking-wide uppercase transition-all duration-200 bg-[#5C3124] hover:bg-[#48261c] active:scale-[0.99] shadow-md shadow-[#5C3124]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Social Proof & Trust Strip */}
          <div className="pt-0.5">
            <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-[#faf7f5] border border-[#eee4e0]">
              <div className="flex flex-col items-center text-center">
                <span className="font-toma text-xs font-bold text-[#1c1c28]">500k+</span>
                <span className="text-[9px] text-gray-500 font-medium">Athletes</span>
              </div>
              <div className="flex flex-col items-center text-center border-x border-[#ebdcd7]">
                <div className="flex items-center gap-0.5">
                  <Star size={10} fill="#f59e0b" strokeWidth={0} className="text-[#f59e0b]" />
                  <span className="font-toma text-xs font-bold text-[#1c1c28]">4.9</span>
                </div>
                <span className="text-[9px] text-gray-500 font-medium">12k+ Reviews</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-toma text-xs font-bold text-[#5C3124]">100%</span>
                <span className="text-[9px] text-gray-500 font-medium">Authentic</span>
              </div>
            </div>

            {/* Micro Trust Guarantee Icons */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#5C3124]" /> 256-Bit SSL
              </span>
              <span className="flex items-center gap-1">
                <Truck size={13} className="text-[#5C3124]" /> Free Shipping
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw size={13} className="text-[#5C3124]" /> Easy Returns
              </span>
            </div>
          </div>

          {/* Terms Agreement Footer */}
          <p className="font-modelica text-[10px] text-center text-gray-400 leading-relaxed border-t border-gray-100 pt-2">
            By creating an account, you agree to Gomzi's{" "}
            <Link
              to="/terms-and-conditions"
              className="text-gray-600 underline hover:text-[#5C3124] transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-gray-600 underline hover:text-[#5C3124] transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
