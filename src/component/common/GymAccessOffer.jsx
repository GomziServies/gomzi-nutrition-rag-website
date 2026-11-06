import { Dumbbell, Gift } from "lucide-react";
import useCart from "../../hooks/useCart";

const money = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
const duration = months => `${months} month${months === 1 ? "" : "s"}`;

export function GymAccessOffer({ offer, loading = false, error = "", onRetry, confirmed = false }) {
  if (loading) return <div role="status" className="my-4 rounded-xl border border-border p-4"><div aria-hidden="true" className="skeleton-shimmer h-5 w-3/4 rounded" /><span className="sr-only">Checking free gym access…</span></div>;
  if (error) return <div role="status" className="my-4 text-xs text-text-light">{error} <button type="button" onClick={onRetry} className="text-primary underline">Try again</button></div>;
  if (!offer) return null;
  const remaining = Math.max(0, Number(offer.next_minimum_amount) - Number(offer.eligible_amount));
  return (
    <div aria-live="polite" className="my-4 rounded-xl border border-primary/20 bg-[#fcf4f0] p-4 text-text">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-white p-2 text-primary shrink-0">{offer.qualified ? <Gift size={22} /> : <Dumbbell size={22} />}</div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-3">
            <p className="font-bold text-sm">{offer.gym_name} gym access</p>
            {offer.qualified && <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-green-700">FREE · ₹0</span>}
          </div>
          <p className="mt-1 text-sm font-semibold text-primary">
            {offer.qualified ? `${duration(offer.months)} ${confirmed ? "included with your order" : "free with this purchase"}` : `Add ${money(remaining)} in Gomzi products for ${duration(offer.next_months)} free`}
          </p>
          <p className="mt-2 text-xs text-text-light">Gomzi product subtotal: {money(offer.eligible_amount)}. Calculated before coupon discounts and delivery.</p>
          {offer.qualified && offer.next_months && <p className="mt-2 text-xs">Add {money(remaining)} more in Gomzi products to upgrade to {duration(offer.next_months)}.</p>}
          {offer.qualified && offer.terms && <p className="mt-2 text-xs leading-relaxed text-text-light">{offer.terms}</p>}
        </div>
      </div>
    </div>
  );
}

export default function CartGymAccessOffer() {
  const { items, gymAccess } = useCart();
  if (!items.length || !gymAccess) return null;
  return <GymAccessOffer {...gymAccess} />;
}
