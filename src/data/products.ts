import { Product } from "@/types/product";

export const CATEGORIES = ["All", "Clothing", "Accessories", "Footwear", "Lifestyle"];

export const products: Product[] = [
  {
    id: "1",
    name: "Respect Classic Hoodie",
    price: 899,
    category: "Clothing",
    description: "Premium cotton blend hoodie with embroidered Respect logo. Oversized fit for ultimate comfort and street style.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Respect Signature Tee",
    price: 349,
    category: "Clothing",
    description: "100% organic cotton tee with bold Respect branding. Classic fit with premium screen printing.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Respect Cap - Black",
    price: 299,
    category: "Accessories",
    description: "Premium adjustable snapback cap with 3D embroidered logo. Structured fit with breathable fabric.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Respect Track Pants",
    price: 749,
    category: "Clothing",
    description: "Tapered track pants with side stripe detail. Comfortable cotton-poly blend with elastic waistband.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Respect Crossbody Bag",
    price: 599,
    category: "Accessories",
    description: "Compact crossbody bag with multiple compartments. Durable nylon with adjustable strap.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Respect Sneakers - White",
    price: 1299,
    category: "Footwear",
    description: "Classic low-top sneakers with premium leather upper. Cushioned sole for all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "7",
    name: "Respect Beanie",
    price: 249,
    category: "Accessories",
    description: "Soft knit beanie with woven label. One size fits most. Perfect for cold weather.",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Respect Windbreaker",
    price: 1099,
    category: "Clothing",
    description: "Lightweight windbreaker jacket with packable hood. Water-resistant with mesh lining.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
    ],
    inStock: false,
  },
  {
    id: "9",
    name: "Respect Socks - 3 Pack",
    price: 199,
    category: "Accessories",
    description: "Premium cotton crew socks with subtle Respect branding. Comfortable cushioned sole.",
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "10",
    name: "Respect Slides",
    price: 499,
    category: "Footwear",
    description: "Comfortable slide sandals with molded footbed. Bold Respect branding on strap.",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "11",
    name: "Respect Gym Shorts",
    price: 449,
    category: "Clothing",
    description: "Athletic shorts with mesh lining and zip pockets. Lightweight and moisture-wicking.",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "12",
    name: "Respect Water Bottle",
    price: 299,
    category: "Lifestyle",
    description: "Stainless steel insulated water bottle. Keeps drinks cold for 24 hours. 750ml capacity.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
];
