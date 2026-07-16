import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Star, Eye } from "lucide-react";
import { OLF_NOTES, PRODUCTS } from "../data";
import { OlfactiveNote, PerfumeProduct } from "../types";

interface NoteExplorerProps {
  onQuickView: (product: PerfumeProduct) => void;
  liteMode: boolean;
}

export default function NoteExplorer({ onQuickView, liteMode }: NoteExplorerProps) {
  const [selectedNote, setSelectedNote] = useState<OlfactiveNote | null>(OLF_NOTES[0]);

  // Find products that contain the active note (matches in top_notes, heart_notes or base_notes)
  const matchingProducts = useMemo(() => {
    if (!selectedNote) return [];
    return PRODUCTS.filter((product) => {
      const nameLower = selectedNote.name.toLowerCase();
      return (
        product.top_notes.some((n) => n.toLowerCase() === nameLower) ||
        product.heart_notes.some((n) => n.toLowerCase() === nameLower) ||
        product.base_notes.some((n) => n.toLowerCase() === nameLower)
      );
    });
  }, [selectedNote]);

  return (
    <section id="note-encyclopedia" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="font-mono text-[10px] tracking-[0.3em] text-brand-gold uppercase font-semibold">
          Raw Material Library
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-white mt-3">
          Note <span className="italic">Explorer</span>
        </h2>
        <p className="mt-4 font-sans text-xs font-light text-neutral-400 tracking-wider max-w-xl mx-auto leading-relaxed">
          Unveil the global origins and natural secrets of premium perfumery's most coveted botanical and resinous raw materials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Notes selection directory (span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-3 bg-brand-charcoal/30 border border-[rgba(201,169,110,0.1)] p-6">
          <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-semibold block mb-2 pb-2 border-b border-neutral-800">
            Aromatic Ingredients
          </span>

          <div className="flex flex-col gap-2">
            {OLF_NOTES.map((note) => {
              const isSelected = selectedNote?.name === note.name;
              return (
                <button
                  key={note.name}
                  onClick={() => setSelectedNote(note)}
                  className={`w-full flex items-center justify-between p-3 border text-left transition-all focus:outline-none ${
                    isSelected
                      ? "bg-brand-gold/15 border-brand-gold text-brand-gold font-medium"
                      : "border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="font-serif text-base">{note.name}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                    {note.category} Note
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Note profile details and matching fragrances (span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <AnimatePresence mode="wait">
            {selectedNote && (
              <motion.div
                key={selectedNote.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-charcoal border border-[rgba(201,169,110,0.15)] p-8 md:p-10 shadow-lg"
              >
                {/* Note Header Title */}
                <div className="flex items-center justify-between border-b border-[rgba(201,169,110,0.12)] pb-6 mb-6">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-brand-gold uppercase font-semibold">
                      {selectedNote.category} ACCORD
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-wide mt-1">
                      {selectedNote.name}
                    </h3>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-neutral-800 font-mono text-[9px] tracking-wider text-neutral-400 uppercase">
                    <Star className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Premium Grade</span>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        Sourcing Origin
                      </span>
                      <p className="font-sans text-white font-medium">{selectedNote.origin}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                        Olfactory Sensation
                      </span>
                      <p className="font-sans text-brand-gold italic">"{selectedNote.sensation}"</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">
                      Profile Description
                    </span>
                    <p className="font-sans text-neutral-300 font-light leading-relaxed">
                      {selectedNote.description}
                    </p>
                  </div>
                </div>

                {/* MATCHING PERFUMES */}
                <div className="pt-6 border-t border-[rgba(201,169,110,0.12)]">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="h-4 w-4 text-brand-gold" />
                    <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
                      Featured Fragrances
                    </h4>
                  </div>

                  {matchingProducts.length === 0 ? (
                    <p className="font-sans text-xs text-neutral-500 italic">
                      No current formulations utilize this raw material. Keep watching the boutique for future releases.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {matchingProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-4 bg-brand-black/40 border border-neutral-800 p-4 hover:border-brand-gold/30 transition-colors"
                        >
                          {/* Image thumbnail */}
                          <div className="h-16 w-12 flex-shrink-0 overflow-hidden bg-brand-black">
                            <img src={p.hero_image} alt={p.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                          </div>

                          <div className="flex-grow min-w-0">
                            <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider block">
                              {p.concentration}
                            </span>
                            <span className="font-serif text-sm font-medium text-white tracking-wide truncate block">
                              {p.name}
                            </span>
                            <span className="font-mono text-[9px] text-brand-gold mt-0.5 block font-semibold">
                              ${p.price} USD
                            </span>
                          </div>

                          {/* Quick view icon */}
                          <button
                            onClick={() => onQuickView(p)}
                            className="p-2 border border-neutral-800 hover:border-brand-gold hover:text-brand-gold text-neutral-400 rounded-full transition-colors focus:outline-none"
                            title="Explore Scent"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
