import { useEffect, useState } from "react";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { fetchProducts, addToCart } from "../../services/product.service";
import { addGuestCartItem } from "../../services/cartStorage.service";
import useCart from "../../hooks/useCart";
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
  const { items: cartItems } = useCart();
  const [stacks, setStacks] = useState(DEFAULT_STACKS);
  const [active, setActive] = useState(DEFAULT_STACKS[0]?.id || "");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [retry, setRetry] = useState(0);

  // Load dynamic combo stacks with specific products and custom pricing
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
    if (!stack) {
      setLoading(false);
      setProducts([]);
      return;
    }

    // 1. If stack defines SPECIFIC PRODUCTS, use them directly (no generic category lookup)
    if (Array.isArray(stack.products) && stack.products.length > 0) {
      const liveItems = stack.products.filter(p => p && p._id);
      setProducts(liveItems);
      setSelected(liveItems.map(item => item._id));
      setError(liveItems.length === 0);
      setLoading(false);
      return () => {
        current = false;
      };
    }

    // 2. Fallback to category queries if specific products not yet configured
    if (Array.isArray(stack.categories) && stack.categories.length > 0) {
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
    } else {
      setLoading(false);
      setProducts([]);
    }

    return () => {
      current = false;
    };
  }, [active, stacks, retry, content]);

  if (!stacks.length) return null;

  const currentStack = stacks.find(item => item.id === active) || stacks[0];
  const chosen = products.filter(product => selected.includes(product._id));
  const isFullCombo = chosen.length === products.length && products.length > 0;
  const hasComboPrice = isFullCombo && currentStack?.isSavedCombo && currentStack.comboPrice !== null;

  // Individual item totals
  const individualSellingSum = chosen.reduce((sum, p) => sum + Number(p.discountPrice ?? p.price ?? 0), 0);
  const individualMrpSum = chosen.reduce((sum, p) => sum + Number(p.price ?? 0), 0);

  // Exact custom combo price set by Admin when full bundle is selected
  const total = hasComboPrice
    ? Number(currentStack.comboPrice)
    : individualSellingSum;

  const mrp = hasComboPrice && currentStack?.originalPrice
    ? Number(currentStack.originalPrice)
    : individualMrpSum;

  const savings = mrp > total ? mrp - total : 0;

  const addStack = async () => {
    setAdding(true);
    let added = 0;
    try {
      if (hasComboPrice) {
        const comboProduct = {
          _id: currentStack.id,
          name: currentStack.name,
          company: currentStack.company,
          price: Math.max(mrp, total),
          discountPrice: total,
          displayImages: chosen[0]?.displayImages || [],
          flavour: chosen.map(product => product.name).join(" + "),
        };
        const notes = { combo_id: currentStack.id };
        if (isAuthenticated) {
          const quantity = Number(cartItems.find(item => item.combo_id === currentStack.id)?.quantity || 0) + 1;
          const result = await addToCart({ item_id: currentStack.id, item_type: "FG_MEAL_PRODUCT", quantity, notes });
          if (!result.success) throw new Error(result.message || "We couldn't add this combo. Please try again.");
        } else {
          addGuestCartItem({ product: comboProduct, quantity: 1, notes });
        }
        successToast(`Added ${currentStack.name} to your cart for ${money(total)}`);
        return;
      }
      for (const product of chosen) {
        if (isAuthenticated) {
          const quantity = Number(cartItems.find(item => item.item_id === product._id && !item.combo_id && !item.variation_id)?.quantity || 0) + 1;
          const result = await addToCart({ item_id: product._id, item_type: "FG_MEAL_PRODUCT", quantity });
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
    <section className="bg-light border-y border-border py-10 sm:py-14 lg:py-[70px]">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="flex flex-col gap-4 sm:gap-5 mb-7">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1.5">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-primary">Better together</p>
              {currentStack?.company && (
                <span className="text-[10px] sm:text-xs leading-4 font-bold uppercase px-2.5 py-1 rounded-[4px] bg-primary/10 text-primary">
                  {currentStack.company}
                </span>
              )}
            </div>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[38px] leading-[1.2] font-black tracking-[-0.035em] text-text">Your routine. Your stack.</h2>
            <p className="text-sm sm:text-lg leading-6 sm:leading-7 text-stone-500 mt-1.5">
              {currentStack?.tagline || "Handpicked product essentials at special bundle pricing. Add them in one step."}
            </p>
          </div>
          <div
            role="group"
            aria-label="Choose your stack"
            className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scrollbar-hide scroll-smooth flex-nowrap py-1 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {stacks.map(stack => (
              <button
                type="button"
                key={stack.id}
                disabled={adding}
                aria-pressed={active === stack.id}
                onClick={() => setActive(stack.id)}
                style={{ fontSize: "clamp(14px, 1.4vw, 20px)", fontWeight: active === stack.id ? 500 : 400, lineHeight: 1.3 }}
                className={`rounded-full min-h-11 sm:min-h-[52px] px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-lg lg:text-xl leading-[1.3] border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-wait ${
                  active === stack.id
                    ? "bg-primary text-white border-primary font-medium shadow-sm"
                    : "bg-white border-border text-stone-600 font-normal hover:border-primary hover:text-primary"
                }`}
              >
                {stack.name}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <ProductGridSkeleton count={4} label="Loading combo essentials" />
        ) : error ? (
          <div className="p-10 rounded-2xl bg-white border border-border text-center">
            <p className="text-stone-500 mb-4">We couldn't load this combo stack right now.</p>
            <button onClick={() => setRetry(value => value + 1)} className="text-primary underline">
              Try again
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_300px] gap-5">
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
                      0{index + 1} / {product.displaySlotLabel || product.categories?.[0] || "Component"}
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
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag size={24} className="text-primary" />
                {hasComboPrice && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-primary text-white tracking-wider">
                    <Sparkles size={11} /> Combo Deal
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg text-text">Special Bundle Offer</h3>
              <p className="text-xs text-stone-500 mt-1 mb-5">
                {chosen.length} {chosen.length === 1 ? "product" : "products"} selected · bundled together
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-text">{money(total)}</span>
                {mrp > total && <span className="line-through text-stone-400 text-sm">{money(mrp)}</span>}
              </div>
              {savings > 0 && (
                <p className="mt-1.5 text-xs font-bold text-primary">
                  Save {money(savings)} with this combo offer!
                </p>
              )}
              <button
                type="button"
                disabled={adding || chosen.length === 0}
                onClick={addStack}
                className="mt-6 w-full py-3 rounded-xl bg-primary text-white text-sm font-bold flex justify-center items-center gap-2 hover:bg-hover transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Add Combo to Cart
              </button>
              <Link
                to="/cart"
                className="mt-4 text-xs font-bold text-primary flex justify-center items-center gap-2 hover:underline"
              >
                View your cart <ArrowRight size={14} />
              </Link>
              <p className="text-[11px] text-stone-500 mt-5 leading-relaxed">
                Direct bundle pricing applied. Verified inventory guaranteed at checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
