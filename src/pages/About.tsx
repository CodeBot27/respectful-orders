import { Card } from "@/components/ui/card";
import { Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To create premium streetwear that empowers individuals to express themselves with confidence and authenticity.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Built by the streets, for the streets. We listen to our community and create pieces that resonate with their lifestyle.",
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "Every piece is crafted with meticulous attention to detail using premium materials that stand the test of time.",
    },
    {
      icon: Heart,
      title: "South African Roots",
      description: "Proudly designed and inspired by South African culture, bringing local flavor to the global streetwear scene.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            About Respect
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in">
            Born in the heart of Johannesburg, Respect is more than just a clothing brand—it's a movement. 
            We're redefining South African streetwear by blending bold designs with premium quality, 
            creating pieces that command respect wherever you go.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2020, Respect emerged from the vibrant streets of Johannesburg with a simple vision: 
                to create streetwear that speaks to the soul of South African youth culture.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started as a passion project in a small studio has grown into a movement that celebrates 
                authenticity, creativity, and the relentless pursuit of excellence. Every piece we create tells 
                a story—your story.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Respect stands as a symbol of quality and style, worn by those who aren't afraid to 
                stand out and demand the respect they deserve.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden animate-scale-in">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop"
                alt="Respect Brand"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do, from design to delivery
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-scale-in">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
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
          <h2 className="text-3xl font-heading font-bold mb-4">Join the Movement</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            When you wear Respect, you're not just wearing clothes—you're part of a community that 
            values authenticity, creativity, and self-expression. Join thousands of individuals who 
            have made Respect their go-to brand for premium streetwear.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
