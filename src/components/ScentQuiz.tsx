import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react";
import { QuizQuestion, PerfumeProduct } from "../types";
import { QUIZ_QUESTIONS, PRODUCTS } from "../data";

interface ScentQuizProps {
  onQuickView: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: number) => void;
  liteMode: boolean;
}

export default function ScentQuiz({ onQuickView, onAddToCart, liteMode }: ScentQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<PerfumeProduct | null>(null);

  const handleOptionSelect = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendation();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRecommendation = () => {
    // Basic heuristics: match chosen values to olfactive families & description text in products
    const chosenAtmosphere = answers[1]; // e.g., Fresh, Woody, Oriental, Floral
    const chosenVibe = answers[2]; // subtle, bold, intellectual, sensual
    const chosenMemory = answers[3]; // earth, citrus, spice, clean

    let bestProduct: PerfumeProduct = PRODUCTS[0];
    let maxScore = -1;

    PRODUCTS.forEach((product) => {
      let score = 0;

      // 1. Atmosphere match (primary category filter)
      if (product.olfactive_family.includes(chosenAtmosphere)) {
        score += 5;
      }

      // 2. Vibe match
      if (chosenVibe === "bold" && product.badge === "Icon") score += 3;
      if (chosenVibe === "sensual" && product.id === "reve-rouge") score += 3;
      if (chosenVibe === "subtle" && product.concentration === "Eau de Toilette") score += 3;
      if (chosenVibe === "intellectual" && product.id === "vetiver-sacre") score += 3;

      // 3. Memory notes association
      if (chosenMemory === "earth" && (product.olfactive_family.includes("Woody") || product.olfactive_family.includes("Earthy"))) score += 4;
      if (chosenMemory === "citrus" && product.olfactive_family.includes("Citrus")) score += 4;
      if (chosenMemory === "spice" && (product.olfactive_family.includes("Spicy") || product.olfactive_family.includes("Amber"))) score += 4;
      if (chosenMemory === "clean" && product.olfactive_family.includes("Fresh")) score += 4;

      // Check description keywords
      const desc = product.description.toLowerCase();
      if (chosenMemory === "earth" && (desc.includes("moss") || desc.includes("stone") || desc.includes("roots"))) score += 2;
      if (chosenMemory === "spice" && (desc.includes("cherry") || desc.includes("saffron") || desc.includes("rose"))) score += 2;

      if (score > maxScore) {
        maxScore = score;
        bestProduct = product;
      }
    });

    setRecommendedProduct(bestProduct);
    setIsFinished(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
    setRecommendedProduct(null);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const hasSelected = answers[currentQuestion.id] !== undefined;

  return (
    <section id="scent-profiler" className="mx-auto max-w-4xl px-6 py-24">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-[10px] tracking-[0.3em] text-brand-gold uppercase font-semibold">
          AI Aura Alignment
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-white mt-3">
          Scent <span className="italic">Profiler</span>
        </h2>
        <p className="mt-4 font-sans text-xs font-light text-neutral-400 tracking-wider max-w-xl mx-auto leading-relaxed">
          Embark on a sensory exploration. Answer our bespoke questions to align your inner aura with its signature fragrance.
        </p>
      </div>

      <div className="bg-brand-charcoal border border-[rgba(201,169,110,0.15)] p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Steps indicators */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-medium">
                  Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="flex gap-1.5">
                  {QUIZ_QUESTIONS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 w-8 transition-colors ${
                        idx <= currentStep ? "bg-brand-gold" : "bg-neutral-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-2xl font-light text-white tracking-wide mb-8">
                {currentQuestion.text}
              </h3>

              {/* Options lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
                  const isChosen = answers[currentQuestion.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                      className={`group flex flex-col items-start p-5 border text-left transition-all ${
                        isChosen
                          ? "bg-brand-gold/15 border-brand-gold text-white"
                          : "border-neutral-800 bg-brand-black/30 hover:border-brand-gold-muted text-neutral-300"
                      }`}
                    >
                      <span className={`font-serif text-lg font-medium group-hover:text-brand-gold transition-colors ${
                        isChosen ? "text-brand-gold" : "text-white"
                      }`}>
                        {option.text}
                      </span>
                      <span className="font-sans text-[11px] text-neutral-400 mt-2 font-light leading-normal">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-neutral-800">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 font-sans text-xs tracking-wider uppercase transition-colors focus:outline-none ${
                    currentStep === 0 ? "text-neutral-600 cursor-not-allowed" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!hasSelected}
                  className={`flex items-center gap-2.5 px-6 py-3 font-sans text-xs font-semibold tracking-wider uppercase border transition-all focus:outline-none ${
                    hasSelected
                      ? "bg-brand-gold border-brand-gold text-brand-black hover:bg-white"
                      : "border-neutral-800 text-neutral-500 cursor-not-allowed"
                  }`}
                >
                  <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? "Align Aura" : "Next Option"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-box"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/10 border border-brand-gold mb-6">
                <Sparkles className="h-6 w-6 text-brand-gold animate-pulse" />
              </div>

              <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase font-semibold block mb-2">
                Alignment Confirmed
              </span>
              <h3 className="font-serif text-3xl font-normal text-white tracking-wide">
                Your Signature Fragrance
              </h3>

              {/* Premium matched card layout */}
              {recommendedProduct && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left bg-brand-black/50 p-6 border border-[rgba(201,169,110,0.1)]">
                  {/* Image with 3:4 aspect */}
                  <div className="aspect-[3/4] w-full overflow-hidden bg-brand-charcoal border border-neutral-800">
                    <img
                      src={recommendedProduct.hero_image}
                      alt={recommendedProduct.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Descriptions block */}
                  <div className="flex flex-col justify-center">
                    <span className="font-mono text-[10px] tracking-wider text-brand-gold uppercase font-medium">
                      {recommendedProduct.concentration} · {recommendedProduct.size}ml
                    </span>
                    <h4 className="font-serif text-3xl font-normal text-white tracking-wide mt-2">
                      {recommendedProduct.name}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 mt-1 italic font-light">
                      Olfactive Accord: {recommendedProduct.olfactive_family.join(", ")}
                    </p>

                    <p className="font-sans text-[12.5px] text-neutral-300 font-light leading-relaxed mt-4 line-clamp-4">
                      {recommendedProduct.description}
                    </p>

                    {/* Quick action buttons */}
                    <div className="flex flex-col gap-2.5 mt-6">
                      <button
                        onClick={() => onQuickView(recommendedProduct)}
                        className="w-full text-center border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black py-3 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase transition-all focus:outline-none"
                      >
                        Explore details
                      </button>
                      {recommendedProduct.in_stock && (
                        <button
                          onClick={() => onAddToCart(recommendedProduct, recommendedProduct.size)}
                          className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-black hover:bg-white py-3 font-sans text-[10px] font-semibold tracking-[0.2em] uppercase transition-all focus:outline-none"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span>Reserve ($ {recommendedProduct.price})</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Try again */}
              <button
                onClick={handleRestart}
                className="mt-10 flex items-center justify-center gap-2 mx-auto font-mono text-[10px] tracking-[0.15em] text-neutral-400 hover:text-brand-gold uppercase transition-all focus:outline-none"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Re-align Aura</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
