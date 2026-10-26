const BottomContentSection = ({ content }) => {
  if (!content) return null;

  return (
    <section className="mt-8 md:mt-10 mb-0">
      <div
        className="
          mx-3
          rounded-2xl
          border border-border
          bg-bg-page
          px-4 py-5
          sm:px-6 sm:py-6
        "
      >
        {/* Label */}
        <span
          className="
            block
            text-[10px]
            font-bold
            uppercase
            tracking-[2px]
            text-primary
          "
        >
          BUYING GUIDE
        </span>

        {/* Title */}
        <h2
          className="
            mt-2
            text-xl
            sm:text-2xl
            font-bold
            leading-[1.2]
            tracking-[-0.02em]
            text-text
          "
        >
          {content.title}
        </h2>

        {/* Paragraphs */}
        <div className="mt-3 space-y-3">
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="
                text-sm
                leading-relaxed
                text-text-light
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
