import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2, Plus, ShoppingBag } from "lucide-react";
import { fetchProducts, addToCart } from "../../services/product.service";
import { addGuestCartItem } from "../../services/cartStorage.service";
import { fetchComboStacks, DEFAULT_STACKS } from "../../services/comboStack.service";
import { getProductImageUrl } from "../../data/homeProducts";
import { successToast, errorToast } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";
import { useWebsiteContent } from "../../content/WebsiteContent";

const CATEGORY_ALIASES = {
  "Creatine": ["Creatine Monohydrate", "Creatine"],
  "Creatine Monohydrate": ["Creatine Monohydrate", "Creatine"],
  "BCAA": ["BCAA & Amino Acids", "BCAA"],
  "BCAA & Amino Acids": ["BCAA & Amino Acids", "BCAA"],
  "Fat Burner": ["Wellness & Health", "Fat Burner"],
  "Wellness & Health": ["Wellness & Health", "Fat Burner"],
  "Pre Workout": ["Pre Workout", "Pre-workout"],
  "Whey Protein": ["Whey Protein", "Whey"],
};

async function fetchCategoryProduct(categoryName) {
  const candidates = CATEGORY_ALIASES[categoryName] || [categoryName];
  for (const cat of candidates) {
    try {
      const res = await fetchProducts({ category: cat, limit: 12 });
      if (res?.success && Array.isArray(res.data)) {
        const item = res.data.find(p => p.isAvailable !== false && Number(p.stock) > 0);
        if (item) return item;
      }
    } catch {
      // Continue to next alias candidate
    }
  }
  return null;
}

const money = value => `₹${Number(value).toLocaleString("en-IN")}`;

