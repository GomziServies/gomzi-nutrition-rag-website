const LegalSection = ({ title, children }) => {
  return (
    <section className="bg-light py-8 md:py-12">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <div className="site-surface p-5 sm:p-8 md:p-10">
          <h2 className="font-toma text-xl sm:text-2xl mb-6 text-text">{title}</h2>

          <div className="legal-content space-y-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalSection;
