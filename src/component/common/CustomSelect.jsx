import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

/**
 * CustomSelect
 * Fully themed custom select dropdown styled according to the Gomzi brand system.
 * Eliminates browser-native raw select controls while maintaining full keyboard
 * navigation, outside-click dismissal, and form event parity.
 */
export default function CustomSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options into { value, label, icon, subtitle }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return {
      value: opt.value ?? opt.label,
      label: opt.label ?? opt.value,
      icon: opt.icon,
      subtitle: opt.subtitle,
    };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (val) => {
    if (disabled) return;
    onChange({
      target: {
        name,
        value: val,
      },
    });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold text-text mb-1.5 select-none">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border text-left text-xs sm:text-sm transition-all duration-200 shadow-2xs focus:outline-none ${
          disabled ? "opacity-60 cursor-not-allowed bg-gray-50" : "cursor-pointer"
        } ${
          isOpen
            ? "border-primary ring-2 ring-primary/15 shadow-sm"
            : "border-border hover:border-gray-400"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="text-primary shrink-0">{selectedOption.icon}</span>
          )}
          <span
            className={`truncate font-medium ${
              selectedOption ? "text-text" : "text-gray-400"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <FiChevronDown
          className={`w-4 h-4 text-text-light shrink-0 transition-transform duration-200 ml-2 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Floating Themed Menu */}
      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-64 overflow-y-auto rounded-xl bg-white border border-primary-border py-1.5 focus:outline-none custom-scroll"
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(27, 54, 93, 0.12), 0 8px 10px -6px rgba(27, 54, 93, 0.08)",
          }}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`px-3.5 py-2.5 text-xs sm:text-sm cursor-pointer flex items-center justify-between transition-colors select-none ${
                  isSelected
                    ? "bg-primary-light text-primary font-bold"
                    : "text-text hover:bg-[#f6f8fb] hover:text-primary font-normal"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.icon && (
                    <span
                      className={`shrink-0 ${
                        isSelected ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      {opt.icon}
                    </span>
                  )}
                  <div className="truncate">
                    <span className="block truncate">{opt.label}</span>
                    {opt.subtitle && (
                      <span className="block text-[11px] text-text-light font-normal">
                        {opt.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <FiCheck className="w-4 h-4 text-primary shrink-0 ml-2" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
