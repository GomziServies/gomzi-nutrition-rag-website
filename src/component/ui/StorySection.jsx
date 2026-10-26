import Smallhookheading from "../common/Smallhookheading";

const nutritionBenefits = [
  "Whey Protein for muscle growth",
  "Mass Gainers for healthy weight gain",
  "Peanut Butter for clean nutrition",
  "Multivitamins for daily wellness",
  "Sports Supplements for performance support",
];

export default function StorySection() {
  return (
    <section className="w-full bg-bg py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div className="w-full max-w-[680px] mx-auto lg:mx-0">
            {/* Small Heading */}
            <div className="mb-3 sm:mb-4">
              <Smallhookheading />
            </div>

            {/* Main Heading */}
            <div className="lg:text-left">
              <h2
                className="
                 
                  font-black
                  text-text
                  text-[30px]
                  sm:text-[36px]
                  md:text-[42px]
                  lg:text-[44px]
                  xl:text-[48px]
                  leading-[1.1]
                  tracking-tight
                "
              >
                Why Do Customers Choose Gomzi Supplement?
              </h2>
            </div>

            {/* Description */}
            <div
              className="
                mt-5
                sm:mt-6
               
                text-text
                text-[15px]
                sm:text-[16px]
                md:text-[17px]
                lg:text-[18px]
                leading-[1.7]
              "
            >
              <p>
                At Gomzi supplements, we believe supplements should be
                transparent, effective, and backed by science. That's why every
                formula is designed to support your fitness goals with carefully
                selected ingredients and quality manufacturing standards.
              </p>

              <p className="mt-4 sm:mt-5 font-semibold">
                Whether you're looking for:
              </p>

              {/* Benefits */}
              <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-3.5">
                {nutritionBenefits.map((item) => (
                  <CheckListItem key={item}>{item}</CheckListItem>
                ))}
              </ul>

              <p className="mt-5 sm:mt-6">
                Gomzi Supplement delivers products you can trust every day.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 sm:mt-8">
              <a
                href="/gomzi-supplement"
                className="
                  inline-flex
                  w-full
                  sm:w-auto
                  items-center
                  justify-center
                  min-h-[52px]
                  sm:min-h-[56px]
                  px-7
                  sm:px-9
                  py-3
                  sm:py-4
                  rounded-[10px]
                  bg-[#95442c]
                  text-white
                 
                  font-black
                  text-[14px]
                  sm:text-[15px]
                  lg:text-base
                  tracking-wide
                  text-center
                  leading-tight
                  transition-all
                  duration-300
                  hover:opacity-90
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                Shop Gomzi Supplement by RAG
              </a>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="w-full max-w-[650px] mx-auto lg:ml-auto">
            <div
              className="
                relative
                w-full
                rounded-[16px]
                sm:rounded-[20px]
                overflow-hidden
                bg-white
                p-2
                sm:p-3
              "
            >
              <img
                src="/images/gym-owner.webp"
                alt="Athletes using Gomzi Supplement"
                className="
                  block
                  w-full
                  h-auto
                  object-contain
                  rounded-[12px]
                  sm:rounded-[16px]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckListItem({ children }) {
  return (
    <li
      className="
        flex
        items-start
        gap-3
       
        text-[15px]
        sm:text-[16px]
        md:text-[17px]
        text-gray-700
        leading-[1.55]
      "
    >
      {/* Check */}
      <span
        className="
          flex
          flex-shrink-0
          items-center
          justify-center
          w-[21px]
          h-[21px]
          mt-[2px]
          rounded-full
          bg-[#dce8f5]
        "
      >
        <svg
          width="9"
          height="9"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1.5 4L3 5.5L6.5 2"
            stroke="#003873"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Text */}
      <span className="flex-1">{children}</span>
    </li>
  );
}
