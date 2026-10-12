import React from "react";

const CategoryHero = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block mb-12">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[4px] text-[#9d5a48]">
            {pageData.tag || pageData.subHeading}
          </span>

          <h1 className="mt-3 text-6xl xl:text-7xl font-black leading-none text-gray-900">
            {pageData.heading}
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600 max-w-3xl">
            {pageData.description}
          </p>
        </div>

        {/* {pageData.sections?.comparisonSection?.badges?.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {pageData.sections.comparisonSection.badges.map((badge) => (
              <div
                key={badge.label}
                className="px-5 py-3 rounded-xl border-2 border-[#9d5a48] bg-white"
              >
                <span className="font-semibold text-[#9d5a48]">
                  {badge.value}
                </span>

                <span className="text-xs uppercase text-gray-600 ml-2">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        )} */}
      </div>

      {/* Mobile */}
      <div className="lg:hidden mb-8">
        <div className="mb-6">
          <span
            className="text-[11px] font-semibold tracking-[3px] uppercase"
            style={{ color: pageData.accent }}
          >
            {pageData.tag || pageData.subHeading}
          </span>

          <h1 className="mt-2 text-4xl font-black leading-none">
            {pageData.heading}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {pageData.description}
          </p>
        </div>

        {/* {pageData.sections?.comparisonSection?.badges?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pageData.sections.comparisonSection.badges.map((badge) => (
              <div
                key={badge.label}
                className="px-3 py-2 rounded-lg border bg-white text-xs"
              >
                <span className="font-semibold">{badge.value}</span>

                <span className="text-gray-500 ml-1">{badge.label}</span>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </>
  );
};

export default CategoryHero;
