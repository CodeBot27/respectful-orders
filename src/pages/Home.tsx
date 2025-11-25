import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Award, Truck, Shield, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white">
            RESPECT
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Premium streetwear for those who command respect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="accent" className="text-base">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/browse?category=Clothing">
              <Button size="lg" variant="outline" className="text-base bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-background/20">
                New Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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

      {/* Categories */}
      <section className="bg-muted/30 py-20 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find what you're looking for</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Clothing",
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop",
              },
              {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop",
              },
              {
                name: "Footwear",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
              },
            ].map((category, index) => (
              <Link
                key={category.name}
                to={`/browse?category=${category.name}`}
                className="group relative h-64 overflow-hidden rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6 transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-foreground transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose RESPECT</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering excellence in every aspect of your shopping experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: "Premium Quality",
              description: "Only the finest materials and craftsmanship in every piece",
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
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
