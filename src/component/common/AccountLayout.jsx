import useBranding from "../../content/useBranding";
import { ArrowLeft, ArrowRight, Package, UserRound, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: ShoppingBag, label: "Shop your favourite nutrition" },
  { icon: Package, label: "Keep track of your orders" },
  { icon: UserRound, label: "Manage your personal details" },
];

export default function AccountLayout({ children, compact = false, viewportLocked = false }) {
  const branding = useBranding();
  return (
    <div className={`${compact ? "account-layout-compact" : ""} ${viewportLocked ? "min-h-dvh flex flex-col lg:h-dvh lg:overflow-hidden" : compact ? "min-h-dvh flex flex-col" : "min-h-screen"} bg-light text-text`}>
      <header className={`border-b border-border bg-white ${viewportLocked ? "shrink-0" : ""}`}>
        <div className={`site-container flex flex-wrap items-center justify-between gap-4 ${compact ? "py-3" : "py-5"}`}>
          <Link to="/" aria-label="Gomzi Nutrition home"><img src={branding.logo} alt="Gomzi Nutrition" className="h-10 w-auto object-contain" /></Link>
          <Link to="/gomzi-supplement" className="flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft size={16} /> Back to shop</Link>
        </div>
      </header>
      <main className={`site-container grid gap-8 lg:grid-cols-2 lg:gap-16 ${viewportLocked ? "items-center py-4 lg:flex-1 lg:min-h-0 lg:overflow-hidden lg:py-2" : compact ? "flex-1 items-center py-4" : "items-start py-8 sm:py-12"}`}>
        <aside className={`hidden lg:block ${compact ? "py-4" : "lg:sticky lg:top-12 py-10"}`}>
          <span className="site-eyebrow">Your Gomzi account</span>
          <h2 className={`font-toma ${compact ? "text-3xl" : "text-4xl"} leading-tight mt-4 max-w-md`}>Nutrition for your everyday goals.</h2>
          <p className="text-text-light leading-7 mt-4 max-w-md">Keep your favourite supplements, orders and account details together in one place.</p>
          <div className={compact ? "mt-6 space-y-4" : "mt-8 space-y-5"}>
            {benefits.map(item => (
              <div key={item.label} className="flex items-center gap-3 text-sm font-semibold">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-primary"><item.icon size={18} /></span>
                {item.label}
              </div>
            ))}
          </div>
          <Link to="/wholesale" className={`inline-flex items-center gap-2 ${compact ? "mt-6" : "mt-10"} text-sm font-semibold text-primary`}>Shopping for a gym or business? <ArrowRight size={16} /></Link>
        </aside>
        <section aria-label="Account access" className={`site-surface site-form w-full max-w-lg mx-auto ${viewportLocked ? "p-4 lg:max-h-full lg:overflow-hidden" : compact ? "p-5 sm:p-6" : "p-5 sm:p-8"}`}>{children}</section>
      </main>
      <footer className={`text-center text-xs text-text-light px-4 ${compact ? "pb-3" : "pb-8"} ${viewportLocked ? "shrink-0" : ""}`}>Gomzi Nutrition · <Link to="/contact-us" className="underline underline-offset-4">Need help? Contact us</Link></footer>
    </div>
  );
}
