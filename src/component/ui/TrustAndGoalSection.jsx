import React from "react";
import { FileCheck2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// const goals = [
//   {
//     id: "01",
//     title: "Build lean muscle",
//     products: [
//       "Whey Protein Isolate",
//       "Recovery Blend 2:1:1",
//       "Complete Multivitamin",
//     ],
//     url: "/gomzi-supplement/whey-protein",
//   },
//   {
//     id: "02",
//     title: "Recover faster, train more",
//     products: [
//       "Complete EAA",
//       "Whey Protein Blend",
//       "Daily Immunity Multivitamin",
//     ],
//     url: "/gomzi-supplement/bcaa",
//   },
//   {
//     id: "03",
//     title: "Daily wellness, no gym required",
//     products: [
//       "Complete Multivitamin",
//       "Whey Protein Concentrate",
//       "Daily Immunity Formula",
//     ],
//     url: "/gomzi-supplement/wellness-health",
//   },
// ];

const TrustAndGoalSection = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/product-report.pdf";
    link.download = "Batch_Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="py-16 w-full overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        {/* ================= TRUST ================= */}

        <div className="rounded-[34px] border border-[#E7D9C7] bg-white p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* CONTENT */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                See the lab report before you buy
                <br />
                not after you complain.
              </h2>

              <p className="md:mt-8 mt-3 text-lg leading-8 text-gray-600">
                Every Gomzi supplement batch is independently tested for protein
                content, heavy metals, and microbiological safety by an
                accredited third-party lab. Here's a real sample report download
                it to see exactly what we test, and how the results are
                presented, before you check your own batch.
              </p>

              {/* Desktop button */}
              <button
                onClick={handleDownload}
                className="hidden lg:flex mt-10 h-14 px-8 rounded-xl bg-[#18120D] text-white items-center gap-3 hover:bg-[#2A211A] transition"
              >
                <FileCheck2 size={20} />
                Check Batch Report
              </button>
            </div>

            {/* IMAGE */}
            <div className="rounded-3xl bg-[#F7F1E8] flex items-center justify-center">
              <img
                src="/images/report.webp"
                alt="Product batch report"
                className="img-fluid rounded-2xl"
              />
            </div>

            {/* Mobile button */}
            <div className="lg:hidden">
              <button
                onClick={handleDownload}
                className="w-full h-14 px-8 rounded-xl bg-[#18120D] text-white flex items-center justify-center gap-3 hover:bg-[#2A211A] transition"
              >
                <FileCheck2 size={20} />
                Check Batch Report
              </button>
            </div>
          </div>
        </div>

        {/* ================= GOALS ================= */}

        {/* <div className="mt-10 lg:mt-20">
          <h2 className="text-5xl font-black">Not sure where to start?</h2>

          <p className="mt-4 text-xl text-gray-600">
            Pick your goal-we'll point you to the right stack, not just our
            highest-priced product.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="rounded-[16px] border border-[#E7D9C7] bg-white p-8 hover:shadow-xl transition duration-300"
              >
                <p className="uppercase tracking-[3px] text-[#B66B1E] text-xs font-semibold">
                  Goal {goal.id}
                </p>

                <h3 className="mt-3 text-2xl font-bold">{goal.title}</h3>

                <ul className="mt-2 space-y-3">
                  {goal.products.map((item) => (
                    <li key={item} className="text-gray-600 flex">
                      <span className="mr-2">-</span>

                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={goal.url}
                  className="mt-6 inline-flex items-center gap-2 text-[#B66B1E] font-semibold hover:gap-3 transition-all"
                >
                  Shop this stack
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustAndGoalSection;
