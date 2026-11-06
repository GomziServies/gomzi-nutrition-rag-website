import React from "react";

const NaraHealthSection = () => {
  return (
    <section className="bg-section py-12 lg:py-16">
      <div className="site-container">
        <div className="grid lg:grid-cols-[1.2fr_1.05fr] gap-10 lg:gap-16 items-start">
          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="">
              <h2 className="font-toma text-3xl md:text-4xl font-bold leading-tight mb-4">
                Why Gomzi Supplement?
                {/* <br />
              Science. Transparency. Results. */}
              </h2>

              <p className="text-gray-600 text-base md:text-lg leading-8 mb-7">
                Gomzi Supplement is built on the legacy of RAG and years of
                real-world expertise in health and fitness education.
              </p>

              <ul className="flex flex-col space-y-3 mb-8 mt-1">
                <li className="flex items-center gap-2 text-gray-700">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dce8f5" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#003873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  15+ Years of Industry Experience
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dce8f5" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#003873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Developed by Lecturers & Health Educators
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dce8f5" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#003873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Science-Backed Formulations
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dce8f5" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#003873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  100% Transparent Ingredients
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dce8f5" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#003873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  No Amino Spiking or Hidden Blends
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#dce8f5" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2"
                        stroke="#003873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Trusted by Coaches, Dietitians & Fitness Professionals
                </li>
              </ul>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {/* Button 1 - Open Education Site */}
                <a
                  href="https://fggroup.in/fgiit/fitness-courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-modelica font-medium text-sm rounded-full hover:bg-hover transition-colors duration-200 whitespace-nowrap"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open Education Site
                </a>

                {/* Button 2 - Open Founder Profile */}
                <a
                  href="https://www.instagram.com/chirag_pandey16/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-black font-modelica font-medium text-sm rounded-full hover:bg-primary hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Open Founder Profile
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-end">
            <div className="relative w-full max-w-[500px]">
              <img
                src="/images/Gomzi_Protein_Product_HD.webp"
                alt="Founder"
                className="
                w-full
                aspect-[4/5]
                object-cover
                rounded-[28px]
                shadow-xl
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NaraHealthSection;
