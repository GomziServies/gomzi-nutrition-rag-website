import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmailApi } from "../../api/auth.api";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("Invalid verification link.");
          setLoading(false);
          return;
        }

        const response = await verifyEmailApi({ token });

        setSuccess(true);
        setMessage(response.data.message);
      } catch (error) {
        setSuccess(false);
        setMessage(error.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center shadow-2xl border border-white/20 animate-pulse">
            <div className="w-16 h-16 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>

            <h2 className="text-white text-2xl font-bold mt-6">Verifying...</h2>

            <p className="text-white/80 mt-2">
              Please wait while we verify your email.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center shadow-2xl animate-[fadeIn_0.5s_ease-in-out]">
            <div
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl animate-bounce ${
                success
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {success ? "✅" : "❌"}
            </div>

            <h1
              className={`text-3xl font-bold mt-6 ${
                success ? "text-green-600" : "text-red-600"
              }`}
            >
              {success ? "Email Verified!" : "Verification Failed"}
            </h1>

            <p className="text-gray-600 mt-4">{message}</p>

            {success && (
              <button
                onClick={() => navigate("/login")}
                className="mt-8 px-6 py-3 relative overflow-hidden group btn-gradient text-white rounded-xl font-bold border border-amber-400/30 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10">Continue to Login →</span>
              </button>
            )}

            {!success && (
              <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 relative overflow-hidden group btn-gradient text-white rounded-xl font-bold border border-amber-400/30 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10">Back to Home</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
