import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import { buildShopCategorySections } from "../../utils/shopCategories";
import CategoryHero from "./CategoryHero";
import ProductCard from "../common/ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";

export function CategoryProductSection({ category, products, pagination = {}, loading = false, error = "", onRetry }) {
  const count = pagination.totalDocs ?? category.productCount;
  return (
    <section id={category.anchorId} aria-labelledby={`${category.anchorId}-heading`} className="scroll-mt-48 rounded-2xl sm:rounded-3xl border border-border bg-white p-4 sm:p-6 lg:p-7 shadow-xs">
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-border/70 mb-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span aria-hidden="true" className="w-2 h-6 rounded-full bg-primary" />
            <h2 id={`${category.anchorId}-heading`} className="text-xl sm:text-2xl font-black tracking-tight text-text">{category.title}</h2>
            {count != null && <span className="rounded-full bg-[#f5ede6] px-2.5 py-1 text-[11px] font-bold text-primary">{Number(count).toLocaleString("en-IN")} {Number(count) === 1 ? "product" : "products"}</span>}
          </div>
          {category.subtitle && <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-500 max-w-3xl">{category.subtitle}</p>}
        </div>
        <Link to={category.viewAllUrl} aria-label={`View all ${category.title}`} className="inline-flex shrink-0 items-center gap-1.5 py-1.5 text-xs sm:text-sm font-bold text-primary hover:underline underline-offset-4">View All <ArrowRight size={16} /></Link>
      </div>
      {loading ? <div role="status" aria-label={`Loading ${category.title} products`} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
        {[0, 1, 2, 3].map(index => <ProductCardSkeleton key={index} />)}
      </div> : error ? <div role="alert" className="py-8 text-center"><p className="text-sm text-stone-500">We couldn't load these products.</p><button onClick={onRetry} className="mt-3 text-sm font-bold text-primary underline underline-offset-4">Try again</button></div>
        : products.length ? <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">{products.map(product => <ProductCard key={product._id} product={product} />)}</div>
        : <p className="rounded-xl bg-light px-4 py-10 text-center text-sm text-stone-500">Products in this category are coming soon.</p>}
    </section>
  );
}

function ShopCategoryProducts({ category }) {
  const { products, pagination, loading, error, retry } = useProducts({ category: category.filterCategory, limit: 4 });
  return <CategoryProductSection category={category} products={products} pagination={pagination} loading={loading} error={error} onRetry={retry} />;
}

export function ShopCategorySectionsView({ categories, loading = false, error = "", onRetry, pageData }) {
  const sections = buildShopCategorySections(categories);
  return (
    <div className="w-full bg-light py-6 sm:py-10 min-h-screen">
      <div className="site-container">
        <CategoryHero pageData={pageData} />
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <p className="text-sm text-stone-500">Explore each range below, or open the full catalog.</p>
          <Link to="/gomzi-supplement?view=all" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-primary hover:border-primary transition-colors"><LayoutGrid size={16} /> Browse all products</Link>
        </div>
        {loading ? <div role="status" aria-label="Loading shop categories" className="space-y-6">{[0, 1, 2].map(index => <div key={index} className="h-64 sm:h-80 rounded-3xl bg-border/40 animate-pulse" />)}</div>
          : error ? <div role="alert" className="rounded-2xl border border-border bg-white p-10 text-center"><h2 className="text-lg font-bold">We couldn't load the categories</h2><button type="button" onClick={onRetry} className="mt-4 rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-bold">Try again</button></div>
          : !sections.length ? <p className="rounded-2xl border border-border bg-white p-10 text-center text-stone-500">There are no active category ranges right now. You can still browse the full catalog.</p>
          : <>
            <nav aria-label="Jump to a product category" className="flex flex-wrap gap-2 mb-7 rounded-2xl border border-border bg-white p-4">
              {sections.map(category => <a key={category.id} href={`#${category.anchorId}`} className="rounded-lg bg-[#f5ede6] px-3 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-primary hover:text-white transition-colors">{category.title}</a>)}
            </nav>
            <div className="space-y-7 sm:space-y-9">{sections.map(category => <ShopCategoryProducts key={category.id} category={category} />)}</div>
          </>}
      </div>
    </div>
  );
}

export default function ShopCategorySections({ pageData }) {
  const { categories, loading, error, retry } = useCategories();
  return <ShopCategorySectionsView categories={categories} loading={loading} error={error} onRetry={retry} pageData={pageData} />;
}
