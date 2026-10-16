import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, sendOTP, verifyOTP } from "../../services/auth.service";
import { setToken } from "../../utils/storage";
import { successToast, errorToast } from "../../utils/toast";
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
  Truck,
  RefreshCw,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("password"); // "password" | "otp"

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
        successToast("Welcome back! Login successful");
        window.location.replace("/");
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
      errorToast("Please enter your email or mobile number");
      return;
    }

    try {
      setLoading(true);
      const isEmail = cleanId.includes("@");

      const payload = isEmail
        ? { email: cleanId }
        : {
            mobile: cleanId.replace(/^\+91/, ""),
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
            mobile: cleanId.replace(/^\+91/, ""),
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
        successToast("Verification successful! Welcome back");
        window.location.replace("/");
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
        successToast("Google login successful!");
        window.location.replace("/");
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

        {/* Top Header: Logo & Badge */}
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
              Fuel Your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #ffaa5a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Highest Ambition.
              </span>
            </h1>

            <p className="font-modelica text-xs xl:text-sm leading-relaxed text-gray-300 max-w-md">
              Pharmaceutical-grade purity, clinical dosages, and verified zero-doping standards for athletes who demand the absolute best.
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

      {/* ── RIGHT PANEL: Interactive Authentication Card (No Scroll) ── */}
      <div className="flex-1 h-full flex flex-col justify-center items-center px-4 sm:px-8 py-3 lg:py-4 relative overflow-y-auto lg:overflow-hidden">
        {/* Top Navigation Row: Back to store & Mobile Logo */}
        <div className="w-full max-w-[420px] flex items-center justify-between mb-3 shrink-0">
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

        {/* Auth Card Container */}
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl shadow-black/[0.03] border border-[#eee6e2] p-6 xl:p-7 flex flex-col gap-3.5 xl:gap-4 shrink-0">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h2
              className="font-toma text-[#1c1c28] leading-tight font-extrabold"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 1.95rem)",
                letterSpacing: "-0.6px",
              }}
            >
              Welcome back
            </h2>
            <p className="font-modelica text-xs text-gray-500">
              New to Gomzi Nutrition?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#5C3124] hover:text-[#48261c] underline underline-offset-2 decoration-[#5C3124]/40 hover:decoration-[#5C3124] transition-all"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Social Sign In (Google) */}
          <div className="flex flex-col gap-1.5">
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

            <div className="flex items-center gap-3 my-0.5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-modelica text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          {/* Auth Mode Toggle Pill */}
          <div className="relative flex p-1 rounded-xl bg-[#f5f1ee] border border-[#ebdcd7]">
            <button
              type="button"
              onClick={() => {
                setLoginType("password");
                setOtpSent(false);
              }}
              className={`relative z-10 flex-1 py-2 rounded-lg text-xs font-modelica font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === "password"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Lock size={13} />
              Password Login
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginType("otp");
              }}
              className={`relative z-10 flex-1 py-2 rounded-lg text-xs font-modelica font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === "otp"
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Smartphone size={13} />
              OTP Login
            </button>

            {/* Sliding Pill Indicator */}
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out shadow-sm"
              style={{
                background: "#5C3124",
                left: loginType === "password" ? "4px" : "50%",
              }}
            />
          </div>

          {/* Form Section */}
          {loginType === "password" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700 font-modelica">
                  Email Address
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    emailFocused
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3 text-gray-400">
                    <Mail size={15} className={emailFocused ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2.5 py-2.5 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 font-modelica">
                    Password
                  </label>
                  <span className="text-[10px] text-gray-400 hover:text-[#5C3124] transition-colors cursor-pointer select-none">
                    Forgot password?
                  </span>
                </div>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    passwordFocused
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3 text-gray-400">
                    <Lock size={15} className={passwordFocused ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2.5 py-2.5 pr-9 text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative overflow-hidden w-full mt-1 py-3 rounded-xl font-toma text-white text-xs font-bold tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Sign In to Account</span>
                    <ArrowRight size={15} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Identifier Input */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-700 font-modelica">
                    Email or Mobile Number
                  </label>
                  {otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className="text-[10px] text-[#5C3124] font-semibold hover:underline cursor-pointer"
                    >
                      Change
                    </button>
                  )}
                </div>

                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    identifierFocused
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3 text-gray-400">
                    {isIdentifierEmail ? (
                      <Mail size={15} className={identifierFocused ? "text-[#5C3124]" : ""} />
                    ) : (
                      <Smartphone size={15} className={identifierFocused ? "text-[#5C3124]" : ""} />
                    )}
                  </div>
                  <input
                    type="text"
                    disabled={otpSent}
                    placeholder="e.g. 9876543210 or user@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onFocus={() => setIdentifierFocused(true)}
                    onBlur={() => setIdentifierFocused(false)}
                    className="w-full bg-transparent outline-none font-modelica text-xs px-2.5 py-2.5 text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500 rounded-xl"
                  />
                </div>
              </div>

              {/* OTP Field (Visible when code is sent) */}
              {otpSent && (
                <div className="flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700 font-modelica">
                      Verification Code (OTP)
                    </label>
                    {resendCountdown > 0 ? (
                      <span className="text-[10px] text-gray-400 font-medium">
                        Resend in {resendCountdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="text-[10px] text-[#5C3124] font-bold hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <div
                    className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                      otpFocused
                        ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
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
                      className="w-full bg-transparent outline-none font-mono text-center text-base tracking-[0.35em] font-bold py-2.5 text-gray-900 placeholder:text-gray-300"
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
                  className="group relative overflow-hidden w-full mt-1 py-3 rounded-xl font-toma text-white text-xs font-bold tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Verification Code</span>
                      <ArrowRight size={15} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="group relative overflow-hidden w-full mt-1 py-3 rounded-xl font-toma text-white text-xs font-bold tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Verify & Continue</span>
                      <ArrowRight size={15} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </button>
              )}
            </div>
          )}

          {/* Social Proof & Trust Strip */}
          <div className="pt-1">
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
            <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2.5 px-1">
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
          <p className="font-modelica text-[10px] text-center text-gray-400 leading-relaxed border-t border-gray-100 pt-2.5">
            By signing in, you agree to Gomzi's{" "}
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
