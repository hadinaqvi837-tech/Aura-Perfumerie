import { motion } from "motion/react";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <div id="category-navigation" className="w-full flex items-center justify-center border-b border-[rgba(201,169,110,0.12)] pb-4 overflow-x-auto scrollbar-none">
      <div className="flex gap-8 px-4">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`relative py-3 px-2 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none ${
                isActive ? "text-brand-gold" : "text-neutral-500 hover:text-white"
              }`}
            >
              <span>{category}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategoryUnderline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-brand-gold"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
