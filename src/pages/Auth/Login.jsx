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
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
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
    <div className="min-h-screen w-full flex bg-[#faf9f8] font-modelica text-[#1c1c28]">
      {/* ── LEFT PANEL: Authentic Athletic Brand Showcase (Desktop lg+) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[48%] xl:w-[46%] relative overflow-hidden p-10 xl:p-14 text-white select-none shrink-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(16, 10, 8, 0.55) 0%, rgba(16, 10, 8, 0.82) 55%, rgba(10, 6, 5, 0.96) 100%), url('/images/gym-owner.webp') center/cover no-repeat",
        }}
      >
        {/* Subtle Ambient Vignette & Warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

        {/* Top Header: Brand Logo & Official Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
            <img
              src="/images/whitelogo.webp"
              alt="Gomzi Nutrition"
              className="h-10 xl:h-11 object-contain object-left"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/rag-icon-logo.png";
                e.currentTarget.className = "h-10 xl:h-11 object-contain filter brightness-0 invert";
              }}
            />
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 text-amber-300 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Official Brand Store
          </span>
        </div>

        {/* Center: Powerful Athletic Editorial Statement */}
        <div className="relative z-10 my-auto py-8 flex flex-col gap-6 max-w-xl">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-extrabold text-amber-400">
              <Sparkles size={14} className="text-amber-400" />
              <span>Certified Sports Nutrition</span>
            </div>

            <h1 className="font-toma text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
              FUEL YOUR BEST. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">
                ZERO SHORTCUTS.
              </span>
            </h1>

            <p className="text-sm xl:text-base text-gray-300 leading-relaxed max-w-md font-normal mt-1">
              Join 50,000+ elite athletes & fitness enthusiasts. Direct factory-fresh supplements, 100% label accuracy, and exclusive member benefits.
            </p>
          </div>

          {/* Genuine Verified Customer Proof Card */}
          <div className="relative bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#fbbf24" strokeWidth={0} />
              ))}
              <span className="ml-2 text-xs font-bold text-white">4.9 / 5 Rating</span>
            </div>
            <p className="text-xs xl:text-sm text-gray-200 italic leading-relaxed">
              "Gomzi 100% Whey Isolate has the best mixability and digestion I have experienced. Zero bloating, great post-workout recovery."
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-[11px]">
              <span className="font-bold text-white">Aman Verma</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified Athlete
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators Strip */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
          <span className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck size={16} className="text-emerald-400" /> 100% Lab Tested
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 size={16} className="text-amber-400" /> FSSAI Certified
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Sparkles size={16} className="text-cyan-400" /> Pan-India Express
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL: Clean, High-Conversion E-Commerce Auth Portal ── */}
      <div className="flex-1 flex flex-col justify-between items-center px-4 sm:px-8 py-6 sm:py-10 overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="w-full max-w-[440px] flex items-center justify-between shrink-0 mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#5C3124] transition-colors py-2 px-3 rounded-lg hover:bg-black/5 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back to Store</span>
          </button>

          {/* Mobile Logo on small screens */}
          <Link to="/" className="lg:hidden">
            <img
              src="/images/rag-icon-logo.png"
              alt="Gomzi Supplement"
              className="h-8 object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/gomzi-supplements-dark.webp";
              }}
            />
          </Link>
        </div>

        {/* Auth Main Card */}
        <div className="w-full max-w-[440px] bg-white rounded-3xl border border-[#ebdcd7] p-7 sm:p-9 shadow-xl shadow-[#5C3124]/5 my-auto flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col gap-1 text-left">
            <h2 className="font-toma text-2xl sm:text-3xl font-black text-[#1c1c28] tracking-tight">
              Sign In to Gomzi
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
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
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                or sign in with
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#f5f1ee] border border-[#ebdcd7] text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setLoginType("otp");
              }}
              className={`py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                loginType === "otp"
                  ? "bg-[#5C3124] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
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
                  ? "bg-[#5C3124] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
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
                  <label className="text-xs font-bold text-gray-700">
                    Mobile Number or Email
                  </label>
                  {otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className="text-[11px] text-[#5C3124] font-bold hover:underline cursor-pointer"
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
                  <div className="pl-3.5 pr-1 text-gray-500 font-bold text-xs flex items-center gap-1.5 select-none">
                    {isIdentifierEmail ? (
                      <Mail size={16} className={identifierFocused ? "text-[#5C3124]" : ""} />
                    ) : (
                      <>
                        <span className="text-sm">🇮🇳</span>
                        <span className="text-gray-700 font-semibold">+91</span>
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
                    className="w-full bg-transparent outline-none text-xs sm:text-sm px-2 py-3.5 text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500 rounded-xl"
                  />
                </div>
              </div>

              {/* OTP Field (Visible when code is sent) */}
              {otpSent && (
                <div className="flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700">
                      6-Digit Verification Code
                    </label>
                    {resendCountdown > 0 ? (
                      <span className="text-[11px] text-gray-400 font-semibold">
                        Resend in {resendCountdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="text-[11px] text-[#5C3124] font-bold hover:underline cursor-pointer"
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
                      className="w-full bg-transparent outline-none font-mono text-center text-xl tracking-[0.4em] font-bold py-3.5 text-gray-900 placeholder:text-gray-300"
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
                  className="group relative overflow-hidden w-full mt-1 py-3.5 rounded-xl font-toma text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="relative z-10">Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Get Verification Code</span>
                      <ArrowRight size={16} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="group relative overflow-hidden w-full mt-1 py-3.5 rounded-xl font-toma text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="relative z-10">Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Verify & Sign In</span>
                      <ArrowRight size={16} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </button>
              )}
            </div>
          ) : (
            /* FORM: Password Mode */
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Email Address
                </label>
                <div
                  className={`relative flex items-center rounded-xl border bg-white transition-all duration-200 ${
                    emailFocused
                      ? "border-[#5C3124] ring-2 ring-[#5C3124]/15 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="pl-3.5 text-gray-400">
                    <Mail size={16} className={emailFocused ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full bg-transparent outline-none text-xs sm:text-sm px-3 py-3.5 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700">
                    Password
                  </label>
                  <span className="text-[11px] text-[#5C3124] font-semibold hover:underline cursor-pointer select-none">
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
                  <div className="pl-3.5 text-gray-400">
                    <Lock size={16} className={passwordFocused ? "text-[#5C3124]" : ""} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full bg-transparent outline-none text-xs sm:text-sm px-3 py-3.5 pr-10 text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative overflow-hidden w-full mt-1 py-3.5 rounded-xl font-toma text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 hover:-translate-y-0.5 active:scale-[0.99] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10">Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Sign In to Account</span>
                    <ArrowRight size={16} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              </button>
            </form>
          )}

          {/* New to Store Registration Link */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-center text-xs text-gray-600">
            <span>New to Gomzi Nutrition?</span>
            <Link
              to="/register"
              className="ml-1.5 font-bold text-[#5C3124] hover:text-[#45241a] hover:underline"
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
          <Link to="/terms-and-conditions" className="text-gray-600 underline hover:text-[#5C3124]">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-gray-600 underline hover:text-[#5C3124]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
