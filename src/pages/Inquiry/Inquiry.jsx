import React, { useState, useEffect, useId, useRef } from "react";
import SEO from "../../component/SEO";
import { states, getCities } from "../../utils/indiaLocation";
import ragLogo from "../../assets/rag-partner-logo.png";
import {
  sendContactInquiryApi,
  uploadFileApi,
  sendInquiryOtpApi,
  verifyInquiryOtpApi,
} from "../../api/contact.api";
import { errorToast, successToast } from "../../utils/toast";
import Confetti from "react-confetti";
import {
  User,
  Award,
  Briefcase,
  Share2,
  TrendingUp,
  ShieldCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Eye,
  Phone,
  Mail,
  Building,
  Target,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const EMPLOYMENT_TYPES = [
  "Self-employed",
  "Working at a Gym / Fitness Studio",
  "Running an Online Coaching Business",
  "Running Own Fitness Business",
  "Other",
];

const CLIENT_CATEGORIES = [
  "Weight Loss",
  "Muscle Building",
  "General Fitness",
  "Sports Performance",
  "Bodybuilding / Competition Prep",
  "Nutrition Coaching",
  "Other",
];

const CLIENT_ACQUISITION_CHANNELS = [
  "Gym / Fitness Studio",
  "Instagram / Social Media",
  "Referrals",
  "Online Coaching",
  "Personal Network",
  "Other",
];

const SALES_POTENTIAL_OPTIONS = [
  "1–5 Products",
  "6–15 Products",
  "16–30 Products",
  "31–50 Products",
  "More Than 50 Products",
];

const HIGHER_EDUCATION_OPTIONS = [
  "High School / 12th Pass",
  "Diploma in Physical Education / Fitness",
  "Bachelor's Degree",
  "Master's Degree / Post Graduate",
  "Specialized Sports / Nutrition Degree",
  "Other",
];

const FOLLOWER_RANGES = [
  "Under 1,000",
  "1,000 - 5,000",
  "5,000 - 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 100,000",
  "100,000+",
];

const SOCIAL_PLATFORM_OPTIONS = [
  "Instagram",
  "Facebook",
  "YouTube",
  "LinkedIn",
];

// Premium Brown Themed Custom Select Component
function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select Option",
  error = false,
  searchable = false,
  className = "",
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normalize options: supports string array or { value, label } array
  const normalizedOptions = options.map((opt) =>
    typeof opt === "object" && opt !== null ? opt : { value: opt, label: opt },
  );

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value),
  );

  const filteredOptions =
    searchable && searchQuery.trim()
      ? normalizedOptions.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase().trim()),
        )
      : normalizedOptions;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, searchable]);

  const handleSelect = (optValue) => {
    onChange({ target: { value: optValue, name: id } });
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-[44px] border-[1.5px] rounded-lg px-3.5 text-sm font-medium text-left bg-white transition flex items-center justify-between cursor-pointer focus:outline-none ${
          error
            ? "border-[#ef4444] bg-[#fef2f2]"
            : isOpen
              ? "border-[#95442c] ring-3 ring-[#95442c]/20"
              : "border-[#cbd5e1] hover:border-[#95442c]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`truncate ${
            selectedOption && selectedOption.value !== ""
              ? "text-[#0f172a] font-medium"
              : "text-[#94a3b8] font-normal"
          }`}
        >
          {selectedOption && selectedOption.value !== ""
            ? selectedOption.label
            : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#64748b] transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-[#95442c]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border-[1.5px] border-[#cbd5e1] rounded-lg shadow-xl z-50 max-h-60 overflow-hidden flex flex-col animate-fadeIn">
          {searchable && (
            <div className="p-2 border-b border-[#f1f5f9] bg-white sticky top-0 z-10">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[36px] px-3 text-xs bg-white border border-[#cbd5e1] rounded-md outline-none focus:border-[#95442c] focus:ring-1 focus:ring-[#95442c] text-[#0f172a]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="overflow-y-auto py-1 max-h-52 divide-y divide-[#f1f5f9]">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-xs text-[#94a3b8] text-center">
                No matching options found
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <button
                    type="button"
                    key={`${opt.value}-${idx}`}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? "bg-[#95442c] text-white font-semibold"
                        : "text-[#334155] hover:bg-[#fdf5f2] hover:text-[#95442c]"
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-white flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Small Uploaded File Preview Card
function FilePreviewCard({ file, onRemove }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isImage =
    file?.type?.startsWith("image/") ||
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file?.name || "");
  const isPdf =
    file?.type === "application/pdf" || /\.pdf$/i.test(file?.name || "");

  useEffect(() => {
    if (file && isImage) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file, isImage]);

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex items-center gap-3 p-2.5 bg-white border-[1.5px] border-[#e2e8f0] rounded-lg shadow-xs transition hover:border-[#cbd5e1]">
      {/* Thumbnail */}
      {isImage && previewUrl ? (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex-shrink-0 group cursor-pointer block"
          title="Click to view full image"
        >
          <img
            src={previewUrl}
            alt={file?.name || "Preview"}
            className="w-12 h-12 rounded-lg object-cover border border-[#e2e8f0]"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
            <Eye className="w-3.5 h-3.5" />
          </div>
        </a>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-[#fdf5f2] border border-[#95442c]/20 flex flex-col items-center justify-center text-[#95442c] flex-shrink-0">
          <FileText className="w-5 h-5 text-[#95442c]" />
          <span className="text-[10px] font-bold uppercase mt-0.5 font-mono">
            {isPdf ? "PDF" : "DOC"}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs sm:text-sm font-semibold text-[#0f172a] truncate"
          title={file?.name}
        >
          {file?.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-[#64748b] font-mono">
            {formatFileSize(file?.size)}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Uploaded
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 text-[#94a3b8] hover:text-[#ef4444] hover:bg-red-50 rounded-lg transition flex-shrink-0 cursor-pointer"
        title="Remove file"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Inquiry() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [errors, setErrors] = useState({});

  // Email OTP Verification State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Form Container Ref for smooth auto-scroll to form on step transitions
  const formTopRef = useRef(null);
  const isFirstMount = useRef(true);

  const scrollToFormTop = () => {
    if (formTopRef.current) {
      const navOffset = 85; // navbar height + comfortable breathing room
      const elementPosition = formTopRef.current.getBoundingClientRect().top;
      const scrollY =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop;
      const offsetPosition = elementPosition + scrollY - navOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  // Automatically scroll to the top of the form section on every step change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    scrollToFormTop();
  }, [currentStep]);

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Personal
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    whatsapp: "",
    email: "",
    address: "",
    state: "",
    stateCode: "",
    city: "",
    pincode: "",
    photoFile: null,
    idProofFile: null,

    // Section 2: Certifications
    certFile: null,
    additionalCertifications: "",
    higherEducation: "",
    additionalQualifications: "",

    // Section 3: Professional
    employmentType: "",
    otherEmploymentType: "",
    experienceYears: "",
    activeClients: "",
    recommendSupplements: "",
    supplementBrands: "",
    monthlySupplementPurchases: "",
    clientCategory: "",
    otherClientCategory: "",

    // Section 4: Social
    socialPlatform: "",
    socialLink: "",
    instagram: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    website: "",
    otherSocial: "",
    instagramFollowers: "",
    monthlyReach: "",
    regularPosts: "",

    // Section 5: Sales Potential
    clientAcquisition: [],
    otherClientAcquisition: "",
    monthlyInteractions: "",
    clientsUsingSupplements: "",
    commonSupplement: "",
    salesPotential: "",

    // Section 6: Declarations
    declarationAccurate: false,
    declarationVerify: false,
    declarationPrivacy: false,
  });

  // Available cities based on selected state
  const availableCities = formData.stateCode
    ? getCities(formData.stateCode)
    : [];

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "mobile" && sameAsMobile) {
        updated.whatsapp = value;
      }
      if (field === "socialPlatform") {
        updated.instagram = value === "Instagram" ? updated.socialLink : "";
        updated.facebook = value === "Facebook" ? updated.socialLink : "";
        updated.youtube = value === "YouTube" ? updated.socialLink : "";
        updated.linkedin = value === "LinkedIn" ? updated.socialLink : "";
      }
      if (field === "socialLink") {
        if (updated.socialPlatform === "Instagram") updated.instagram = value;
        if (updated.socialPlatform === "Facebook") updated.facebook = value;
        if (updated.socialPlatform === "YouTube") updated.youtube = value;
        if (updated.socialPlatform === "LinkedIn") updated.linkedin = value;
      }
      return updated;
    });

    if (field === "email" || field === "mobile" || field === "whatsapp") {
      setIsOtpVerified(false);
      setVerificationId("");
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleStateChange = (e) => {
    const selectedIso = typeof e === "string" ? e : e?.target?.value || "";
    const selectedObj = states.find((s) => s.value === selectedIso);
    setFormData((prev) => ({
      ...prev,
      stateCode: selectedIso,
      state: selectedObj ? selectedObj.label : "",
      city: "",
    }));
    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: null }));
    }
  };

  const handleSameAsMobileToggle = (checked) => {
    setSameAsMobile(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
    }
  };

  const handleAcquisitionToggle = (channel) => {
    setFormData((prev) => {
      const exists = prev.clientAcquisition.includes(channel);
      const updated = exists
        ? prev.clientAcquisition.filter((c) => c !== channel)
        : [...prev.clientAcquisition, channel];
      return { ...prev, clientAcquisition: updated };
    });
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      errorToast("File size must be under 20MB");
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const removeFile = (field) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
  };

  // Validate all fields across all sections on the page
  const validateAll = () => {
    const newErrors = {};
    let firstErrorField = null;

    // Section 1: Personal & Basic Details
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      if (!firstErrorField) firstErrorField = "fullName";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      if (!firstErrorField) firstErrorField = "dob";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      if (!firstErrorField) firstErrorField = "gender";
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length < 10) {
      newErrors.mobile = "Valid 10-digit mobile number is required";
      if (!firstErrorField) firstErrorField = "mobile";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
      if (!firstErrorField) firstErrorField = "whatsapp";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Valid email address is required";
      if (!firstErrorField) firstErrorField = "email";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Complete address is required";
      if (!firstErrorField) firstErrorField = "address";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
      if (!firstErrorField) firstErrorField = "state";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      if (!firstErrorField) firstErrorField = "city";
    }
    if (!formData.pincode.trim() || formData.pincode.trim().length !== 6) {
      newErrors.pincode = "Valid 6-digit PIN code is required";
      if (!firstErrorField) firstErrorField = "pincode";
    }

    // Section 2: Fitness & Professional Certifications
    if (!formData.higherEducation) {
      newErrors.higherEducation =
        "Please select your higher education qualification";
      if (!firstErrorField) firstErrorField = "higherEducation";
    }

    // Section 3: Professional Details
    if (!formData.employmentType) {
      newErrors.employmentType =
        "Please select your profession / employment type";
      if (!firstErrorField) firstErrorField = "employmentType";
    }
    if (
      formData.experienceYears === "" ||
      Number(formData.experienceYears) < 0
    ) {
      newErrors.experienceYears = "Please provide your years of experience";
      if (!firstErrorField) firstErrorField = "experienceYears";
    }
    if (formData.activeClients === "" || Number(formData.activeClients) < 0) {
      newErrors.activeClients = "Please enter number of active clients";
      if (!firstErrorField) firstErrorField = "activeClients";
    }
    if (!formData.recommendSupplements) {
      newErrors.recommendSupplements =
        "Please specify whether you recommend supplements";
      if (!firstErrorField) firstErrorField = "recommendSupplements";
    } else if (
      formData.recommendSupplements === "Yes" &&
      !formData.supplementBrands.trim()
    ) {
      newErrors.supplementBrands =
        "Please specify brands you recommend or sell";
      if (!firstErrorField) firstErrorField = "supplementBrands";
    }
    if (!formData.clientCategory) {
      newErrors.clientCategory = "Please select your primary client category";
      if (!firstErrorField) firstErrorField = "clientCategory";
    }

    // Section 5: Business Potential & Supplement Sales
    if (formData.clientAcquisition.length === 0) {
      newErrors.clientAcquisition =
        "Please select at least one client acquisition channel";
      if (!firstErrorField) firstErrorField = "clientAcquisition";
    }
    if (!formData.salesPotential) {
      newErrors.salesPotential = "Please select your estimated sales potential";
      if (!firstErrorField) firstErrorField = "salesPotential";
    }

    // Section 6: Verification & Declaration
    if (!formData.declarationAccurate) {
      newErrors.declarationAccurate =
        "Please confirm that information submitted is accurate";
      if (!firstErrorField) firstErrorField = "declarationAccurate";
    }
    if (!formData.declarationVerify) {
      newErrors.declarationVerify =
        "Please authorize RAG Nutrition to verify details";
      if (!firstErrorField) firstErrorField = "declarationVerify";
    }
    if (!formData.declarationPrivacy) {
      newErrors.declarationPrivacy = "Please consent to the privacy policy";
      if (!firstErrorField) firstErrorField = "declarationPrivacy";
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, firstErrorField };
  };

  const validateStep = () => validateAll().isValid;
  const goToNextStep = () => {};
  const goToPrevStep = () => {};

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    const email = formData.email?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorToast("Please enter a valid email address");
      return false;
    }

    setSendingOtp(true);
    setOtpError("");

    try {
      const response = await sendInquiryOtpApi({
        email,
        name: formData.fullName.trim() || "Applicant",
      });

      const vId =
        response?.data?.data?.verification_id ||
        response?.data?.verification_id ||
        "";

      const devOtp =
        response?.data?.data?.dev_otp || response?.data?.dev_otp || "";

      if (!vId) {
        throw new Error("Did not receive verification ID from server");
      }

      setVerificationId(vId);
      setOtpValue(devOtp || "");
      setResendCooldown(60);
      setShowOtpModal(true);
      if (devOtp) {
        successToast(`Dev Mode: Verification OTP is ${devOtp}`);
      } else {
        successToast(`Verification OTP sent to ${email}!`);
      }
      return true;
    } catch (err) {
      console.error("Failed to send Email OTP:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send OTP to your email. Please check your address and try again.";
      setOtpError(msg);
      errorToast(msg);
      return false;
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify Email OTP and trigger final submission
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();

    const trimmedOtp = otpValue.trim();
    if (!trimmedOtp || trimmedOtp.length < 4) {
      setOtpError("Please enter the complete 6-digit OTP code");
      return;
    }

    if (!verificationId) {
      setOtpError("Session expired. Please request a new OTP.");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    try {
      await verifyInquiryOtpApi({
        verification_id: verificationId,
        otp: trimmedOtp,
      });

      setIsOtpVerified(true);
      setShowOtpModal(false);
      successToast("Email address verified successfully!");

      // Execute application submission immediately
      await executeApplicationSubmission(verificationId);
    } catch (err) {
      console.error("OTP verification failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid or expired OTP. Please try again.";
      setOtpError(msg);
      errorToast(msg);
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Submit Handler (Requires Email OTP verification before submitting)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const { isValid, firstErrorField } = validateAll();
    if (!isValid) {
      errorToast("Please fill in all required fields marked in red");
      if (firstErrorField) {
        const el =
          document.getElementById(firstErrorField) ||
          document.querySelector(`[name="${firstErrorField}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus?.();
        } else {
          scrollToFormTop();
        }
      }
      return;
    }

    // If OTP was already verified, submit directly
    if (isOtpVerified && verificationId) {
      await executeApplicationSubmission(verificationId);
      return;
    }

    // Otherwise, initiate Email OTP verification first
    await handleSendEmailOtp();
  };

  // Final Application Submission (Called strictly after Email OTP verification)
  const executeApplicationSubmission = async (vId = verificationId) => {
    setSubmitting(true);

    try {
      // 1. Upload files if provided
      let photoUrl = "";
      let idProofUrl = "";
      let certUrl = "";
      let portfolioUrl = "";

      const filesList = [];

      // Safe file upload helper
      const safeUpload = async (file, remark) => {
        if (!file) return "";
        try {
          const res = await uploadFileApi(file, "contact-inquiry");
          const url =
            res?.data?.data?.fileURLs?.[0] || res?.data?.fileURLs?.[0] || "";
          if (url) {
            filesList.push({ url, remark });
            return url;
          }
          return file.name;
        } catch (err) {
          console.warn(`File upload for ${remark} fallback:`, err);
          return file.name;
        }
      };

      if (formData.photoFile) {
        photoUrl = await safeUpload(
          formData.photoFile,
          "Passport-Size Photograph",
        );
      }
      if (formData.idProofFile) {
        idProofUrl = await safeUpload(
          formData.idProofFile,
          "Aadhaar Card / Government ID",
        );
      }
      if (formData.certFile) {
        certUrl = await safeUpload(
          formData.certFile,
          "Fitness Certification Certificate",
        );
      }

      // 2. Build details object
      const details = {
        // Section 1
        full_name: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        mobile: formData.mobile,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        photo_url: photoUrl,
        id_proof_url: idProofUrl,

        // Section 2
        certification_url: certUrl,
        additional_certifications: formData.additionalCertifications,
        higher_education: formData.higherEducation,
        additional_qualifications: formData.additionalQualifications,

        // Section 3
        employment_type:
          formData.employmentType === "Other" && formData.otherEmploymentType
            ? `Other: ${formData.otherEmploymentType}`
            : formData.employmentType,
        experience_years: formData.experienceYears,
        active_clients: formData.activeClients,
        recommend_supplements: formData.recommendSupplements,
        supplement_brands: formData.supplementBrands,
        monthly_supplement_purchases: formData.monthlySupplementPurchases,
        client_category:
          formData.clientCategory === "Other" && formData.otherClientCategory
            ? `Other: ${formData.otherClientCategory}`
            : formData.clientCategory,

        // Section 4
        social_platform: formData.socialPlatform || "Instagram",
        social_link: formData.socialLink || "",
        instagram:
          formData.socialPlatform === "Instagram"
            ? formData.socialLink
            : formData.instagram || "",
        facebook:
          formData.socialPlatform === "Facebook"
            ? formData.socialLink
            : formData.facebook || "",
        youtube:
          formData.socialPlatform === "YouTube"
            ? formData.socialLink
            : formData.youtube || "",
        linkedin:
          formData.socialPlatform === "LinkedIn"
            ? formData.socialLink
            : formData.linkedin || "",
        website: formData.website,
        other_social: formData.otherSocial,
        instagram_followers: formData.instagramFollowers,
        monthly_reach: formData.monthlyReach,
        regular_posts: formData.regularPosts,
        portfolio_url: portfolioUrl,

        // Section 5
        client_acquisition: formData.clientAcquisition,
        other_client_acquisition: formData.otherClientAcquisition,
        monthly_client_interactions: formData.monthlyInteractions,
        clients_using_supplements: formData.clientsUsingSupplements,
        common_supplement_purchased: formData.commonSupplement,
        sales_potential: formData.salesPotential,

        // Section 6
        declaration_accurate: formData.declarationAccurate,
        declaration_verify: formData.declarationVerify,
        declaration_privacy: formData.declarationPrivacy,

        // Email OTP Verification Details
        email_verified: true,
        email_verified_at: new Date().toISOString(),
        otp_verification_id: vId,

        submitted_from: window.location.href,
        submission_timestamp: new Date().toISOString(),
      };

      // 3. Build comprehensive multi-line text summary for `message`
      const formattedMessage = `=== RAG PRO PARTNER PROGRAM APPLICATION ===

[SECTION 1: PERSONAL INFORMATION]
• Full Name: ${formData.fullName}
• DOB: ${formData.dob} | Gender: ${formData.gender}
• Mobile: ${formData.mobile} | WhatsApp: ${formData.whatsapp}
• Email: ${formData.email} (Verified via Email OTP)
• Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}
• Passport Photo: ${photoUrl || "Not attached"}
• Government ID: ${idProofUrl || "Not attached"}

[SECTION 2: FITNESS & PROFESSIONAL CERTIFICATIONS]
• Fitness Certificate: ${certUrl || "Not attached"}
• Higher Education: ${formData.higherEducation || "N/A"}
• Additional Certifications: ${formData.additionalCertifications || "None"}
• Additional Qualifications: ${formData.additionalQualifications || "None"}

[SECTION 3: PROFESSIONAL DETAILS]
• Employment Type: ${formData.employmentType} ${formData.otherEmploymentType ? `(${formData.otherEmploymentType})` : ""}
• Experience in Fitness Industry: ${formData.experienceYears} Years
• Active Clients Currently: ${formData.activeClients}
• Recommends Supplements: ${formData.recommendSupplements}
• Supplement Brands Recommended: ${formData.supplementBrands || "N/A"}
• Monthly Purchases via Recommendations: ${formData.monthlySupplementPurchases || "N/A"}
• Primary Client Category: ${formData.clientCategory} ${formData.otherClientCategory ? `(${formData.otherClientCategory})` : ""}

[SECTION 4: SOCIAL MEDIA & ONLINE PRESENCE]
• Selected Social Platform: ${formData.socialPlatform || "Instagram"}
• Social Profile / Channel Link: ${formData.socialLink || "N/A"}
• Instagram: ${formData.socialPlatform === "Instagram" ? formData.socialLink : formData.instagram || "N/A"} (Followers: ${formData.instagramFollowers || "N/A"})
• Facebook: ${formData.socialPlatform === "Facebook" ? formData.socialLink : formData.facebook || "N/A"}
• YouTube: ${formData.socialPlatform === "YouTube" ? formData.socialLink : formData.youtube || "N/A"}
• LinkedIn: ${formData.socialPlatform === "LinkedIn" ? formData.socialLink : formData.linkedin || "N/A"}
• Website / Coaching Profile: ${formData.website || "N/A"}
• Other Social: ${formData.otherSocial || "N/A"}
• Monthly Reach / Engagement: ${formData.monthlyReach || "N/A"}
• Regularly Posts Content: ${formData.regularPosts}

[SECTION 5: BUSINESS POTENTIAL & SUPPLEMENT SALES]
• Client Acquisition Channels: ${formData.clientAcquisition.join(", ")} ${formData.otherClientAcquisition ? `(Other: ${formData.otherClientAcquisition})` : ""}
• Monthly Client Interactions: ${formData.monthlyInteractions || "N/A"}
• Clients Using Supplements: ${formData.clientsUsingSupplements || "N/A"}
• Most Common Supplement Purchased: ${formData.commonSupplement || "N/A"}
• Estimated Monthly Sales Potential: ${formData.salesPotential}

[SECTION 6: VERIFICATION & DECLARATION]
• Confirmed Information Accuracy: YES
• Authorized RAG Nutrition Verification: YES
• Consented to Privacy Policy: YES
• Email Address Verified via OTP: YES
===============================================`;

      // 4. Send API Payload
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        subject: "RAG Pro Partner Program Application",
        message: formattedMessage,
        source: "https://www.gomzilifesciences.in/inquiry",
        details,
        files: filesList,
      };

      const response = await sendContactInquiryApi(payload);

      const refId =
        response?.data?.data?._id ||
        response?.data?._id ||
        `RAG-${Date.now().toString().slice(-6)}`;
      setSubmissionId(refId);

      successToast("Your Partner Application has been submitted successfully!");
      setIsSuccess(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } catch (err) {
      console.error("Partner Application submission failed:", err);
      errorToast(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit application. Please check details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="RAG Pro Partner Program Application | Join Official Coach & Trainer Network"
        description="Apply for the official RAG Pro Partner Program by Gomzi Nutrition. High margins, 100% genuine lab-tested supplements, and dedicated business support for certified fitness professionals."
      />

      {/* Pristine Clean Production Theme (from gomzi-admin) */}
      <style>{`
        .inquiry-theme-scope,
        .inquiry-theme-scope input,
        .inquiry-theme-scope select,
        .inquiry-theme-scope textarea,
        .inquiry-theme-scope button,
        .inquiry-theme-scope label,
        .inquiry-theme-scope span,
        .inquiry-theme-scope p,
        .inquiry-theme-scope h1,
        .inquiry-theme-scope h2,
        .inquiry-theme-scope h3,
        .inquiry-theme-scope h4 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }
        .emp-clean-input {
          background-color: #ffffff !important;
          border: 1.5px solid #cbd5e1 !important;
          color: #0f172a !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          border-radius: 8px !important;
          height: 44px !important;
          padding: 8px 14px !important;
          transition: all 0.2s ease !important;
          width: 100% !important;
          outline: none !important;
        }
        .emp-clean-input:focus {
          border-color: #95442c !important;
          box-shadow: 0 0 0 3px rgba(149, 68, 44, 0.18) !important;
          outline: none !important;
          background-color: #ffffff !important;
        }
        .emp-clean-input::placeholder {
          color: #94a3b8 !important;
          font-weight: 400 !important;
        }
        .emp-clean-input.is-invalid {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }
        textarea.emp-clean-input {
          height: auto !important;
          min-height: 84px !important;
          padding: 10px 14px !important;
        }
        .emp-clean-label {
          color: #0f172a !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          margin-bottom: 6px !important;
          display: block !important;
        }
        .emp-card-box {
          background-color: #ffffff !important;
          border: 1.5px solid #e2e8f0 !important;
          border-radius: 14px !important;
          box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05), 0 2px 6px -1px rgba(0,0,0,0.02) !important;
          overflow: visible !important;
          position: relative !important;
        }
        .emp-upload-box {
          background-color: #ffffff !important;
          border: 2px dashed #cbd5e1 !important;
          border-radius: 12px !important;
          padding: 20px !important;
          transition: all 0.2s ease !important;
        }
        .emp-upload-box:hover {
          border-color: #95442c !important;
          background-color: rgba(149, 68, 44, 0.02) !important;
        }
        .inquiry-theme-scope {
          background-color: #ffffff !important;
        }
      `}</style>

      <div className="inquiry-theme-scope min-h-screen bg-white pt-8 sm:pt-12 pb-16 sm:pb-20 ">
        {isSuccess && <Confetti numberOfPieces={250} recycle={false} />}

        {/* Brand Logo & Hero Header */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center ">
          <div className="flex justify-center mb-4 sm:mb-5">
            <a
              href="/"
              className="inline-block transition-transform hover:scale-105 active:scale-95"
              title="RAG Nutrition"
            >
              <img
                src={ragLogo}
                alt="RAG Nutrition Logo"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain mx-auto"
              />
            </a>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight mb-2">
            RAG Pro Partner Program
          </h1>
          <p className="text-[#64748b] text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed text-center whitespace-normal sm:whitespace-nowrap font-normal">
            Empower your clients with lab-tested nutrition and unlock exclusive
            partner margins.
          </p>
        </section>

        {/* Main Application Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 ">
          {isSuccess ? (
            /* SUCCESS CELEBRATION VIEW */
            <div className="emp-card-box p-6 sm:p-12 text-center animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-full mb-3 inline-block">
                Application Received
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3">
                Welcome to the RAG Pro Partner Network!
              </h2>

              <p className="text-[#64748b] text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you,{" "}
                <span className="font-bold text-[#0f172a]">
                  {formData.fullName}
                </span>
                ! Your application has been received and logged in our partner
                verification system.
              </p>

              <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md mx-auto mb-8 border border-[#e2e8f0] text-left shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 pb-3 border-b border-[#e2e8f0]">
                  <span className="text-xs text-[#64748b] uppercase tracking-wide font-medium">
                    Application Reference
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#95442c] break-all">
                    {submissionId}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-3 border-b border-[#e2e8f0]">
                  <span className="text-xs text-[#64748b] font-medium">
                    Registered Email
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0f172a] break-all">
                    {formData.email}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 pt-3">
                  <span className="text-xs text-[#64748b] font-medium">
                    Next Action
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-600">
                    Verification within 24-48 hrs
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/gomzi-supplement"
                  className="w-full sm:w-auto h-[44px] px-6 sm:px-8 bg-[#95442c] hover:bg-[#7d3824] text-white font-bold rounded-lg transition shadow-sm text-sm sm:text-base flex items-center justify-center"
                >
                  Explore Supplements Catalog
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    scrollToFormTop();
                  }}
                  className="w-full sm:w-auto h-[44px] px-6 sm:px-8 bg-white hover:bg-slate-50 text-[#334155] border-[1.5px] border-[#cbd5e1] font-semibold rounded-lg transition text-sm sm:text-base text-center cursor-pointer"
                >
                  Submit Another Form
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION FORM - ALL SECTIONS ON SINGLE PAGE */
            <div ref={formTopRef}>
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                    e.preventDefault();
                  }
                }}
                noValidate
                style={{ accentColor: "#95442c" }}
              >
                {/* ========================================================
                    SECTION 1: PERSONAL & BASIC DETAILS
                   ======================================================== */}
                <div
                  id="section-1"
                  className="emp-card-box p-5 sm:p-8 mb-6 sm:mb-8"
                >
                  {/* Metronic / gomzi-admin Section Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-[#f1f5f9]">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(149, 68, 44, 0.1)",
                        color: "#95442c",
                        border: "1.5px solid rgba(149, 68, 44, 0.2)",
                      }}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-0.5 leading-snug">
                        Personal & Basic Details
                      </h3>
                      <span className="text-xs sm:text-sm text-[#64748b]">
                        Primary identity, contact coordinates, and residential
                        location
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className="emp-clean-label">
                        Full Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className={`emp-clean-input ${
                          errors.fullName ? "is-invalid" : ""
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="emp-clean-label">
                        Date of Birth <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={(e) =>
                          handleInputChange("dob", e.target.value)
                        }
                        className={`emp-clean-input ${
                          errors.dob ? "is-invalid" : ""
                        }`}
                      />
                      {errors.dob && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.dob}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="emp-clean-label">
                        Gender <span className="text-[#ef4444]">*</span>
                      </label>
                      <CustomSelect
                        id="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        options={[
                          "Male",
                          "Female",
                          "Other",
                          "Prefer not to say",
                        ]}
                        placeholder="Select Gender"
                        error={!!errors.gender}
                      />
                      {errors.gender && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5 min-h-[22px]">
                        <label className="emp-clean-label !mb-0">
                          Mobile Number{" "}
                          <span className="text-[#ef4444]">*</span>
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-[44px] px-3 bg-white border-[1.5px] border-[#cbd5e1] rounded-lg flex items-center gap-1.5 text-sm font-semibold text-[#0f172a] flex-shrink-0 cursor-default select-none">
                          <span>+91</span>
                          <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
                        </div>
                        <input
                          type="tel"
                          id="mobile"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) =>
                            handleInputChange(
                              "mobile",
                              e.target.value.replace(/\D/g, ""),
                            )
                          }
                          className={`emp-clean-input ${
                            errors.mobile ? "is-invalid" : ""
                          }`}
                        />
                      </div>
                      {errors.mobile && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5 min-h-[22px]">
                        <label className="emp-clean-label !mb-0">
                          WhatsApp Number{" "}
                          <span className="text-[#ef4444]">*</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-[#95442c] font-semibold cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={sameAsMobile}
                            onChange={(e) =>
                              handleSameAsMobileToggle(e.target.checked)
                            }
                            className="rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                          />
                          Same as Mobile
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-[44px] px-3 border-[1.5px] rounded-lg flex items-center gap-1.5 text-sm font-semibold flex-shrink-0 cursor-default select-none ${
                            sameAsMobile
                              ? "bg-[#f8fafc] border-[#cbd5e1] text-[#94a3b8]"
                              : "bg-white border-[#cbd5e1] text-[#0f172a]"
                          }`}
                        >
                          <span>+91</span>
                          <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
                        </div>
                        <input
                          type="tel"
                          id="whatsapp"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.whatsapp}
                          onChange={(e) =>
                            handleInputChange(
                              "whatsapp",
                              e.target.value.replace(/\D/g, ""),
                            )
                          }
                          disabled={sameAsMobile}
                          className={`emp-clean-input ${
                            errors.whatsapp ? "is-invalid" : ""
                          } ${sameAsMobile ? "!bg-[#f8fafc] !text-[#94a3b8] cursor-not-allowed" : ""}`}
                        />
                      </div>
                      {errors.whatsapp && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.whatsapp}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="md:col-span-2">
                      <label className="emp-clean-label">
                        Email Address <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="coach.rahul@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`emp-clean-input ${
                          errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Complete Residential Address */}
                    <div className="md:col-span-2">
                      <label className="emp-clean-label">
                        Complete Residential Address{" "}
                        <span className="text-[#ef4444]">*</span>
                      </label>
                      <textarea
                        rows={2}
                        id="address"
                        placeholder="House/Flat No., Building Name, Street, Landmark"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className={`emp-clean-input resize-none ${
                          errors.address ? "is-invalid" : ""
                        }`}
                      />
                      {errors.address && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* State, City, PIN Code - In 1 Line */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* State */}
                      <div>
                        <label className="emp-clean-label">
                          State <span className="text-[#ef4444]">*</span>
                        </label>
                        <CustomSelect
                          id="state"
                          value={formData.stateCode}
                          onChange={handleStateChange}
                          options={states}
                          placeholder="Select State"
                          error={!!errors.state}
                          searchable={true}
                        />
                        {errors.state && (
                          <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                            {errors.state}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="emp-clean-label">
                          City <span className="text-[#ef4444]">*</span>
                        </label>
                        {availableCities.length > 0 ? (
                          <CustomSelect
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            options={availableCities}
                            placeholder="Select City"
                            error={!!errors.city}
                            searchable={true}
                          />
                        ) : (
                          <input
                            type="text"
                            id="city"
                            placeholder="Enter City"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            className={`emp-clean-input ${
                              errors.city ? "is-invalid" : ""
                            }`}
                          />
                        )}
                        {errors.city && (
                          <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      {/* PIN Code */}
                      <div>
                        <label className="emp-clean-label">
                          PIN Code <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          maxLength={6}
                          placeholder="395007"
                          value={formData.pincode}
                          onChange={(e) =>
                            handleInputChange(
                              "pincode",
                              e.target.value.replace(/\D/g, ""),
                            )
                          }
                          className={`emp-clean-input ${
                            errors.pincode ? "is-invalid" : ""
                          }`}
                        />
                        {errors.pincode && (
                          <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                            {errors.pincode}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* File Uploads - Passport Photo & Aadhaar Card in 1 Line */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* File 1: Passport-Size Photograph */}
                      <div className="emp-upload-box">
                        <label className="emp-clean-label !mb-1">
                          Passport-Size Photograph
                        </label>
                        <p className="text-xs text-[#64748b] mb-3">
                          JPG/PNG/WEBP, clear face photo (max 20MB)
                        </p>
                        {formData.photoFile ? (
                          <FilePreviewCard
                            file={formData.photoFile}
                            onRemove={() => removeFile("photoFile")}
                          />
                        ) : (
                          <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border-[1.5px] border-[#cbd5e1] rounded-lg cursor-pointer text-xs font-semibold text-[#0f172a] transition shadow-xs">
                            <Upload className="w-4 h-4 text-[#95442c]" />
                            Upload Photograph
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange("photoFile", e)}
                            />
                          </label>
                        )}
                      </div>

                      {/* File 2: Aadhaar Card / ID Proof */}
                      <div className="emp-upload-box">
                        <label className="emp-clean-label !mb-1">
                          Aadhaar Card / Government ID Proof
                        </label>
                        <p className="text-xs text-[#64748b] mb-3">
                          PDF or Image of front & back (max 20MB)
                        </p>
                        {formData.idProofFile ? (
                          <FilePreviewCard
                            file={formData.idProofFile}
                            onRemove={() => removeFile("idProofFile")}
                          />
                        ) : (
                          <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border-[1.5px] border-[#cbd5e1] rounded-lg cursor-pointer text-xs font-semibold text-[#0f172a] transition shadow-xs">
                            <Upload className="w-4 h-4 text-[#95442c]" />
                            Upload ID Proof
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange("idProofFile", e)
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    SECTION 2: FITNESS & PROFESSIONAL CERTIFICATIONS
                   ======================================================== */}
                <div
                  id="section-2"
                  className="emp-card-box p-5 sm:p-8 mb-6 sm:mb-8"
                >
                  {/* Metronic / gomzi-admin Section Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-[#f1f5f9]">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(149, 68, 44, 0.1)",
                        color: "#95442c",
                        border: "1.5px solid rgba(149, 68, 44, 0.2)",
                      }}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-0.5 leading-snug">
                        Fitness & Professional Certifications
                      </h3>
                      <span className="text-xs sm:text-sm text-[#64748b]">
                        Showcase your certified credentials and educational
                        background
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Upload Fitness Certificate */}
                    <div className="emp-upload-box">
                      <label className="emp-clean-label !mb-1">
                        Upload Fitness Certification Certificate
                      </label>
                      <p className="text-xs text-[#64748b] mb-3">
                        Upload (PDF/Image)
                      </p>
                      {formData.certFile ? (
                        <FilePreviewCard
                          file={formData.certFile}
                          onRemove={() => removeFile("certFile")}
                        />
                      ) : (
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border-[1.5px] border-[#cbd5e1] rounded-lg cursor-pointer text-xs font-semibold text-[#0f172a] transition shadow-xs">
                          <Upload className="w-4 h-4 text-[#95442c]" />
                          Upload Certificate File
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={(e) => handleFileChange("certFile", e)}
                          />
                        </label>
                      )}
                    </div>

                    {/* Additional Fitness Certifications */}
                    <div>
                      <label className="emp-clean-label">
                        Additional Fitness Certifications (if any)
                      </label>
                      <textarea
                        rows={2}
                        id="additionalCertifications"
                        placeholder="e.g. CPR/AED Certified, Kettlebell Specialist, Functional Training Trainer"
                        value={formData.additionalCertifications}
                        onChange={(e) =>
                          handleInputChange(
                            "additionalCertifications",
                            e.target.value,
                          )
                        }
                        className="emp-clean-input resize-none"
                      />
                    </div>

                    {/* Higher Education Qualification */}
                    <div>
                      <label className="emp-clean-label">
                        Higher Education Qualification{" "}
                        <span className="text-[#ef4444]">*</span>
                      </label>
                      <CustomSelect
                        id="higherEducation"
                        value={formData.higherEducation}
                        onChange={(e) =>
                          handleInputChange("higherEducation", e.target.value)
                        }
                        options={HIGHER_EDUCATION_OPTIONS}
                        placeholder="Select Qualification"
                        error={!!errors.higherEducation}
                      />
                      {errors.higherEducation && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.higherEducation}
                        </p>
                      )}
                    </div>

                    {/* Additional Qualifications */}
                    <div>
                      <label className="emp-clean-label">
                        Additional Qualifications (if any)
                      </label>
                      <textarea
                        rows={2}
                        id="additionalQualifications"
                        placeholder="e.g. Diploma in Sports Nutrition, Certified Dietetics Consultant, CSCS"
                        value={formData.additionalQualifications}
                        onChange={(e) =>
                          handleInputChange(
                            "additionalQualifications",
                            e.target.value,
                          )
                        }
                        className="emp-clean-input resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    SECTION 3: PROFESSIONAL DETAILS
                   ======================================================== */}
                <div
                  id="section-3"
                  className="emp-card-box p-5 sm:p-8 mb-6 sm:mb-8"
                >
                  {/* Metronic / gomzi-admin Section Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-[#f1f5f9]">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(149, 68, 44, 0.1)",
                        color: "#95442c",
                        border: "1.5px solid rgba(149, 68, 44, 0.2)",
                      }}
                    >
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-0.5 leading-snug">
                        Professional Details
                      </h3>
                      <span className="text-xs sm:text-sm text-[#64748b]">
                        Tell us about your client base and fitness consulting
                        experience
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Employment Type */}
                    <div id="employmentType">
                      <label className="emp-clean-label mb-2">
                        Current Profession & Employment Type{" "}
                        <span className="text-[#ef4444]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {EMPLOYMENT_TYPES.map((type, idx) => (
                          <label
                            key={idx}
                            className={`p-3 rounded-lg border-[1.5px] flex items-center gap-3 cursor-pointer transition ${
                              formData.employmentType === type
                                ? "border-[#95442c] bg-[#fdf5f2] text-[#0f172a] font-semibold shadow-xs"
                                : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-[#334155]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="employmentType"
                              value={type}
                              checked={formData.employmentType === type}
                              onChange={(e) =>
                                handleInputChange(
                                  "employmentType",
                                  e.target.value,
                                )
                              }
                              className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-medium">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                      {formData.employmentType === "Other" && (
                        <input
                          type="text"
                          placeholder="Please specify your profession"
                          value={formData.otherEmploymentType}
                          onChange={(e) =>
                            handleInputChange(
                              "otherEmploymentType",
                              e.target.value,
                            )
                          }
                          className="mt-2.5 emp-clean-input"
                        />
                      )}
                      {errors.employmentType && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.employmentType}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Total Years of Experience */}
                      <div>
                        <label className="emp-clean-label">
                          Total Years of Experience in Fitness Industry{" "}
                          <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                          type="number"
                          id="experienceYears"
                          min="0"
                          step="0.5"
                          placeholder="e.g. 5"
                          value={formData.experienceYears}
                          onChange={(e) =>
                            handleInputChange("experienceYears", e.target.value)
                          }
                          className={`emp-clean-input ${
                            errors.experienceYears ? "is-invalid" : ""
                          }`}
                        />
                        {errors.experienceYears && (
                          <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                            {errors.experienceYears}
                          </p>
                        )}
                      </div>

                      {/* Number of Active Clients Currently */}
                      <div>
                        <label className="emp-clean-label">
                          Number of Active Clients Currently{" "}
                          <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                          type="number"
                          id="activeClients"
                          min="0"
                          placeholder="e.g. 25"
                          value={formData.activeClients}
                          onChange={(e) =>
                            handleInputChange("activeClients", e.target.value)
                          }
                          className={`emp-clean-input ${
                            errors.activeClients ? "is-invalid" : ""
                          }`}
                        />
                        {errors.activeClients && (
                          <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                            {errors.activeClients}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Recommend or Sell Supplements */}
                    <div
                      id="recommendSupplements"
                      className="p-4 sm:p-5 bg-white rounded-xl border-[1.5px] border-[#e2e8f0]"
                    >
                      <label className="emp-clean-label !mb-3">
                        Do You Currently Recommend or Sell Supplements to Your
                        Clients? <span className="text-[#ef4444]">*</span>
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Yes", "No"].map((choice) => (
                          <label
                            key={choice}
                            className={`px-5 py-2.5 rounded-lg border-[1.5px] flex items-center gap-2 cursor-pointer transition ${
                              formData.recommendSupplements === choice
                                ? "border-[#95442c] bg-[#fdf5f2] text-[#95442c] font-bold shadow-xs"
                                : "border-[#cbd5e1] bg-white text-[#334155] hover:border-[#94a3b8]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="recommendSupplements"
                              value={choice}
                              checked={formData.recommendSupplements === choice}
                              onChange={(e) =>
                                handleInputChange(
                                  "recommendSupplements",
                                  e.target.value,
                                )
                              }
                              className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                            />
                            <span className="text-sm font-semibold">
                              {choice}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.recommendSupplements && (
                        <p className="text-[#ef4444] text-xs mt-2 font-medium">
                          {errors.recommendSupplements}
                        </p>
                      )}
                    </div>

                    {/* Supplement Brands */}
                    {formData.recommendSupplements === "Yes" && (
                      <div>
                        <label className="emp-clean-label">
                          Which Supplement Brands Do You Currently Recommend or
                          Sell? <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                          type="text"
                          id="supplementBrands"
                          placeholder="e.g. Optimum Nutrition, MuscleBlaze, MyProtein, GNC, etc."
                          value={formData.supplementBrands}
                          onChange={(e) =>
                            handleInputChange(
                              "supplementBrands",
                              e.target.value,
                            )
                          }
                          className={`emp-clean-input ${
                            errors.supplementBrands ? "is-invalid" : ""
                          }`}
                        />
                        {errors.supplementBrands && (
                          <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                            {errors.supplementBrands}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Approximately How Many Supplements Do Your Clients Purchase */}
                    <div>
                      <label className="emp-clean-label">
                        Approximately How Many Supplements Do Your Clients
                        Purchase Per Month Through Your Recommendations?
                      </label>
                      <input
                        type="text"
                        id="monthlySupplementPurchases"
                        placeholder="e.g. 10 - 20 tubs / products"
                        value={formData.monthlySupplementPurchases}
                        onChange={(e) =>
                          handleInputChange(
                            "monthlySupplementPurchases",
                            e.target.value,
                          )
                        }
                        className="emp-clean-input"
                      />
                    </div>

                    {/* Primary Client Category */}
                    <div id="clientCategory">
                      <label className="emp-clean-label mb-2">
                        What Is Your Primary Client Category?{" "}
                        <span className="text-[#ef4444]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {CLIENT_CATEGORIES.map((cat, idx) => (
                          <label
                            key={idx}
                            className={`p-3 rounded-lg border-[1.5px] flex items-center gap-2.5 cursor-pointer transition ${
                              formData.clientCategory === cat
                                ? "border-[#95442c] bg-[#fdf5f2] text-[#0f172a] font-semibold shadow-xs"
                                : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-[#334155]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="clientCategory"
                              value={cat}
                              checked={formData.clientCategory === cat}
                              onChange={(e) =>
                                handleInputChange(
                                  "clientCategory",
                                  e.target.value,
                                )
                              }
                              className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-medium">
                              {cat}
                            </span>
                          </label>
                        ))}
                      </div>
                      {formData.clientCategory === "Other" && (
                        <input
                          type="text"
                          placeholder="Please specify client category"
                          value={formData.otherClientCategory}
                          onChange={(e) =>
                            handleInputChange(
                              "otherClientCategory",
                              e.target.value,
                            )
                          }
                          className="mt-2.5 emp-clean-input"
                        />
                      )}
                      {errors.clientCategory && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.clientCategory}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    SECTION 4: SOCIAL MEDIA & ONLINE PRESENCE
                   ======================================================== */}
                <div
                  id="section-4"
                  className="emp-card-box p-5 sm:p-8 mb-6 sm:mb-8"
                >
                  {/* Metronic / gomzi-admin Section Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-[#f1f5f9]">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(149, 68, 44, 0.1)",
                        color: "#95442c",
                        border: "1.5px solid rgba(149, 68, 44, 0.2)",
                      }}
                    >
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-0.5 leading-snug">
                        Social Media & Online Presence
                      </h3>
                      <span className="text-xs sm:text-sm text-[#64748b]">
                        Connect your digital profiles and social presence
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Platform Selector Dropdown */}
                    <div>
                      <label className="emp-clean-label flex items-center gap-2">
                        <Share2 className="text-[#95442c] w-3.5 h-3.5" /> Select
                        Social Media Platform
                      </label>
                      <CustomSelect
                        id="socialPlatform"
                        value={formData.socialPlatform}
                        onChange={(e) =>
                          handleInputChange("socialPlatform", e.target.value)
                        }
                        options={SOCIAL_PLATFORM_OPTIONS}
                        placeholder="Select Platform"
                      />
                    </div>

                    {/* Dynamic Link Input Based on Selected Platform */}
                    <div>
                      <label className="emp-clean-label flex items-center gap-2">
                        {formData.socialPlatform === "Instagram" && (
                          <FaInstagram className="text-pink-600 w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        {formData.socialPlatform === "Facebook" && (
                          <FaFacebook className="text-blue-600 w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        {formData.socialPlatform === "YouTube" && (
                          <FaYoutube className="text-red-600 w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        {formData.socialPlatform === "LinkedIn" && (
                          <FaLinkedin className="text-blue-700 w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        {![
                          "Instagram",
                          "Facebook",
                          "YouTube",
                          "LinkedIn",
                        ].includes(formData.socialPlatform) && (
                          <Share2 className="text-[#95442c] w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        <span>
                          {formData.socialPlatform === "Instagram" &&
                            "Instagram Profile Link"}
                          {formData.socialPlatform === "Facebook" &&
                            "Facebook Profile / Page Link"}
                          {formData.socialPlatform === "YouTube" &&
                            "YouTube Channel Link"}
                          {formData.socialPlatform === "LinkedIn" &&
                            "LinkedIn Profile Link"}
                          {![
                            "Instagram",
                            "Facebook",
                            "YouTube",
                            "LinkedIn",
                          ].includes(formData.socialPlatform) &&
                            "Profile / Channel Link"}
                        </span>
                      </label>
                      <input
                        type="text"
                        id="socialLink"
                        placeholder={
                          formData.socialPlatform === "Instagram"
                            ? "https://instagram.com/your_handle or @handle"
                            : formData.socialPlatform === "Facebook"
                              ? "https://facebook.com/your_page"
                              : formData.socialPlatform === "YouTube"
                                ? "https://youtube.com/@channel"
                                : formData.socialPlatform === "LinkedIn"
                                  ? "https://linkedin.com/in/profile"
                                  : "Enter your profile or channel link"
                        }
                        value={formData.socialLink}
                        onChange={(e) =>
                          handleInputChange("socialLink", e.target.value)
                        }
                        className="emp-clean-input"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="emp-clean-label">
                        Website / Online Coaching Profile (if applicable)
                      </label>
                      <input
                        type="text"
                        id="website"
                        placeholder="https://yourfitnessbrand.com"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="emp-clean-input"
                      />
                    </div>

                    {/* Any Other Link */}
                    <div>
                      <label className="emp-clean-label">
                        Any Other Professional Social Media Link
                      </label>
                      <input
                        type="text"
                        id="otherSocial"
                        placeholder="Twitter, Linktree, etc."
                        value={formData.otherSocial}
                        onChange={(e) =>
                          handleInputChange("otherSocial", e.target.value)
                        }
                        className="emp-clean-input"
                      />
                    </div>

                    {/* Instagram Followers */}
                    <div>
                      <label className="emp-clean-label">
                        Instagram Followers (Approximate)
                      </label>
                      <CustomSelect
                        id="instagramFollowers"
                        value={formData.instagramFollowers}
                        onChange={(e) =>
                          handleInputChange(
                            "instagramFollowers",
                            e.target.value,
                          )
                        }
                        options={FOLLOWER_RANGES}
                        placeholder="Select Range"
                      />
                    </div>

                    {/* Monthly Reach */}
                    <div>
                      <label className="emp-clean-label">
                        Average Monthly Reach or Engagement (if available)
                      </label>
                      <input
                        type="text"
                        id="monthlyReach"
                        placeholder="e.g. 50k views/month"
                        value={formData.monthlyReach}
                        onChange={(e) =>
                          handleInputChange("monthlyReach", e.target.value)
                        }
                        className="emp-clean-input"
                      />
                    </div>

                    {/* Post Regularly */}
                    <div className="md:col-span-2 p-4 sm:p-5 bg-white rounded-xl border-[1.5px] border-[#e2e8f0]">
                      <label className="emp-clean-label !mb-3">
                        Do You Regularly Post Fitness or Nutrition-Related
                        Content?
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Yes", "No"].map((choice) => (
                          <label
                            key={choice}
                            className={`px-5 py-2.5 rounded-lg border-[1.5px] flex items-center gap-2 cursor-pointer transition ${
                              formData.regularPosts === choice
                                ? "border-[#95442c] bg-[#fdf5f2] text-[#95442c] font-bold shadow-xs"
                                : "border-[#cbd5e1] bg-white text-[#334155] hover:border-[#94a3b8]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="regularPosts"
                              value={choice}
                              checked={formData.regularPosts === choice}
                              onChange={(e) =>
                                handleInputChange(
                                  "regularPosts",
                                  e.target.value,
                                )
                              }
                              className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                            />
                            <span className="text-sm font-semibold">
                              {choice}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    SECTION 5: BUSINESS POTENTIAL & SUPPLEMENT SALES
                   ======================================================== */}
                <div
                  id="section-5"
                  className="emp-card-box p-5 sm:p-8 mb-6 sm:mb-8"
                >
                  {/* Metronic / gomzi-admin Section Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-[#f1f5f9]">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(149, 68, 44, 0.1)",
                        color: "#95442c",
                        border: "1.5px solid rgba(149, 68, 44, 0.2)",
                      }}
                    >
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-0.5 leading-snug">
                        Business Potential & Supplement Sales
                      </h3>
                      <span className="text-xs sm:text-sm text-[#64748b]">
                        Help us tailor your wholesale tier and partner support
                        team
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* How Do You Currently Acquire Clients? */}
                    <div id="clientAcquisition">
                      <label className="emp-clean-label mb-2">
                        How Do You Currently Acquire Clients?{" "}
                        <span className="text-[#ef4444]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {CLIENT_ACQUISITION_CHANNELS.map((ch, idx) => {
                          const isChecked =
                            formData.clientAcquisition.includes(ch);
                          return (
                            <label
                              key={idx}
                              className={`p-3 rounded-lg border-[1.5px] flex items-center gap-2.5 cursor-pointer transition ${
                                isChecked
                                  ? "border-[#95442c] bg-[#fdf5f2] text-[#0f172a] font-semibold shadow-xs"
                                  : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-[#334155]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleAcquisitionToggle(ch)}
                                className="rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                              />
                              <span className="text-xs sm:text-sm font-medium">
                                {ch}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {formData.clientAcquisition.includes("Other") && (
                        <input
                          type="text"
                          placeholder="Please specify other acquisition channel"
                          value={formData.otherClientAcquisition}
                          onChange={(e) =>
                            handleInputChange(
                              "otherClientAcquisition",
                              e.target.value,
                            )
                          }
                          className="mt-2.5 emp-clean-input"
                        />
                      )}
                      {errors.clientAcquisition && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.clientAcquisition}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Monthly Interactions */}
                      <div className="flex flex-col justify-between">
                        <label className="emp-clean-label">
                          Approximately How Many Clients Do You Interact With
                          Every Month?
                        </label>
                        <input
                          type="number"
                          id="monthlyInteractions"
                          min="0"
                          placeholder="e.g. 50"
                          value={formData.monthlyInteractions}
                          onChange={(e) =>
                            handleInputChange(
                              "monthlyInteractions",
                              e.target.value,
                            )
                          }
                          className="emp-clean-input mt-auto"
                        />
                      </div>

                      {/* How Many Clients Currently Use Supplements */}
                      <div className="flex flex-col justify-between">
                        <label className="emp-clean-label">
                          How Many of Your Clients Currently Use Supplements?
                        </label>
                        <input
                          type="number"
                          id="clientsUsingSupplements"
                          min="0"
                          placeholder="e.g. 35"
                          value={formData.clientsUsingSupplements}
                          onChange={(e) =>
                            handleInputChange(
                              "clientsUsingSupplements",
                              e.target.value,
                            )
                          }
                          className="emp-clean-input mt-auto"
                        />
                      </div>
                    </div>

                    {/* Most Common Supplement Purchased */}
                    <div>
                      <label className="emp-clean-label">
                        What Is the Most Common Supplement Purchased by Your
                        Clients?
                      </label>
                      <input
                        type="text"
                        id="commonSupplement"
                        placeholder="e.g. Whey Protein Isolate, Creatine Monohydrate, Multivitamins, Peanut Butter"
                        value={formData.commonSupplement}
                        onChange={(e) =>
                          handleInputChange("commonSupplement", e.target.value)
                        }
                        className="emp-clean-input"
                      />
                    </div>

                    {/* Estimated Monthly Supplement Sales Potential */}
                    <div id="salesPotential">
                      <label className="emp-clean-label mb-2">
                        Estimated Monthly Supplement Sales Potential{" "}
                        <span className="text-[#ef4444]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {SALES_POTENTIAL_OPTIONS.map((opt, idx) => (
                          <label
                            key={idx}
                            className={`p-3 rounded-lg border-[1.5px] flex items-center gap-3 cursor-pointer transition ${
                              formData.salesPotential === opt
                                ? "border-[#95442c] bg-[#fdf5f2] text-[#0f172a] font-bold shadow-xs ring-1 ring-[#95442c]"
                                : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white text-[#334155]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="salesPotential"
                              value={opt}
                              checked={formData.salesPotential === opt}
                              onChange={(e) =>
                                handleInputChange(
                                  "salesPotential",
                                  e.target.value,
                                )
                              }
                              className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm font-semibold">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.salesPotential && (
                        <p className="text-[#ef4444] text-xs mt-1.5 font-medium">
                          {errors.salesPotential}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    SECTION 6: VERIFICATION & DECLARATION
                   ======================================================== */}
                <div
                  id="section-6"
                  className="emp-card-box p-5 sm:p-8 mb-6 sm:mb-8"
                >
                  {/* Metronic / gomzi-admin Section Header */}
                  <div className="flex items-center gap-3.5 pb-5 mb-6 border-b border-[#f1f5f9]">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "rgba(149, 68, 44, 0.1)",
                        color: "#95442c",
                        border: "1.5px solid rgba(149, 68, 44, 0.2)",
                      }}
                    >
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-0.5 leading-snug">
                        Verification & Declaration
                      </h3>
                      <span className="text-xs sm:text-sm text-[#64748b]">
                        Review your application details and sign the partner
                        agreement declarations
                      </span>
                    </div>
                  </div>

                  {/* Summary Quick Card */}
                  <div className="bg-white rounded-xl p-4 sm:p-5 border-[1.5px] border-[#e2e8f0] text-sm mb-6 shadow-2xs">
                    <h4 className="font-bold text-[#0f172a] mb-3 flex items-center justify-between">
                      <span>Application Summary Overview</span>
                      <span className="text-xs text-[#95442c] font-semibold">
                        Ready for Submission
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-[#475569]">
                      <div>
                        <strong className="text-[#0f172a] font-semibold">
                          Applicant:
                        </strong>{" "}
                        <span className="break-words">
                          {formData.fullName || "—"} ({formData.gender},{" "}
                          {formData.dob || "—"})
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#0f172a] font-semibold">
                          Contact:
                        </strong>{" "}
                        <span className="break-all">
                          {formData.mobile || "—"} | {formData.email || "—"}
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#0f172a] font-semibold">
                          Location:
                        </strong>{" "}
                        <span className="break-words">
                          {formData.city || "—"}, {formData.state || "—"}{" "}
                          {formData.pincode ? `- ${formData.pincode}` : ""}
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#0f172a] font-semibold">
                          Experience:
                        </strong>{" "}
                        <span>
                          {formData.experienceYears || "0"} Years |{" "}
                          {formData.activeClients || "0"} Active Clients
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#0f172a] font-semibold">
                          Profession:
                        </strong>{" "}
                        <span className="break-words">
                          {formData.employmentType}
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#0f172a] font-semibold">
                          Est. Sales Potential:
                        </strong>{" "}
                        <span className="font-semibold text-[#95442c]">
                          {formData.salesPotential}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Declarations Checkboxes */}
                  <div className="space-y-3 pt-2">
                    {/* Declaration 1 */}
                    <label
                      className={`p-3.5 sm:p-4 rounded-lg border-[1.5px] flex items-start gap-2.5 sm:gap-3 cursor-pointer transition ${
                        formData.declarationAccurate
                          ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                          : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id="declarationAccurate"
                        checked={formData.declarationAccurate}
                        onChange={(e) =>
                          handleInputChange(
                            "declarationAccurate",
                            e.target.checked,
                          )
                        }
                        className="mt-0.5 flex-shrink-0 rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-[#0f172a] block leading-snug mb-0.5">
                          I confirm that the information submitted is accurate.
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#64748b] block leading-relaxed">
                          All personal, professional, certification, and
                          business information provided is true to the best of
                          my knowledge.
                        </span>
                      </div>
                    </label>
                    {errors.declarationAccurate && (
                      <p className="text-[#ef4444] text-xs font-medium pl-2">
                        {errors.declarationAccurate}
                      </p>
                    )}

                    {/* Declaration 2 */}
                    <label
                      className={`p-3.5 sm:p-4 rounded-lg border-[1.5px] flex items-start gap-2.5 sm:gap-3 cursor-pointer transition ${
                        formData.declarationVerify
                          ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                          : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id="declarationVerify"
                        checked={formData.declarationVerify}
                        onChange={(e) =>
                          handleInputChange(
                            "declarationVerify",
                            e.target.checked,
                          )
                        }
                        className="mt-0.5 flex-shrink-0 rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-[#0f172a] block leading-snug mb-0.5">
                          I authorize RAG Nutrition to verify my professional
                          certifications and submitted profile details.
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#64748b] block leading-relaxed">
                          RAG Nutrition and Gomzi Life Sciences may conduct
                          partner background and credential verifications.
                        </span>
                      </div>
                    </label>
                    {errors.declarationVerify && (
                      <p className="text-[#ef4444] text-xs font-medium pl-2">
                        {errors.declarationVerify}
                      </p>
                    )}

                    {/* Declaration 3 */}
                    <label
                      className={`p-3.5 sm:p-4 rounded-lg border-[1.5px] flex items-start gap-2.5 sm:gap-3 cursor-pointer transition ${
                        formData.declarationPrivacy
                          ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                          : "border-[#cbd5e1] hover:border-[#94a3b8] bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id="declarationPrivacy"
                        checked={formData.declarationPrivacy}
                        onChange={(e) =>
                          handleInputChange(
                            "declarationPrivacy",
                            e.target.checked,
                          )
                        }
                        className="mt-0.5 flex-shrink-0 rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-[#0f172a] block leading-snug mb-0.5">
                          I consent to the handling of my information in
                          accordance with the program’s privacy policy.
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#64748b] block leading-relaxed">
                          Data collected is strictly used for partner
                          onboarding, commission disbursements, and account
                          operations.
                        </span>
                      </div>
                    </label>
                    {errors.declarationPrivacy && (
                      <p className="text-[#ef4444] text-xs font-medium pl-2">
                        {errors.declarationPrivacy}
                      </p>
                    )}
                  </div>

                  {/* Primary Submit Partner Application Action Button - ALWAYS VISIBLE, DISABLED UNTIL ALL 3 CHECKBOXES ARE CHECKED */}
                  <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t-[1.5px] border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#64748b] text-center sm:text-left">
                      <span>
                        By submitting, an instant verification OTP will be
                        sent to your email.
                      </span>
                    </div>
                    <button
                      key="form-submit-btn"
                      type="submit"
                      disabled={
                        !formData.declarationAccurate ||
                        !formData.declarationVerify ||
                        !formData.declarationPrivacy ||
                        submitting ||
                        sendingOtp
                      }
                      className="group relative overflow-hidden w-full sm:w-auto h-[48px] px-8 sm:px-10 btn-gradient border border-amber-400/30 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                          <span className="truncate">
                            Submitting Application...
                          </span>
                        </>
                      ) : sendingOtp ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                          <span className="truncate">
                            Sending Verification OTP...
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Submit Partner Application</span>
                          <ArrowRight className="relative z-10 w-5 h-5 flex-shrink-0 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Clean Minimalist Portal Footer */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 text-center text-xs text-[#94a3b8]">
          <p>© {new Date().getFullYear()} RAG Nutrition. All rights reserved.</p>
        </div>
      </div>

      {/* Email OTP Verification Modal */}
      {showOtpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowOtpModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-[#e2e8f0] relative text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="absolute top-5 right-5 text-[#94a3b8] hover:text-[#0f172a] p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Email Icon Badge */}
            <div className="w-14 h-14 bg-[#fdf5f2] text-[#95442c] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#95442c]/20 shadow-xs">
              <Mail className="w-7 h-7 text-[#95442c]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-2">
              Verify Your Email Address
            </h3>

            <p className="text-sm text-[#64748b] mb-2">
              We've sent a 6-digit OTP code to:
            </p>
            <div className="inline-flex items-center gap-2 bg-[#fdf5f2] text-[#95442c] font-bold px-3.5 py-1.5 rounded-full text-sm mb-3 border border-[#95442c]/20">
              <Mail className="w-4 h-4 text-[#95442c]" />
              {formData.email}
            </div>

            <p className="text-xs text-[#94a3b8] mb-6">
              Wrong email?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowOtpModal(false);
                  const el =
                    document.getElementById("email") ||
                    document.getElementById("section-1");
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  el?.focus?.();
                }}
                className="text-[#95442c] font-semibold underline hover:text-[#7d3824] cursor-pointer"
              >
                Change in Section 1
              </button>
            </p>

            {/* OTP Form */}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtpValue(val);
                    if (otpError) setOtpError("");
                  }}
                  placeholder="Enter 6-digit OTP"
                  autoFocus
                  className="w-full text-center text-xl sm:text-2xl font-mono tracking-[0.25em] sm:tracking-[0.4em] py-3 px-3 bg-white border-[1.5px] border-[#cbd5e1] focus:border-[#95442c] rounded-lg outline-none transition font-bold text-[#0f172a] placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-[#94a3b8]"
                />
              </div>

              {otpError && (
                <div className="flex items-center justify-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={verifyingOtp || otpValue.length < 4}
                className="group relative overflow-hidden w-full h-[46px] btn-gradient border border-amber-400/30 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 text-sm cursor-pointer"
              >
                {verifyingOtp ? (
                  <>
                    <div className="relative z-10 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="relative z-10">Verifying OTP...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Verify & Submit Application</span>
                    <ArrowRight className="relative z-10 w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Resend Action */}
            <div className="mt-5 pt-4 border-t border-[#f1f5f9] text-xs text-[#64748b] flex items-center justify-center gap-2">
              <span>Didn't receive code?</span>
              {resendCooldown > 0 ? (
                <span className="font-semibold text-[#94a3b8]">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  disabled={sendingOtp}
                  onClick={handleSendEmailOtp}
                  className="font-bold text-[#95442c] hover:underline disabled:opacity-50 cursor-pointer"
                >
                  {sendingOtp ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}