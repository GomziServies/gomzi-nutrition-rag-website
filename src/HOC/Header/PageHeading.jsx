import React from "react";

const PageHeading = ({ head }) => {
  return (
    <div className="relative w-full overflow-hidden bg-[#5c3024f0]">
      {/* Left Side Image - Hidden on mobile */}
      <img
        src="/images/pageheadingleft.png"
        alt=""
        className="opacity-20 absolute left-0 top-0 h-full w-auto object-contain z-0 hidden md:block"
      />

      {/* Right Side Image */}
      <img
        src="/images/pageheadingright.png"
        alt=""
        className="opacity-20 absolute right-0 top-0 h-full w-auto object-contain z-0"
      />

      {/* Content Container */}
      <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-14">
        <h1 className="font-toma text-center text-white text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-black">
          {head || "Gomzi Supplement"}
        </h1>
      </div>
    </div>
  );
};

export default PageHeading;
