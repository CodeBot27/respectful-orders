import { Card } from "@/components/ui/card";
import { Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide a wide range of reliable, affordable, and high-quality products that make everyday life easier for families and communities.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "MCorp started by serving local families, and we continue to grow with the goal of uplifting and supporting the communities around us.",
    },
    {
      icon: Award,
      title: "Quality Standards",
      description:
        "We source and offer products with care, ensuring durability, value, and consistency across every category we sell.",
    },
    {
      icon: Heart,
      title: "South African Roots",
      description:
        "Proudly born in South Africa, inspired by the diversity, warmth, and spirit of the people we serve.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            About MCorp
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in">
            Born in Cape Town, MCorp is a versatile retail brand focused on
            bringing quality, variety, and value to every customer. From stylish
            accessories and clothing to toys, home essentials, food items, and
            everyday goods, we aim to make shopping simple and enjoyable for the
            whole family.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2020, MCorp began as a small community-driven
                business with one goal in mind: to offer a wide range of quality
                products at prices everyone can appreciate.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started as a small passion for providing family, friends,
                and locals with everyday essentials has grown into a trusted
                brand known for its variety and convenience. From clothing and
                accessories to toys, home goods, and food items, every product
                reflects our mission to bring value and reliability to every
                home.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, MCorp continues to grow, serving communities with a
                diverse selection of goods while staying true to its roots,
                putting customers first and making quality accessible to all.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden animate-scale-in">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop"
                alt="MCorp"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do, from sourcing to service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow animate-scale-in"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Team/Culture Section */}
        <div className="max-w-4xl mx-auto text-center bg-muted/30 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Join the Community
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            When you choose MCorp, you're supporting a growing community-driven
            brand built on trust, quality, and accessibility. Join thousands of
            customers who rely on MCorp for value, convenience, and products
            that make everyday life easier.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
