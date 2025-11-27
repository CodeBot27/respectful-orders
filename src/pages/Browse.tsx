import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Active category from URL
  const categoryParam = searchParams.get("category") || "All";

  // ---------------------------
  // FETCH CATEGORIES (once)
  // ---------------------------
  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (!error) setCategories(data);
    };

    loadCategories();
  }, []);

  // -----------------------------------------
  // FETCH PRODUCTS with Supabase-side filters
  // -----------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = supabase.from("products").select(
        `
        id,
        name,
        price,
        short_description,
        long_description,
        in_stock,
        featured,
        best_seller,
        category_id,
        categories(name),
        product_images(path, position)
      `
      );

      // Filter: CATEGORY
      if (categoryParam !== "All") {
        const selected = categories.find(
          (c) => c.name.toLowerCase() === categoryParam.toLowerCase()
        );
        if (selected) {
          query = query.eq("category_id", selected.id);
        }
      }

      // Filter: SEARCH
      if (searchQuery.trim() !== "") {
        query = query.ilike("name", `%${searchQuery.trim()}%`);
      }

      // Execute
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.log("Error loading products:", error);
        setLoading(false);
        return;
      }

      // Map data
      const mapped = data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.categories?.[0]?.name || "",
        categoryId: p.category_id,
        description: p.short_description || p.long_description || "",
        images: p.product_images
          ?.sort((a, b) => a.position - b.position)
          .map((img) => img.path),
        inStock: p.in_stock,
        featured: p.featured,
        bestSeller: p.best_seller,
      }));

      setProducts(mapped);
      setLoading(false);
    };

    fetchProducts();
  }, [categoryParam, searchQuery, categories]);

  // -----------------------------------------
  // CATEGORY BUTTONS (UI)
  // -----------------------------------------
  const CATEGORIES = useMemo(() => {
    return ["All", ...categories.map((c) => c.name)];
  }, [categories]);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2">Shop All</h1>
          <p className="text-muted-foreground">Discover our full collection</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={categoryParam === category ? "accent" : "outline"}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Active Filters */}
          {(categoryParam !== "All" || searchQuery) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>

              {categoryParam !== "All" && (
                <span className="px-2 py-1 bg-accent/20 rounded text-sm">
                  Category: {categoryParam}
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className="ml-1"
                  >
                    ×
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="px-2 py-1 bg-accent/20 rounded text-sm">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1">
                    ×
                  </button>
                </span>
              )}

              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Product Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {products.length} products
        </p>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-2">
              No products found
            </p>
            <Button variant="accent" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
