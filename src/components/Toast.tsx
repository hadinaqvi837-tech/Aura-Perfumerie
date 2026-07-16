import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "info";
  isOpen: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = "success", isOpen, onClose }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="aura-toast"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 border border-[rgba(201,169,110,0.3)] bg-brand-charcoal/95 px-6 py-4 text-white backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.7)]"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-brand-black">
            {type === "success" ? <Check className="h-3 w-3" strokeWidth={3} /> : <Info className="h-3 w-3" strokeWidth={3} />}
          </div>
          <p className="font-sans text-sm font-medium tracking-wide text-neutral-200">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
