const BottomContentSection = ({ content }) => {
  if (!content) return null;

  return (
    <section className="mt-10 md:mt-20 lg:mt-24 mb-0">
      <div
        className="
          mx-3
          rounded-[28px] md:rounded-[32px]
          border border-[#ECE3D8]
          bg-[#FAF8F5]
          px-5 py-8
          sm:px-7 sm:py-10
          md:px-12 md:py-14
          lg:px-16 lg:py-16
        "
      >
        {/* Label */}
        <span
          className="
            block
            text-[11px] sm:text-xs
            font-bold
            uppercase
            tracking-[3px] sm:tracking-[4px]
            text-[#8B5E3C]
          "
        >
          BUYING GUIDE
        </span>

        {/* Title */}
        <h2
          className="
            mt-5
            text-[32px]
            sm:text-[38px]
            md:text-5xl
            lg:text-5xl
            font-black
            leading-[1.08]
            tracking-[-0.025em]
            text-gray-950
          "
        >
          {content.title}
        </h2>

        {/* Paragraphs */}
        <div
          className="
            mt-7
            md:mt-5
            space-y-7
            md:space-y-8
          "
        >
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="
                text-[17px]
                sm:text-[18px]
                md:text-lg
                lg:text-xl
                leading-[1.7]
                md:leading-[1.8]
                text-[#374151]
              "
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BottomContentSection;
