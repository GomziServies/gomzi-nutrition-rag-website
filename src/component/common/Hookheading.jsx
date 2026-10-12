import React from "react";

const Hookheading = ({ text1,text2,text3 }) => {
  return (
    <div>
      <h2
        className="font-toma text-center text-3xl sm:text-4xl lg:text-5xl font-black text-text mb-10 md:mb-14"
        style={{ lineHeight: "1.15", letterSpacing: "-0.3px" }}
      >
       {text1}{" "}
        <span
          className="relative inline-block"
          style={{ color: "#111111", isolation: "isolate" }}
        >
          {text2}
          {/* Underline accent image */}
          <img
            src="/images/hookright.png"
            alt=""
            className="absolute left-0 w-full"
            style={{ pointerEvents: "none", top: "60%", zIndex: -1 }}
          />{" "}
        </span>
        {text3}
      </h2>
    </div>
  );
};

export default Hookheading;
