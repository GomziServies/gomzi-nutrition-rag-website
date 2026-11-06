import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AnnouncementBar from "./Header/AnnouncementBanner";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import HkTopBar from "../component/healthkart/HkTopBar";
import HkHeader from "../component/healthkart/HkHeader";
import HkFooter from "../component/healthkart/HkFooter";

const Wrapper = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <>
      {isHomePage ? (
        <>
          <HkTopBar />
          <HkHeader />
          <main>
            <Outlet />
          </main>
          <HkFooter />
        </>
      ) : (
        <>
          <AnnouncementBar />
          <Navbar />
          <div>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Wrapper;