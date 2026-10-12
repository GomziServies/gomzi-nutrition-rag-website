import React, { useEffect } from 'react'
import AnnouncementBar from './Header/AnnouncementBanner';
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Wrapper = () => {
//     const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       // behavior: "smooth", // agar instant chahiye to hata do
//     });
//   }, [pathname]);
  return (
   <>
    <AnnouncementBar/>
    <Navbar/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
   </>
   
  )
}

export default Wrapper