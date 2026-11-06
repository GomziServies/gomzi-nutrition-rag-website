/**
 * HealthKart "offers widget" heading block.
 *
 *   <h2>Section Title</h2>
 *   [Tab 1] [Tab 2] [Tab 3]        (optional)
 *                                   [View All]  (optional)
 */
export default function SectionHeader({
  title,
  tabs,
  activeTab,
  onTabChange,
  showAllLabel = "View All",
  onViewAll,
  children,
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="section-title">{title}</h2>
        {onViewAll && (
          <button type="button" onClick={onViewAll} className="view-all">
            {showAllLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {tabs?.length > 0 && (
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={`offer-tab transition-all duration-200 cursor-pointer ${
                  active
                    ? "!bg-[#1b365d] !text-white !border-[#1b365d] shadow-md hover:!bg-[#14294a]"
                    : "hover:!bg-[#f1f4f9] hover:!text-[#1b365d] hover:!border-[#dce3ee]"
                }`}
                style={
                  active
                    ? {
                        backgroundColor: "#1b365d",
                        color: "#ffffff",
                        borderColor: "#1b365d",
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {children}
    </div>
  );
}
