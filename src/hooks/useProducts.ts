// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          short_description,
          long_description,
          in_stock,
          featured,
          best_seller,
          category:categories(name),
          product_images(path)
        `);

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        const mappedProducts: Product[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category?.name || "",
          description: p.short_description || p.long_description || "",
          images: p.product_images?.map((img: any) => img.path) || [],
          inStock: p.in_stock,
          featured: p.featured,
          bestSeller: p.best_seller,
        }));

        setProducts(mappedProducts);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
