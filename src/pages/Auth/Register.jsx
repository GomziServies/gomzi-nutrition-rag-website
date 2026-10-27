import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { googleLogin } from "../../api/auth.api";
import { setToken } from "../../utils/storage";
import { successToast, errorToast } from "../../utils/toast";
import { syncGuestCart } from "../../utils/syncGuestCart";
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
  Tag,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Where to land after a successful signup (e.g. /checkouts for Buy Now).
  const redirectTo = searchParams.get("redirect") || "/";
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
        try {
          await syncGuestCart();
        } catch (e) {
          console.warn("Guest cart sync warning:", e);
        }
        successToast("Account authenticated via Google!");
        window.location.replace(redirectTo);
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
    <div className="min-h-screen w-full flex bg-[#f6f7fa] text-text">
      {/* ── LEFT PANEL: Authentic Athletic Brand Showcase (Desktop) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[48%] xl:w-[46%] min-h-screen relative overflow-hidden p-6 lg:p-8 xl:p-12 bg-gradient-to-br from-[#f1f4f9] via-[#f8fafc] to-[#e8edf6] border-r border-border text-text select-none shrink-0">
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Top Header: Official Store Badge */}
        <div className="relative z-10 flex items-center justify-between shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Official Brand Store
          </span>
        </div>

        {/* Center: Hero Product & Value Proposition */}
        <div className="relative z-10 my-auto py-4 flex flex-col gap-4 max-w-lg">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary-border text-primary text-xs font-bold tracking-wide uppercase w-fit shadow-xs">
              <Sparkles size={13} className="text-primary" />
              <span>Join Gomzi Athlete Club</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-primary tracking-tight leading-tight">
              Start Your Journey. <br />
              <span className="text-text">100% Authentic.</span>
            </h1>

            <p className="text-xs xl:text-sm text-text-light leading-relaxed font-normal">
              Create your account to unlock member discounts, earn rewards on every order, and access certified sports nutrition.
            </p>
          </div>

          {/* Featured Product Hero Card */}
          <div className="relative bg-white rounded-2xl border border-border p-3.5 xl:p-4 shadow-sm shadow-primary/5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="relative w-20 h-24 xl:w-24 xl:h-28 shrink-0 flex items-center justify-center bg-[#f8fafc] rounded-xl border border-border/60 p-2">
              <img
                src="/images/protein-removebg.png"
                alt="Gomzi 100% Whey Protein Blend"
                className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/Gomzi_Protein_Product_HD.webp";
                }}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#f59e0b" strokeWidth={0} />
                ))}
                <span className="ml-1 text-[11px] font-bold text-text">4.9 / 5</span>
                <span className="text-[10px] text-text-light">• Verified Athletes</span>
              </div>

              <h2 className="text-xs xl:text-sm font-bold text-text leading-snug">
                Gomzi 100% Whey Protein Blend
              </h2>

              <p className="text-[10px] text-text-light leading-relaxed line-clamp-2">
                Ultra-filtered isolate with 24g protein, zero added sugar, and instant solubility.
              </p>

              <div className="flex flex-wrap items-center gap-1 mt-0.5">
                <span className="px-1.5 py-0.5 rounded-md bg-primary-light text-primary text-[9px] font-bold border border-primary-border">
                  24g Protein
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                  Zero Spiking
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[9px] font-bold border border-amber-200">
                  Lab Tested
                </span>
              </div>
            </div>
          </div>

          {/* Member Benefits List */}
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-border text-xs text-text shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0">
                <Tag size={14} />
              </div>
              <div>
                <p className="font-bold text-[12px] text-text">VIP Member Pricing</p>
                <p className="text-[10px] text-text-light">
                  Save extra on every direct factory-fresh order.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-border text-xs text-text shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={14} />
              </div>
              <div>
                <p className="font-bold text-[12px] text-text">100% Authentic & Lab Tested</p>
                <p className="text-[10px] text-text-light">
                  QR-verifiable third-party lab test certificates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-border text-xs text-text shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Truck size={14} />
              </div>
              <div>
                <p className="font-bold text-[12px] text-text">Pan-India Express Dispatch</p>
                <p className="text-[10px] text-text-light">
                  Free shipping on eligible orders with real-time updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators Strip */}
        <div className="relative z-10 pt-3 border-t border-border flex items-center justify-between text-xs text-text-light shrink-0">
          <span className="flex items-center gap-1 font-semibold text-[11px] text-text">
            <ShieldCheck size={14} className="text-emerald-600" /> 100% Lab Tested
          </span>
          <span className="flex items-center gap-1 font-semibold text-[11px] text-text">
            <CheckCircle2 size={14} className="text-primary" /> FSSAI Certified
          </span>
          <span className="flex items-center gap-1 font-semibold text-[11px] text-text">
            <Sparkles size={14} className="text-primary" /> Pan-India Express
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL: Interactive Registration Card ── */}
      <div className="flex-1 w-full min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 md:px-8 py-4 sm:py-6 relative overflow-y-auto">
        {/* Top Navigation Row: Back to store */}
        <div className="w-full max-w-[440px] flex items-center justify-between mb-2 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-light hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-black/[0.03] cursor-pointer active:scale-95"
          >
            <ArrowLeft size={14} />
            Back to store
          </button>
        </div>

        {/* Registration Card Container */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-sm sm:shadow-lg shadow-black/[0.03] border border-border p-4 sm:p-6 xl:p-7 flex flex-col gap-3 my-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-1">
            <Link to="/" className="inline-block mb-0.5" aria-label="Gomzi Nutrition Home">
              <img
                src="/images/gomzi-supplements-dark.webp"
                alt="Gomzi Supplements"
                className="h-8 sm:h-9 w-auto max-w-[170px] object-contain transition-transform duration-200 hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/rag-icon-logo.png";
                }}
              />
            </Link>
            <h2
              className="text-text leading-tight font-bold"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                letterSpacing: "-0.6px",
              }}
            >
              Create an account
            </h2>
            <p className="text-xs text-text-light">
              Already have an account?{" "}
              <Link
                to={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
                className="font-bold text-primary hover:underline underline-offset-2 transition-all"
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
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                or register with details
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} autoComplete="off" className="flex flex-col gap-2.5">
            {/* Hidden dummy fields to consume aggressive browser autofill heuristics */}
            <input
              type="text"
              name="fake_username_remember"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              type="password"
              name="fake_password_remember"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="new-password"
              aria-hidden="true"
            />

            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 ">
                  First Name
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.first_name
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <User size={14} className={focused.first_name ? "text-primary" : ""} />
                  </div>
                  <input
                    type="text"
                    name="first_name"
                    id="reg_first_name"
                    autoComplete="off"
                    required
                    placeholder="First"
                    value={form.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    onFocus={() => handleFocus("first_name")}
                    onBlur={() => handleBlur("first_name")}
                    className="w-full min-w-0 bg-transparent outline-none text-base sm:text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 ">
                  Last Name
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.last_name
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <User size={14} className={focused.last_name ? "text-primary" : ""} />
                  </div>
                  <input
                    type="text"
                    name="last_name"
                    id="reg_last_name"
                    autoComplete="off"
                    placeholder="Last"
                    value={form.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                    onFocus={() => handleFocus("last_name")}
                    onBlur={() => handleBlur("last_name")}
                    className="w-full min-w-0 bg-transparent outline-none text-base sm:text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Phone Number */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 ">
                  Email Address
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.email
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Mail size={14} className={focused.email ? "text-primary" : ""} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="reg_email"
                    autoComplete="off"
                    required
                    placeholder="athlete@gym.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className="w-full min-w-0 bg-transparent outline-none text-base sm:text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 ">
                  Phone Number
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.mobile
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Phone size={14} className={focused.mobile ? "text-primary" : ""} />
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    id="reg_mobile"
                    autoComplete="off"
                    required
                    placeholder="9876543210"
                    value={form.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    onFocus={() => handleFocus("mobile")}
                    onBlur={() => handleBlur("mobile")}
                    className="w-full min-w-0 bg-transparent outline-none text-base sm:text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Date of Birth & Password */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 ">
                  Date of Birth
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.birth_date
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Calendar size={14} className={focused.birth_date ? "text-primary" : ""} />
                  </div>
                  <input
                    type="text"
                    name="birth_date"
                    id="reg_birth_date"
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
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
                    className="w-full min-w-0 bg-transparent outline-none text-base sm:text-xs px-2 py-2 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-700 ">
                  Password
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    focused.password
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-2.5 text-gray-400">
                    <Lock size={14} className={focused.password ? "text-primary" : ""} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="new_user_password"
                    id="reg_password"
                    autoComplete="new-password"
                    required
                    placeholder="••••••••••••"
                    value={form.password}
                    onChange={(e) => {
                      handleChange("password", e.target.value);
                      checkStrength(e.target.value);
                    }}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    className="w-full min-w-0 bg-transparent outline-none text-base sm:text-xs px-2 py-2 pr-8 text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 text-gray-400 hover:text-gray-600 transition-colors p-2 min-w-[34px] min-h-[34px] flex items-center justify-center active:scale-90"
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
                  className="text-[10px] font-semibold"
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
              className="group relative overflow-hidden w-full mt-1.5 py-3 rounded-xl text-white text-xs font-bold tracking-wide uppercase transition-all duration-200 bg-primary hover:bg-primary-hover active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={15} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Social Proof & Trust Strip */}
          <div className="pt-0.5">
            <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-primary-light/50 border border-primary-border/60">
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-bold text-text">500k+</span>
                <span className="text-[9px] text-text-light font-medium">Athletes</span>
              </div>
              <div className="flex flex-col items-center text-center border-x border-primary-border">
                <div className="flex items-center gap-0.5">
                  <Star size={10} fill="#f59e0b" strokeWidth={0} className="text-[#f59e0b]" />
                  <span className="text-xs font-bold text-text">4.9</span>
                </div>
                <span className="text-[9px] text-text-light font-medium">12k+ Reviews</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-bold text-primary">100%</span>
                <span className="text-[9px] text-text-light font-medium">Authentic</span>
              </div>
            </div>

            {/* Micro Trust Guarantee Icons */}
            <div className="flex items-center justify-between text-[10px] text-text-light pt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-primary" /> 256-Bit SSL
              </span>
              <span className="flex items-center gap-1">
                <Truck size={13} className="text-primary" /> Free Shipping
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw size={13} className="text-primary" /> Easy Returns
              </span>
            </div>
          </div>

          {/* Terms Agreement Footer */}
          <p className="text-[10px] text-center text-gray-400 leading-relaxed border-t border-gray-100 pt-2">
            By creating an account, you agree to Gomzi's{" "}
            <Link
              to="/terms-and-conditions"
              className="text-gray-600 underline hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-gray-600 underline hover:text-primary transition-colors"
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