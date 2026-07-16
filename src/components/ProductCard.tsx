import { useState } from "react";
import { motion } from "motion/react";
import { Eye, ShoppingBag } from "lucide-react";
import { PerfumeProduct } from "../types";

interface ProductCardProps {
  product: PerfumeProduct;
  onQuickView: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: number) => void;
  liteMode: boolean;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  liteMode,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileAlternate, setMobileAlternate] = useState(false);

  // Determine badge colors and styling
  const badgeColors: Record<string, string> = {
    "Icon": "bg-gradient-to-r from-yellow-600 via-brand-gold to-yellow-600 border border-yellow-400 text-brand-black",
    "Bestseller": "bg-brand-charcoal text-brand-gold border border-brand-gold/40",
    "New": "bg-emerald-950/90 text-emerald-300 border border-emerald-700/50",
    "Limited Edition": "bg-red-950/90 text-red-400 border border-red-700/50",
  };

  const handleMobileTap = () => {
    // Tapping on mobile swaps to alternate shot or triggers zoom
    setMobileAlternate(!mobileAlternate);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMobileAlternate(false);
      }}
      className="group relative flex flex-col bg-brand-charcoal border border-[rgba(201,169,110,0.12)] hover:border-brand-gold/30 transition-all duration-500 overflow-hidden"
    >
      {/* 3:4 Portrait Image Wrapper */}
      <div
        onClick={handleMobileTap}
        className="relative aspect-[3/4] w-full overflow-hidden bg-brand-black cursor-pointer"
      >
        {/* Primary and Secondary Images */}
        <motion.img
          src={mobileAlternate ? product.hover_image : product.hero_image}
          alt={product.name}
          referrerPolicy="no-referrer"
          animate={{
            scale: isHovered && !liteMode ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="h-full w-full object-cover object-center transition-all duration-700"
        />

        {/* Dynamic Blackout/Foil Layer on Hover for Desktop */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/40 to-brand-black/20 transition-opacity duration-300 flex flex-col justify-end p-6 ${
            isHovered ? "opacity-100" : "opacity-0 md:opacity-100 md:bg-transparent"
          }`}
        >
          {/* Action buttons (Quick View & Direct Cart) revealed on hover */}
          <div className="flex flex-col gap-2.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex w-full items-center justify-center gap-2 border border-brand-gold bg-brand-black/90 px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-brand-black focus:outline-none"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Quick View</span>
            </button>
            {product.in_stock && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product, product.size);
                }}
                className="flex w-full items-center justify-center gap-2 border border-neutral-700 bg-white/10 hover:bg-white hover:text-brand-black px-4 py-3 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 focus:outline-none"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Quick Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Sold Out Visual Overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="border border-brand-gold-muted px-4 py-2 bg-brand-black/60">
              <span className="font-mono text-xs tracking-[0.3em] text-brand-gold uppercase font-medium">
                Out of Stock
              </span>
            </div>
          </div>
        )}

        {/* Premium Gold Foil Badge on Tile Corner */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span
              className={`px-3 py-1 text-[8px] font-mono tracking-[0.15em] uppercase font-bold shadow-md ${
                badgeColors[product.badge] || "bg-brand-gold text-brand-black"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Size Indicator */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-2.5 py-1 text-[8px] font-mono tracking-[0.1em] uppercase font-bold text-neutral-400 bg-brand-black/80 border border-neutral-800/60 backdrop-blur-sm">
            {product.size}ml
          </span>
        </div>
      </div>

      {/* Product Information Footer */}
      <div className="p-5 flex flex-col flex-grow justify-between border-t border-[rgba(201,169,110,0.06)]">
        <div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
            {product.collection}
          </span>
          <h3 className="font-serif text-lg font-medium text-white tracking-wide mt-1 group-hover:text-brand-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-sans text-[11px] text-neutral-400 mt-1 line-clamp-1 italic font-light">
            {product.olfactive_family.join(" · ")}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-[rgba(201,169,110,0.04)]">
          <span className="font-mono text-[10px] tracking-[0.15em] text-neutral-400 uppercase">
            {product.concentration}
          </span>
          <span className="font-serif text-sm font-semibold text-brand-gold">
            ${product.price} USD
          </span>
        </div>
      </div>
    </motion.div>
  );
}
