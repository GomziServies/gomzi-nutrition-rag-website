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
        errorToast(result.message || "Failed to send OTP");
        return;
      }

      const devOtp = result?.data?.data?.OTP;
      setOtpSent(true);

      if (devOtp) {
        setOtp(String(devOtp));
        successToast(`OTP sent! (Dev Auto-fill: ${devOtp})`);
      } else {
        successToast(result.data?.message || "OTP has been sent");
      }
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
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 mx-4 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Welcome back</h2>

            <p className="text-sm text-gray-500 mt-1">Login to continue</p>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100"
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
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-black transition-all duration-300 ${
              loginType === "password" ? "left-1" : "left-[50%]"
            }`}
          />
        </div>

        {/* Password Login */}
        {loginType === "password" ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="group relative overflow-hidden w-full bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 cursor-pointer disabled:opacity-60"
            >
              <span className="relative z-10">{loading ? "Signing In..." : "Sign In"}</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
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
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="group relative overflow-hidden w-full bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 cursor-pointer disabled:opacity-60"
              >
                <span className="relative z-10">Send OTP</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </button>
            ) : (
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="group relative overflow-hidden w-full bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 cursor-pointer disabled:opacity-60"
              >
                <span className="relative z-10">Verify OTP</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
