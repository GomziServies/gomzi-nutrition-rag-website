import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProfileSection from "./components/ProfileSection";
import Sidebar from "./components/Sidebar";
import OrdersSection from "./components/OrdersSection";
import CartSection from "./components/CartSection";
import { User, ShieldCheck, ShoppingBag, MapPin, ArrowRight } from "lucide-react";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect or guard if user is definitely not authenticated
  useEffect(() => {
    // If auth state has settled and user is not authenticated
    if (!loading && !isAuthenticated && !localStorage.getItem("authorization")) {
      // User can see the unauthenticated state or navigate
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f8] px-4 font-modelica">
        <div className="w-10 h-10 border-3 border-[#5C3124]/20 border-t-[#5C3124] rounded-full animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Loading Athlete Profile...
        </p>
      </div>
    );
  }

  if (!isAuthenticated && !user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#faf9f8] px-4 py-16 font-modelica text-center">
        <div className="w-20 h-20 rounded-full bg-[#f5eeeb] border border-[#ebdcd7] flex items-center justify-center text-[#5C3124] mb-6 shadow-sm">
          <User size={36} />
        </div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#5C3124] bg-[#f5eeeb] px-3.5 py-1 rounded-full border border-[#ebdcd7]">
          Gomzi Athlete Club
        </span>
        <h1 className="font-toma text-3xl sm:text-4xl font-black text-[#1c1c28] tracking-tight mt-3 mb-2">
          Sign In to Access Your Account
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed mb-8">
          View your order history, live tracking, saved delivery addresses, and exclusive member discounts.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 px-6 rounded-xl bg-[#5C3124] hover:bg-[#48261c] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#5C3124]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In Now</span>
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Create Account</span>
          </button>
        </div>
      </div>
    );
  }

  const userInitials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.first_name
      ? user.first_name.slice(0, 2).toUpperCase()
      : "GA";

  return (
    <div className="min-h-screen bg-[#faf8f6] py-6 md:py-10 font-modelica text-[#1c1c28]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#5C3124] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">My Account</span>
          <span>/</span>
          <span className="text-[#5C3124] capitalize font-semibold">
            {activeTab}
          </span>
        </div>

        {/* Top Athlete Header Banner */}
        <div className="w-full bg-white rounded-2xl md:rounded-3xl border border-[#ebdcd7] p-5 sm:p-7 md:p-8 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Athlete Info Left */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#5C3124] to-[#3a1f17] text-white flex items-center justify-center font-toma text-xl sm:text-2xl font-black shadow-md shadow-[#5C3124]/20 shrink-0 border-2 border-amber-300/30">
                {userInitials}
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#f5eeeb] text-[#5C3124] border border-[#ebdcd7]">
                    <ShieldCheck size={12} className="text-[#5C3124]" />
                    Official Gomzi Athlete
                  </span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active Member
                  </span>
                </div>

                <h1 className="font-toma text-2xl sm:text-3xl font-black text-[#1c1c28] tracking-tight leading-tight truncate">
                  {user?.first_name} {user?.last_name}
                </h1>

                <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                  {user?.email && <span>{user.email}</span>}
                  {user?.mobile && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>+91 {user.mobile}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stat Tiles Right */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
              <div className="bg-[#faf8f6] rounded-xl p-3 border border-[#ebdcd7] flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Account Status
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#1c1c28] mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Verified
                </span>
              </div>

              <div className="bg-[#faf8f6] rounded-xl p-3 border border-[#ebdcd7] flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Primary City
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#1c1c28] mt-0.5 truncate max-w-[110px]">
                  {user?.address?.city || "Not Set"}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-[#faf8f6] rounded-xl p-3 border border-[#ebdcd7] flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Store Access
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#5C3124] mt-0.5">
                  VIP Pricing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SIDEBAR NAVIGATION */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* MAIN TAB CONTENT */}
          <main className="flex-1 bg-white rounded-2xl md:rounded-3xl border border-[#ebdcd7] p-5 sm:p-7 md:p-8 shadow-sm">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "orders" && <OrdersSection />}
            {activeTab === "cart" && <CartSection />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
