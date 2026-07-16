import { useState } from "react";
import { Compass, Sparkles, BookOpen } from "lucide-react";
import { PRODUCTS } from "./data";
import { PerfumeProduct, CartItem } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import ScentQuiz from "./components/ScentQuiz";
import NoteExplorer from "./components/NoteExplorer";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";

export default function App() {
  const [activeSection, setActiveSection] = useState<"browse" | "quiz" | "explorer">("browse");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<PerfumeProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [liteMode, setLiteMode] = useState(false);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
  };

  // Add to cart with dynamic quantity & size
  const handleAddToCart = (product: PerfumeProduct, size: number, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prevItems, { product, selectedSize: size, quantity }];
    });

    triggerToast(`Added ${quantity}x ${product.name} (${size}ml) to your Selection.`);
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty < 1) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    triggerToast(`Removed ${item.product.name} from Selection.`);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    triggerToast("Your reservation has been secured successfully.");
  };

  // Smooth scroll to collection
  const scrollToCollection = () => {
    setActiveSection("browse");
    setTimeout(() => {
      const el = document.getElementById("vault-collection");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-white relative">
      {/* Decorative Cinematic Borders for magazine alignment feel */}
      <div className="fixed top-0 left-0 bottom-0 w-1 bg-brand-gold/15 z-50" />
      <div className="fixed top-0 right-0 bottom-0 w-1 bg-brand-gold/15 z-50" />

      {/* Top Glassmorphism Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        liteMode={liteMode}
        onToggleLiteMode={() => {
          setLiteMode(!liteMode);
          triggerToast(liteMode ? "Cinematic Mode Enabled" : "Lite Mode Enabled (Animations optimized)");
        }}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Container */}
      <main className="flex-grow pt-[80px]">
        {activeSection === "browse" && (
          <>
            {/* Cinematic Full-screen Parallax Hero */}
            <Hero liteMode={liteMode} onExploreClick={scrollToCollection} />

            {/* Premium Interactive Feature Story Section */}
            <section className="relative py-24 bg-brand-charcoal/20 border-t border-b border-[rgba(201,169,110,0.1)]">
              <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-brand-gold uppercase block">
                    Heritage & Mastery
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight text-white">
                    The Unspoken <br />
                    <span className="italic font-normal">Language of Scent</span>
                  </h2>
                  <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed max-w-md">
                    Every luxury formula inside Aura's vault is distilled in small, numbered batches in Paris. We source ethically farmed saffron from Persia, handpicked Midnight Jasmine, and rare certified aged Oud to craft olfactory memories that linger indefinitely.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveSection("quiz")}
                      className="border border-brand-gold px-8 py-3.5 font-sans text-[10px] font-semibold tracking-widest text-brand-gold uppercase hover:bg-brand-gold hover:text-brand-black transition-all duration-300 focus:outline-none"
                    >
                      Take Scent Profiler
                    </button>
                    <button
                      onClick={() => setActiveSection("explorer")}
                      className="border border-neutral-800 hover:border-neutral-700 px-8 py-3.5 font-sans text-[10px] font-semibold tracking-widest text-neutral-300 uppercase transition-colors focus:outline-none"
                    >
                      Read Note Library
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-yellow-600 opacity-10 group-hover:opacity-20 blur transition-opacity duration-1000" />
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-charcoal border border-[rgba(201,169,110,0.15)]">
                    <img
                      src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80"
                      alt="Atelier formulation showcase"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div>
                        <span className="font-mono text-[8px] tracking-widest text-brand-gold uppercase">
                          The Atelier
                        </span>
                        <p className="font-serif text-base text-white tracking-wide">
                          Hand-bottled in numbered glass crystals
                        </p>
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">
                        Paris, France
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Filterable Products Grid collection */}
            <ProductGrid
              products={PRODUCTS}
              onQuickView={setSelectedProduct}
              onAddToCart={handleAddToCart}
              liteMode={liteMode}
            />
          </>
        )}

        {activeSection === "quiz" && (
          <ScentQuiz
            onQuickView={setSelectedProduct}
            onAddToCart={handleAddToCart}
            liteMode={liteMode}
          />
        )}

        {activeSection === "explorer" && (
          <NoteExplorer onQuickView={setSelectedProduct} liteMode={liteMode} />
        )}
      </main>

      {/* Editorial Magazine Footer Bar */}
      <footer className="border-t border-[rgba(201,169,110,0.1)] bg-brand-charcoal/30 py-12 px-6 md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif text-lg tracking-[0.2em] text-white">AURA PARIS</span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-neutral-500 uppercase">
              © 2026 Aura Perfumerie Paris. All Rights Reserved.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 font-sans text-[10px] tracking-widest text-neutral-400 uppercase">
            <button onClick={() => setActiveSection("browse")} className="hover:text-brand-gold transition-colors focus:outline-none">
              Collections
            </button>
            <button onClick={() => setActiveSection("quiz")} className="hover:text-brand-gold transition-colors focus:outline-none">
              Scent Finder
            </button>
            <button onClick={() => setActiveSection("explorer")} className="hover:text-brand-gold transition-colors focus:outline-none">
              Note Library
            </button>
            <span className="text-neutral-600">English (US)</span>
          </div>
        </div>
      </footer>

      {/* Persistent App Modals & Overlay Drawers */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, size, qty) => {
          handleAddToCart(p, size, qty);
          setSelectedProduct(null); // close after added to keep flow seamless
        }}
        liteMode={liteMode}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onBeginCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onSuccess={handleCheckoutSuccess}
      />

      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
