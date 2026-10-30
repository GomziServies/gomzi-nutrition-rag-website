export function BrandFilterControl({ brands = [], counts = {}, total = null, value = "", loading = false, error = "", onChange, onRetry }) {
  const selected = value.trim().toLowerCase();
  const names = value && !brands.some(brand => brand.toLowerCase() === selected) ? [value, ...brands] : brands;
  const rows = [{ name: "All Brands", value: "", count: total }, ...names.map(name => ({ name, value: name, count: counts[name.toLowerCase()] }))];
  return (
    <section aria-label="Brand filters" className="bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-border">
        <h3 className="font-toma text-xs font-black text-text uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-4 bg-primary rounded-full inline-block" aria-hidden="true" />
          Brands
        </h3>
        {value && <button type="button" onClick={() => onChange("")} className="text-[11px] font-bold text-primary hover:underline cursor-pointer">Reset</button>}
      </div>
      {loading ? <div role="status" className="space-y-3"><span className="sr-only">Loading brands…</span>{[0,1,2,3,4].map(index => <div key={index} aria-hidden="true" className="skeleton-shimmer h-10 rounded-xl" />)}</div> : <>
        {error && <p role="status" className="text-xs text-text-light mb-3">{error} <button type="button" onClick={onRetry} className="text-primary underline">Retry</button></p>}
        <ul aria-label="Product brands" className="space-y-1 max-h-[26rem] overflow-y-auto overscroll-contain custom-scrollbar pr-1">
          {rows.map(row => {
            const active = selected === row.value.toLowerCase();
            return <li key={row.value}><button type="button" onClick={() => onChange(row.value)} aria-pressed={active} className={`w-full min-w-0 min-h-11 text-left px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm font-medium flex items-center justify-between gap-2 ${active ? "bg-primary text-white" : "text-stone-700 hover:bg-[#faf6f2] hover:text-primary"}`}>
              <span className="min-w-0 truncate" title={row.name}>{row.name}</span>
              <span aria-label={row.count == null ? "Product count unavailable" : `${row.count} products`} className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono shrink-0 ${active ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>{row.count ?? "—"}</span>
            </button></li>;
          })}
        </ul>
      </>}
    </section>
  );
}

export default BrandFilterControl;
