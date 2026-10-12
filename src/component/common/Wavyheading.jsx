import React from "react";
import WavyImageUnderline from "./WavyImageUnderline";

const Wavyheading = ({ text1, text2, text3 }) => {
  return (
    <div className="text-center mb-5 md:mb-0">
      <h2
        className="font-toma text-text  inline-block relative"
        style={{
          fontSize: "clamp(28px, 4.5vw, 48px)",
          fontWeight: "950",
          letterSpacing: "3px",
          lineHeight: "1.1",
          isolation: "auto",
        }}
      >
        {text1} <WavyImageUnderline>{text2}</WavyImageUnderline>
        {text3}
      </h2>
    </div>
  );
};

export default Wavyheading;
