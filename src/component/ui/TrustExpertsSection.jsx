export default function TrustExpertsSection() {
  return (
    <>
      <style>{`
  .inquiry-btn {
    position: relative;
    text-align: center;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.4);
    outline: none;
    padding: 0 32px;
    height: 56px;
    border-radius: 15px;
    overflow: hidden;
    width: 100%;
    transform: scaleX(1);
    transition: transform 0.5s cubic-bezier(0.4,0,0,1), border-color 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .inquiry-btn:hover {
    animation: scaleAnim 0.6s cubic-bezier(0.4,0,0,1);
    border-color: rgba(255,255,255,0.7);
  }
  .inquiry-btn::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    background: white;
    transition: transform 0.5s cubic-bezier(0.4,0,0,1), border-radius 0.5s cubic-bezier(0.4,0,0,1);
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 0 0;
    transform: translateY(100%);
  }
  .inquiry-btn:hover::after {
    transform: translateY(0%);
    border-radius: 0;
  }
  .inquiry-btn span {
    font-size: 15px;
    font-weight: 700;
    overflow: hidden;
    position: relative;
    color: white;
    z-index: 1;
  }
  .inquiry-btn span::after {
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.4,0,0,1);
    content: attr(data-text);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 0;
    z-index: 1;
    transform: translate(-50%, 100%);
    color: #000;
  }
  .inquiry-btn:hover span::after {
    transform: translate(-50%, 0);
  }
  @keyframes scaleAnim {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.03); }
    100% { transform: scaleX(1); }
  }
`}</style>
      <section
        className="w-full py-12 md:py-16 lg:py-20"
        style={{ background: "#f4f4f0" }}
      >
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
          {/* Card */}
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{ background: "#17120D" }}
          >
            {/* Card inner */}
            <div className="relative z-10 flex flex-col md:flex-row items-start">
              {/* ── Left: Text Content ── */}
              <div
                className="flex-1 flex flex-col gap-5 p-8 sm:p-10 md:p-12 lg:p-14"
                style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Heading */}
                <h2
                  className="font-toma text-2xl md:text-3xl lg:text-5xl text-white font-black"
                  style={{ lineHeight: "1.15", letterSpacing: "0.3px" }}
                >
                  Looking for Bulk Orders or Distribution Partnership
                  <span className="italic font-bold" style={{ color: "#fff" }}>
                    ?
                  </span>
                </h2>

                {/* Quote */}
                <p
                  className="font-modelica text-white"
                  style={{
                    fontSize: "20px",
                    lineHeight: "1.7",
                  }}
                >
                  Get exclusive wholesale pricing on premium supplements for
                  your business. Partner with us for bulk orders, dealership
                  opportunities, and dedicated support. Ideal for retailers,
                  gyms, nutrition stores, and distributors.
                </p>

                {/* Divider */}
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "rgba(255,255,255,0.12)",
                  }}
                />

                {/* CTA Area */}
                <div className="flex flex-col gap-3">
                  <a
                    href="/contact-us"
                    className="text-center w-full px-6 py-4 rounded-xl font-modelica font-bold text-sm md:text-base transition-all duration-200"
                    style={{ background: "#ffffff", color: "#000" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                    }}
                  >
                    Click Here for Bulk Inquiry / Distributor
                  </a>

                  {/* <a href="/contact-us" className="inquiry-btn font-modelica">
                    <span data-text="Become a Distributor">
                      Become a Distributor
                    </span>
                  </a> */}
                </div>
              </div>

              {/* ── Right: Doctor Image ── */}
              <div className="w-full md:w-[38%] flex-shrink-0 flex items-center p-8 sm:p-10 md:p-12 lg:p-14">
                <div className="rounded-2xl overflow-hidden w-full aspect-[4/5] md:aspect-[3/3]">
                  <img
                    src="/images/product-export.webp"
                    alt="Doctor Benedict Jonuska"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, #003873 0%, #001f42 100%)";
                      e.target.src = "";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
