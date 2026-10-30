import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BrandFilter from "./BrandFilter";

const TITLES = { category: "Select Category", brand: "Filter by Brand", sort: "Sort Products" };

export function MobileFilterButtons({ category, brand, sort, panel, onOpen }) {
  const isCategoryFiltered = category && category !== "All Products";
  const isBrandFiltered = Boolean(brand && brand !== "All Brands");
  const isSortFiltered = sort && sort !== "Featured";

  const items = [
    { key: "category", label: "Category", value: category || "All Products", isFiltered: isCategoryFiltered },
    { key: "brand", label: "Brand", value: brand || "All Brands", isFiltered: isBrandFiltered },
    { key: "sort", label: "Sort", value: sort, isFiltered: isSortFiltered },
  ];

  return (
    <div className="grid grid-cols-3 gap-2" aria-label="Catalog filters and sorting">
      {items.map(item => (
        <button
          key={item.key}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={panel === item.key}
          aria-label={`${item.label}: ${item.value}`}
          onClick={() => onOpen(item.key)}
          className={`min-w-0 min-h-[50px] sm:min-h-[56px] rounded-xl border px-2.5 py-1.5 sm:py-2 text-left shadow-2xs transition-all cursor-pointer ${
            item.isFiltered
              ? "border-primary bg-[#faf4ef]"
              : "border-border bg-white hover:border-primary/50 active:bg-stone-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`block text-[10px] font-black uppercase tracking-wider ${item.isFiltered ? "text-primary" : "text-stone-400"}`}>
              {item.label}
            </span>
            {item.isFiltered && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            )}
          </div>
          <span className={`block truncate mt-0.5 text-xs font-bold ${item.isFiltered ? "text-primary" : "text-stone-800"}`}>
            {item.value}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function MobileCatalogFilters({ categories, selectedCategory, selectedBrand, sortBy, sortOptions, brandFilters, onCategoryChange, onBrandChange, onSortChange }) {
  const [panel, setPanel] = useState(null);
  const dialogRef = useRef(null);
  const isOpen = Boolean(panel);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // Fallback for runtimes where showModal fails
      }
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog && dialog.open) {
        try {
          dialog.close();
        } catch {
          // ignore
        }
      }
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const choose = (callback, value) => { callback(value); setPanel(null); };

  const dialog = (
    <dialog
      ref={dialogRef}
      aria-labelledby="catalog-filter-heading"
      className="catalog-mobile-dialog"
      onClose={() => setPanel(null)}
      onClick={event => { if (event.target === event.currentTarget) setPanel(null); }}
    >
      <div className="shrink-0 border-b border-border bg-white px-4 pt-3 pb-3">
        <div aria-hidden="true" className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-stone-300" />
        <div className="flex items-center justify-between gap-3">
          <h2 id="catalog-filter-heading" className="font-toma font-black text-base sm:text-lg text-text">
            {TITLES[panel] || "Filter products"}
          </h2>
          <button
            type="button"
            aria-label="Close product filters"
            onClick={() => setPanel(null)}
            className="h-9 w-9 shrink-0 rounded-full border border-border flex items-center justify-center text-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2.5">
          {[["category", "Categories"], ["brand", "Brands"], ["sort", "Sort"]].map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={panel === key}
              onClick={() => setPanel(key)}
              className={`min-h-9 sm:min-h-10 min-w-0 rounded-lg px-2 text-xs font-bold cursor-pointer transition-colors ${
                panel === key ? "bg-primary text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 overflow-y-auto overscroll-contain px-4 py-3 custom-scrollbar catalog-mobile-dialog-content">
        {panel === "category" && (
          <ul className="space-y-1.5" aria-label="Product categories">
            {categories.map(category => {
              const isSelected = selectedCategory === category.name;
              return (
                <li key={category.name}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => choose(onCategoryChange, category.name)}
                    className={`flex min-h-11 w-full min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                      isSelected ? "bg-primary text-white" : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span className="min-w-0 break-words">{category.label || category.name}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-black/5 text-stone-500"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {panel === "brand" && <BrandFilter {...brandFilters} value={selectedBrand} onChange={value => choose(onBrandChange, value)} />}
        {panel === "sort" && (
          <ul className="space-y-1.5" aria-label="Sort options">
            {sortOptions.map(option => {
              const isSelected = sortBy === option;
              return (
                <li key={option}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => choose(onSortChange, option)}
                    className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                      isSelected ? "bg-primary text-white" : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && <span aria-hidden="true" className="font-bold">&check;</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </dialog>
  );

  return (
    <div className="lg:hidden min-w-0">
      <MobileFilterButtons category={selectedCategory} brand={selectedBrand} sort={sortBy} panel={panel} onOpen={setPanel} />
      {typeof document !== "undefined" && createPortal(dialog, document.body)}
    </div>
  );
}
