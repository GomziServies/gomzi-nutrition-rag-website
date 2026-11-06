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
    <div className="min-h-[50vh] flex items-center justify-center bg-light px-4 py-12">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="site-surface p-6 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

            <h2 className="text-text text-2xl font-bold mt-6">Verifying...</h2>

            <p className="text-text-light mt-2">
              Please wait while we verify your email.
            </p>
          </div>
        ) : (
          <div className="site-surface p-6 sm:p-10 text-center">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
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
                className="site-button mt-8"
              >
                Continue to Login →
              </button>
            )}

            {!success && (
              <button
                onClick={() => navigate("/")}
                className="site-button mt-8"
              >
                Back to Home
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
