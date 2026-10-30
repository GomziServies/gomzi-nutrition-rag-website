import { useNavigate } from "react-router-dom";
import BlackFeatureBar from "../common/Black-Feature-Bar";
import { Download, ShoppingCart } from "lucide-react";

export default function HeroSectionWithIcons() {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/gomzi-brochure.pdf";
    link.download = "Gomzi-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        {/* ================= Banner ================= */}
        <picture className="block w-full aspect-[1078/1460] md:aspect-[1600/533] overflow-hidden">
          <source
            srcSet="/images/banner-(gls)-mobile-view.webp"
            media="(max-width: 1023px)"
          />

          <source
            srcSet="/images/banner-(gls)-web-view.webp"
            media="(min-width: 1024px)"
          />

          <img
            src="/images/banner-(gls)-web-view.webp"
            alt="Science-backed sports nutrition products by Gomzi Supplement."
            className="
              block
              w-full
              h-auto
              object-cover
            "
          />
        </picture>

        {/* ================= Responsive Buttons ================= */}
        <div
          className="
            absolute
            z-20
            left-1/2
            -translate-x-1/2

            /* Mobile */
            bottom-[4%]
            flex
            flex-row
            items-center
            justify-center
            gap-2
            w-full
            px-3

            /* Small tablets */
            sm:bottom-[4%]
            sm:gap-3
            sm:px-5

            /* Tablets */
            md:bottom-[5%]
            md:gap-4
            md:px-6

            /* Desktop */
            lg:left-[2.5%]
            lg:translate-x-0
            lg:bottom-[25%]
            lg:w-auto
            lg:justify-start
            lg:gap-5
            lg:px-0

            /* Large desktop */
            xl:left-[2.5%]
            xl:bottom-[25%]
            xl:gap-6
          "
        >
          {/* Shop Now */}
          <button
            onClick={() => navigate("/gomzi-supplement")}
            className="
              bg-[#333333]
              hover:bg-black
              text-white
              font-semibold
              rounded-lg
              shadow-lg
              transition
              cursor-pointer
              whitespace-nowrap
              flex
              items-center
              justify-center
              gap-2

              text-xs
              px-3
              py-2

              sm:text-sm
              sm:px-4
              sm:py-2

              md:text-base
              md:px-5
              md:py-2.5

              lg:text-lg
              lg:px-5
              lg:py-3
              lg:rounded-xl
              lg:gap-3

              xl:text-xl
              xl:px-6
              xl:py-3
              xl:gap-4
            "
          >
            <ShoppingCart
              className="
                w-4 h-4
                sm:w-4 sm:h-4
                md:w-5 md:h-5
                lg:w-5 lg:h-5
              "
            />

            <span>Shop Now</span>
          </button>

          {/* Download Brochure */}
          <button
            onClick={handleDownload}
            className="
              bg-white
              border-2
              border-[#333333]
              text-[#333333]
              hover:bg-gray-100
              font-semibold
              rounded-lg
              shadow-lg
              transition
              cursor-pointer
              whitespace-nowrap
              flex
              items-center
              justify-center
              gap-2

              text-xs
              px-3
              py-2

              sm:text-sm
              sm:px-4
              sm:py-2

              md:text-base
              md:px-5
              md:py-2.5

              lg:text-lg
              lg:px-5
              lg:py-3
              lg:rounded-xl
              lg:gap-3

              xl:text-xl
              xl:px-6
              xl:py-3
              xl:gap-4
            "
          >
            <Download
              className="
                w-4 h-4
                sm:w-4 sm:h-4
                md:w-5 md:h-5
                lg:w-5 lg:h-5
              "
            />

            <span>Download Brochure</span>
          </button>
        </div>
      </div>

      <BlackFeatureBar />
    </section>
  );
}
