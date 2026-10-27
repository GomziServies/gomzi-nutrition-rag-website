import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { loginUser, sendOTP, verifyOTP } from "../../services/auth.service";
import { setToken } from "../../utils/storage";
import { successToast, errorToast } from "../../utils/toast";
import { syncGuestCart } from "../../utils/syncGuestCart";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/auth.api";
import {
  Lock,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Where to land after a successful login (e.g. /checkouts for Buy Now).
  const redirectTo = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("otp"); // "otp" | "password" - default to OTP for fast mobile e-com

  // Password Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP Login State
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [, setVerificationId] = useState(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Focus states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [identifierFocused, setIdentifierFocused] = useState(false);
  const [otpFocused, setOtpFocused] = useState(false);

  // Countdown timer for OTP Resend
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Email / Password Login Handler
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password) {
      errorToast("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser({
        email: email.trim(),
        password,
      });

      if (!result.success) {
        errorToast(result.message || "Invalid credentials");
        return;
      }

      const response = result.data;

      if (response?.errorCode === "ERR#VERIFICATION-REQUIRED") {
        navigate("/verify-email");
        return;
      }

      const token = response?.data?.authorization;
      if (token) {
        setToken(token);
        try {
          await syncGuestCart();
        } catch (e) {
          console.warn("Guest cart sync warning:", e);
        }
        successToast("Welcome back! Login successful");
        window.location.replace(redirectTo);
      } else {
        errorToast("Authorization token not received");
      }
    } catch (err) {
      console.error("Login error:", err);
      errorToast("Something went wrong during sign in");
    } finally {
      setLoading(false);
    }
  };

  // OTP Request Handler
  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    const cleanId = identifier.trim();
    if (!cleanId) {
      errorToast("Please enter your mobile number or email");
      return;
    }

    try {
      setLoading(true);
      const isEmail = cleanId.includes("@");

      const payload = isEmail
        ? { email: cleanId }
        : {
            mobile: cleanId.replace(/^\+91/, "").replace(/\s+/g, ""),
            country_code: "+91",
          };

      const result = await sendOTP(payload);

      if (!result.success) {
        errorToast(result.message || "Failed to send verification code");
        return;
      }

      const verificationId = result?.data?.data?.verification_id;
      const devOtp = result?.data?.data?.OTP;

      setVerificationId(verificationId);
      setOtpSent(true);
      setResendCountdown(30);

      if (devOtp) {
        setOtp(String(devOtp));
        successToast(`OTP sent! (Dev Auto-fill: ${devOtp})`);
      } else {
        successToast(result.data?.message || "Verification code sent successfully");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      errorToast("Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Handler
  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp) {
      errorToast("Please enter the verification code");
      return;
    }

    try {
      setLoading(true);
      const cleanId = identifier.trim();
      const isEmail = cleanId.includes("@");

      const payload = isEmail
        ? {
            email: cleanId,
            otp: cleanOtp,
          }
        : {
            mobile: cleanId.replace(/^\+91/, "").replace(/\s+/g, ""),
            country_code: "+91",
            otp: cleanOtp,
          };

      const result = await verifyOTP(payload);

      if (!result.success) {
        errorToast(result.message || "Invalid or expired OTP");
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
        successToast("Verification successful! Welcome back");
        window.location.replace(redirectTo);
      } else {
        errorToast("Unable to authenticate session");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      errorToast("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const result = await googleLogin(credentialResponse.credential);

      if (!result.success && !result.data?.data?.authorization) {
        errorToast(result.message || "Google sign in failed");
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
        successToast("Google login successful!");
        window.location.replace(redirectTo);
      } else {
        errorToast("Google authorization failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      errorToast("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const isIdentifierEmail = identifier.includes("@");

  return (
    <div className="min-h-screen w-full flex bg-[#f6f7fa] text-text">
      {/* ── LEFT PANEL: Authentic Athletic Brand Showcase (Desktop lg+) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[48%] xl:w-[46%] relative overflow-hidden p-8 xl:p-12 bg-gradient-to-br from-[#f1f4f9] via-[#f8fafc] to-[#e8edf6] border-r border-border text-text select-none shrink-0">
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
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Official Brand Store
          </span>
        </div>

        {/* Center: Hero Product & Value Proposition */}
        <div className="relative z-10 my-auto py-6 flex flex-col gap-5 max-w-xl">
          <div className="flex flex-col gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary-border text-primary text-xs font-bold tracking-wide uppercase w-fit shadow-xs">
              <Sparkles size={13} className="text-primary" />
              <span>Certified Sports Nutrition</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-primary tracking-tight leading-tight">
              Fuel Your Peak Performance. <br />
              <span className="text-text">100% Authentic.</span>
            </h1>

            <p className="text-xs xl:text-sm text-text-light leading-relaxed max-w-md">
              Join 50,000+ elite athletes & fitness enthusiasts. Direct factory-fresh supplements, 100% label accuracy, and exclusive VIP member benefits.
            </p>
          </div>

          {/* Featured Product Hero Card */}
          <div className="relative bg-white rounded-2xl border border-border p-4 xl:p-5 shadow-sm shadow-primary/5 flex items-center gap-4 xl:gap-6 hover:shadow-md transition-shadow">
            <div className="relative w-24 h-28 xl:w-28 xl:h-32 shrink-0 flex items-center justify-center bg-[#f8fafc] rounded-xl border border-border/60 p-2">
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

            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#f59e0b" strokeWidth={0} />
                ))}
                <span className="ml-1 text-xs font-bold text-text">4.9 / 5</span>
                <span className="text-[11px] text-text-light">• 50k+ Athletes</span>
              </div>

              <h2 className="text-sm xl:text-base font-bold text-text leading-snug">
                Gomzi 100% Whey Protein Blend
              </h2>

              <p className="text-[11px] text-text-light leading-relaxed line-clamp-2">
                Ultra-filtered whey isolate with 24g protein, zero added sugar, and instant solubility for rapid muscle recovery.
              </p>

              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded-md bg-primary-light text-primary text-[10px] font-bold border border-primary-border">
                  24g Protein
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Zero Spiking
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                  Lab Tested
                </span>
              </div>
            </div>
          </div>

          {/* Member Benefits List */}
          <div className="grid grid-cols-1 gap-2.5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-border text-xs text-text shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0">
                <Tag size={16} />
              </div>
              <div>
                <p className="font-bold text-text">Exclusive VIP Member Pricing</p>
                <p className="text-[11px] text-text-light">
                  Save extra on every direct order with automatic member-only checkout discounts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-border text-xs text-text shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="font-bold text-text">100% Factory Authenticity</p>
                <p className="text-[11px] text-text-light">
                  Direct factory dispatch with QR-verifiable third-party lab test certificates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-border text-xs text-text shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Truck size={16} />
              </div>
              <div>
                <p className="font-bold text-text">Pan-India Priority Express</p>
                <p className="text-[11px] text-text-light">
                  Free express shipping on eligible orders with real-time dispatch tracking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators Strip */}
        <div className="relative z-10 pt-4 border-t border-border flex items-center justify-between text-xs text-text-light">
          <span className="flex items-center gap-1.5 font-semibold text-text">
            <ShieldCheck size={16} className="text-emerald-600" /> 100% Lab Tested
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-text">
            <CheckCircle2 size={16} className="text-primary" /> FSSAI Certified
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-text">
            <Sparkles size={16} className="text-primary" /> Pan-India Express
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL: Clean, High-Conversion E-Commerce Auth Portal ── */}
      <div className="flex-1 w-full min-h-screen flex flex-col justify-between items-center px-3 sm:px-6 md:px-8 py-4 sm:py-8 overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="w-full max-w-[440px] flex items-center justify-between shrink-0 mb-3 sm:mb-5">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-light hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-black/5 cursor-pointer active:scale-95"
          >
            <ArrowLeft size={15} />
            <span>Back to Store</span>
          </button>
        </div>

        {/* Auth Main Card */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl border border-border p-5 sm:p-8 shadow-sm sm:shadow-lg shadow-black/[0.03] my-auto flex flex-col gap-4 sm:gap-5">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2">
            <Link to="/" className="inline-block mb-1" aria-label="Gomzi Nutrition Home">
              <img
                src="/images/gomzi-supplements-dark.webp"
                alt="Gomzi Supplements"
                className="h-9 sm:h-10 w-auto max-w-[190px] object-contain transition-transform duration-200 hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/rag-icon-logo.png";
                }}
              />
            </Link>
            <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
              Sign In to Gomzi
            </h2>
            <p className="text-xs sm:text-sm text-text-light max-w-sm">
              Access your orders, saved addresses & VIP athlete pricing.
            </p>
          </div>

          {/* Social Sign In (Google) */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-center [&>div]:w-full [&>div>iframe]:!w-full [&>div>iframe]:!rounded-xl">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  errorToast("Google login could not be initialized");
                }}
                shape="rectangular"
                theme="outline"
                size="large"
                text="continue_with"
                width="100%"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
                or sign in with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-primary-light/80 border border-primary-border text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setLoginType("otp");
              }}
              className={`py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === "otp"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              <Smartphone size={14} />
              <span>Mobile OTP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginType("password");
                setOtpSent(false);
              }}
              className={`py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === "password"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              <Lock size={14} />
              <span>Password</span>
            </button>
          </div>

          {/* FORM: Mobile OTP Mode */}
          {loginType === "otp" ? (
            <div className="flex flex-col gap-4">
              {/* Identifier Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-text">
                    Mobile Number or Email
                  </label>
                  {otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className="text-[11px] text-primary font-bold hover:underline cursor-pointer"
                    >
                      Change
                    </button>
                  )}
                </div>

                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    identifierFocused
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-border hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3.5 pr-1 text-text-light font-bold text-xs flex items-center gap-1.5 select-none">
                    {isIdentifierEmail ? (
                      <Mail size={16} className={identifierFocused ? "text-primary" : ""} />
                    ) : (
                      <>
                        <span className="text-sm">🇮🇳</span>
                        <span className="text-text font-semibold">+91</span>
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    disabled={otpSent}
                    placeholder={isIdentifierEmail ? "name@example.com" : "98765 43210"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onFocus={() => setIdentifierFocused(true)}
                    onBlur={() => setIdentifierFocused(false)}
                    className="w-full bg-transparent outline-none text-base sm:text-sm px-2.5 py-2.5 sm:py-3 text-text placeholder:text-text-muted disabled:bg-gray-50 disabled:text-text-muted rounded-xl"
                  />
                </div>
              </div>

              {/* OTP Field (Visible when code is sent) */}
              {otpSent && (
                <div className="flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-text">
                      6-Digit Verification Code
                    </label>
                    {resendCountdown > 0 ? (
                      <span className="text-[11px] text-text-muted font-semibold">
                        Resend in {resendCountdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="text-[11px] text-primary font-bold hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <div
                    className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                      otpFocused
                        ? "border-primary ring-2 ring-primary/15 shadow-sm"
                        : "border-border hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      onFocus={() => setOtpFocused(true)}
                      onBlur={() => setOtpFocused(false)}
                      className="w-full bg-transparent outline-none font-mono text-center text-xl tracking-[0.4em] font-bold py-3 text-text placeholder:text-text-muted"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons for OTP */}
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="group relative overflow-hidden w-full mt-1 py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-primary hover:bg-primary-hover active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Verification Code</span>
                      <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="group relative overflow-hidden w-full mt-1 py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-primary hover:bg-primary-hover active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Sign In</span>
                      <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          ) : (
            /* FORM: Password Mode */
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text">
                  Email Address
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    emailFocused
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-border hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3.5 text-text-muted">
                    <Mail size={16} className={emailFocused ? "text-primary" : ""} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full bg-transparent outline-none text-base sm:text-sm px-3 py-2.5 sm:py-3 text-text placeholder:text-text-muted"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-text">
                    Password
                  </label>
                  <span className="text-[11px] text-primary font-semibold hover:underline cursor-pointer select-none">
                    Forgot password?
                  </span>
                </div>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    passwordFocused
                      ? "border-primary ring-2 ring-primary/15 shadow-sm"
                      : "border-border hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3.5 text-text-muted">
                    <Lock size={16} className={passwordFocused ? "text-primary" : ""} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full bg-transparent outline-none text-base sm:text-sm px-3 py-2.5 sm:py-3 pr-10 text-text placeholder:text-text-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 text-text-muted hover:text-text transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer active:scale-90"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative overflow-hidden w-full mt-1 py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 bg-primary hover:bg-primary-hover active:scale-[0.99] shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* New to Store Registration Link */}
          <div className="pt-2 border-t border-border flex items-center justify-center text-xs text-text-light">
            <span>New to Gomzi Nutrition?</span>
            <Link
              to={`/register${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
              className="ml-1.5 font-bold text-primary hover:underline"
            >
              Create an account →
            </Link>
          </div>

          {/* Micro Security Guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>256-Bit SSL Encrypted Official Gomzi Store</span>
          </div>
        </div>

        {/* Bottom Terms & Privacy Legal Notice */}
        <p className="text-[11px] text-center text-gray-400 mt-4 shrink-0">
          By continuing, you agree to Gomzi Nutrition's{" "}
          <Link to="/terms-and-conditions" className="text-gray-600 underline hover:text-primary">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-gray-600 underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}