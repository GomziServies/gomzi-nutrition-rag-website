import { useState } from "react";
import { X, Lock, MessageSquare } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, sendOTP, verifyOTP } from "../../services/auth.service";
import { googleLogin } from "../../api/auth.api";
import { setToken } from "../../utils/storage";
import { successToast, errorToast } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { fetchProfile } = useAuth();
  const [loginType, setLoginType] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const closeModal = () => {
    onClose?.();
  };

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

      const token = result.data.data.authorization;

      setToken(token);

      await fetchProfile();
      successToast("Login successful");

      onSuccess?.(token);

      closeModal();
    } catch {
      errorToast("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      setLoading(true);

      const isEmail = identifier.includes("@");

      const payload = isEmail
        ? { email: identifier }
        : {
            mobile: identifier,
            country_code: "+91",
          };

      const result = await sendOTP(payload);

      if (!result.success) {
        errorToast(result.data.message);
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

      const token = result.data.data.authorization;

      setToken(token);

      await fetchProfile();
      successToast("Login successful");

      onSuccess?.(token);
      closeModal();
    } catch {
      errorToast("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);

      const result = await googleLogin(response.credential);

      const token = result.data.data.authorization;

      setToken(token);

      await fetchProfile();
      successToast("Login successful");

      onSuccess?.(token);
      closeModal();
    } catch {
      errorToast("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="site-surface site-form relative z-10 w-full max-w-md p-6 mx-4 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome back</h2>

            <p className="text-sm text-gray-500 mt-1">Login to continue</p>
          </div>

          <button
            onClick={closeModal}
            aria-label="Close login" className="p-2 rounded-lg hover:bg-bg-light"
          >
            <X size={18} />
          </button>
        </div>

        {/* Google */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => errorToast("Google login failed")}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Toggle */}
        <div className="relative flex p-1 bg-gray-100 rounded-xl mb-5">
          <button
            onClick={() => {
              setLoginType("password");
              setOtpSent(false);
            }}
            className={`flex-1 z-10 py-3 text-sm font-medium transition ${
              loginType === "password" ? "text-white" : "text-gray-500"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Lock size={15} />
              Password
            </span>
          </button>

          <button
            onClick={() => setLoginType("otp")}
            className={`flex-1 z-10 py-3 text-sm font-medium transition ${
              loginType === "otp" ? "text-white" : "text-gray-500"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <MessageSquare size={15} />
              OTP
            </span>
          </button>

          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-primary transition-all duration-300 ${
              loginType === "password" ? "left-1" : "left-[50%]"
            }`}
          />
        </div>

        {/* Password Login */}
        {loginType === "password" ? (
          <div className="space-y-4">
            <input
              type="email"
              aria-label="Email address" placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              aria-label="Password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            {otpSent && (
              <input
                type="text"
                aria-label="One-time password" autoComplete="one-time-code" placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl"
              >
                Verify OTP
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
