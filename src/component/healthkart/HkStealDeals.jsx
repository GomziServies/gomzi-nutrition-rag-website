// src/component/healthkart/HkStealDeals.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

import { fetchDeals } from "../../services/deal.service";

function DealCard({ deal }) {
  const content = (
    <div className="w-full aspect-[222/310] min-h-0 relative overflow-hidden bg-white" style={{ background: deal.background }}>
      <img
        src={deal.image}
        alt={deal.title || "Special Deal"}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
        onError={event => {
          if (!event.currentTarget.dataset.fallback) {
            event.currentTarget.dataset.fallback = 'true';
            event.currentTarget.src = '/images/product-placeholder.webp';
          }
        }}
      />
    </div>
  );
  const props = {
    className: "group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-200/80 bg-white",
    'aria-label': deal.title || 'Special Deal'
  };
  return deal.link?.startsWith('/') ? <Link to={deal.link} {...props}>{content}</Link> : <a href={deal.link || '#'} {...props}>{content}</a>;
}

export function DealsSection({ deals, loading = false, error = false, onRetry, showAll = false }) {
  if (!loading && !error && !deals.length && !showAll) return null;
  const displayedDeals = showAll ? deals : deals.slice(0, 4);
  return (
    <section className="w-full bg-[#f4f4f4] py-4 sm:py-6 border-b border-border/40 font-sans">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
              <Flame size={18} className="fill-rose-500 text-rose-500" />
            </span>
            <div>
              <h2 className="text-base sm:text-xl font-black text-text tracking-tight font-toma flex items-center gap-2">
                <span>Deals You Cannot Miss</span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Price Drops
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Limited-period brand discounts, coupon drops & trending combos
              </p>
            </div>
          </div>
        </div>

        {loading ? <div role="status" aria-label="Loading deals" className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          {[0, 1, 2, 3].map(index => <div key={index} className="aspect-[222/310] rounded-2xl bg-border/50 animate-pulse" />)}
        </div> : error ? <div role="alert" className="rounded-2xl border border-border bg-white px-5 py-10 text-center">
          <p className="text-sm text-stone-600">We couldn't load the latest deals. Please try again.</p>
          <button type="button" onClick={onRetry} className="mt-3 font-bold text-sm text-primary underline underline-offset-4">Try again</button>
        </div> : displayedDeals.length ? <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          {displayedDeals.map(deal => <DealCard key={deal.id} deal={deal} />)}
        </div> : <p className="rounded-2xl bg-white border border-border p-10 text-center text-stone-500">There are no active deals right now. Check back soon for new offers.</p>}

      </div>
    </section>
  );
}

export default function HkStealDeals({ showAll = false }) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setAttempt(value => value + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchDeals({ signal: controller.signal })
      .then(result => { if (!controller.signal.aborted) setDeals(result); })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  return <DealsSection deals={deals} loading={loading} error={error} onRetry={handleRetry} showAll={showAll} />;
}
