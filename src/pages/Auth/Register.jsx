import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { successToast, errorToast } from "../../utils/toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    birth_date: "",
  });
  const [focused, setFocused] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    password: false,
    birth_date: false,
  });

  const isFloated = (key) => focused[key] || form[key].length > 0;

  const handleChange = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const handleFocus = (key) => setFocused((p) => ({ ...p, [key]: true }));
  const handleBlur = (key) => setFocused((p) => ({ ...p, [key]: false }));
  const navigate = useNavigate();
  const fields = [
    { key: "first_name", label: "First Name", type: "text" },
    { key: "last_name", label: "Last Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "mobile", label: "Phone Number", type: "tel" },
  ];

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [dobFocused, setDobFocused] = useState(false);
  const isDobFloated = dobFocused || form.birth_date.length > 0;

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

  const handleRegister = async () => {
    try {
      setLoading(true);
      const payload = {
        ...form,
        birth_date: formatBirthDate(form.birth_date),
      };
      const result = await registerUser(payload);

      if (!result.success) {
        errorToast(result.message);
        return;
      }

      successToast("Verification email sent");

      navigate("/login");
    } catch (error) {
      errorToast("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  const formatBirthDate = (dateStr) => {
    const parts = dateStr.split(" / ");

    if (parts.length !== 3) return "";

    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen w-full flex font-modelica bg-bg">
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12"
        style={{ background: "#000000" }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 110%, #95442c 0%, transparent 65%)",
            opacity: 0.18,
          }}
        />

        {/* Teal accent line */}
        <div
          className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #95442c 25%, #95442c 75%, transparent 100%)",
            boxShadow: "0 0 12px 2px rgba(125,217,217,0.35)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <img
            src="/images/whitelogo.webp"
            alt="Gomzi Supplement by RAG"
            className="h-11 object-contain object-left"
          />
        </div>

        {/* Hero */}
        <div className="relative z-10 flex flex-col gap-6">
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

          <h1
            className="font-toma text-white leading-none"
            style={{
              fontSize: "clamp(2.8rem, 4.5vw, 4rem)",
              letterSpacing: "-2px",
            }}
          >
            Start Your
            <br />
            <span style={{ color: "#95442c" }}>Journey.</span>
          </h1>

          <p
            className="font-modelica text-base leading-relaxed max-w-xs"
            style={{ color: "#9ca3af" }}
          >
            Join thousands who've transformed their health with science-backed
            nutrition.
          </p>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="h-px w-full" style={{ background: "#1f1f1f" }} />
          <p className="font-modelica text-xs" style={{ color: "#4b5563" }}>
            © 2025 Gomzi Supplement by RAG. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 py-12 sm:px-10 bg-white relative overflow-y-auto">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-10">
          <img
            src="/images/rag-icon-logo.png"
            alt="Gomzi Supplement by RAG"
            className="h-8 object-contain"
          />
        </div>

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
              Create account.
            </h2>
            <p className="font-modelica text-sm" style={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-modelica font-semibold underline underline-offset-2 transition-colors bg-transparent border-none cursor-pointer"
                style={{ color: "#111111" }}
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Social Signup */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-[10px] border font-modelica text-sm font-semibold transition-all hover:bg-gray-50 active:scale-[0.98]"
              style={{
                borderColor: "#e5e7eb",
                color: "#111111",
                background: "#ffffff",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span
              className="font-modelica text-xs"
              style={{ color: "#9ca3af" }}
            >
              or register with email
            </span>
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Text Fields */}
            {fields.map(({ key, label, type }) => (
              <div
                key={key}
                className="relative w-full rounded-[10px] border transition-all duration-150"
                style={{
                  borderColor: focused[key] ? "#111111" : "#e5e7eb",
                  boxShadow: focused[key]
                    ? "0 0 0 3px rgba(17,17,17,0.06)"
                    : "none",
                  background: "#ffffff",
                }}
              >
                <label
                  className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                  style={{
                    top: isFloated(key) ? "8px" : "50%",
                    transform: isFloated(key) ? "none" : "translateY(-50%)",
                    fontSize: isFloated(key) ? "10px" : "14px",
                    color: "#9ca3af",
                    fontWeight: isFloated(key) ? 500 : 400,
                    zIndex: 1,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3"
                  style={{
                    paddingTop: isFloated(key) ? "22px" : "14px",
                    color: "#111111",
                    colorScheme: type === "date" ? "light" : undefined,
                  }}
                />
              </div>
            ))}

            {/* DOB Field */}
            <div
              className="relative w-full rounded-[10px] border transition-all duration-150"
              style={{
                borderColor: dobFocused ? "#111111" : "#e5e7eb",
                boxShadow: dobFocused
                  ? "0 0 0 3px rgba(17,17,17,0.06)"
                  : "none",
                background: "#ffffff",
              }}
            >
              <label
                className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                style={{
                  top: isDobFloated ? "8px" : "50%",
                  transform: isDobFloated ? "none" : "translateY(-50%)",
                  fontSize: isDobFloated ? "10px" : "14px",
                  color: "#9ca3af",
                  fontWeight: isDobFloated ? 500 : 400,
                  zIndex: 1,
                }}
              >
                Date of Birth
              </label>
              <input
                type="text"
                placeholder={isDobFloated ? "DD / MM / YYYY" : ""}
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
                onFocus={() => setDobFocused(true)}
                onBlur={() => setDobFocused(false)}
                maxLength={14}
                className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3"
                style={{
                  paddingTop: isDobFloated ? "22px" : "14px",
                  color: "#111111",
                }}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div
                className="relative w-full rounded-[10px] border transition-all duration-150"
                style={{
                  borderColor: focused.password ? "#111111" : "#e5e7eb",
                  boxShadow: focused.password
                    ? "0 0 0 3px rgba(17,17,17,0.06)"
                    : "none",
                  background: "#ffffff",
                }}
              >
                <label
                  className="absolute left-4 transition-all duration-150 pointer-events-none font-modelica"
                  style={{
                    top: isFloated("password") ? "8px" : "50%",
                    transform: isFloated("password")
                      ? "none"
                      : "translateY(-50%)",
                    fontSize: isFloated("password") ? "10px" : "14px",
                    color: "#9ca3af",
                    fontWeight: isFloated("password") ? 500 : 400,
                  }}
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => {
                    handleChange("password", e.target.value);
                    checkStrength(e.target.value);
                  }}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  className="w-full bg-transparent outline-none font-modelica text-sm px-4 pb-3 pr-12"
                  style={{
                    paddingTop: isFloated("password") ? "22px" : "14px",
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

              {/* Password Strength */}
              {form.password.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-1.5">
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
                    className="font-modelica text-xs"
                    style={{ color: strengthColor[passwordStrength] }}
                  >
                    {strengthLabel[passwordStrength]}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              className="w-full py-4 rounded-[10px] font-toma text-white text-base tracking-wide transition-all duration-150 hover:opacity-85 active:scale-[0.98] shadow-md mt-1"
              style={{ background: "#000000", letterSpacing: "0.3px" }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          {/* Trust badges */}
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
            By creating an account, you agree to our{" "}
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
