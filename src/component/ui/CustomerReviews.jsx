import { useState, useRef } from "react";
import {
  getProductFeedbackApi,
  addProductFeedbackApi,
} from "../../api/feedback.api";
import { useEffect } from "react";
import LoginModal from "../auth/LoginModal";
import useAuth from "../../hooks/useAuth";

function StarRating({ rating, size = "md" }) {
  const sizeClass =
    size === "lg" ? "w-6 h-6" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${
            star <= rating ? "text-yellow-400" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function InteractiveStarRating({ rating, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-8 h-8 cursor-pointer transition-all duration-150 ${
            star <= (hovered || rating)
              ? "text-yellow-400 scale-110"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ star, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <StarRating rating={star} size="md" />
      <div className="flex-1 h-3 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-btn-dark)] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[var(--color-text-light)] w-4 text-right ">
        {count}
      </span>
    </div>
  );
}
function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);

  const content = review.feedback_comment || "";
  const isLong = content.length > 200;

  const displayText =
    !expanded && isLong ? content.slice(0, 200) + "..." : content;

  return (
    <div className="bg-[var(--color-bg)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5">
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={review.feedback_point || 0} size="sm" />

        <span className="text-xs text-gray-500">
          {review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>

      <div className="mb-2">
        <p className="font-semibold">
          {review.user
            ? `${review.user.first_name} ${review.user.last_name}`
            : "Anonymous"}
        </p>
      </div>

      <p className="text-sm text-gray-700 whitespace-pre-line">
        {displayText}

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-blue-500"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
}

function WriteReviewForm({ product, onClose, closing, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!product) {
        alert("Product not found");
        return;
      }

      if (!rating) {
        alert("Please select a rating");
        return;
      }

      if (!body.trim()) {
        alert("Please share your experience");
        return;
      }

      setSubmitting(true);

      const payload = {
        feedback_point: rating,
        feedback_comment: body.trim(),
        product_id: product,
      };

      await onSubmit(payload);

      setRating(5);
      setBody("");
    } catch (error) {
      console.error("Review submission failed:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to submit your review. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
          }

          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
          }

          to {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
          }
        }
      `}</style>

      <div
        style={{
          animation: closing
            ? "slideUp 0.35s ease both"
            : "slideDown 0.4s ease both",
        }}
        className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          p-6
          sm:p-8
          mb-8
          shadow-sm
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="text-center mb-7">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Share your experience
          </h3>

          <p className="mt-2 text-sm text-gray-500 ">
            Your feedback helps other customers make better choices.
          </p>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center mb-7">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            How would you rate this product?
          </p>

          <InteractiveStarRating rating={rating} onChange={setRating} />

          <p className="mt-2 text-xs text-gray-400 ">
            {rating === 5
              ? "Excellent"
              : rating === 4
                ? "Very good"
                : rating === 3
                  ? "Good"
                  : rating === 2
                    ? "Could be better"
                    : "Not satisfied"}
          </p>
        </div>

        {/* Review */}
        <div className="mb-6">
          <label
            className="
              block
              text-sm
              font-semibold
              text-gray-800
              mb-2
             
            "
          >
            Tell us what you think
          </label>

          <textarea
            className="
              w-full
              min-h-[140px]
              border
              border-gray-200
              rounded-xl
              px-4
              py-3
              text-sm
              text-gray-900
              bg-white
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-primary
              resize-none
              transition
             
            "
            placeholder="What did you like about this product? Share your honest experience..."
            maxLength={1000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400 ">
              Your honest feedback is appreciated.
            </span>

            <span className="text-xs text-gray-400 ">
              {body.length}/1000
            </span>
          </div>
        </div>

        {/* Privacy */}
        <div className="flex gap-2 items-start mb-6 p-3 rounded-lg bg-gray-50">
          <span className="text-sm">🔒</span>

          <p className="text-xs leading-5 text-gray-500 ">
            Your review may be displayed publicly on the product page.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="
              px-6
              py-3
              rounded-xl
              border
              border-gray-200
              text-sm
              font-semibold
              text-gray-700
              hover:bg-gray-50
              transition
              disabled:opacity-50
             
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={submitting || !body.trim()}
            onClick={handleSubmit}
            className="
              relative overflow-hidden group
              px-7
              py-3
              rounded-xl
              btn-gradient
              hover:from-primary-hover hover:to-[#381c14]
              text-white
              text-sm
              font-bold
              border border-amber-400/30
              shadow-md shadow-primary/25
              hover:shadow-lg hover:shadow-primary/40
              hover:-translate-y-0.5 active:scale-[0.98]
              transition-all duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:translate-y-0
             
              cursor-pointer
            "
          >
            <span className="relative z-10">{submitting ? "Posting..." : "Post Review"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CustomerReviews(props) {
  const { product } = props;
  const { isAuthenticated, fetchProfile } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // "hidden" | "open" | "closing"
  const [formState, setFormState] = useState("hidden");
  const totalPages = 3;
  const formRef = useRef(null);
  const fetchReviews = async (product_id) => {
    try {
      setLoading(true);
      console.log("faaah");
      const response = await getProductFeedbackApi(product_id);
      console.log(response);
      // Adjust according to your API response structure
      const reviewData = response?.data.data || [];
      setReviews(reviewData);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      fetchReviews(product);
    }
  }, [product]);

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    // User is logged in
    if (formState === "open") {
      setFormState("closing");

      setTimeout(() => {
        setFormState("hidden");
      }, 400);
    } else if (formState === "hidden") {
      setFormState("open");

      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  };

  const handleFormClose = () => {
    setFormState("closing");
    setTimeout(() => setFormState("hidden"), 400);
  };

  const isFormVisible = formState === "open" || formState === "closing";

  const totalReviews = reviews.length;

  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + (review.feedback_point || 0),
            0,
          ) / totalReviews
        ).toFixed(1)
      : 0;

  const ratingCounts = {
    5: reviews.filter((r) => r.feedback_point === 5).length,
    4: reviews.filter((r) => r.feedback_point === 4).length,
    3: reviews.filter((r) => r.feedback_point === 3).length,
    2: reviews.filter((r) => r.feedback_point === 2).length,
    1: reviews.filter((r) => r.feedback_point === 1).length,
  };
  return (
    <>
      <div className="bg-[var(--color-bg-light)] py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-6 ">
            Customer Reviews
          </h2>

          {/* Summary Card */}
          <div className="bg-[var(--color-bg)] rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5 sm:p-12 mb-8 shadow-[var(--shadow-sm)]">
            <div className="flex flex-col sm:flex-row sm:items-center">
              {/* Score */}
              <div className="flex-shrink-0 sm:pr-8 md:pr-15 pb-5 sm:pb-0">
                <StarRating rating={5} size="lg" />
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-bold text-[var(--color-text)] ">
                    {avgRating} out of 5
                  </span>
                </div>
                <p className="text-base text-[var(--color-text-light)] mt-1 ">
                  Based on {totalReviews} reviews
                </p>
              </div>

              <div className="hidden sm:block w-px self-stretch bg-[var(--color-border)] mx-0" />
              <div className="block sm:hidden h-px w-full bg-[var(--color-border)] mb-5" />

              {/* Bars */}
              <div className="flex-1 sm:px-8 pb-5 sm:pb-0 flex items-center justify-center">
                <div className="flex flex-col gap-1.5 w-full max-w-md">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <RatingBar
                      key={s}
                      star={s}
                      count={ratingCounts[s]}
                      total={totalReviews}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden sm:block w-px self-stretch bg-[var(--color-border)] mx-0" />
              <div className="block sm:hidden h-px w-full bg-[var(--color-border)] mb-5" />

              {/* CTA - button text changes based on form state */}
              <div className="flex-shrink-0 sm:pl-8 flex items-center justify-start sm:justify-center">
                <button
                  onClick={handleWriteReview}
                  className="relative overflow-hidden group btn-gradient text-white font-bold text-sm px-8 py-3.5 w-full rounded-xl border border-amber-400/30 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  <span className="relative z-10">{formState === "open" ? "Cancel Review" : "Write a Review"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Write Review Form - slides in/out below summary card */}
          <div ref={formRef}>
            {isFormVisible && (
              <WriteReviewForm
                product={product}
                onClose={handleFormClose}
                closing={formState === "closing"}
                onSubmit={async (payload) => {
                  await addProductFeedbackApi(payload);
                  await fetchReviews(product);
                  handleFormClose();
                }}
              />
            )}
          </div>

          {/* Reviews Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
              <p className="mt-3 text-gray-500">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No reviews yet. Be the first to review this product.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-8">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {reviews.length > 10 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-light)] hover:bg-[var(--color-section)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] text-sm font-semibold transition-colors  border ${
                    currentPage === p
                      ? "bg-gradient-to-r from-primary to-primary-hover text-white border-amber-400/30 shadow-xs"
                      : "border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-section)]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-light)] hover:bg-[var(--color-section)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-light)] hover:bg-[var(--color-section)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors "
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 5l7 7-7 7M6 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={async () => {
          await fetchProfile();
          setShowLogin(false);

          // Open review form after successful login
          setFormState("open");

          setTimeout(() => {
            formRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }}
      />
    </>
  );
}