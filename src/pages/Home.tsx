import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Award, Truck, Shield, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const featuredProducts = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);

  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const autoplayTimer = useRef(null);
  const [paused, setPaused] = useState(false);

  // Fetch products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with categories and images
        const { data: productData, error: productError } = await supabase.from(
          "products"
        ).select(`
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
        product_images(path)
      `);

        if (productError) throw productError;

        const mappedProducts = productData.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.categories?.[0]?.name || "",
          categoryId: p.category_id,
          description: p.short_description || p.long_description || "",
          images: p.product_images?.map((img) => img.path) || [],
          inStock: p.in_stock,
          featured: p.featured,
          bestSeller: p.best_seller,
        }));
        setProducts(mappedProducts);

        // Fetch categories and build category images from products
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id, name");

        if (categoryError) throw categoryError;

        // Build category images by finding featured products for each category
        const categoriesWithImages = categoryData.map((category) => {
          // Find featured products in this category
          const categoryProducts = mappedProducts.filter(
            (p) => p.categoryId === category.id
          );
          const featuredProduct =
            categoryProducts.find((p) => p.featured) || categoryProducts[0];

          return {
            id: category.id,
            name: category.name,
            image:
              featuredProduct?.images?.[0] ||
              getFallbackCategoryImage(category.name),
          };
        });

        setCategories(categoriesWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Helper function for fallback images
    const getFallbackCategoryImage = (categoryName: string) => {
      const fallbackImages = {
        Clothing:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        Accessories:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&h=600&fit=crop",
        Footwear:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop",
        Lifestyle:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      };
      return fallbackImages[categoryName] || fallbackImages["Clothing"];
    };

    fetchData();
  }, []);

  // Carousel autoplay
  useEffect(() => {
    if (!embla) return;
    const play = () => embla.scrollNext();
    if (!paused) {
      autoplayTimer.current = setInterval(play, 2800);
    }
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [embla, paused]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://img.pikbest.com/wp/202347/online-shopping-cart-icon-3d-modern-on-a-blue-background-representation-of-or-buy-now_9746434.jpg!sw800')",
          }}
        >
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-white animate-slide-up leading-tight">
            Elevate Your
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Lifestyle
            </span>
          </h1>
          <p
            className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Discover premium clothing, accessories, and essentials curated for
            the modern South African lifestyle
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/browse">
              <Button
                size="lg"
                variant="accent"
                className="text-base px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {categories[0] && (
              <Link to={`/browse?category=${categories[0].name}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl transition-all duration-300 hover:scale-105"
                >
                  New Collection
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-20 py-20">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">
            Featured Products
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto">
            Discover our most popular pieces, handpicked for the season
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/browse">
            <Button variant="accent" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="w-full py-20 overflow-hidden">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">
            Best Sellers
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto">
            Our top-selling items loved by customers across South Africa
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...bestSellers, ...bestSellers].map((product, index) => (
              <div
                key={index}
                className="w-[180px] sm:w-[200px] md:w-[220px] mx-4 flex-none"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 dark:bg-muted/50 py-20 transition-colors duration-300">
        <div className="container mx-auto px-20">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">
              Shop by Category
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground/80">
              Find what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/browse?category=${category.name}`}
                className="group relative h-64 overflow-hidden rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 dark:from-background/90 to-transparent flex items-end p-6 transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-foreground dark:text-white transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-20 py-20">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">
            Why Choose MCorp
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto">
            We're committed to delivering excellence in every aspect of your
            shopping experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: "Premium Quality",
              description:
                "Only the finest materials and craftsmanship in every piece",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              description: "Quick and reliable shipping across South Africa",
            },
            {
              icon: Shield,
              title: "Secure Shopping",
              description: "Your privacy and security are our top priority",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              description: "We're always here to help via email or WhatsApp",
            },
          ].map((feature, index) => (
            <Card
              key={feature.title}
              className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-accent transition-transform duration-300" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials (still static) */}
      <section className="bg-muted/30 dark:bg-muted/50 py-20 transition-colors duration-300">
        <div className="container mx-auto px-20">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 dark:text-white">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground/80 max-w-2xl mx-auto">
              Join thousands of happy customers across South Africa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Uzair Davids",
                role: "Cape Town",
                avatar:
                  "https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg",
                rating: 5,
                text: "Amazing quality and fast delivery! The clothing fits perfectly and the material is top-notch. MCorp is now my go-to for all my fashion needs.",
              },
              {
                name: "Dylan Ronaldo",
                role: "Cape Town",
                avatar:
                  "https://images.stockcake.com/public/d/6/9/d69d248b-b9e6-4288-871d-e6d8e5ecf052_large/stylish-male-profile-stockcake.jpg",
                rating: 5,
                text: "I'm impressed with the attention to detail and customer service. Every purchase has exceeded my expectations. Highly recommend MCorp!",
              },
              {
                name: "Diego Forlan",
                role: "Cape Town",
                avatar:
                  "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                rating: 5,
                text: "Best online shopping experience in Cape Town! The variety is incredible and the prices are fair. Love supporting a brand that understands our style.",
              },
            ].map((t, i) => (
              <Card
                key={t.name}
                className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent/20"
                    />
                    <div>
                      <h4 className="font-heading font-semibold text-lg dark:text-white">
                        {t.name}
                      </h4>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground dark:text-muted-foreground/80 leading-relaxed">
                    "{t.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
