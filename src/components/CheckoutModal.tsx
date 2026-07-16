import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.selectedSize === 50 ? Math.round(item.product.price * 0.8) : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !name || !address) return;

    setLoading(true);
    // Simulate premium atelier processing
    setTimeout(() => {
      setLoading(false);
      setIsCompleted(true);
    }, 1800);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <div id="checkout-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-brand-charcoal border border-[rgba(201,169,110,0.2)] p-8 md:p-10 text-white relative shadow-2xl"
      >
        {/* Close Button */}
        {!isCompleted && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 border border-neutral-800 hover:border-brand-gold rounded-full text-neutral-400 hover:text-white transition-all focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-8">
                <span className="font-mono text-[9px] tracking-[0.3em] text-brand-gold uppercase font-medium">
                  Bespoke Scent Allocation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-white mt-2">
                  Atelier Reservation
                </h3>
                <p className="font-sans text-[11px] text-neutral-400 mt-2 font-light">
                  Please provide your shipping credentials to secure your limited-edition fragrances.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jean-Luc Picard"
                        className="w-full bg-brand-black/50 border border-neutral-800 focus:border-brand-gold focus:outline-none px-4 py-3 text-xs tracking-wider font-sans text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@exclusive.com"
                        className="w-full bg-brand-black/50 border border-neutral-800 focus:border-brand-gold focus:outline-none px-4 py-3 text-xs tracking-wider font-sans text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1.5">
                      Shipping Address
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Champs-Élysées, Paris, France"
                        className="w-full bg-brand-black/50 border border-neutral-800 focus:border-brand-gold focus:outline-none px-4 py-3 text-xs tracking-wider font-sans text-white transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-brand-gold hover:bg-white text-brand-black py-4 font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none"
                    >
                      {loading ? (
                        <span>Validating Vault...</span>
                      ) : (
                        <>
                          <span>Secure Scent Reserve</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Scent reservation summary card */}
                <div className="border border-[rgba(201,169,110,0.1)] bg-brand-black/30 p-5 space-y-4">
                  <span className="font-mono text-[9px] text-brand-gold uppercase tracking-widest block border-b border-neutral-900 pb-2">
                    Selected Formulation
                  </span>

                  <div className="space-y-3 max-h-[160px] overflow-y-auto">
                    {cartItems.map((item, index) => {
                      const price = item.selectedSize === 50 ? Math.round(item.product.price * 0.8) : item.product.price;
                      return (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="font-serif text-neutral-300 truncate max-w-[150px]">
                            {item.product.name} ({item.selectedSize}ml) x {item.quantity}
                          </span>
                          <span className="font-mono text-brand-gold">${price * item.quantity}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-neutral-900 pt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500">Shipping</span>
                      <span className="font-mono text-emerald-400 uppercase tracking-wider text-[10px]">Complimentary</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-neutral-900">
                      <span className="font-sans text-xs font-semibold text-neutral-400 uppercase">Subtotal</span>
                      <span className="font-serif text-xl font-bold text-brand-gold">${subtotal} USD</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[8px] text-neutral-500 uppercase tracking-wider bg-brand-black/60 p-2.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                    <span>256-bit encrypted authentication</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="mx-auto h-12 w-12 rounded-full border border-brand-gold bg-brand-gold/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-brand-gold" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.2em] block">
                  Curation Authorized
                </span>
                <h3 className="font-serif text-3xl font-normal text-white">
                  Reservation Complete
                </h3>
                <p className="font-sans text-xs text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                  Congratulations, <span className="text-white font-medium">{name}</span>. A dispatch validation details has been channeled to <span className="text-brand-gold">{email}</span>. Your fragrances are now undergoing master bottling preparation at our Parisian vault.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleFinish}
                  className="bg-brand-gold hover:bg-white text-brand-black px-10 py-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none"
                >
                  Return to Atelier
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
