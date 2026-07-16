import { PerfumeProduct, QuizQuestion, OlfactiveNote } from "./types";

export const PRODUCTS: PerfumeProduct[] = [
  {
    id: "aurum",
    name: "AURUM",
    brand: "AURA Paris",
    collection: "L'Élixir Rare",
    concentration: "Extrait",
    size: 100,
    price: 340,
    olfactive_family: ["Oriental", "Woody", "Spicy"],
    top_notes: ["Saffron", "Coriander", "Cinnamon"],
    heart_notes: ["Damask Rose", "Jasmine Sambac", "Clove"],
    base_notes: ["Oud", "Ambergris", "Vanilla", "Sandalwood"],
    description: "An opulent fragrance that traces the golden ratio of luxury. AURUM opens with high-intensity saffron and cinnamon, maturing into a majestic heart of Damask rose. The grand finale is an everlasting depth of rare Cambodi oud, resinous amber, and dark, velvety Madagascar vanilla. It is a fragrance designed for the bold, leaving an unmistakable trail of majesty.",
    hero_image: "/assets/images/perfume_aurum_1784119824552.jpg",
    hover_image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    badge: "Icon",
    launch_date: "2026-03-12",
    in_stock: true
  },
  {
    id: "neroli-de-minuit",
    name: "NÉROLI DE MINUIT",
    brand: "AURA Paris",
    collection: "Ombre et Lumière",
    concentration: "Eau de Parfum",
    size: 100,
    price: 260,
    olfactive_family: ["Fresh", "Floral", "Citrus"],
    top_notes: ["Bergamot", "Petitgrain", "Bitter Orange"],
    heart_notes: ["Neroli", "Jasmine Sambac", "Orange Blossom"],
    base_notes: ["White Musk", "Cedarwood", "Ambergris"],
    description: "A tribute to midnight blossoms. NÉROLI DE MINUIT captures the crisp, ethereal breeze of a seaside orange grove at midnight. Crisp bergamot and bitter orange melt into a radiant, nocturnal core of pure hand-picked neroli and white jasmine. As the night deepens, it anchors onto a clean bed of precious white musk and Atlas cedarwood.",
    hero_image: "/assets/images/perfume_neroli_1784119842002.jpg",
    hover_image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    badge: "Bestseller",
    launch_date: "2025-09-01",
    in_stock: true
  },
  {
    id: "vetiver-sacre",
    name: "VETIVER SACRÉ",
    brand: "AURA Paris",
    collection: "L'Élixir Rare",
    concentration: "Eau de Parfum",
    size: 100,
    price: 285,
    olfactive_family: ["Woody", "Earthy", "Smoky"],
    top_notes: ["Grapefruit", "Pink Pepper", "Cardamom"],
    heart_notes: ["Vetiver", "Incense", "Patchouli"],
    base_notes: ["Sandalwood", "Oakmoss", "Leather"],
    description: "Deeply grounded in sacred soil. VETIVER SACRÉ represents the mystical intersection of smoke and stone. It begins with the bright, sharp contrast of grapefruit and pink pepper before descending into a mesmerizing heart of heavy smoky incense and high-altitude vetiver. The base leaves a rich, tactile signature of dark leather and warm sandalwood.",
    hero_image: "/assets/images/perfume_vetiver_1784119860922.jpg",
    hover_image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600",
    badge: "New",
    launch_date: "2026-05-18",
    in_stock: true
  },
  {
    id: "reve-rouge",
    name: "RÊVE ROUGE",
    brand: "AURA Paris",
    collection: "Visions d'Artiste",
    concentration: "Extrait",
    size: 50,
    price: 310,
    olfactive_family: ["Floral", "Amber", "Sweet"],
    top_notes: ["Black Cherry", "Saffron", "Bitter Almond"],
    heart_notes: ["Turkish Rose", "Jasmine Sambac", "Plum"],
    base_notes: ["Tonka Bean", "Sandalwood", "Cedarwood", "Vanilla"],
    description: "A velvet dream in deep crimson. RÊVE ROUGE is a seductive masterpiece of dark black cherry and premium saffron, wrapped in bitter almond. The heart blooms into a voluptuous Turkish rose and rich plum, drying down to a sumptuous, addictive trail of toasted tonka bean, heavy sandalwood, and amber-soaked vanilla pods.",
    hero_image: "/assets/images/perfume_reve_rouge_1784119881902.jpg",
    hover_image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    badge: "Limited Edition",
    launch_date: "2026-02-14",
    in_stock: true
  },
  {
    id: "santal-imperial",
    name: "SANTAL IMPÉRIAL",
    brand: "AURA Paris",
    collection: "Ombre et Lumière",
    concentration: "Eau de Parfum",
    size: 100,
    price: 275,
    olfactive_family: ["Woody", "Musk"],
    top_notes: ["Cardamom", "Violet Leaf", "Cumin"],
    heart_notes: ["Sandalwood", "Papyrus", "Cedarwood"],
    base_notes: ["Leather", "Amber", "Musk", "Vanilla"],
    description: "An aristocratic woody scent. SANTAL IMPÉRIAL is a modern classic featuring a massive concentration of high-quality Australian sandalwood. Cardamom and violet leaves provide an inviting, spicy-powdery opening, which melts seamlessly into a rich heart of papyrus. The dry-down is exceptionally smooth, warm, and sophisticated.",
    hero_image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    hover_image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    badge: null,
    launch_date: "2024-11-10",
    in_stock: true
  },
  {
    id: "jasmine-de-chine",
    name: "JASMINE DE CHINE",
    brand: "AURA Paris",
    collection: "Visions d'Artiste",
    concentration: "Eau de Toilette",
    size: 100,
    price: 220,
    olfactive_family: ["Fresh", "Floral"],
    top_notes: ["Green Tea", "Mandarin Orange", "Pear"],
    heart_notes: ["Jasmine Sambac", "Osmanthus", "Freesia"],
    base_notes: ["White Amber", "Mate", "Cashmere Wood"],
    description: "An ethereal walk through high-mountain tea terraces. JASMINE DE CHINE blends Chinese green tea leaves with precious Jasmine Sambac. It is crisp, botanical, and profoundly calming. Enhanced by fruity osmanthus and warm white amber, it lingers delicately on the skin like a warm, misty morning.",
    hero_image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600",
    hover_image: "https://images.unsplash.com/photo-1512207736890-6ffed8aee468?auto=format&fit=crop&q=80&w=600",
    badge: null,
    launch_date: "2025-04-22",
    in_stock: false
  }
];

