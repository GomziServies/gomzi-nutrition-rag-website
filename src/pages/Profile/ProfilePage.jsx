import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import Sidebar from "./components/Sidebar";
import OrdersSection from "./components/OrdersSection";
import CartSection from "./components/CartSection";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-3 md:px-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* SIDEBAR */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* CONTENT */}
          <main className="flex-1 bg-white rounded-2xl shadow-sm p-4 md:p-8">
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
