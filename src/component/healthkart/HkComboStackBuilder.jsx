import { useEffect, useState } from "react";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { fetchProducts, addToCart } from "../../services/product.service";
import { addGuestCartItem } from "../../services/cartStorage.service";
import useCart from "../../hooks/useCart";
import { fetchComboStacks, DEFAULT_STACKS } from "../../services/comboStack.service";
import { getProductImageUrl } from "../../data/homeProducts";
import { formatSpecString } from "../common/ProductCard";
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

/**
 * Individual Combo Card: smaller product cards on top, bundle card below
 */
function SingleComboCard({
  stack,
  allStacks,
  onSelectStack,
  slotLabel,
  isAuthenticated,
  cartItems,
}) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [retry, setRetry] = useState(0);

  // Fetch product essentials for this stack
  useEffect(() => {
    let current = true;
    if (!stack) {
      setLoading(false);
      setProducts([]);
      return;
    }
    setLoading(true);
    setError(false);

    // 1. If stack defines SPECIFIC PRODUCTS, use them directly
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
                displaySlotLabel: stack.labels?.[idx] || item.categories?.[0] || "Component",
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
  }, [stack?.id, retry]);

  if (!stack) return null;

  const chosen = products.filter(product => selected.includes(product._id));
  const isFullCombo = chosen.length === products.length && products.length > 0;
  const hasComboPrice = isFullCombo && stack?.isSavedCombo && stack.comboPrice !== null;

  // Individual item totals
  const individualSellingSum = chosen.reduce((sum, p) => sum + Number(p.discountPrice ?? p.price ?? 0), 0);
  const individualMrpSum = chosen.reduce((sum, p) => sum + Number(p.price ?? 0), 0);

  // Exact custom combo price set by Admin when full bundle is selected
  const total = hasComboPrice ? Number(stack.comboPrice) : individualSellingSum;
  const mrp = hasComboPrice && stack?.originalPrice ? Number(stack.originalPrice) : individualMrpSum;
  const savings = mrp > total ? mrp - total : 0;

  const addStack = async () => {
    setAdding(true);
    let added = 0;
    try {
      if (hasComboPrice) {
        const comboProduct = {
          _id: stack.id,
          name: stack.name,
          company: stack.company,
          price: Math.max(mrp, total),
          discountPrice: total,
          displayImages: chosen[0]?.displayImages || [],
          flavour: chosen.map(product => product.name).join(" + "),
        };
        const notes = { combo_id: stack.id };
        if (isAuthenticated) {
          const quantity = Number(cartItems.find(item => item.combo_id === stack.id)?.quantity || 0) + 1;
          const result = await addToCart({ item_id: stack.id, item_type: "FG_MEAL_PRODUCT", quantity, notes });
          if (!result.success) throw new Error(result.message || "We couldn't add this combo. Please try again.");
        } else {
          addGuestCartItem({ product: comboProduct, quantity: 1, notes });
        }
        successToast(`Added ${stack.name} to your cart for ${money(total)}`);
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
    <div className="flex flex-col justify-between h-full">
      {/* Combo Header Info */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
              {slotLabel}
            </span>
            {stack.company && (
              <span className="text-[10px] font-bold text-stone-500 uppercase truncate">
                {stack.company}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-black text-text truncate">
            {stack.name}
          </h3>
        </div>

        {allStacks && allStacks.length > 2 && (
          <select
            value={stack.id}
            onChange={(e) => onSelectStack(e.target.value)}
            className="hidden lg:block text-xs bg-white border border-border rounded-lg px-2 py-1 text-stone-700 font-medium cursor-pointer focus:outline-primary shrink-0"
            aria-label={`Select combo for ${slotLabel}`}
          >
            {allStacks.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="py-8">
          <ProductGridSkeleton count={3} label="Loading combo essentials" />
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-white border border-border text-center my-4">
          <p className="text-xs text-stone-500 mb-2">Could not load this combo stack.</p>
          <button onClick={() => setRetry(v => v + 1)} className="text-xs text-primary underline">
            Try again
          </button>
        </div>
      ) : (
        <>
          {/* Top: Compact Product Cards (01 / 02 / 03) */}
          <div className={`grid ${products.length <= 2 ? "grid-cols-2" : "grid-cols-3"} gap-2 sm:gap-2.5`}>
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`relative rounded-xl border bg-white p-2 sm:p-2.5 transition-all flex flex-col justify-between ${
                  selected.includes(product._id)
                    ? "border-primary ring-1 ring-primary/20 shadow-2xs"
                    : "border-border bg-stone-50/50 opacity-60"
                }`}
              >
                {/* Header label & Checkbox */}
                <label className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] text-stone-600 font-semibold cursor-pointer mb-1">
                  <span className="truncate font-bold text-stone-800">
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
                    className="h-3.5 w-3.5 accent-primary rounded cursor-pointer shrink-0"
                  />
                </label>

                {/* Product Image Link */}
                <Link to={`/product/${product.slug}`} className="block group my-1">
                  <div className="w-full h-20 sm:h-24 bg-[#faf7f4] rounded-lg p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={getProductImageUrl(product.displayImages)}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4
                    className="mt-1 text-[11px] font-bold leading-tight line-clamp-1 text-text group-hover:text-primary transition-colors"
                    title={product.name}
                  >
                    {product.name}
                  </h4>
                </Link>

                {/* Flavour & Pricing */}
                <div className="mt-1 pt-1 border-t border-stone-100">
                  <p className="text-[10px] text-stone-400 truncate">
                    {formatSpecString(product.flavour) || (product.company ? product.company : "")}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-black text-text">
                    {money(product.discountPrice ?? product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Below Product Cards: Bundle Offer Card */}
          <div className="bg-[#f5ede6] rounded-2xl p-4 sm:p-5 border border-border flex flex-col justify-between mt-3 sm:mt-4 shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <ShoppingBag size={18} className="text-primary" />
                  <span className="font-bold text-sm sm:text-base text-text">Special Bundle Offer</span>
                </div>
                {hasComboPrice && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-primary text-white tracking-wider">
                    <Sparkles size={11} /> Combo Deal
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-500 mb-2.5">
                {chosen.length} {chosen.length === 1 ? "product" : "products"} selected · bundled together
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-text">{money(total)}</span>
                {mrp > total && (
                  <span className="line-through text-stone-400 text-xs sm:text-sm">{money(mrp)}</span>
                )}
              </div>

              {savings > 0 && (
                <p className="mt-1 text-xs font-bold text-primary">
                  Save {money(savings)} with this combo offer!
                </p>
              )}
            </div>

            <div className="mt-3">
              <button
                type="button"
                disabled={adding || chosen.length === 0}
                onClick={addStack}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold flex justify-center items-center gap-2 hover:bg-hover transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Add Combo to Cart
              </button>

              <Link
                to="/cart"
                className="mt-2.5 text-xs font-bold text-primary flex justify-center items-center gap-1.5 hover:underline"
              >
                <span>View your cart</span>
                <ArrowRight size={13} />
              </Link>

              <p className="text-[10px] sm:text-[11px] text-stone-500 mt-2.5 text-center leading-relaxed">
                Direct bundle pricing applied. Verified inventory guaranteed at checkout.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function HkComboStackBuilder() {
  const content = useWebsiteContent();
  const { isAuthenticated } = useAuth();
  const { items: cartItems } = useCart();
  const [stacks, setStacks] = useState(DEFAULT_STACKS);
  const [active1, setActive1] = useState(DEFAULT_STACKS[0]?.id || "");
  const [active2, setActive2] = useState(DEFAULT_STACKS[1]?.id || "");
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Helper to pick the best complementary stack for the second combo slot
  const pickSecondStack = (list, firstId) => {
    const withProducts = list.find(
      s => s.id !== firstId && Array.isArray(s.products) && s.products.length > 0
    );
    if (withProducts) return withProducts.id;
    const second = list.find(s => s.id !== firstId);
    return second?.id || "";
  };

  // Load dynamic combo stacks with specific products and custom pricing
  useEffect(() => {
    let current = true;
    fetchComboStacks().then(remoteStacks => {
      if (!current || !remoteStacks || !Array.isArray(remoteStacks) || remoteStacks.length === 0) return;
      setStacks(remoteStacks);

      setActive1(prev => {
        if (remoteStacks.some(s => s.id === prev)) return prev;
        return remoteStacks[0]?.id || "";
      });

      setActive2(prev => {
        const firstId = remoteStacks[0]?.id || "";
        if (remoteStacks.some(s => s.id === prev && s.id !== firstId)) return prev;
        return pickSecondStack(remoteStacks, firstId);
      });
    });
    return () => {
      current = false;
    };
  }, []);

  if (!stacks.length) return null;

  const stack1 = stacks.find(item => item.id === active1) || stacks[0];
  const stack2 = stacks.find(item => item.id === active2) || stacks.find(item => item.id !== stack1?.id) || stacks[1] || stacks[0];

  const handleSelectStack = (stackId) => {
    setActive1(stackId);
    if (active2 === stackId) {
      setActive2(active1);
    }
  };

  return (
    <section className="bg-light border-y border-border py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Better together
            </p>
          </div>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.2] font-black tracking-[-0.035em] text-text">
            Your routine. Your stack.
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Handpicked product essentials at special bundle pricing. Add them in one step.
          </p>
        </div>

        {/* Stack Selector Pills (Allow swapping either combo effortlessly) */}
        {stacks.length > 2 && (
          <div
            role="group"
            aria-label="Choose your combo offers"
            className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-hide scroll-smooth flex-nowrap py-1 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {stacks.map(stack => {
              const isSlot1 = active1 === stack.id;
              const isSlot2 = isDesktop && active2 === stack.id;
              return (
                <button
                  type="button"
                  key={stack.id}
                  aria-pressed={isSlot1}
                  onClick={() => handleSelectStack(stack.id)}
                  className={`rounded-full min-h-9 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSlot1
                      ? "bg-primary text-white border-primary font-bold shadow-xs"
                      : isSlot2
                      ? "bg-white border-border text-stone-600 hover:border-primary hover:text-primary lg:bg-primary lg:text-white lg:border-primary lg:font-bold lg:shadow-xs"
                      : "bg-white border-border text-stone-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  <span>{stack.name}</span>
                  {isDesktop && isSlot1 && (
                    <span className="hidden lg:inline-block ml-1.5 text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                      Combo 1
                    </span>
                  )}
                  {isDesktop && isSlot2 && (
                    <span className="hidden lg:inline-block ml-1.5 text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                      Combo 2
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2 Combos Side-by-Side on Desktop (lg:), Only 1 Combo on Mobile */}
        <div className={`grid ${isDesktop ? "grid-cols-1 lg:grid-cols-[1fr_auto_1fr]" : "grid-cols-1"} items-stretch gap-6 xl:gap-8`}>
          {/* Combo 1 Column (Always shown on Mobile & Desktop) */}
          <div className="flex flex-col">
            <SingleComboCard
              key={stack1?.id || "combo-1"}
              stack={stack1}
              allStacks={stacks}
              onSelectStack={setActive1}
              slotLabel="Combo 01"
              isAuthenticated={isAuthenticated}
              cartItems={cartItems}
            />
          </div>

          {/* Combo 2 Column & Divider (Desktop Only: completely omitted on mobile) */}
          {isDesktop && (
            <>
              {/* Divider Line In Between (Desktop Only) */}
              <div className="hidden lg:flex items-center justify-center px-1" aria-hidden="true">
                <div className="w-px h-full bg-stone-300 min-h-[350px]" />
              </div>

              {/* Combo 2 Column (Desktop Only: hidden on mobile, shown on lg:) */}
              <div className="hidden lg:flex flex-col">
                <SingleComboCard
                  key={stack2?.id || "combo-2"}
                  stack={stack2}
                  allStacks={stacks}
                  onSelectStack={setActive2}
                  slotLabel="Combo 02"
                  isAuthenticated={isAuthenticated}
                  cartItems={cartItems}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
