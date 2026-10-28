import React from "react";

const features = [
  {
    icon: "/images/icons/certified.png",
    text: "FSSAI Licensed",
    alt: "FSSAI Licensed",
  },
  {
    icon: "/images/icons/certified.png",
    text: "GMP Certified",
    alt: "GMP Certified",
  },
  {
    icon: "/images/icons/research.png",
    text: "Lab Tested",
    alt: "Lab Tested",
  },
  {
    icon: "/images/icons/dependable.png",
    text: "Personalized Support",
    alt: "Personalized Support",
  },
  {
    icon: "/images/icons/fast-delivery.png",
    text: "Pan India Delivery",
    alt: "Pan India Delivery",
  },
];

const BlackFeatureBar = () => {
  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            divide-y
            sm:divide-y-0
            sm:divide-x-0
            lg:divide-x
            divide-white/15
          "
        >
          {features.map((item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-center
                gap-3
                px-3
                py-5
                sm:py-6
                lg:py-5
                xl:py-6
                min-h-[76px]
                sm:min-h-[82px]
                lg:min-h-[88px]
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  flex-shrink-0
                  items-center
                  justify-center
                "
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="
                    block
                    h-full
                    w-full
                    object-contain
                  "
                />
              </div>

              {/* Text */}
              <span
                className="
                  font-modelica
                  text-[14px]
                  sm:text-[15px]
                  md:text-[16px]
                  lg:text-[15px]
                  xl:text-[16px]
                  font-medium
                  leading-[1.25]
                  text-white
                  whitespace-nowrap
                "
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlackFeatureBar;
