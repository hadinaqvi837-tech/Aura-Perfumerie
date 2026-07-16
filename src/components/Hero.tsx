import { motion } from "motion/react";
import { ArrowDown, Compass } from "lucide-react";

interface HeroProps {
  liteMode: boolean;
  onExploreClick: () => void;
}

export default function Hero({ liteMode, onExploreClick }: HeroProps) {
  return (
    <section id="aura-hero" className="relative h-screen w-full overflow-hidden bg-brand-black flex items-center justify-center">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="/src/assets/images/hero_perfume_ambient_1784119802221.jpg"
          alt="Curated Luxury Perfumery"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{
            scale: liteMode ? 1.0 : 1.05,
            opacity: 0.85,
          }}
          transition={{
            scale: liteMode ? { duration: 0 } : { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            opacity: { duration: 1.5, ease: "easeOut" },
          }}
          className="h-full w-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
        />
        {/* Editorial Gradients Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/25 to-brand-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-transparent to-brand-black/70 z-10" />
      </div>

      {/* Editorial Content Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 text-center flex flex-col items-center">
        {/* Small Brand Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="h-[1px] w-8 bg-brand-gold-muted" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-brand-gold uppercase font-medium">
            Maison d'Art Olfactif
          </span>
          <span className="h-[1px] w-8 bg-brand-gold-muted" />
        </motion.div>

        {/* Large Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide text-white leading-none max-w-5xl"
        >
          Sense of <span className="italic font-light text-neutral-300">Secrets</span>
        </motion.h1>

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-sans text-sm sm:text-base font-light text-neutral-400 tracking-[0.15em] max-w-2xl uppercase"
        >
          Curated Fine Fragrances Destined for the Uncompromising Collector.
        </motion.p>

        {/* Luxury CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-5 items-center justify-center"
        >
          <button
            onClick={onExploreClick}
            className="group flex items-center justify-center gap-3 bg-brand-gold px-8 py-4 font-sans text-xs font-semibold tracking-[0.25em] text-brand-black uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(201,169,110,0.4)] focus:outline-none"
          >
            <Compass className="h-4 w-4 text-brand-black" />
            <span>Enter the Vault</span>
          </button>
        </motion.div>
      </div>

      {/* Elegant Scrolling Signifier */}
      <motion.button
        onClick={onExploreClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 focus:outline-none"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
          Explore Below
        </span>
        <ArrowDown className="h-4 w-4 text-brand-gold" />
      </motion.button>
    </section>
  );
}