export const OLF_NOTES: OlfactiveNote[] = [
  {
    name: "Oud",
    category: "Base",
    description: "One of the most expensive natural raw materials in perfumery, extracted from agarwood trees infected by a specific mold.",
    origin: "Southeast Asia (Assam, Cambodia)",
    sensation: "Deep, rich, woody, musty, with high longevity and warm complexity."
  },
  {
    name: "Saffron",
    category: "Top",
    description: "Known as 'red gold', harvested meticulously by hand from crocus flowers.",
    origin: "Persia / Iran",
    sensation: "Intense, leather-like, sweet, spicy, with an incredibly metallic-luxurious facet."
  },
  {
    name: "Damask Rose",
    category: "Heart",
    description: "The absolute standard of premium floral oil, distilled under strict sunrise conditions.",
    origin: "Isparta, Turkey / Bulgaria",
    sensation: "Deeply floral, honeyed, rich, velvety, and complex."
  },
  {
    name: "Bergamot",
    category: "Top",
    description: "A hybrid citrus fruit, combining cold-pressed elegance and rich herbal qualities.",
    origin: "Calabria, Italy",
    sensation: "Vibrant, sparkling, slightly peppery, and highly uplifting."
  },
  {
    name: "Neroli",
    category: "Heart",
    description: "Steam-distilled oil of the white bitter orange blossom, highly crisp and ethereal.",
    origin: "Tunisia / Morocco",
    sensation: "Fresh, honeyed-sweet, green, citrus-floral, and crystalline."
  },
  {
    name: "Vetiver",
    category: "Heart",
    description: "A fragrant grass whose long, golden roots hold rich, heavy molecules of earth.",
    origin: "Haiti / Java, Indonesia",
    sensation: "Smoky, dry, root-like, earthy, dark green, and deeply grounding."
  },
  {
    name: "Black Cherry",
    category: "Top",
    description: "A sweet yet dark stone-fruit note capturing the luscious, heavy nectar of ripe cherries.",
    origin: "Mediterranean Orchards",
    sensation: "Syrupy, tart, liquor-like, almondy, and intensely seductive."
  },
  {
    name: "Sandalwood",
    category: "Base",
    description: "Precious heartwood of the Santalum tree, revered for millennia for its calming aroma.",
    origin: "Mysore, India / Australia",
    sensation: "Creamy, milky, warm, woody, and extraordinarily smooth."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Select your desired sanctuary atmosphere:",
    options: [
      { text: "Midnight Seaside", value: "Fresh", description: "Cool ocean breezes, salt mist, and crisp nocturnal citrus." },
      { text: "Resinous Temple", value: "Woody", description: "Smoky cedarwood incense, wet stone, and raw grounding soil." },
      { text: "Opulent Banquet", value: "Oriental", description: "Flickering gold candles, warm amber, heavy spices, and velvet." },
      { text: "Secret Rose Garden", value: "Floral", description: "Sunrise dew, crushed flower petals, and warm honeyed air." }
    ]
  },
  {
    id: 2,
    text: "How do you wish your presence to be felt?",
    options: [
      { text: "Subtle & Mysterious", value: "subtle", description: "Only discovered upon close embrace. Ethereal and clean." },
      { text: "Magnetic & Bold", value: "bold", description: "An unmistakable statement that commandingly captures the room." },
      { text: "Elegant & Intellectual", value: "intellectual", description: "Complex, literary, clean yet deeply thoughtful." },
      { text: "Sensual & Warm", value: "sensual", description: "Indulgent, sweet, velvet-like, and highly addictive." }
    ]
  },
  {
    id: 3,
    text: "Which sensory element triggers your deepest memory?",
    options: [
      { text: "Ancient Leather & Wood", value: "earth", description: "Sandalwood, old books, incense, and textured stone." },
      { text: "Zesty Citrus & Wet Grass", value: "citrus", description: "Bitter orange, morning tea, sea salt, and clear rain." },
      { text: "Spiced Honey & Rose petals", value: "spice", description: "Saffron, dark cherry, tonka bean, and warm Turkish rose." },
      { text: "Fresh Clean Linens", value: "clean", description: "White musk, lavender, cashmere woods, and sunlight." }
    ]
  }
];