import React, { useState, useEffect, useId, useRef } from "react";
import SEO from "../../component/SEO";
import { states, getCities } from "../../utils/indiaLocation";
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
    typeof opt === "object" && opt !== null
      ? opt
      : { value: opt, label: opt }
  );

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  const filteredOptions = searchable && searchQuery.trim()
    ? normalizedOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
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
        className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-left bg-white transition flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
          error
            ? "border-red-500 bg-red-50/10"
            : isOpen
            ? "border-[#95442c] ring-2 ring-[#95442c]/20"
            : "border-gray-300 hover:border-gray-400"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`truncate ${
            selectedOption && selectedOption.value !== ""
              ? "text-gray-900 font-medium"
              : "text-gray-400"
          }`}
        >
          {selectedOption && selectedOption.value !== ""
            ? selectedOption.label
            : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-[#95442c]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-hidden flex flex-col animate-fadeIn">
          {searchable && (
            <div className="p-2 border-b border-gray-100 bg-gray-50/90 sticky top-0 z-10">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-modelica bg-white border border-gray-200 rounded-lg outline-none focus:border-[#95442c] focus:ring-1 focus:ring-[#95442c]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="overflow-y-auto py-1 max-h-52 divide-y divide-gray-50">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-400 text-center font-modelica">
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
                    className={`w-full px-4 py-2.5 text-sm font-modelica text-left flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? "bg-[#95442c] text-white font-semibold"
                        : "text-gray-700 hover:bg-[#fdf5f2] hover:text-[#95442c]"
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

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Personal
    fullName: "",
    dob: "",
    gender: "Male",
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
    employmentType: "Self-employed",
    otherEmploymentType: "",
    experienceYears: "",
    activeClients: "",
    recommendSupplements: "Yes",
    supplementBrands: "",
    monthlySupplementPurchases: "",
    clientCategory: "Weight Loss",
    otherClientCategory: "",

    // Section 4: Social
    socialPlatform: "Instagram",
    socialLink: "",
    instagram: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    website: "",
    otherSocial: "",
    instagramFollowers: "",
    monthlyReach: "",
    regularPosts: "Yes",

    // Section 5: Sales Potential
    clientAcquisition: ["Gym / Fitness Studio", "Instagram / Social Media"],
    otherClientAcquisition: "",
    monthlyInteractions: "",
    clientsUsingSupplements: "",
    commonSupplement: "",
    salesPotential: "6–15 Products",

    // Section 6: Declarations
    declarationAccurate: false,
    declarationVerify: false,
    declarationPrivacy: false,
  });

  // Available cities based on selected state
  const availableCities = formData.stateCode ? getCities(formData.stateCode) : [];

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

  // Step Validations
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.mobile.trim() || formData.mobile.trim().length < 10) {
        newErrors.mobile = "Valid 10-digit mobile number is required";
      }
      if (!formData.whatsapp.trim()) {
        newErrors.whatsapp = "WhatsApp number is required";
      }
      if (
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Valid email address is required";
      }
      if (!formData.address.trim()) newErrors.address = "Complete address is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.pincode.trim() || formData.pincode.trim().length !== 6) {
        newErrors.pincode = "Valid 6-digit PIN code is required";
      }
    } else if (step === 2) {
      if (!formData.higherEducation) {
        newErrors.higherEducation = "Please select your higher education qualification";
      }
    } else if (step === 3) {
      if (!formData.experienceYears) {
        newErrors.experienceYears = "Please provide your years of experience";
      }
      if (!formData.activeClients) {
        newErrors.activeClients = "Please enter number of active clients";
      }
      if (formData.recommendSupplements === "Yes" && !formData.supplementBrands.trim()) {
        newErrors.supplementBrands = "Please specify brands you recommend or sell";
      }
    } else if (step === 5) {
      if (formData.clientAcquisition.length === 0) {
        newErrors.clientAcquisition = "Please select at least one client acquisition channel";
      }
      if (!formData.salesPotential) {
        newErrors.salesPotential = "Please select your estimated sales potential";
      }
    } else if (step === 6) {
      if (!formData.declarationAccurate) {
        newErrors.declarationAccurate = "Please confirm that information submitted is accurate";
      }
      if (!formData.declarationVerify) {
        newErrors.declarationVerify = "Please authorize RAG Nutrition to verify details";
      }
      if (!formData.declarationPrivacy) {
        newErrors.declarationPrivacy = "Please consent to the privacy policy";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 300, behavior: "smooth" });
    } else {
      errorToast("Please fill in all required fields before continuing");
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    const email = formData.email?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorToast("Please enter a valid email address in Section 1");
      setCurrentStep(1);
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
        response?.data?.data?.dev_otp ||
        response?.data?.dev_otp ||
        "";

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
    e.preventDefault();

    // Validate all steps before submitting
    for (let s = 1; s <= 6; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s);
        errorToast(`Please complete the required fields in Section ${s}`);
        return;
      }
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
          const url = res?.data?.data?.fileURLs?.[0] || res?.data?.fileURLs?.[0] || "";
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
        photoUrl = await safeUpload(formData.photoFile, "Passport-Size Photograph");
      }
      if (formData.idProofFile) {
        idProofUrl = await safeUpload(formData.idProofFile, "Aadhaar Card / Government ID");
      }
      if (formData.certFile) {
        certUrl = await safeUpload(formData.certFile, "Fitness Certification Certificate");
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
          "Failed to submit application. Please check details and try again."
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

      <div className="min-h-screen bg-[#fafbfc] pt-24 pb-20">
        {isSuccess && <Confetti numberOfPieces={250} recycle={false} />}

        {/* Hero Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#95442c]/10 text-[#95442c] text-xs sm:text-sm font-toma font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-4 h-4 text-[#95442c]" />
            Official Partner Network
          </div>
          <h1 className="font-toma text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-4">
            RAG Pro Partner Program
          </h1>
          <p className="font-modelica text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Empower your clients with lab-tested nutrition and unlock exclusive partner margins.
          </p>
        </section>

        {/* Main Application Container */}
        <div className="max-w-4xl mx-auto px-2.5 sm:px-6">
          {isSuccess ? (
            /* SUCCESS CELEBRATION VIEW */
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-12 border border-gray-200 shadow-xl text-center animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-full mb-3 inline-block">
                Application Received
              </span>

              <h2 className="font-toma text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                Welcome to the RAG Pro Partner Network!
              </h2>

              <p className="font-modelica text-gray-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you, <span className="font-bold text-gray-900">{formData.fullName}</span>!
                Your application has been received and logged in our partner verification system.
              </p>

              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 max-w-md mx-auto mb-8 border border-gray-200 text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 pb-3 border-b border-gray-200">
                  <span className="text-xs font-modelica text-gray-500 uppercase tracking-wide">Application Reference</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#95442c] break-all">{submissionId}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 py-3 border-b border-gray-200">
                  <span className="text-xs font-modelica text-gray-500">Registered Email</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 break-all">{formData.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 pt-3">
                  <span className="text-xs font-modelica text-gray-500">Next Action</span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-600">Verification within 24-48 hrs</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/gomzi-supplement"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#95442c] hover:bg-[#d26a4a] text-white font-toma font-bold rounded-xl transition shadow-md text-sm sm:text-base text-center"
                >
                  Explore Supplements Catalog
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-toma font-semibold rounded-xl transition text-sm sm:text-base text-center"
                >
                  Submit Another Form
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION FORM */
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-10 border border-gray-200/90 shadow-xl">
              <form onSubmit={handleSubmit} noValidate style={{ accentColor: "#95442c" }}>
                {/* ========================================================
                    SECTION 1: PERSONAL INFORMATION
                   ======================================================== */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-[#95442c] font-toma text-sm font-bold uppercase tracking-wider mb-1">
                        <User className="w-4 h-4" /> Section 1 of 6
                      </div>
                      <h2 className="font-toma text-2xl font-bold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="font-modelica text-gray-500 text-sm">
                        Please provide accurate identity and contact details for your partner account.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                            errors.fullName ? "border-red-500 bg-red-50/20" : "border-gray-300"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                            errors.dob ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.dob && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">{errors.dob}</p>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <CustomSelect
                          value={formData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          options={["Male", "Female", "Other", "Prefer not to say"]}
                          placeholder="Select Gender"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold font-modelica">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="9876543210"
                            value={formData.mobile}
                            onChange={(e) =>
                              handleInputChange("mobile", e.target.value.replace(/\D/g, ""))
                            }
                            className={`w-full border rounded-xl pl-12 pr-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                              errors.mobile ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">{errors.mobile}</p>
                        )}
                      </div>

                      {/* WhatsApp Number */}
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                          <label className="font-modelica text-sm font-semibold text-gray-800">
                            WhatsApp Number <span className="text-red-500">*</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-xs text-[#95442c] font-medium cursor-pointer">
                            <input
                              type="checkbox"
                              checked={sameAsMobile}
                              onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                              className="rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                            />
                            Same as Mobile
                          </label>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold font-modelica">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="9876543210"
                            value={formData.whatsapp}
                            onChange={(e) =>
                              handleInputChange("whatsapp", e.target.value.replace(/\D/g, ""))
                            }
                            disabled={sameAsMobile}
                            className={`w-full border rounded-xl pl-12 pr-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] disabled:bg-gray-100 ${
                              errors.whatsapp ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.whatsapp && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">{errors.whatsapp}</p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="md:col-span-2">
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="coach.rahul@gmail.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">{errors.email}</p>
                        )}
                      </div>

                      {/* Complete Residential Address */}
                      <div className="md:col-span-2">
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Complete Residential Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="House/Flat No., Building Name, Street, Landmark"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] resize-none ${
                            errors.address ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">{errors.address}</p>
                        )}
                      </div>

                      {/* State, City, PIN Code - In 1 Line */}
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* State */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            State <span className="text-red-500">*</span>
                          </label>
                          <CustomSelect
                            value={formData.stateCode}
                            onChange={handleStateChange}
                            options={states}
                            placeholder="Select State"
                            error={!!errors.state}
                            searchable={true}
                          />
                          {errors.state && (
                            <p className="text-red-500 text-xs mt-1 font-modelica">{errors.state}</p>
                          )}
                        </div>

                        {/* City */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            City <span className="text-red-500">*</span>
                          </label>
                          {availableCities.length > 0 ? (
                            <CustomSelect
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              options={availableCities}
                              placeholder="Select City"
                              error={!!errors.city}
                              searchable={true}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Enter City"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                                errors.city ? "border-red-500" : "border-gray-300"
                              }`}
                            />
                          )}
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1 font-modelica">{errors.city}</p>
                          )}
                        </div>

                        {/* PIN Code */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            PIN Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="395007"
                            value={formData.pincode}
                            onChange={(e) =>
                              handleInputChange("pincode", e.target.value.replace(/\D/g, ""))
                            }
                            className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                              errors.pincode ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.pincode && (
                            <p className="text-red-500 text-xs mt-1 font-modelica">{errors.pincode}</p>
                          )}
                        </div>
                      </div>

                      {/* File Uploads - Passport Photo & Aadhaar Card in 1 Line */}
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* File 1: Passport-Size Photograph */}
                        <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50/50">
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1">
                            Passport-Size Photograph
                          </label>
                          <p className="text-xs text-gray-500 font-modelica mb-3">
                            JPG/PNG/WEBP, clear face photo (max 20MB)
                          </p>
                          {formData.photoFile ? (
                            <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-xl">
                              <span className="text-xs font-semibold text-gray-800 truncate flex-1 min-w-0 mr-2">
                                {formData.photoFile.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile("photoFile")}
                                className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl cursor-pointer text-xs font-semibold text-gray-700 transition">
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
                        <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50/50">
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1">
                            Aadhaar Card / Government ID Proof
                          </label>
                          <p className="text-xs text-gray-500 font-modelica mb-3">
                            PDF or Image of front & back (max 20MB)
                          </p>
                          {formData.idProofFile ? (
                            <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-xl">
                              <span className="text-xs font-semibold text-gray-800 truncate flex-1 min-w-0 mr-2">
                                {formData.idProofFile.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile("idProofFile")}
                                className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl cursor-pointer text-xs font-semibold text-gray-700 transition">
                              <Upload className="w-4 h-4 text-[#95442c]" />
                              Upload ID Proof
                              <input
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={(e) => handleFileChange("idProofFile", e)}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    SECTION 2: FITNESS & PROFESSIONAL CERTIFICATIONS
                   ======================================================== */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-[#95442c] font-toma text-sm font-bold uppercase tracking-wider mb-1">
                        <Award className="w-4 h-4" /> Section 2 of 6
                      </div>
                      <h2 className="font-toma text-2xl font-bold text-gray-900">
                        Fitness & Professional Certifications
                      </h2>
                      <p className="font-modelica text-gray-500 text-sm">
                        Showcase your certified credentials and educational background.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Upload Fitness Certificate */}
                      <div className="border border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50/50">
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1">
                          Upload Fitness Certification Certificate
                        </label>
                        <p className="text-xs text-gray-500 font-modelica mb-3">
                          Upload (PDF/Image)
                        </p>
                        {formData.certFile ? (
                          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
                            <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
                              <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              <span className="text-xs font-semibold text-gray-800 truncate flex-1 min-w-0">
                                {formData.certFile.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile("certFile")}
                              className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl cursor-pointer text-xs font-semibold text-gray-700 transition">
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
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Additional Fitness Certifications (if any)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. CPR/AED Certified, Kettlebell Specialist, Functional Training Trainer"
                          value={formData.additionalCertifications}
                          onChange={(e) =>
                            handleInputChange("additionalCertifications", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] resize-none"
                        />
                      </div>

                      {/* Higher Education Qualification */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Higher Education Qualification <span className="text-red-500">*</span>
                        </label>
                        <CustomSelect
                          value={formData.higherEducation}
                          onChange={(e) => handleInputChange("higherEducation", e.target.value)}
                          options={HIGHER_EDUCATION_OPTIONS}
                          placeholder="Select Qualification"
                          error={!!errors.higherEducation}
                        />
                        {errors.higherEducation && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">
                            {errors.higherEducation}
                          </p>
                        )}
                      </div>

                      {/* Additional Qualifications */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Additional Qualifications (if any)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Diploma in Sports Nutrition, Certified Dietetics Consultant, CSCS"
                          value={formData.additionalQualifications}
                          onChange={(e) =>
                            handleInputChange("additionalQualifications", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    SECTION 3: PROFESSIONAL DETAILS
                   ======================================================== */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-[#95442c] font-toma text-sm font-bold uppercase tracking-wider mb-1">
                        <Briefcase className="w-4 h-4" /> Section 3 of 6
                      </div>
                      <h2 className="font-toma text-2xl font-bold text-gray-900">
                        Professional Details
                      </h2>
                      <p className="font-modelica text-gray-500 text-sm">
                        Tell us about your client base and fitness consulting experience.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Employment Type */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-2">
                          Current Profession & Employment Type <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {EMPLOYMENT_TYPES.map((type, idx) => (
                            <label
                              key={idx}
                              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                                formData.employmentType === type
                                  ? "border-[#95442c] bg-orange-50/40 text-gray-900 font-semibold shadow-xs"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="employmentType"
                                value={type}
                                checked={formData.employmentType === type}
                                onChange={(e) => handleInputChange("employmentType", e.target.value)}
                                className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                              />
                              <span className="text-xs sm:text-sm font-modelica">{type}</span>
                            </label>
                          ))}
                        </div>
                        {formData.employmentType === "Other" && (
                          <input
                            type="text"
                            placeholder="Please specify your profession"
                            value={formData.otherEmploymentType}
                            onChange={(e) =>
                              handleInputChange("otherEmploymentType", e.target.value)
                            }
                            className="mt-2.5 w-full border border-gray-300 rounded-xl px-4 py-2.5 font-modelica text-sm"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Total Years of Experience */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            Total Years of Experience in Fitness Industry <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            placeholder="e.g. 5"
                            value={formData.experienceYears}
                            onChange={(e) => handleInputChange("experienceYears", e.target.value)}
                            className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                              errors.experienceYears ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.experienceYears && (
                            <p className="text-red-500 text-xs mt-1 font-modelica">
                              {errors.experienceYears}
                            </p>
                          )}
                        </div>

                        {/* Number of Active Clients Currently */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            Number of Active Clients Currently <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 25"
                            value={formData.activeClients}
                            onChange={(e) => handleInputChange("activeClients", e.target.value)}
                            className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                              errors.activeClients ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.activeClients && (
                            <p className="text-red-500 text-xs mt-1 font-modelica">
                              {errors.activeClients}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Recommend or Sell Supplements */}
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-2">
                          Do You Currently Recommend or Sell Supplements to Your Clients? <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                          {["Yes", "No"].map((choice) => (
                            <label
                              key={choice}
                              className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                                formData.recommendSupplements === choice
                                  ? "border-[#95442c] bg-white text-[#95442c] font-bold shadow-xs"
                                  : "border-gray-300 bg-white text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="recommendSupplements"
                                value={choice}
                                checked={formData.recommendSupplements === choice}
                                onChange={(e) =>
                                  handleInputChange("recommendSupplements", e.target.value)
                                }
                                className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                              />
                              <span className="font-modelica text-sm">{choice}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Supplement Brands */}
                      {formData.recommendSupplements === "Yes" && (
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            Which Supplement Brands Do You Currently Recommend or Sell? <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Optimum Nutrition, MuscleBlaze, MyProtein, GNC, etc."
                            value={formData.supplementBrands}
                            onChange={(e) => handleInputChange("supplementBrands", e.target.value)}
                            className={`w-full border rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c] ${
                              errors.supplementBrands ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.supplementBrands && (
                            <p className="text-red-500 text-xs mt-1 font-modelica">
                              {errors.supplementBrands}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Approximately How Many Supplements Do Your Clients Purchase */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Approximately How Many Supplements Do Your Clients Purchase Per Month Through Your Recommendations?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 10 - 20 tubs / products"
                          value={formData.monthlySupplementPurchases}
                          onChange={(e) =>
                            handleInputChange("monthlySupplementPurchases", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                        />
                      </div>

                      {/* Primary Client Category */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-2">
                          What Is Your Primary Client Category? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                          {CLIENT_CATEGORIES.map((cat, idx) => (
                            <label
                              key={idx}
                              className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                                formData.clientCategory === cat
                                  ? "border-[#95442c] bg-orange-50/40 text-gray-900 font-semibold shadow-xs"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="clientCategory"
                                value={cat}
                                checked={formData.clientCategory === cat}
                                onChange={(e) => handleInputChange("clientCategory", e.target.value)}
                                className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                              />
                              <span className="text-xs sm:text-sm font-modelica">{cat}</span>
                            </label>
                          ))}
                        </div>
                        {formData.clientCategory === "Other" && (
                          <input
                            type="text"
                            placeholder="Please specify client category"
                            value={formData.otherClientCategory}
                            onChange={(e) =>
                              handleInputChange("otherClientCategory", e.target.value)
                            }
                            className="mt-2.5 w-full border border-gray-300 rounded-xl px-4 py-2.5 font-modelica text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    SECTION 4: SOCIAL MEDIA & ONLINE PRESENCE
                   ======================================================== */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-[#95442c] font-toma text-sm font-bold uppercase tracking-wider mb-1">
                        <Share2 className="w-4 h-4" /> Section 4 of 6
                      </div>
                      <h2 className="font-toma text-2xl font-bold text-gray-900">
                        Social Media & Online Presence
                      </h2>
                      <p className="font-modelica text-gray-500 text-sm">
                        Connect your digital profiles and social presence.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Platform Selector Dropdown */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5 flex items-center gap-2">
                          <Share2 className="text-[#95442c] w-4 h-4" /> Select Social Media Platform
                        </label>
                        <CustomSelect
                          value={formData.socialPlatform}
                          onChange={(e) => handleInputChange("socialPlatform", e.target.value)}
                          options={SOCIAL_PLATFORM_OPTIONS}
                          placeholder="Select Platform"
                        />
                      </div>

                      {/* Dynamic Link Input Based on Selected Platform */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5 flex items-center gap-2">
                          {formData.socialPlatform === "Instagram" && (
                            <FaInstagram className="text-pink-600 w-4 h-4 flex-shrink-0" />
                          )}
                          {formData.socialPlatform === "Facebook" && (
                            <FaFacebook className="text-blue-600 w-4 h-4 flex-shrink-0" />
                          )}
                          {formData.socialPlatform === "YouTube" && (
                            <FaYoutube className="text-red-600 w-4 h-4 flex-shrink-0" />
                          )}
                          {formData.socialPlatform === "LinkedIn" && (
                            <FaLinkedin className="text-blue-700 w-4 h-4 flex-shrink-0" />
                          )}
                          {!["Instagram", "Facebook", "YouTube", "LinkedIn"].includes(formData.socialPlatform) && (
                            <Share2 className="text-[#95442c] w-4 h-4 flex-shrink-0" />
                          )}
                          <span>
                            {formData.socialPlatform === "Instagram" && "Instagram Profile Link"}
                            {formData.socialPlatform === "Facebook" && "Facebook Profile / Page Link"}
                            {formData.socialPlatform === "YouTube" && "YouTube Channel Link"}
                            {formData.socialPlatform === "LinkedIn" && "LinkedIn Profile Link"}
                            {!["Instagram", "Facebook", "YouTube", "LinkedIn"].includes(formData.socialPlatform) && "Profile / Channel Link"}
                          </span>
                        </label>
                        <input
                          type="text"
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
                          onChange={(e) => handleInputChange("socialLink", e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Website / Online Coaching Profile (if applicable)
                        </label>
                        <input
                          type="text"
                          placeholder="https://yourfitnessbrand.com"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                        />
                      </div>

                      {/* Any Other Link */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Any Other Professional Social Media Link
                        </label>
                        <input
                          type="text"
                          placeholder="Twitter, Linktree, etc."
                          value={formData.otherSocial}
                          onChange={(e) => handleInputChange("otherSocial", e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                        />
                      </div>

                      {/* Instagram Followers */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Instagram Followers (Approximate)
                        </label>
                        <CustomSelect
                          value={formData.instagramFollowers}
                          onChange={(e) => handleInputChange("instagramFollowers", e.target.value)}
                          options={FOLLOWER_RANGES}
                          placeholder="Select Range"
                        />
                      </div>

                      {/* Monthly Reach */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          Average Monthly Reach or Engagement (if available)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 50k views/month"
                          value={formData.monthlyReach}
                          onChange={(e) => handleInputChange("monthlyReach", e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                        />
                      </div>

                      {/* Post Regularly */}
                      <div className="md:col-span-2 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-2">
                          Do You Regularly Post Fitness or Nutrition-Related Content?
                        </label>
                        <div className="flex gap-4">
                          {["Yes", "No"].map((choice) => (
                            <label
                              key={choice}
                              className={`px-5 py-2 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                                formData.regularPosts === choice
                                  ? "border-[#95442c] bg-white text-[#95442c] font-bold shadow-xs"
                                  : "border-gray-300 bg-white text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="regularPosts"
                                value={choice}
                                checked={formData.regularPosts === choice}
                                onChange={(e) => handleInputChange("regularPosts", e.target.value)}
                                className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                              />
                              <span className="font-modelica text-sm">{choice}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    SECTION 5: BUSINESS POTENTIAL & SUPPLEMENT SALES
                   ======================================================== */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-[#95442c] font-toma text-sm font-bold uppercase tracking-wider mb-1">
                        <TrendingUp className="w-4 h-4" /> Section 5 of 6
                      </div>
                      <h2 className="font-toma text-2xl font-bold text-gray-900">
                        Business Potential & Supplement Sales
                      </h2>
                      <p className="font-modelica text-gray-500 text-sm">
                        Help us tailor your wholesale tier and partner support team.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* How Do You Currently Acquire Clients? */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-2">
                          How Do You Currently Acquire Clients? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                          {CLIENT_ACQUISITION_CHANNELS.map((ch, idx) => {
                            const isChecked = formData.clientAcquisition.includes(ch);
                            return (
                              <label
                                key={idx}
                                className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                                  isChecked
                                    ? "border-[#95442c] bg-orange-50/40 text-gray-900 font-semibold shadow-xs"
                                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleAcquisitionToggle(ch)}
                                  className="rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                                />
                                <span className="text-xs sm:text-sm font-modelica">{ch}</span>
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
                              handleInputChange("otherClientAcquisition", e.target.value)
                            }
                            className="mt-2.5 w-full border border-gray-300 rounded-xl px-4 py-2.5 font-modelica text-sm"
                          />
                        )}
                        {errors.clientAcquisition && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">
                            {errors.clientAcquisition}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Monthly Interactions */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            Approximately How Many Clients Do You Interact With Every Month?
                          </label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 50"
                            value={formData.monthlyInteractions}
                            onChange={(e) =>
                              handleInputChange("monthlyInteractions", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                          />
                        </div>

                        {/* How Many Clients Currently Use Supplements */}
                        <div>
                          <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                            How Many of Your Clients Currently Use Supplements?
                          </label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 35"
                            value={formData.clientsUsingSupplements}
                            onChange={(e) =>
                              handleInputChange("clientsUsingSupplements", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                          />
                        </div>
                      </div>

                      {/* Most Common Supplement Purchased */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-1.5">
                          What Is the Most Common Supplement Purchased by Your Clients?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Whey Protein Isolate, Creatine Monohydrate, Multivitamins, Peanut Butter"
                          value={formData.commonSupplement}
                          onChange={(e) => handleInputChange("commonSupplement", e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-modelica text-sm text-gray-900 bg-white transition focus:outline-none focus:ring-2 focus:ring-[#95442c]"
                        />
                      </div>

                      {/* Estimated Monthly Supplement Sales Potential */}
                      <div>
                        <label className="block font-modelica text-sm font-semibold text-gray-800 mb-2">
                          Estimated Monthly Supplement Sales Potential <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {SALES_POTENTIAL_OPTIONS.map((opt, idx) => (
                            <label
                              key={idx}
                              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                                formData.salesPotential === opt
                                  ? "border-[#95442c] bg-orange-50/50 text-gray-900 font-bold shadow-xs ring-1 ring-[#95442c]"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="salesPotential"
                                value={opt}
                                checked={formData.salesPotential === opt}
                                onChange={(e) => handleInputChange("salesPotential", e.target.value)}
                                className="text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer"
                              />
                              <span className="font-modelica text-sm">{opt}</span>
                            </label>
                          ))}
                        </div>
                        {errors.salesPotential && (
                          <p className="text-red-500 text-xs mt-1 font-modelica">
                            {errors.salesPotential}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    SECTION 6: VERIFICATION & DECLARATION
                   ======================================================== */}
                {currentStep === 6 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 text-[#95442c] font-toma text-sm font-bold uppercase tracking-wider mb-1">
                        <ShieldCheck className="w-4 h-4" /> Section 6 of 6
                      </div>
                      <h2 className="font-toma text-2xl font-bold text-gray-900">
                        Verification & Declaration
                      </h2>
                      <p className="font-modelica text-gray-500 text-sm">
                        Review your application details and sign the partner agreement declarations.
                      </p>
                    </div>

                    {/* Summary Quick Card */}
                    <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 border border-gray-200 text-sm">
                      <h4 className="font-toma font-bold text-gray-900 mb-3 flex items-center justify-between">
                        <span>Application Summary Overview</span>
                        <span className="text-xs text-[#95442c] font-semibold">
                          All 5 Sections Completed
                        </span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs font-modelica text-gray-600">
                        <div>
                          <strong className="text-gray-800">Applicant:</strong>{" "}
                          <span className="break-words">{formData.fullName} ({formData.gender}, {formData.dob})</span>
                        </div>
                        <div>
                          <strong className="text-gray-800">Contact:</strong>{" "}
                          <span className="break-all">{formData.mobile} | {formData.email}</span>
                        </div>
                        <div>
                          <strong className="text-gray-800">Location:</strong>{" "}
                          <span className="break-words">{formData.city}, {formData.state} - {formData.pincode}</span>
                        </div>
                        <div>
                          <strong className="text-gray-800">Experience:</strong>{" "}
                          <span>{formData.experienceYears} Years | {formData.activeClients} Active Clients</span>
                        </div>
                        <div>
                          <strong className="text-gray-800">Profession:</strong>{" "}
                          <span className="break-words">{formData.employmentType}</span>
                        </div>
                        <div>
                          <strong className="text-gray-800">Est. Sales Potential:</strong>{" "}
                          <span className="font-semibold text-[#95442c]">{formData.salesPotential}</span>
                        </div>
                      </div>
                    </div>

                    {/* Declarations Checkboxes */}
                    <div className="space-y-3.5 pt-2">
                      {/* Declaration 1 */}
                      <label
                        className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex items-start gap-2.5 sm:gap-3 cursor-pointer transition ${
                          formData.declarationAccurate
                            ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.declarationAccurate}
                          onChange={(e) =>
                            handleInputChange("declarationAccurate", e.target.checked)
                          }
                          className="mt-0.5 flex-shrink-0 rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-modelica text-xs sm:text-sm font-semibold text-gray-900 block leading-snug mb-0.5">
                            I confirm that the information submitted is accurate.
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-500 font-modelica block leading-relaxed">
                            All personal, professional, certification, and business information provided is true to the best of my knowledge.
                          </span>
                        </div>
                      </label>
                      {errors.declarationAccurate && (
                        <p className="text-red-500 text-xs font-modelica pl-2">
                          {errors.declarationAccurate}
                        </p>
                      )}

                      {/* Declaration 2 */}
                      <label
                        className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex items-start gap-2.5 sm:gap-3 cursor-pointer transition ${
                          formData.declarationVerify
                            ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.declarationVerify}
                          onChange={(e) =>
                            handleInputChange("declarationVerify", e.target.checked)
                          }
                          className="mt-0.5 flex-shrink-0 rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-modelica text-xs sm:text-sm font-semibold text-gray-900 block leading-snug mb-0.5">
                            I authorize RAG Nutrition to verify my professional certifications and submitted profile details.
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-500 font-modelica block leading-relaxed">
                            RAG Nutrition and Gomzi Life Sciences may conduct partner background and credential verifications.
                          </span>
                        </div>
                      </label>
                      {errors.declarationVerify && (
                        <p className="text-red-500 text-xs font-modelica pl-2">
                          {errors.declarationVerify}
                        </p>
                      )}

                      {/* Declaration 3 */}
                      <label
                        className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex items-start gap-2.5 sm:gap-3 cursor-pointer transition ${
                          formData.declarationPrivacy
                            ? "border-emerald-500 bg-emerald-50/30 shadow-xs"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.declarationPrivacy}
                          onChange={(e) =>
                            handleInputChange("declarationPrivacy", e.target.checked)
                          }
                          className="mt-0.5 flex-shrink-0 rounded text-[#95442c] focus:ring-[#95442c] accent-[#95442c] cursor-pointer w-4 h-4"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-modelica text-xs sm:text-sm font-semibold text-gray-900 block leading-snug mb-0.5">
                            I consent to the handling of my information in accordance with the program’s privacy policy.
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-500 font-modelica block leading-relaxed">
                            Data collected is strictly used for partner onboarding, commission disbursements, and account operations.
                          </span>
                        </div>
                      </label>
                      {errors.declarationPrivacy && (
                        <p className="text-red-500 text-xs font-modelica pl-2">
                          {errors.declarationPrivacy}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ========================================================
                    NAVIGATION BUTTONS
                   ======================================================== */}
                <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200 flex flex-row items-center justify-between gap-2.5 sm:gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={goToPrevStep}
                      disabled={submitting}
                      className="flex-1 sm:flex-initial sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-toma font-bold rounded-xl transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                    >
                      <ChevronLeft className="w-4 h-4 flex-shrink-0" /> Back
                    </button>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {currentStep < 6 ? (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className={`flex-1 sm:flex-initial sm:w-auto px-4 sm:px-8 py-3 sm:py-3.5 bg-[#95442c] hover:bg-[#d26a4a] text-white font-toma font-bold rounded-xl transition flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-[#95442c]/20 text-sm sm:text-base ${
                        currentStep === 1 ? "w-full sm:w-auto sm:ml-auto" : ""
                      }`}
                    >
                      Continue <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting || sendingOtp}
                      className="flex-1 sm:flex-initial sm:w-auto px-2.5 sm:px-10 py-3 sm:py-4 bg-[#95442c] hover:bg-[#d26a4a] text-white font-toma font-bold sm:font-black rounded-xl transition flex items-center justify-center gap-1.5 sm:gap-3 shadow-lg shadow-[#95442c]/30 disabled:opacity-50 text-xs sm:text-base"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                          <span className="truncate">Submitting...</span>
                        </>
                      ) : sendingOtp ? (
                        <>
                          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0" />
                          <span className="truncate">Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span> <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 flex-shrink-0" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-100 relative text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Email Icon Badge */}
            <div className="w-16 h-16 bg-[#fdf5f2] text-[#95442c] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#95442c]/20 shadow-sm">
              <Mail className="w-8 h-8 text-[#95442c]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-toma font-bold text-gray-900 mb-2">
              Verify Your Email Address
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              We've sent a 6-digit OTP code to:
            </p>
            <div className="inline-flex items-center gap-2 bg-[#fdf5f2] text-[#95442c] font-bold px-3.5 py-1.5 rounded-full text-sm mb-3 border border-[#95442c]/20">
              <Mail className="w-4 h-4 text-[#95442c]" />
              {formData.email}
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Wrong email?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowOtpModal(false);
                  setCurrentStep(1);
                }}
                className="text-[#95442c] font-semibold underline hover:text-[#d26a4a]"
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
                  className="w-full text-center text-xl sm:text-2xl font-mono tracking-[0.25em] sm:tracking-[0.4em] py-3 sm:py-3.5 px-3 sm:px-4 bg-gray-50 border-2 border-gray-200 focus:border-[#95442c] focus:bg-white rounded-xl outline-none transition font-bold text-gray-800 placeholder:tracking-normal placeholder:font-sans placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400"
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
                className="w-full py-3.5 bg-[#95442c] hover:bg-[#d26a4a] text-white font-toma font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-[#95442c]/20 disabled:opacity-50 text-base"
              >
                {verifyingOtp ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying OTP...
                  </>
                ) : (
                  <>
                    Verify & Submit Application <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Resend Action */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-center gap-2">
              <span>Didn't receive code?</span>
              {resendCooldown > 0 ? (
                <span className="font-semibold text-gray-400">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  disabled={sendingOtp}
                  onClick={handleSendEmailOtp}
                  className="font-bold text-[#95442c] hover:underline disabled:opacity-50"
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
