const LegalSection = ({ title, children }) => {
  return (
    <section className="bg-bg py-16">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <h2 className="text-4xl mb-8 text-text">{title}</h2>

          <div className="space-y-6 text-lg leading-relaxed text-text">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalSection;
