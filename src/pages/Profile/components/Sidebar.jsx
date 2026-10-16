import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { User, ShoppingBag, ShoppingCart, LogOut, ShieldCheck, ChevronRight } from "lucide-react";

function Sidebar({ activeTab, setActiveTab }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleCartClick = () => {
    setActiveTab("cart");
    navigate("/cart");
  };

  const menuClass = (tab) =>
    `flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
      activeTab === tab
        ? "bg-[#5C3124] text-white shadow-md shadow-[#5C3124]/20"
        : "text-gray-700 hover:bg-[#faf5f3] hover:text-[#5C3124]"
    }`;

  const mobilePillClass = (tab) =>
    `flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${
      activeTab === tab
        ? "bg-[#5C3124] text-white shadow-sm"
        : "bg-white text-gray-700 border border-[#ebdcd7] hover:bg-[#faf5f3]"
    }`;

  const userInitials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.first_name
      ? user.first_name.slice(0, 2).toUpperCase()
      : "GA";

  return (
    <aside className="w-full lg:w-72 shrink-0">
      {/* Mobile Horizontal Pill Bar */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab("profile")}
          className={mobilePillClass("profile")}
        >
          <User size={15} />
          <span>Profile & Address</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={mobilePillClass("orders")}
        >
          <ShoppingBag size={15} />
          <span>My Orders</span>
        </button>

        <button onClick={handleCartClick} className={mobilePillClass("cart")}>
          <ShoppingCart size={15} />
          <span>Shopping Cart</span>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-all shrink-0 cursor-pointer"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>

      {/* Desktop Vertical Nav Card */}
      <div className="hidden lg:flex flex-col bg-white rounded-2xl md:rounded-3xl border border-[#ebdcd7] p-5 shadow-sm">
        {/* Profile Identity Snippet */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-[#ebdcd7]">
          <div className="w-12 h-12 rounded-xl bg-[#5C3124] text-white flex items-center justify-center font-toma text-base font-black shrink-0 border border-amber-300/30">
            {userInitials}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-[#1c1c28] truncate">
              {user?.first_name} {user?.last_name}
            </span>
            <span className="text-[11px] text-gray-500 truncate">
              {user?.email || `+91 ${user?.mobile}`}
            </span>
          </div>
        </div>

        {/* Menu Navigation Items */}
        <nav className="flex flex-col gap-1.5 mt-5">
          {/* PROFILE & ADDRESSES */}
          <button
            onClick={() => setActiveTab("profile")}
            className={menuClass("profile")}
          >
            <div className="flex items-center gap-3">
              <User size={17} />
              <span>Profile & Details</span>
            </div>
            <ChevronRight
              size={15}
              className={activeTab === "profile" ? "text-white/80" : "text-gray-400"}
            />
          </button>

          {/* ORDERS */}
          <button
            onClick={() => setActiveTab("orders")}
            className={menuClass("orders")}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={17} />
              <span>Orders & Tracking</span>
            </div>
            <ChevronRight
              size={15}
              className={activeTab === "orders" ? "text-white/80" : "text-gray-400"}
            />
          </button>

          {/* CART */}
          <button onClick={handleCartClick} className={menuClass("cart")}>
            <div className="flex items-center gap-3">
              <ShoppingCart size={17} />
              <span>View Cart</span>
            </div>
            <ChevronRight
              size={15}
              className={activeTab === "cart" ? "text-white/80" : "text-gray-400"}
            />
          </button>

          {/* DIVIDER */}
          <div className="my-2 border-t border-gray-100" />

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut size={17} />
              <span>Sign Out</span>
            </div>
          </button>
        </nav>

        {/* Mini Trust Guarantee */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400 font-medium">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>FSSAI Certified Athlete Account</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
