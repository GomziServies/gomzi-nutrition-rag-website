import {
  UserRound,
  ShieldCheck,
  FlaskConical,
  Factory,
  BadgeCheck,
  FileCheck2,
  ClipboardList,
  Beaker,
} from "lucide-react";

const founders = [
  {
    name: "Dt. Chirag Pandey",
    role: "Founder",
    image: "/images/chirag-pandey.jpg",
    description:
      "Dt. Chirag Pandey co-founded Gomzi Supplement, bringing his background in dietetics into every formulation. As a dietitian, he's seen firsthand where most supplements fall short - so Gomzi's products are built on real nutritional science, not just what looks good on a label.",
    tags: ["Dietetics", "Nutritional Science", "Product Formulation"],
  },
  {
    name: "Chirag Chandlekar",
    role: "Co-Founder",
    image: "/images/chirag-chandlekar.jpg",
    description:
      "Chirag Chandlekar co-founded Gomzi Supplement, bringing the same manufacturing discipline from the Gomzi Lifesciences facility into the brand's own product line. He makes sure every batch meets the same consistency and quality standards the facility holds its manufacturing clients to.",
    tags: ["Manufacturing Excellence", "Quality Control", "Batch Consistency"],
  },
];

export default function ManufacturingSection() {
  return (
    <section className="w-full overflow-hidden bg-section py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              leading-[1.1]
              tracking-tight
              text-text-black
            "
          >
            Leadership
          </h2>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="
                w-full
                rounded-2xl
                sm:rounded-3xl
                border
                border-[#E7D9C8]
                bg-[#F7F1E8]
                p-5
                sm:p-6
                md:p-8
                lg:p-9
              "
            >
              {/* Founder Header */}
              <div className="flex flex-col items-center text-center">
                {/* Image */}
                <div
                  className="
                    w-[150px]
                    h-[180px]
                    sm:w-[170px]
                    sm:h-[205px]
                    md:w-48
                    md:h-56
                    rounded-[22px]
                    sm:rounded-[26px]
                    overflow-hidden
                    bg-white
                    flex-shrink-0
                  "
                >
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Name */}
                <h3
                  className="
                    mt-5
                    sm:mt-6
                    text-xl
                    sm:text-2xl
                    md:text-[26px]
                    font-bold
                    leading-tight
                    text-text-black
                  "
                >
                  {founder.name}
                </h3>

                {/* Role */}
                <p
                  className="
                    mt-2
                    uppercase
                    tracking-[2px]
                    sm:tracking-[3px]
                    text-[10px]
                    sm:text-xs
                    text-[#B66B1E]
                    font-semibold
                  "
                >
                  {founder.role}
                </p>
              </div>

              {/* Description */}
              <div
                className="
                  mt-6
                  sm:mt-7
                  w-full
                  max-w-[620px]
                  mx-auto
                "
              >
                <p
                  className="
                    text-[15px]
                    sm:text-[16px]
                    md:text-[17px]
                    leading-[1.7]
                    sm:leading-[1.75]
                    text-gray-600
                    font-modelica
                    text-left
                  "
                >
                  {founder.description}
                </p>
              </div>

              {/* Tags */}
              <div
                className="
                  flex
                  flex-wrap
                  justify-start
                  sm:justify-center
                  gap-2
                  sm:gap-3
                  mt-6
                  sm:mt-8
                "
              >
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      px-3
                      py-1.5
                      sm:px-3.5
                      sm:py-2
                      rounded-full
                      bg-white
                      text-[11px]
                      sm:text-xs
                      md:text-sm
                      font-medium
                      leading-tight
                      text-gray-700
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
