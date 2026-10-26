import React from "react";

const Smallhookheading = ({ text1, text2 }) => {
  return (
    <div>
      <h2
        className="font-black text-text text-3xl sm:text-4xl lg:text-4xl xl:text-5xl mb-5 md:mb-6 leading-tight"
        style={{ letterSpacing: "-0.3px" }}
      >
        {text1}
        {text2 && (
          <>
            {" "}
            <span
              className="relative inline-block"
              style={{ color: "#111111", isolation: "isolate" }}
            >
              {text2}
            </span>
          </>
        )}
      </h2>
    </div>
  );
};

export default Smallhookheading;
