import { Link, useRouteError } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import SEO from "../component/SEO";

export function RouteError() {
  const error = useRouteError();
  return <NotFound failed={Boolean(error && error.status !== 404)} />;
}

export default function NotFound({ failed = false }) {
  return (
    <section className="max-w-3xl mx-auto px-5 py-24 sm:py-32 text-center">
      <SEO title={`${failed ? "Something went wrong" : "Page not found"} | Gomzi Nutrition`} noIndex />
      <ShoppingBag className="mx-auto mb-6 text-primary" size={44} strokeWidth={1.5} />
      <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">{failed ? "Let's try again" : "404 · A little off track"}</p>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{failed ? "We couldn't load this page." : "Let's get you back to your goals."}</h1>
      <p className="text-stone-500 leading-relaxed mb-8">{failed ? "Please try again. Your saved cart will be here when you return." : "This page may have moved, or the link may be incorrect. Explore the range to find your next favourite."}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/gomzi-supplement" className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-6 py-3 font-semibold">Explore supplements <ArrowRight size={16} /></Link>
        <Link to="/" className="rounded-xl border border-border px-6 py-3 font-semibold">Back to home</Link>
      </div>
      {failed && <button onClick={() => window.location.reload()} className="mt-6 text-sm underline text-primary">Reload this page</button>}
    </section>
  );
}
