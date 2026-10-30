const BottomContentSection = ({ content }) => {
  if (!content) return null;

  return (
    <section className="mt-8 sm:mt-16 md:mt-24 mb-0">
      <div
        className="
          mx-3 sm:mx-6 md:mx-auto max-w-5xl
          rounded-2xl sm:rounded-[32px]
          border border-[#ECE3D8]
          bg-[#FAF8F5]
          px-4 py-6
          sm:px-8 sm:py-10
          md:px-12 md:py-14
          lg:px-16 lg:py-16
        "
      >
        {/* Label */}
        <span
          className="
            block
            text-[10px] sm:text-xs
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
            mt-3 sm:mt-5
            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            font-black
            leading-tight
            tracking-tight
            text-gray-950
          "
        >
          {content.title}
        </h2>

        {/* Paragraphs */}
        <div
          className="
            mt-4 sm:mt-6
            space-y-4 sm:space-y-6
          "
        >
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="
                text-xs sm:text-base md:text-lg
                leading-relaxed
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
