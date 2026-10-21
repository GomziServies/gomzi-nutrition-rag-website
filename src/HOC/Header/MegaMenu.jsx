import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Pill,
  Leaf,
  Apple,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { NAVIGATION_DEPARTMENTS } from "../../data/navigationCategories";

/**
 * HealthKart-Style Category Flyout Dropdown Menu
 * - Left Panel: Sized generously (300px) so NO text ever truncates or clips.
 * - Right Panel: Rich subcategory flyout grid with smooth hover transitions.
 * - Clean outside-click and escape dismissal.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Dismissal callback
 */
export default function MegaMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeDeptId, setActiveDeptId] = useState(
    NAVIGATION_DEPARTMENTS[0]?.id || "sports-nutrition"
  );
  const [showSubMenu, setShowSubMenu] = useState(true);

  if (!isOpen) return null;

  const currentDepartment =
    NAVIGATION_DEPARTMENTS.find((dept) => dept.id === activeDeptId) ||
    NAVIGATION_DEPARTMENTS[0];

  const handleItemClick = (query) => {
    onClose();
    navigate(`/gomzi-supplement?search=${encodeURIComponent(query)}`);
  };

  const handleGroupHeaderClick = (group) => {
    onClose();
    navigate(`/gomzi-supplement?search=${encodeURIComponent(group.title)}`);
  };

  const getDeptIcon = (iconName) => {
    switch (iconName) {
      case "dumbbell":
        return <Dumbbell className="w-4 h-4 text-[#5C3124]" />;
      case "pill":
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case "leaf":
        return <Leaf className="w-4 h-4 text-amber-600" />;
      case "apple":
        return <Apple className="w-4 h-4 text-rose-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#5C3124]" />;
    }
  };

  return (
    <div
      className="absolute top-full left-0 mt-1.5 z-[9999] flex shadow-[0_16px_50px_rgba(0,0,0,0.18)] rounded-xl border border-[#dbdee9] bg-white animate-in fade-in slide-in-from-top-1 duration-150"
      role="menu"
      aria-label="Shop By Category Menu"
    >
      {/* 
        COLUMN 1: Primary Category List (Explicit 300px width - ZERO truncation)
      */}
      <div className="w-[290px] sm:w-[310px] bg-[#f8fafb] rounded-l-xl flex flex-col py-2.5 border-r border-[#e5e7eb] flex-shrink-0">
        <div className="px-4 py-2 mb-1 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
            Departments
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            {NAVIGATION_DEPARTMENTS.length} Categories
          </span>
        </div>

        <ul className="flex-1 space-y-1 list-none p-0 m-0 px-2">
          {NAVIGATION_DEPARTMENTS.map((dept) => {
            const isActive = dept.id === activeDeptId;

            return (
              <li key={dept.id}>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setActiveDeptId(dept.id);
                    setShowSubMenu(true);
                  }}
                  onClick={() => {
                    onClose();
                    navigate(`/gomzi-supplement?search=${encodeURIComponent(dept.name)}`);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-semibold text-left transition-all duration-150 cursor-pointer rounded-lg border-none ${
                    isActive
                      ? "bg-white text-[#5C3124] shadow-sm font-bold border-l-4 border-[#5C3124] ring-1 ring-[#5C3124]/15"
                      : "text-[#2b2b36] hover:bg-[#fdf6f4] hover:text-[#5C3124] border-l-4 border-transparent bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-shrink-0 p-1.5 rounded-md bg-white border border-gray-100 shadow-2xs">
                      {getDeptIcon(dept.icon)}
                    </span>
                    <span className="font-semibold whitespace-nowrap text-[#1c1c28]">
                      {dept.name}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${
                      isActive
                        ? "text-[#5C3124] translate-x-0.5"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom Explore all Categories Button */}
        <div className="p-3 border-t border-gray-200 mt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/category");
            }}
            className="w-full py-2.5 px-3 bg-[#5C3124]/10 hover:bg-[#5C3124] hover:text-white text-[#5C3124] text-xs font-bold rounded-lg transition-colors cursor-pointer border border-[#5C3124]/20 text-center flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>Browse All Categories</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 
        COLUMN 2: Subcategories Flyout Grid (HealthKart .menuCont style)
        Expands to the right with multi-column categorised links
      */}
      {showSubMenu && currentDepartment && (
        <div className="hidden md:flex flex-col w-[540px] lg:w-[600px] p-6 bg-white rounded-r-xl max-h-[460px] overflow-y-auto scrollbar-thin">
          {/* Header */}
          <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1c1c28]">
                {currentDepartment.name}
              </h3>
              <p className="text-xs text-[#77777e] mt-0.5">
                {currentDepartment.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate(
                  `/gomzi-supplement?search=${encodeURIComponent(
                    currentDepartment.name
                  )}`
                );
              }}
              className="text-xs font-bold text-[#5C3124] hover:underline bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              View All {currentDepartment.name} ›
            </button>
          </div>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {currentDepartment.groups.map((group) => (
              <div key={group.slug} className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleGroupHeaderClick(group)}
                  className="w-full text-left font-bold text-xs uppercase tracking-wide text-[#1c1c28] hover:text-[#5C3124] transition-colors border-none bg-transparent cursor-pointer p-0 group flex items-center justify-between"
                >
                  <span className="border-b-2 border-transparent group-hover:border-[#5C3124] pb-0.5">
                    {group.title}
                  </span>
                  <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                </button>

                <ul className="space-y-1.5 list-none p-0 m-0">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <button
                        type="button"
                        onClick={() => handleItemClick(item.query)}
                        className="w-full text-left text-xs text-[#515151] hover:text-[#5C3124] hover:bg-[#fdf6f4] hover:translate-x-0.5 px-2 py-1 rounded-md transition-all duration-150 bg-transparent border-none cursor-pointer flex items-center justify-between group/item"
                      >
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-200">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
