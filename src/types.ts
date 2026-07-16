export interface PerfumeProduct {
  id: string;
  name: string;
  brand: string;
  collection: string;
  concentration: "Eau de Toilette" | "Eau de Parfum" | "Extrait";
  size: number; // ml
  price: number; // USD
  olfactive_family: string[];
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  description: string;
  hero_image: string; // primary
  hover_image: string; // alternative lifestyle or close-up
  badge: "Bestseller" | "New" | "Limited Edition" | "Icon" | null;
  launch_date: string;
  in_stock: boolean;
}

export interface CartItem {
  product: PerfumeProduct;
  selectedSize: number; // ml
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    value: string;
    description: string;
  }[];
}

export interface OlfactiveNote {
  name: string;
  category: "Top" | "Heart" | "Base";
  description: string;
  origin: string;
  sensation: string;
}
