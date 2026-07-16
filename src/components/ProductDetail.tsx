import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, ArrowLeft, ZoomIn, ZoomOut, Compass } from "lucide-react";
import { PerfumeProduct } from "../types";
import { OLF_NOTES } from "../data";

interface ProductDetailProps {
  product: PerfumeProduct | null;
  onClose: () => void;
  onAddToCart: (product: PerfumeProduct, size: number, qty: number) => void;
  liteMode: boolean;
}

export default function ProductDetail({
  product,
  onClose,
  onAddToCart,
  liteMode,
}: ProductDetailProps) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<"primary" | "alternate">("primary");
  const [selectedSize, setSelectedSize] = useState<number>(product.size);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  // Price modifier for alternate size representation
  const displayedPrice = selectedSize === 50 ? Math.round(product.price * 0.8) : product.price;

  // Find info about a scent note from our notes database
  const getNoteInfo = (noteName: string) => {
    return OLF_NOTES.find((n) => n.name.toLowerCase() === noteName.toLowerCase());
  };

  const currentImageSrc = activeImage === "primary" ? product.hero_image : product.hover_image;

  return (
    <motion.div
      id="pdp-drawer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/98 backdrop-blur-md pt-20"
    >
      {/* Detail Wrapper */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 relative">
        {/* Back Button & Title */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[rgba(201,169,110,0.1)]">
          <button
            onClick={onClose}
            className="group flex items-center gap-2.5 font-sans text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-brand-gold transition-colors focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Collection</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-brand-gold rounded-full text-neutral-400 hover:text-white transition-all focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 50/50 Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Gallery & Carousels with zoom triggers */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-charcoal border border-[rgba(201,169,110,0.15)]">
              {/* Zoom toggle button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-brand-black/80 border border-neutral-800 rounded-full text-neutral-300 hover:text-brand-gold transition-colors focus:outline-none"
                title="Zoom view"
              >
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </button>

              <motion.img
                src={currentImageSrc}
                alt={product.name}
                referrerPolicy="no-referrer"
                animate={{
                  scale: isZoomed ? 1.4 : 1,
                  cursor: isZoomed ? "zoom-out" : "zoom-in",
                }}
                onClick={() => setIsZoomed(!isZoomed)}
                className="h-full w-full object-cover object-center transition-all duration-500"
              />

              {/* Solved status badge */}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-brand-black/80 flex items-center justify-center">
                  <span className="font-mono text-xs tracking-[0.3em] text-brand-gold border border-brand-gold px-4 py-2 bg-brand-black/50">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Pickers */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setActiveImage("primary");
                  setIsZoomed(false);
                }}
                className={`relative aspect-[3/4] w-20 overflow-hidden border transition-all ${
                  activeImage === "primary" ? "border-brand-gold" : "border-neutral-800 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={product.hero_image} alt="Thumbnail 1" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </button>
              <button
                onClick={() => {
                  setActiveImage("alternate");
                  setIsZoomed(false);
                }}
                className={`relative aspect-[3/4] w-20 overflow-hidden border transition-all ${
                  activeImage === "alternate" ? "border-brand-gold" : "border-neutral-800 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={product.hover_image} alt="Thumbnail 2" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Details Panel */}
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-gold uppercase font-medium">
              {product.collection}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white mt-3 tracking-wide">
              {product.name}
            </h1>
            <p className="font-sans text-sm text-neutral-400 mt-2 font-light">
              by <span className="text-neutral-300 font-medium">{product.brand}</span>
            </p>

            {/* Size & Concentration Meta */}
            <div className="flex items-center gap-4 mt-4 font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
              <span>{product.concentration}</span>
              <span>·</span>
              <span>In Stock</span>
            </div>

            <div className="h-[1px] bg-[rgba(201,169,110,0.12)] my-6" />

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-brand-gold">
                ${displayedPrice} USD
              </span>
              <span className="font-sans text-xs text-neutral-500">
                taxes and shipping calculated at checkout
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-neutral-300 font-light leading-relaxed mt-6">
              {product.description}
            </p>

            {/* Olfactive Family Tag */}
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase font-medium mr-2">
                Olfactive Family:
              </span>
              {product.olfactive_family.map((family) => (
                <span
                  key={family}
                  className="px-3 py-1 bg-brand-charcoal/80 border border-neutral-800 text-neutral-300 font-sans text-xs"
                >
                  {family}
                </span>
              ))}
            </div>

            {/* Scent Accord Notes Explorer Interactive Grid */}
            <div className="mt-8 p-6 bg-brand-charcoal/40 border border-[rgba(201,169,110,0.1)]">
              <div className="flex items-center gap-1.5 mb-4">
                <Compass className="h-4 w-4 text-brand-gold" />
                <h3 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
                  Olfactive Notes
                </h3>
              </div>
              <p className="font-sans text-[11px] text-neutral-400 mb-4 font-light">
                Select a note below to explore its origin, category and luxury scent sensation:
              </p>

              <div className="space-y-4">
                {/* Top notes */}
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.15em] block mb-1.5">
                    Top Notes (Initial impression)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.top_notes.map((note) => (
                      <button
                        key={note}
                        onClick={() => setSelectedNote(selectedNote === note ? null : note)}
                        className={`px-3 py-1.5 font-sans text-xs border transition-all ${
                          selectedNote === note
                            ? "bg-brand-gold text-brand-black border-brand-gold font-medium"
                            : "border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        {note}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Heart notes */}
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.15em] block mb-1.5">
                    Heart Notes (Core signature)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.heart_notes.map((note) => (
                      <button
                        key={note}
                        onClick={() => setSelectedNote(selectedNote === note ? null : note)}
                        className={`px-3 py-1.5 font-sans text-xs border transition-all ${
                          selectedNote === note
                            ? "bg-brand-gold text-brand-black border-brand-gold font-medium"
                            : "border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        {note}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Base notes */}
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.15em] block mb-1.5">
                    Base Notes (Longevity anchor)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.base_notes.map((note) => (
                      <button
                        key={note}
                        onClick={() => setSelectedNote(selectedNote === note ? null : note)}
                        className={`px-3 py-1.5 font-sans text-xs border transition-all ${
                          selectedNote === note
                            ? "bg-brand-gold text-brand-black border-brand-gold font-medium"
                            : "border-neutral-800 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        {note}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Note Explorer Card Details */}
              <AnimatePresence>
                {selectedNote && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 border border-brand-gold-muted bg-brand-black/90 text-white"
                  >
                    <div className="flex justify-between items-center border-b border-[rgba(201,169,110,0.15)] pb-2 mb-2">
                      <span className="font-serif text-sm font-semibold tracking-wide text-brand-gold">
                        {selectedNote} Note Profiler
                      </span>
                      <button
                        onClick={() => setSelectedNote(null)}
                        className="text-neutral-500 hover:text-white text-xs font-mono"
                      >
                        [Close]
                      </button>
                    </div>
                    {getNoteInfo(selectedNote) ? (
                      <div className="space-y-2">
                        <p className="font-sans text-[12px] text-neutral-300 leading-relaxed font-light">
                          {getNoteInfo(selectedNote)?.description}
                        </p>
                        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                          <span>Origin: <span className="text-neutral-300">{getNoteInfo(selectedNote)?.origin}</span></span>
                          <span>Accord: <span className="text-brand-gold">{getNoteInfo(selectedNote)?.category}</span></span>
                        </div>
                        <p className="font-mono text-[10px] text-brand-gold-muted italic mt-1 leading-normal">
                          Sensation: "{getNoteInfo(selectedNote)?.sensation}"
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="font-sans text-[12px] text-neutral-300 leading-relaxed font-light">
                          A curated aromatic ingredient of natural excellence, processed by our master distillers.
                        </p>
                        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                          <span>Sourced globally for premium grade.</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-[1px] bg-[rgba(201,169,110,0.12)] my-8" />

            {/* Sizes selector pills */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-semibold block mb-3">
                Select Volume
              </span>
              <div className="flex gap-3">
                {[50, 100].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative py-3.5 px-6 font-mono text-xs border tracking-wider transition-all focus:outline-none ${
                      selectedSize === size
                        ? "border-brand-gold text-brand-gold bg-brand-gold/10"
                        : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                    }`}
                  >
                    <span>{size} ml</span>
                    {size === 50 && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-brand-gold text-brand-black text-[7px] font-bold tracking-tight">
                        -20%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty & Add to Cart Trigger */}
            {product.in_stock ? (
              <div className="mt-8 flex gap-4">
                {/* Quantity adjustments */}
                <div className="flex border border-neutral-800 bg-brand-charcoal/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-neutral-400 hover:text-white transition-colors text-sm focus:outline-none"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-mono text-xs flex items-center justify-center text-white min-w-[40px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-neutral-400 hover:text-white transition-colors text-sm focus:outline-none"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, selectedSize, quantity);
                    setQuantity(1); // reset after add
                  }}
                  className="flex-grow flex items-center justify-center gap-3 bg-brand-gold hover:bg-white text-brand-black py-4 px-8 font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 focus:outline-none"
                >
                  <ShoppingBag className="h-4 w-4 text-brand-black" />
                  <span>Reserve Scent</span>
                </button>
              </div>
            ) : (
              <div className="mt-8 border border-neutral-800 bg-brand-charcoal/20 p-4 text-center">
                <p className="font-mono text-xs tracking-wider text-neutral-500 uppercase">
                  Currently Out of Stock. Join the waitlist inside our Boutique.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
