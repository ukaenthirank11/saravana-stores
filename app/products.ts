export type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;
  category: "Divine Home" | "Accessories" | "Lighting" | "Temples";
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  sku: string;
  crop: { x: number; y: number; w: number; h: number };
};

export const products: Product[] = [
  {
    id: "3-fit-lion-divine",
    name: "3 FIT LION DIVINE",
    stock: 100,
    price: 1850,
    category: "Divine Home",
    description:
      "Premium 3 Fit Lion Divine temple décor designed for home, office, and pooja spaces. Elegant craftsmanship with a traditional spiritual appearance.",
    features: [
      "Premium quality materials",
      "Elegant traditional design",
      "Suitable for home and office",
      "Ideal for pooja rooms",
      "Premium decorative finish",
      "Suitable for gifting",
    ],
    rating: 4.8,
    reviews: 32,
    sku: "DC-LD-3001",
    crop: { x: 601, y: 66, w: 180, h: 191 },
  },
  {
    id: "golden-black-3-fit-divine",
    name: "GOLDEN BLACK 3 FIT DIVINE",
    stock: 100,
    price: 2200,
    category: "Divine Home",
    description:
      "A premium golden-black 3 Fit Divine temple decoration designed to add an elegant spiritual atmosphere to homes, offices, and pooja rooms.",
    features: [
      "Durable construction",
      "Antique golden finish",
      "Traditional spiritual design",
      "Premium appearance",
      "Easy to maintain",
      "Suitable for home temples",
    ],
    rating: 4.9,
    reviews: 27,
    sku: "DC-GB-3002",
    crop: { x: 816, y: 66, w: 179, h: 191 },
  },
  {
    id: "lion-divine-home",
    name: "LION DIVINE HOME",
    stock: 200,
    price: 3000,
    category: "Divine Home",
    description:
      "A large premium Lion Divine Home temple designed as an elegant centerpiece for spiritual spaces.",
    features: [
      "Spacious design",
      "High-quality construction",
      "Traditional craftsmanship",
      "Premium decorative finish",
      "Suitable for home temples",
      "Elegant spiritual appearance",
    ],
    rating: 4.9,
    reviews: 45,
    sku: "DC-LH-3003",
    crop: { x: 383, y: 637, w: 183, h: 150 },
  },
  {
    id: "standed-steel-accessories",
    name: "STANDED STEEL ACCESSORIES",
    stock: 30,
    price: 190,
    category: "Accessories",
    description:
      "Premium standing steel spiritual accessories designed for temple and devotional spaces.",
    features: [
      "High-grade steel",
      "Rust-resistant",
      "Premium finish",
      "Durable construction",
      "Strong and stable",
      "Decorative appearance",
    ],
    rating: 4.7,
    reviews: 18,
    sku: "DC-SA-0019",
    crop: { x: 601, y: 637, w: 181, h: 149 },
  },
  {
    id: "usb-stone-lighting",
    name: "USB STONE LIGHTING",
    stock: 100,
    price: 1500,
    category: "Lighting",
    description:
      "USB-powered stone lighting with a divine decorative design that creates a peaceful and attractive atmosphere.",
    features: [
      "USB powered",
      "Energy efficient",
      "Beautiful illumination",
      "Premium decorative design",
      "Easy to use",
      "Suitable for gifting",
    ],
    rating: 4.8,
    reviews: 23,
    sku: "DC-UL-1500",
    crop: { x: 816, y: 637, w: 178, h: 149 },
  },
  {
    id: "lion-golden-temple",
    name: "LION GOLDEN TEMPLE",
    stock: 100,
    price: 1500,
    category: "Temples",
    description:
      "Premium Lion Golden Temple suitable for indoor and outdoor spiritual spaces with an elegant golden finish.",
    features: [
      "Weather resistant",
      "Premium golden finish",
      "Strong and durable",
      "Traditional design",
      "Suitable for indoor and outdoor use",
      "Easy to maintain",
    ],
    rating: 4.8,
    reviews: 31,
    sku: "DC-LT-1500",
    crop: { x: 383, y: 1083, w: 183, h: 113 },
  },
];

export const categories = [
  { name: "Divine Home", count: 3, productId: "lion-divine-home" },
  { name: "Temples", count: 1, productId: "lion-golden-temple" },
  { name: "Accessories", count: 1, productId: "standed-steel-accessories" },
  { name: "Lighting", count: 1, productId: "usb-stone-lighting" },
  { name: "Home Décor", count: 4, productId: "3-fit-lion-divine" },
];

export const formatMYR = (price: number) =>
  new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
  }).format(price);
