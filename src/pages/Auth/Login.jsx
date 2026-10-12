import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, sendOTP, verifyOTP } from "../../services/auth.service";
import { setToken } from "../../utils/storage";
import { successToast, errorToast } from "../../utils/toast";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/auth.api";
import { Lock, MessageSquare } from "lucide-react";
// import LoginModal from "../../component/auth/LoginModal";

export default function LoginPage() {
  // const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailAndMobileFocused, setEmailAndMobileFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginType, setLoginType] = useState("password");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  const isEmailFloated = emailFocused || email.length > 0;
  const isEMailAndMobileFloated =
    emailAndMobileFocused || identifier.length > 0;
  const isPasswordFloated = passwordFocused || password.length > 0;

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await loginUser({
        email,
        password,
      });

      if (!result.success) {
        errorToast(result.message);
        return;
      }

      const response = result.data;

      if (response.errorCode === "ERR#VERIFICATION-REQUIRED") {
        navigate("/verify-account");
      }
      setToken(response.data.authorization);

      successToast("Login successful");

      window.location.replace("/");
    } catch (error) {
      errorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      setLoading(true);

      const isEmail = identifier.includes("@");

      const payload = isEmail
        ? {
            email: identifier,
          }
        : {
            mobile: identifier,
            country_code: "+91",
          };

      const result = await sendOTP(payload);

      if (!result.success) {
        errorToast(result.data.message);
        return;
      }

      const verificationId = result?.data?.data?.verification_id;

      setVerificationId(verificationId);

      setOtpSent(true);

      successToast(result.data.message);
    } catch (error) {
      errorToast("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      const isEmail = identifier.includes("@");

      const payload = isEmail
        ? {
            email: identifier,
            otp,
          }
        : {
            mobile: identifier,
            country_code: "+91",
            otp,
          };

      const result = await verifyOTP(payload);

      const token = result.data.data.authorization;

      setToken(token);

      successToast("Login successful");

      window.location.replace("/");
    } catch (error) {
      errorToast("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      console.log("Google Credential:", credentialResponse);

      const result = await googleLogin(credentialResponse.credential);

      console.log("API RESULT:", result);

      const token = result.data.data.authorization;

      setToken(token);

      successToast("Login successful");

      window.location.replace("/");
    } catch (error) {
      console.error(error);
      errorToast("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-modelica bg-bg">
      {/* ── LEFT PANEL - Brand Visual ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12"
        style={{ background: "#000000" }}
      >
        {/* Background gradient accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 110%, #95442c 0%, transparent 65%)",
            opacity: 0.18,
          }}
        />

        {/* Teal vertical accent line */}
        <div
          className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #95442c 25%, #95442c 75%, transparent 100%)",
            boxShadow: "0 0 12px 2px rgba(125,217,217,0.35)",
          }}
        />

        {/* Top - Logo */}
        <div className="relative z-10">
          <img
            src="/images/whitelogo.webp"
            alt="Gomzi Supplement by RAG"
            className="h-11 object-contain object-left"
          />
        </div>

        {/* Center - Hero text only */}
        <div className="relative z-10 flex flex-col gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#95442c" }}
            />
            <span
              className="text-xs tracking-widest uppercase font-modelica"
              style={{ color: "#95442c" }}
            >
              Premium Nutrition
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-toma text-white leading-none"
            style={{
              fontSize: "clamp(2.8rem, 4.5vw, 4rem)",
              letterSpacing: "-2px",
            }}
          >
            Fuel Your
            <br />
            <span style={{ color: "#95442c" }}>Best Self.</span>
          </h1>

          {/* Subtext */}
          <p
            className="font-modelica text-base leading-relaxed max-w-xs"
            style={{ color: "#9ca3af" }}
          >
            Science-backed, super-delicious nutrition for your busy days.
          </p>
        </div>

        {/* Bottom - just divider and copyright */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="h-px w-full" style={{ background: "#1f1f1f" }} />
          <p className="font-modelica text-xs" style={{ color: "#4b5563" }}>
            ©2026 Gomzi Supplement by RAG. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL - Login Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 py-12 sm:px-10 bg-white relative">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-10">
          <img
            src="/images/rag-icon-logo.png"
            alt="Gomzi Supplement by RAG"
            className="h-10 object-contain"
          />
        </div>
        {/* <button
          onClick={() => setShowLogin(true)}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Login
        </button>

        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            console.log("logged in");
          }}
        /> */}

        {/* Card */}
        <div className="w-full max-w-[420px] flex flex-col gap-7">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h2
              className="font-toma text-text leading-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 2.6rem)",
                letterSpacing: "-1px",
              }}
            >
              Welcome back.
            </h2>
            <p className="font-modelica text-sm" style={{ color: "#6b7280" }}>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-modelica font-semibold underline underline-offset-2 transition-colors bg-transparent border-none cursor-pointer"
                style={{ color: "#111111" }}
              >
                Sign up free
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                errorToast("Google login failed");
              }}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span
              className="font-modelica text-xs"
              style={{ color: "#9ca3af" }}
            >
              or sign in with email
            </span>
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          </div>
          <div
            className="relative flex p-1 rounded-xl mb-2"
            style={{
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={() => {
                setLoginType("password");
                setOtpSent(false);
              }}
              className={`relative z-10 flex-1 py-3 rounded-lg text-sm font-modelica font-medium transition-all duration-300 ${
                loginType === "password" ? "text-white" : "text-gray-500"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Lock size={14} />
                Password Login
              </span>
            </button>

            <button
              onClick={() => {
                setLoginType("otp");
              }}
              className={`relative z-10 flex-1 py-3 rounded-lg text-sm font-modelica font-medium transition-all duration-300 ${
                loginType === "otp" ? "text-white" : "text-gray-500"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <MessageSquare size={14} />
                OTP Login
              </span>
            </button>

            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300"
              style={{
                background: "#111111",
                left: loginType === "password" ? "4px" : "50%",
              }}
            />
          </div>

          {/* Form */}
          {loginType === "password" ? (
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div
                className="relative w-full rounded-[10px] border transition-all duration-150"
                style={{
                  borderColor: emailFocused ? "#111111" : "#e5e7eb",
                  boxShadow: emailFocused
                    ? "0 0 0 3px rgba(17,17,17,0.06)"
                    : "none",
                  background: "#ffffff",
                }}
              >
                <label
                  className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                  style={{
                    top: isEmailFloated ? "8px" : "50%",
                    transform: isEmailFloated ? "none" : "translateY(-50%)",
                    fontSize: isEmailFloated ? "10px" : "14px",
                    color: "#9ca3af",
                    fontWeight: isEmailFloated ? 500 : 400,
                  }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3"
                  style={{
                    paddingTop: isEmailFloated ? "22px" : "14px",
                    color: "#111111",
                  }}
                />
              </div>
              {/* Password */}
              <div
                className="relative w-full rounded-[10px] border transition-all duration-150"
                style={{
                  borderColor: passwordFocused ? "#111111" : "#e5e7eb",
                  boxShadow: passwordFocused
                    ? "0 0 0 3px rgba(17,17,17,0.06)"
                    : "none",
                  background: "#ffffff",
                }}
              >
                <label
                  className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                  style={{
                    top: isPasswordFloated ? "8px" : "50%",
                    transform: isPasswordFloated ? "none" : "translateY(-50%)",
                    fontSize: isPasswordFloated ? "10px" : "14px",
                    color: "#9ca3af",
                    fontWeight: isPasswordFloated ? 500 : 400,
                  }}
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3 pr-12"
                  style={{
                    paddingTop: isPasswordFloated ? "22px" : "14px",
                    color: "#111111",
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  style={{ color: "#9ca3af" }}
                >
                  {showPassword ? (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                {/* <label
                className="flex items-center gap-2.5 cursor-pointer select-none"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all duration-150 border"
                  style={{
                    background: rememberMe ? "#111111" : "#ffffff",
                    borderColor: rememberMe ? "#111111" : "#d1d5db",
                  }}
                >
                  {rememberMe && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className="font-modelica text-xs"
                  style={{ color: "#6b7280" }}
                >
                  Remember me
                </span>
              </label> */}
                {/* <a
                  href="/forgot-password"
                  className="font-modelica text-xs underline underline-offset-2 transition-colors hover:opacity-70"
                  style={{ color: "#111111" }}
                >
                  Forgot password?
                </a> */}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-4 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md"
                style={{ background: "#000000", letterSpacing: "0.3px" }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          ) : (
            <>
              <div
                className="relative w-full rounded-[10px] border transition-all duration-150"
                style={{
                  borderColor: emailFocused ? "#111111" : "#e5e7eb",
                  boxShadow: emailFocused
                    ? "0 0 0 3px rgba(17,17,17,0.06)"
                    : "none",
                  background: "#ffffff",
                }}
              >
                <label
                  className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                  style={{
                    top: isEMailAndMobileFloated ? "8px" : "50%",
                    transform: isEMailAndMobileFloated
                      ? "none"
                      : "translateY(-50%)",
                    fontSize: isEMailAndMobileFloated ? "10px" : "14px",
                    color: "#9ca3af",
                    fontWeight: isEMailAndMobileFloated ? 500 : 400,
                  }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  onFocus={() => setEmailAndMobileFocused(true)}
                  onBlur={() => setEmailAndMobileFocused(false)}
                  className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3"
                  style={{
                    paddingTop: isEmailFloated ? "22px" : "14px",
                    color: "#111111",
                  }}
                />
              </div>
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded px-4 py-3"
                />
              )}

              {!otpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full py-4 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md"
                  style={{ background: "#000000", letterSpacing: "0.3px" }}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full py-4 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md"
                  style={{ background: "#000000", letterSpacing: "0.3px" }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              )}
            </>
          )}

          {/* Stats row - moved from left panel */}
          <div
            className="flex items-center justify-between rounded-[10px] px-5 py-4"
            style={{ background: "#f8f9fb", border: "1px solid #e5e7eb" }}
          >
            {[
              { val: "300+", label: "Reviews" },
              { val: "5★", label: "Rating" },
              { val: "100%", label: "Natural" },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span
                  className="font-toma text-xl leading-none"
                  style={{ color: "#111111", letterSpacing: "-0.5px" }}
                >
                  {s.val}
                </span>
                <span
                  className="font-modelica text-xs"
                  style={{ color: "#9ca3af" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Trust badges - moved from left panel */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              {
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                text: "Secure & Encrypted",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                ),
                text: "Free Shipping",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ),
                text: "30-Day Returns",
              },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                {b.icon}
                <span
                  className="font-modelica text-xs"
                  style={{ color: "#6b7280" }}
                >
                  {b.text}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p
            className="font-modelica text-xs text-center leading-relaxed"
            style={{ color: "#9ca3af" }}
          >
            By signing in, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-1"
              style={{ color: "#6b7280" }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-1"
              style={{ color: "#6b7280" }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