export default function HkComboStackBuilder() {
  const content = useWebsiteContent();
  const { isAuthenticated } = useAuth();
  const [stacks, setStacks] = useState(DEFAULT_STACKS);
  const [active, setActive] = useState(DEFAULT_STACKS[0]?.id || "");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [retry, setRetry] = useState(0);

  // Load dynamic combo stacks from API/Admin
  useEffect(() => {
    let current = true;
    fetchComboStacks().then(remoteStacks => {
      if (!current || !remoteStacks || !Array.isArray(remoteStacks) || remoteStacks.length === 0) return;
      setStacks(remoteStacks);
      setActive(previous => {
        if (remoteStacks.some(s => s.id === previous)) return previous;
        return remoteStacks[0]?.id || "";
      });
    });
    return () => {
      current = false;
    };
  }, []);

  // Fetch product essentials for active stack
  useEffect(() => {
    let current = true;
    setLoading(true);
    setError(false);
    const stack = stacks.find(item => item.id === active) || stacks[0];
    if (!stack || !Array.isArray(stack.categories) || stack.categories.length === 0) {
      setLoading(false);
      setProducts([]);
      return;
    }

    Promise.all(stack.categories.map(category => fetchCategoryProduct(category)))
      .then(itemsRaw => {
        if (!current) return;
        const items = itemsRaw
          .map((item, idx) => {
            if (!item) return null;
            return {
              ...item,
              displaySlotLabel: stack.labels?.[idx] || item.categories?.[0] || "Essential",
            };
          })
          .filter(Boolean);

        setProducts(items);
        setSelected(items.map(item => item._id));
        setError(items.length === 0);
        setLoading(false);
      })
      .catch(() => {
        if (current) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      current = false;
    };
  }, [active, stacks, retry, content]);

  if (!stacks.length) return null;

  const currentStack = stacks.find(item => item.id === active) || stacks[0];
  const chosen = products.filter(product => selected.includes(product._id));
  const total = chosen.reduce((sum, product) => sum + Number(product.discountPrice ?? product.price ?? 0), 0);
  const mrp = chosen.reduce((sum, product) => sum + Number(product.price ?? 0), 0);

  const addStack = async () => {
    setAdding(true);
    let added = 0;
    try {
      for (const product of chosen) {
        if (isAuthenticated) {
          const result = await addToCart({ item_id: product._id, item_type: "FG_MEAL_PRODUCT", quantity: 1 });
          if (!result.success) throw new Error(result.message || "We couldn't add the remaining items. Please try again.");
        } else {
          addGuestCartItem({ product, quantity: 1 });
        }
        added++;
        setSelected(previous => previous.filter(id => id !== product._id));
      }
      successToast(`Added ${added} ${added === 1 ? "item" : "items"} to your cart`);
    } catch (failure) {
      errorToast(`${added ? `${added} added. ` : ""}${failure.message}`);
    } finally {
      window.dispatchEvent(new Event("cartUpdated"));
      setAdding(false);
    }
  };

  return (
    <section className="bg-light border-y border-border py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col gap-4 mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5">Better together</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-text">Your routine. Your stack.</h2>
            <p className="text-sm text-stone-500 mt-1">
              {currentStack?.tagline || "Pick the essentials that fit your training. Add them in one step."}
            </p>
          </div>
          <div
            role="group"
            aria-label="Choose your stack"
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-hide scroll-smooth flex-nowrap py-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {stacks.map(stack => (
              <button
                type="button"
                key={stack.id}
                disabled={adding}
                aria-pressed={active === stack.id}
                onClick={() => setActive(stack.id)}
                className={`rounded-full px-3.5 sm:px-4 py-2 text-xs font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active === stack.id
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white border-border text-stone-600 hover:border-primary"
                }`}
              >
                {stack.name}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div role="status" className="rounded-2xl border border-border bg-white p-16 text-center text-stone-500">
            <Loader2 className="mx-auto mb-3 animate-spin text-primary" />Finding your essentials…
          </div>
        ) : error ? (
          <div className="p-10 rounded-2xl bg-white border border-border text-center">
            <p className="text-stone-500 mb-4">We couldn't load a stack right now.</p>
            <button onClick={() => setRetry(value => value + 1)} className="text-primary underline">
              Try again
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_280px] gap-5">
            <div className={`grid ${products.length <= 2 ? "grid-cols-2" : "grid-cols-3"} gap-2 sm:gap-4`}>
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className={`relative rounded-xl sm:rounded-2xl border bg-white p-2 sm:p-5 transition-all flex flex-col justify-between ${
                    selected.includes(product._id)
                      ? "border-primary ring-1 ring-primary/20 shadow-xs"
                      : "border-border bg-stone-50/50 opacity-60"
                  }`}
                >
                  <label className="flex items-center justify-between gap-1 text-[9px] min-[360px]:text-[10px] sm:text-xs text-stone-500 font-semibold cursor-pointer">
                    <span className="truncate font-bold">
                      0{index + 1} / {product.displaySlotLabel || product.categories?.[0]}
                    </span>
                    <input
                      type="checkbox"
                      disabled={adding}
                      checked={selected.includes(product._id)}
                      aria-label={`Include ${product.name}`}
                      onChange={() =>
                        setSelected(previous =>
                          previous.includes(product._id)
                            ? previous.filter(id => id !== product._id)
                            : [...previous, product._id]
                        )
                      }
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 accent-primary rounded cursor-pointer shrink-0"
                    />
                  </label>
                  <Link to={`/product/${product.slug}`} className="block group my-1 sm:my-3">
                    <div className="w-full aspect-square sm:aspect-auto sm:h-36 bg-[#faf7f4] sm:bg-transparent rounded-lg sm:rounded-none p-1 sm:p-0 flex items-center justify-center overflow-hidden my-1 sm:my-3">
                      <img
                        src={getProductImageUrl(product.displayImages)}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-[10px] min-[360px]:text-[11px] sm:text-sm font-bold leading-tight sm:leading-relaxed line-clamp-2 min-h-[26px] sm:min-h-10 text-text group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-1 sm:mt-2">
                    <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-stone-400 sm:text-stone-500 truncate">
                      {product.flavour || (product.company ? product.company : "")}
                    </p>
                    <p className="mt-1 sm:mt-3 text-xs min-[360px]:text-sm sm:text-lg font-black text-text">
                      {money(product.discountPrice ?? product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#f5ede6] rounded-2xl p-6 border border-border flex flex-col justify-center">
              <ShoppingBag size={24} className="text-primary mb-4" />
              <h3 className="font-bold text-lg text-text">Made for your routine</h3>
              <p className="text-xs text-stone-500 mt-2 mb-6">
                {chosen.length} {chosen.length === 1 ? "essential" : "essentials"} selected · one of each
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-text">{money(total)}</span>
                {mrp > total && <span className="line-through text-stone-400 text-sm">{money(mrp)}</span>}
              </div>
              {mrp > total && (
                <p className="mt-1 text-xs font-bold text-primary">Save {money(mrp - total)} on listed prices</p>
              )}
              <button
                type="button"
                disabled={adding || chosen.length === 0}
                onClick={addStack}
                className="mt-6 w-full py-3 rounded-xl bg-primary text-white text-sm font-bold flex justify-center items-center gap-2 hover:bg-hover transition-colors disabled:opacity-50 cursor-pointer"
              >
                {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Add selected to cart
              </button>
              <Link
                to="/cart"
                className="mt-4 text-xs font-bold text-primary flex justify-center items-center gap-2 hover:underline"
              >
                View your cart <ArrowRight size={14} />
              </Link>
              <p className="text-[11px] text-stone-500 mt-5 leading-relaxed">
                Current catalog prices. Shipping and any eligible offers are confirmed at checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
