import { useEffect, useState } from "react";
import { ShoppingBag, Sparkles, Moon, Sun, Compass, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  liteMode: boolean;
  onToggleLiteMode: () => void;
  activeSection: "browse" | "quiz" | "explorer";
  setActiveSection: (section: "browse" | "quiz" | "explorer") => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  liteMode,
  onToggleLiteMode,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      id="aura-navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-brand-black/90 py-3 border-b border-[rgba(201,169,110,0.12)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo - High Typography Aesthetics */}
        <button
          onClick={() => setActiveSection("browse")}
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl font-medium tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-brand-gold">
            A U R A
          </span>
          <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-500 uppercase">
            parfums d'exception
          </span>
        </button>

        {/* Navigation Categories */}
        <nav className="hidden md:flex items-center gap-10">
          <button
            onClick={() => setActiveSection("browse")}
            className={`group relative py-2 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeSection === "browse" ? "text-brand-gold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Compass className="h-3 w-3" /> Collections
            </span>
            {activeSection === "browse" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveSection("quiz")}
            className={`group relative py-2 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeSection === "quiz" ? "text-brand-gold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-brand-gold animate-pulse" /> Scent Profiler
            </span>
            {activeSection === "quiz" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveSection("explorer")}
            className={`group relative py-2 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
              activeSection === "explorer" ? "text-brand-gold" : "text-neutral-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" /> Note Explorer
            </span>
            {activeSection === "explorer" && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          {/* Performance Mode Toggle (Mitigation requirement) */}
          <button
            onClick={onToggleLiteMode}
            title={liteMode ? "Enable cinematic visual loops" : "Enable Lite Mode (save battery/data)"}
            className="flex items-center justify-center p-2 rounded-full border border-[rgba(201,169,110,0.15)] bg-brand-charcoal/30 text-neutral-400 hover:text-brand-gold transition-colors duration-300"
          >
            {liteMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden lg:inline ml-2 font-sans text-[10px] tracking-[0.1em] uppercase">
              {liteMode ? "Cinema Mode" : "Lite Mode"}
            </span>
          </button>

          {/* Cart Icon trigger with active bouncy animation */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1 p-2 rounded-full border border-[rgba(201,169,110,0.25)] bg-brand-charcoal/50 hover:bg-brand-gold/10 hover:border-brand-gold text-white hover:text-brand-gold transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline font-sans text-[10px] font-medium tracking-[0.1em] uppercase mr-1">
              Cart
            </span>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold text-brand-black"
              >
                {cartCount}
              </motion.div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Rail */}
      <div className="flex md:hidden justify-around mt-4 py-2 border-t border-[rgba(201,169,110,0.1)] bg-brand-black/95">
        <button
          onClick={() => setActiveSection("browse")}
          className={`flex flex-col items-center gap-1 text-[10px] tracking-[0.1em] uppercase ${
            activeSection === "browse" ? "text-brand-gold" : "text-neutral-500"
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Browse</span>
        </button>
        <button
          onClick={() => setActiveSection("quiz")}
          className={`flex flex-col items-center gap-1 text-[10px] tracking-[0.1em] uppercase ${
            activeSection === "quiz" ? "text-brand-gold" : "text-neutral-500"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Profiler</span>
        </button>
        <button
          onClick={() => setActiveSection("explorer")}
          className={`flex flex-col items-center gap-1 text-[10px] tracking-[0.1em] uppercase ${
            activeSection === "explorer" ? "text-brand-gold" : "text-neutral-500"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Notes</span>
        </button>
      </div>
    </motion.header>
  );
}
