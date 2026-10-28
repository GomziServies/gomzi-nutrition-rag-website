import PageHeading from "../../HOC/Header/PageHeading";
import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import Sidebar from "./components/Sidebar";
import OrdersSection from "./components/OrdersSection";
import CartSection from "./components/CartSection";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-light">
      <PageHeading head="My Account" description="Manage your details and keep track of your orders." />
      <div className="site-container py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* SIDEBAR */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* CONTENT */}
          <div className="site-surface site-form flex-1 min-w-0 p-4 sm:p-6 md:p-8">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "orders" && <OrdersSection />}
            {activeTab === "cart" && <CartSection />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
