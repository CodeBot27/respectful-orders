import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold">MCorp</h3>
            <p className="text-sm text-muted-foreground">
              Elevate your style with MCorp - where every piece meets passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/browse?category=Clothing" className="hover:text-accent transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/browse?category=Accessories" className="hover:text-accent transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/browse?category=Footwear" className="hover:text-accent transition-colors">
                  Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-semibold">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Cape Town, South Africa</li>
              <li>
                <a href="mailto:milleraqeel97@gmail.com" className="hover:text-accent transition-colors">
                  milleraqeel97@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+27847403723" className="hover:text-accent transition-colors">
                 +27 84 740 3723
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MCorp. All rights reserved. Created by <a href="https://github.com/kxngzero329" className="hover:text-accent transition-colors">Mogamat Smith</a>.</p>
        </div>        
      </div>
    </footer>
  );
};

export default Footer;
