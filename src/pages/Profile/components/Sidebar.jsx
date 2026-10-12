import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { User, ShoppingBag, ShoppingCart, LogOut } from "lucide-react";

function Sidebar({ activeTab, setActiveTab }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleCartClick = () => {
    setActiveTab("cart");
    navigate("/cart");
  };

  const menuClass = (tab) =>
    `flex items-center gap-3 min-w-fit lg:w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      activeTab === tab
        ? "bg-black text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-fit">
      <aside>
        {/* PROFILE */}
        <div className="flex lg:flex-col items-center gap-4 lg:text-center border-b border-gray-100 pb-5">
          <img
            src={`https://ui-avatars.com/api/?background=000&color=fff&name=${user?.first_name}`}
            alt="Profile"
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
          />

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.first_name} {user?.last_name}
            </h2>

            <p className="text-sm text-gray-500">Welcome back 👋</p>
          </div>
        </div>

        {/* MENU */}
        <div className="mt-5 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 scrollbar-hide">
          {/* PROFILE */}
          <button
            onClick={() => setActiveTab("profile")}
            className={menuClass("profile")}
          >
            <User size={18} />
            Profile
          </button>

          {/* ORDERS */}
          <button
            onClick={() => setActiveTab("orders")}
            className={menuClass("orders")}
          >
            <ShoppingBag size={18} />
            Orders
          </button>

          {/* CART */}
          <button onClick={handleCartClick} className={menuClass("cart")}>
            <ShoppingCart size={18} />
            Cart
          </button>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex items-center gap-3 min-w-fit lg:w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
