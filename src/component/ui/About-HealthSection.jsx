import React, { useState } from "react";

const data = [
  {
    title: "Breakfast",
    icon: "/images/accegg.png",
    content:
      "Start your day with balanced nutrition that fuels your energy and focus.",
  },
  {
    title: "Lunch",
    icon: "/images/accvegetables.png",
    content:
      "Perfect midday nutrition to keep your productivity and energy high.",
  },
  {
    title: "Weight Management",
    icon: "/images/accfigur.png",
    content: "Supports metabolism and helps maintain a healthy body weight.",
  },
  {
    title: "Gaming Sessions",
    icon: "/images/accvideogame.png",
    content: "Long gaming sessions require sustained energy and mental focus.",
  },
];

const AboutHealthSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-12 md:py-20 w-full overflow-hidden">
      {/* ✅ Fix: px-4 on mobile, px-8 on md, px-18 on lg+ */}
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <img
                src="/images/Gomzi_Protein_Product_HD.webp"
                alt="Gomzi Supplement by RAG"
                className="rounded-2xl w-full"
              />
            </div>
          </div>

          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-toma text-3xl md:text-4xl lg:text-4xl mb-5 font-bold text-wider">
              Gomzi Supplement by RAG is perfect for:
            </h2>

            <p className="font-modelica text-text-blck text-lg mb-8 max-w-xl">
              From peak performance to everyday wellness, Gomzi Supplement by
              Gomzi Supplement brings balanced nutrition into every moment of
              your life.
            </p>

            {/* ACCORDION */}
            <div className="space-y-1">
              {data.map((item, index) => (
                <div key={index} className="border-b border-border">
                  {/* HEADER */}
                  <div
                    onClick={() => toggleAccordion(index)}
                    className="flex items-center justify-between py-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.icon}
                        alt=""
                        className="w-9 h-9 flex-shrink-0"
                      />
                      <h3 className="font-modelica text-xl md:text-2xl text-black font-medium text-wide">
                        {item.title}
                      </h3>
                    </div>

                    {/* ARROW */}
                    <div
                      className={`transition duration-300 flex-shrink-0 ml-2 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openIndex === index
                        ? "max-h-40 opacity-100 pb-5"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="font-modelica text-text-light">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHealthSection;
