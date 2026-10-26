import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { updateProfileApi } from "../../../api/auth.api";
import { errorToast, successToast } from "../../../utils/toast";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  CheckCircle2,
  Save,
  X,
  ShieldCheck,
} from "lucide-react";

function ProfileSection() {
  const { user, fetchProfile } = useAuth();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    birth_date: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        mobile: user.mobile || "",
        birth_date: user.birth_date ? user.birth_date.split("T")[0] : "",
        address_line_1: user.address?.address_line_1 || "",
        address_line_2: user.address?.address_line_2 || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        country: user.address?.country || "India",
        pin_code: user.address?.pin_code || "",
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    if (!form.first_name.trim()) {
      errorToast("First name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const result = await updateProfileApi({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        mobile: form.mobile.trim(),
        birth_date: form.birth_date,
        address_line_1: form.address_line_1.trim(),
        address_line_2: form.address_line_2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim() || "India",
        pin_code: form.pin_code.trim(),
      });

      if (result) {
        successToast("Profile details updated successfully");
        setEditing(false);
        fetchProfile();
      }
    } catch (error) {
      console.error("Update profile error:", error);
      errorToast(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-primary-border">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            {editing ? "Edit Profile Details" : "Personal Profile & Details"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {editing
              ? "Update your personal credentials and primary shipping address."
              : "Manage your athlete identity, contact info, and default delivery address."}
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-white text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 border border-amber-400/30 cursor-pointer self-start sm:self-auto shrink-0 relative overflow-hidden group"
          >
            <Edit3 size={15} className="relative z-10 text-amber-200" />
            <span className="relative z-10">Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setEditing(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <X size={15} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl btn-gradient text-white text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 border border-amber-400/30 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {loading ? (
                <>
                  <span className="relative z-10 w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="relative z-10">Saving...</span>
                </>
              ) : (
                <>
                  <Save size={15} className="relative z-10 text-amber-200" />
                  <span className="relative z-10">Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        /* ── VIEW MODE ── */
        <div className="flex flex-col gap-6">
          {/* 1. Personal Identity Card */}
          <div className="bg-bg-cream rounded-2xl border border-primary-border p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary-border/80">
              <User size={18} className="text-primary" />
              <h3 className="font-bold text-sm sm:text-base text-text">
                Personal Identity
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  First Name
                </span>
                <p className="font-bold text-sm text-text mt-1">
                  {user?.first_name || "—"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Last Name
                </span>
                <p className="font-bold text-sm text-text mt-1">
                  {user?.last_name || "—"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </span>
                <p className="font-bold text-sm text-text mt-1">
                  {user?.birth_date ? user.birth_date.split("T")[0] : "Not Provided"}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Athlete UID
                </span>
                <p className="font-mono text-xs font-bold text-gray-700 mt-1 truncate">
                  {user?.uid || user?._id || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Contact & Security Card */}
          <div className="bg-bg-cream rounded-2xl border border-primary-border p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary-border/80">
              <Mail size={18} className="text-primary" />
              <h3 className="font-bold text-sm sm:text-base text-text">
                Contact & Verification
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-3.5 border border-primary-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Email Address
                  </span>
                  <p className="font-bold text-sm text-text mt-1">
                    {user?.email || "—"}
                  </p>
                </div>
                {user?.email && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-primary-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Mobile Number
                  </span>
                  <p className="font-bold text-sm text-text mt-1">
                    {user?.mobile ? `+91 ${user.mobile}` : "—"}
                  </p>
                </div>
                {user?.mobile && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-[#f5eeeb] px-2 py-0.5 rounded border border-primary-border">
                    <Phone size={11} /> Primary OTP
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 3. Shipping & Delivery Destination Card */}
          <div className="bg-bg-cream rounded-2xl border border-primary-border p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary-border/80">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <h3 className="font-bold text-sm sm:text-base text-text">
                  Default Delivery Address
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-gray-500">
                Pan-India Express Destination
              </span>
            </div>

            {user?.address?.address_line_1 || user?.address?.city ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 lg:col-span-3 bg-white rounded-xl p-3.5 border border-primary-border">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Street Address
                  </span>
                  <p className="font-bold text-sm text-text mt-1">
                    {user?.address?.address_line_1}
                    {user?.address?.address_line_2 ? `, ${user.address.address_line_2}` : ""}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    City
                  </span>
                  <p className="font-bold text-sm text-text mt-1">
                    {user?.address?.city || "—"}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    State
                  </span>
                  <p className="font-bold text-sm text-text mt-1">
                    {user?.address?.state || "—"}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-primary-border">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Postal PIN Code
                  </span>
                  <p className="font-bold text-sm text-text mt-1">
                    {user?.address?.pin_code || "—"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 border border-dashed border-primary-border text-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  No default delivery address saved yet.
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Add your shipping address for fast 1-click checkout on all supplements.
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-gradient text-white text-xs font-bold hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 border border-amber-400/30 cursor-pointer relative overflow-hidden group"
                >
                  <MapPin size={13} className="relative z-10 text-amber-200" />
                  <span className="relative z-10">Add Delivery Address</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── EDIT FORM MODE ── */
        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          {/* Identity Fields */}
          <div className="bg-bg-cream rounded-2xl border border-primary-border p-5 sm:p-6 flex flex-col gap-4">
            <h3 className="font-bold text-sm text-text flex items-center gap-2">
              <User size={16} className="text-primary" />
              Personal Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  placeholder="e.g. Rahul"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  placeholder="e.g. Sharma"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={form.birth_date}
                  onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Mobile Number</label>
                <div className="flex items-center bg-white border border-primary-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 transition-all">
                  <span className="text-gray-400 font-bold mr-2 select-none">+91</span>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    placeholder="9876543210"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Fields */}
          <div className="bg-bg-cream rounded-2xl border border-primary-border p-5 sm:p-6 flex flex-col gap-4">
            <h3 className="font-bold text-sm text-text flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Shipping Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Flat, House no., Building, Apartment
                </label>
                <input
                  type="text"
                  value={form.address_line_1}
                  onChange={(e) => setForm({ ...form, address_line_1: e.target.value })}
                  placeholder="e.g. 402, Gymshark Heights"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Area, Street, Sector, Village
                </label>
                <input
                  type="text"
                  value={form.address_line_2}
                  onChange={(e) => setForm({ ...form, address_line_2: e.target.value })}
                  placeholder="e.g. Ring Road, Near Fitness Center"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">City / Town</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Surat"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="e.g. Gujarat"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">PIN Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={form.pin_code}
                  onChange={(e) => setForm({ ...form, pin_code: e.target.value })}
                  placeholder="e.g. 395007"
                  className="w-full bg-white border border-primary-border focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">Country</label>
                <input
                  type="text"
                  disabled
                  value="India"
                  className="w-full bg-gray-100 border border-primary-border rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 rounded-xl btn-gradient text-white text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 border border-amber-400/30 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {loading ? (
                <>
                  <span className="relative z-10 w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="relative z-10">Updating Profile...</span>
                </>
              ) : (
                <>
                  <Save size={15} className="relative z-10 text-amber-200" />
                  <span className="relative z-10">Save All Changes</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-6 py-3.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfileSection;
