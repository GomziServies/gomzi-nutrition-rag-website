import AccountLayout from "../../component/common/AccountLayout";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const requestedRedirect = searchParams.get("redirect");
  const redirectTo = ["/checkouts", "/cart", "/profile"].includes(requestedRedirect) ? requestedRedirect : "/";
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
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

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
        errorToast("Please verify your email using the link in your inbox before signing in.");
        return;
      }
      setToken(response.data.authorization);

      successToast("Login successful");

      window.location.replace(redirectTo);
    } catch {
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
        errorToast(result.message || "Could not send OTP. Please try again.");
        return;
      }

      setOtpSent(true);

      successToast(result.data.message);
    } catch {
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

      if (!result.success) { errorToast(result.message || "Invalid OTP"); return; }
      const token = result.data.data.authorization;

      setToken(token);

      successToast("Login successful");

      window.location.replace(redirectTo);
    } catch {
      errorToast("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);



      const result = await googleLogin(credentialResponse.credential);



      const token = result.data.data.authorization;

      setToken(token);

      successToast("Login successful");

      window.location.replace(redirectTo);
    } catch (error) {
      console.error(error);
      errorToast("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout compact>
      <form
        className="login-content w-full flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (loginType === "password") handleLogin();
          else if (otpSent) handleVerifyOTP();
          else handleSendOTP();
        }}
      >
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1
            className="font-toma text-text leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2rem)",
              letterSpacing: "-1px",
            }}
          >
            Welcome back.
          </h1>
          <p className="font-modelica text-sm" style={{ color: "#6b7280" }}>
            Don't have an account?{" "}
            <button
              type="button"
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
          {googleClientId ? (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => errorToast("Google login failed")}
            />
          ) : (
            <p className="rounded-lg border border-border bg-light px-4 py-3 text-center text-xs text-text-light">
              Google sign-in is temporarily unavailable. Please use email or OTP.
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          <span
            className="font-modelica text-xs"
            style={{ color: "#70675f" }}
          >
            or sign in with email
          </span>
          <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
        </div>
        <div
          className="relative flex p-1 rounded-xl"
          style={{
            background: "#faf7f3",
            border: "1px solid #e5e7eb",
          }}
        >
          <button
            type="button"
            aria-pressed={loginType === "password"}
            onClick={() => {
              setLoginType("password");
              setOtpSent(false);
            }}
            className={`relative z-10 flex-1 min-h-11 py-2 rounded-lg text-sm font-modelica font-medium transition-all duration-300 ${loginType === "password" ? "text-white" : "text-gray-500"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Lock size={14} />
              Password Login
            </span>
          </button>

          <button
            type="button"
            aria-pressed={loginType === "otp"}
            onClick={() => {
              setLoginType("otp");
            }}
            className={`relative z-10 flex-1 min-h-11 py-2 rounded-lg text-sm font-modelica font-medium transition-all duration-300 ${loginType === "otp" ? "text-white" : "text-gray-500"
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
              background: "var(--color-primary)",
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
                borderColor: emailFocused ? "var(--color-primary)" : "var(--color-border)",
                boxShadow: emailFocused
                  ? "0 0 0 3px rgba(149,68,44,0.08)"
                  : "none",
                background: "#ffffff",
              }}
            >
              <label htmlFor="login-email"
                className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                style={{
                  top: isEmailFloated ? "8px" : "50%",
                  transform: isEmailFloated ? "none" : "translateY(-50%)",
                  fontSize: isEmailFloated ? "10px" : "14px",
                  color: "#70675f",
                  fontWeight: isEmailFloated ? 500 : 400,
                }}
              >
                Email address
              </label>
              <input
                type="email"
                id="login-email" autoComplete="email"
                required
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
                borderColor: passwordFocused ? "var(--color-primary)" : "var(--color-border)",
                boxShadow: passwordFocused
                  ? "0 0 0 3px rgba(149,68,44,0.08)"
                  : "none",
                background: "#ffffff",
              }}
            >
              <label htmlFor="login-password"
                className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                style={{
                  top: isPasswordFloated ? "8px" : "50%",
                  transform: isPasswordFloated ? "none" : "translateY(-50%)",
                  fontSize: isPasswordFloated ? "10px" : "14px",
                  color: "#70675f",
                  fontWeight: isPasswordFloated ? 500 : 400,
                }}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="login-password" autoComplete="current-password"
                required
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
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                style={{ color: "#70675f" }}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-11 py-3 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md"
              style={{ background: "var(--color-primary)", letterSpacing: "0.3px" }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        ) : (
          <>
            <div
              className="relative w-full rounded-[10px] border transition-all duration-150"
              style={{
                borderColor: emailFocused ? "var(--color-primary)" : "var(--color-border)",
                boxShadow: emailFocused
                  ? "0 0 0 3px rgba(149,68,44,0.08)"
                  : "none",
                background: "#ffffff",
              }}
            >
              <label htmlFor="login-identifier"
                className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                style={{
                  top: isEMailAndMobileFloated ? "8px" : "50%",
                  transform: isEMailAndMobileFloated
                    ? "none"
                    : "translateY(-50%)",
                  fontSize: isEMailAndMobileFloated ? "10px" : "14px",
                  color: "#70675f",
                  fontWeight: isEMailAndMobileFloated ? 500 : 400,
                }}
              >
                Email address
              </label>
              <input
                type="text"
                id="login-identifier" autoComplete="username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onFocus={() => setEmailAndMobileFocused(true)}
                onBlur={() => setEmailAndMobileFocused(false)}
                className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3"
                style={{
                  paddingTop: isEMailAndMobileFloated ? "22px" : "14px",
                  color: "#111111",
                }}
              />
            </div>
            {otpSent && (
              <input
                type="text"
                aria-label="One-time password" autoComplete="one-time-code" inputMode="numeric"
                required pattern="[0-9]{4,8}" maxLength={8}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded px-4 py-3"
              />
            )}

            {!otpSent ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-11 py-3 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md"
                style={{ background: "var(--color-primary)", letterSpacing: "0.3px" }}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-11 py-3 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md"
                style={{ background: "var(--color-primary)", letterSpacing: "0.3px" }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </>
        )}

        {/* Bottom note */}
        <p
          className="font-modelica text-xs text-center leading-relaxed"
          style={{ color: "#70675f" }}
        >
          By signing in, you agree to our{" "}
          <a
            href="/terms-and-conditions"
            className="underline underline-offset-1"
            style={{ color: "#6b7280" }}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="underline underline-offset-1"
            style={{ color: "#6b7280" }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </AccountLayout>
  );
}
