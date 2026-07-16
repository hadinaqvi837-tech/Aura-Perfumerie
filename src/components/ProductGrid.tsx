import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PerfumeProduct } from "../types";
import ProductCard from "./ProductCard";
import CategoryNav from "./CategoryNav";

interface ProductGridProps {
  products: PerfumeProduct[];
  onQuickView: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: number) => void;
  liteMode: boolean;
}

export default function ProductGrid({
  products,
  onQuickView,
  onAddToCart,
  liteMode,
}: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "newest">("default");
  const [selectedConcentration, setSelectedConcentration] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(350);

  // Derive categories dynamically from products
  const categories = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      p.olfactive_family.forEach((f) => list.add(f));
    });
    return ["All", ...Array.from(list)];
  }, [products]);

  // Filters logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.olfactive_family.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.top_notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.base_notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          activeCategory === "All" || p.olfactive_family.includes(activeCategory);

        const matchesConcentration =
          selectedConcentration === "All" || p.concentration === selectedConcentration;

        const matchesPrice = p.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesConcentration && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") {
          return new Date(b.launch_date).getTime() - new Date(a.launch_date).getTime();
        }
        return 0; // default order
      });
  }, [products, searchQuery, activeCategory, sortBy, selectedConcentration, maxPrice]);

  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedConcentration("All");
    setSortBy("default");
    setMaxPrice(350);
  };

  return (
    <section id="vault-collection" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      {/* Editorial Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-[10px] tracking-[0.3em] text-brand-gold uppercase font-medium">
          The Scent Vault
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-white mt-3">
          Explore the Curated <span className="italic">Collection</span>
        </h2>
        <p className="mt-4 font-sans text-xs font-light text-neutral-400 tracking-wider max-w-xl mx-auto leading-relaxed">
          Sourced globally, blended by master perfumers. Discover scents featuring exceptional ingredients and timeless character.
        </p>
      </div>

      {/* Control Panel: Search & Filter Toggles */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[rgba(201,169,110,0.12)] pb-6 mb-10">
        {/* Search Input Bar with Gold Hover Effects */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, note (e.g. Oud, Saffron)..."
            className="w-full bg-brand-charcoal/50 border border-[rgba(201,169,110,0.15)] focus:border-brand-gold focus:outline-none px-5 py-3.5 pl-12 font-sans text-xs text-white placeholder-neutral-500 tracking-wider transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          {/* Advanced Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2.5 px-5 py-3.5 border transition-all duration-300 font-sans text-xs tracking-[0.1em] uppercase ${
              showFilters
                ? "bg-brand-gold text-brand-black border-brand-gold font-semibold"
                : "border-[rgba(201,169,110,0.2)] text-neutral-300 hover:border-brand-gold"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>{showFilters ? "Hide Filters" : "Filters"}</span>
          </button>

          {/* Sort Menu */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="appearance-none bg-brand-charcoal/50 border border-[rgba(201,169,110,0.15)] text-white font-sans text-xs tracking-[0.1em] uppercase focus:border-brand-gold focus:outline-none px-6 py-3.5 pr-10 hover:border-brand-gold transition-all"
            >
              <option value="default">Sort: Classic</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Release: Newest</option>
            </select>
            <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Advanced Filter panel (Expandable) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-brand-charcoal/30 border border-[rgba(201,169,110,0.1)] p-6 mb-10 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Filter by Concentration */}
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-gold uppercase font-semibold mb-4">
                  Concentration
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "Eau de Toilette", "Eau de Parfum", "Extrait"].map((conc) => (
                    <button
                      key={conc}
                      onClick={() => setSelectedConcentration(conc)}
                      className={`px-3 py-2 font-sans text-[10px] tracking-wider uppercase border transition-all ${
                        selectedConcentration === conc
                          ? "bg-brand-gold/20 border-brand-gold text-white"
                          : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                      }`}
                    >
                      {conc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by Price Range */}
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.2em] text-brand-gold uppercase font-semibold mb-4">
                  Maximum Price: <span className="font-serif text-xs text-white">${maxPrice} USD</span>
                </h4>
                <input
                  type="range"
                  min="200"
                  max="350"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-gold bg-neutral-800 h-1 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2">
                  <span>$200 USD</span>
                  <span>$350 USD</span>
                </div>
              </div>

              {/* Reset Panel */}
              <div className="flex items-end justify-start md:justify-end">
                <button
                  onClick={resetAllFilters}
                  className="font-mono text-[10px] tracking-[0.15em] text-brand-gold hover:text-white uppercase transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Pills Navigation */}
      <div className="mb-12">
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Product Grid Render */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-800 bg-brand-charcoal/10 rounded-sm">
          <p className="font-sans text-sm text-neutral-400 tracking-wider">
            No perfumes match your refined criteria.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-4 font-mono text-[10px] text-brand-gold hover:underline tracking-wider uppercase"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              liteMode={liteMode}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
