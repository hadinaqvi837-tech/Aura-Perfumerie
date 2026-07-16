import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ShieldCheck, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (index: number, qty: number) => void;
  onRemoveItem: (index: number) => void;
  onBeginCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onBeginCheckout,
}: CartSidebarProps) {
  // Compute subtotal dynamically based on chosen size modifier
  const computeSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const unitPrice =
        item.selectedSize === 50 ? Math.round(item.product.price * 0.8) : item.product.price;
      return acc + unitPrice * item.quantity;
    }, 0);
  };

  const subtotal = computeSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mask */}
          <motion.div
            id="cart-mask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Cart sliding drawer */}
          <motion.div
            id="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-brand-black border-l border-[rgba(201,169,110,0.15)] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-brand-gold" />
                <h3 className="font-serif text-lg font-medium text-white tracking-wide uppercase">
                  Your Selection ({cartItems.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 border border-neutral-800 hover:border-brand-gold rounded-full text-neutral-400 hover:text-white transition-all focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart items list */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag className="h-10 w-10 text-neutral-600 stroke-[1.25]" />
                  <p className="font-sans text-xs text-neutral-500 tracking-wider">
                    Your collection is currently empty.
                  </p>
                  <button
                    onClick={onClose}
                    className="font-mono text-[9px] text-brand-gold hover:underline uppercase tracking-wider"
                  >
                    Explore Perfumes
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => {
                  const unitPrice =
                    item.selectedSize === 50
                      ? Math.round(item.product.price * 0.8)
                      : item.product.price;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${idx}`}
                      className="flex items-start gap-4 pb-6 border-b border-neutral-900"
                    >
                      {/* Product image wrapper */}
                      <div className="h-24 w-16 flex-shrink-0 overflow-hidden bg-brand-charcoal border border-neutral-800">
                        <img
                          src={item.product.hero_image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Content block */}
                      <div className="flex-grow min-w-0">
                        <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block">
                          {item.product.collection}
                        </span>
                        <h4 className="font-serif text-base font-normal text-white truncate tracking-wide mt-0.5">
                          {item.product.name}
                        </h4>
                        <span className="font-mono text-[9px] text-brand-gold uppercase block mt-1">
                          {item.product.concentration} · {item.selectedSize}ml
                        </span>

                        {/* Quantity adjusters */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex border border-neutral-800 bg-brand-charcoal/30">
                            <button
                              onClick={() => onUpdateQty(idx, item.quantity - 1)}
                              className="px-2 py-0.5 text-neutral-400 hover:text-white text-xs focus:outline-none"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 font-mono text-[11px] text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(idx, item.quantity + 1)}
                              className="px-2 py-0.5 text-neutral-400 hover:text-white text-xs focus:outline-none"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1 text-neutral-500 hover:text-red-400 transition-colors focus:outline-none"
                            title="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal display */}
                      <div className="text-right">
                        <span className="font-serif text-sm font-medium text-brand-gold">
                          ${itemTotal}
                        </span>
                        <span className="font-mono text-[9px] text-neutral-500 block mt-1">
                          ${unitPrice}/ea
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-brand-charcoal/30">
                <div className="space-y-4">
                  {/* Totals */}
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Subtotal
                    </span>
                    <span className="font-serif text-2xl font-bold text-brand-gold">
                      ${subtotal} USD
                    </span>
                  </div>

                  <p className="font-sans text-[11px] text-neutral-400 leading-normal font-light">
                    Complimentary courier shipping and bespoke gift packaging included with all orders.
                  </p>

                  <div className="flex items-center gap-2 text-neutral-400 font-mono text-[9px] uppercase tracking-wider py-1.5 border-t border-b border-neutral-900">
                    <ShieldCheck className="h-4 w-4 text-brand-gold" />
                    <span>Secure Checkout Secured by Maison Aura</span>
                  </div>

                  {/* checkout action */}
                  <button
                    onClick={onBeginCheckout}
                    className="w-full flex items-center justify-center gap-3 bg-brand-gold hover:bg-white text-brand-black py-4 px-8 font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 focus:outline-none"
                  >
                    <span>Proceed to Reserve</span>
                    <ArrowRight className="h-4 w-4 text-brand-black animate-pulse" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
