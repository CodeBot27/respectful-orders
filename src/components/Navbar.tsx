import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useThemeTransition } from "@/hooks/useThemeTransition";
import { NavLink } from "./NavLink";

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { theme, toggleTheme } = useThemeTransition();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Shop" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold tracking-tight">M<span className="text-accent">Corp</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-accent"
                activeClassName="text-accent"
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/about" className="text-sm font-medium transition-colors hover:text-accent" activeClassName="text-accent">
              About
            </NavLink>
            <NavLink to="/contact" className="text-sm font-medium transition-colors hover:text-accent" activeClassName="text-accent">
              Contact
            </NavLink>
          </div>

          {/* Cart, Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-transform hover:scale-110 duration-300"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="text-lg font-medium transition-colors hover:text-accent"
                      activeClassName="text-accent"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <NavLink to="/about" className="text-lg font-medium transition-colors hover:text-accent" activeClassName="text-accent">
                    About
                  </NavLink>
                  <NavLink to="/contact" className="text-lg font-medium transition-colors hover:text-accent" activeClassName="text-accent">
                    Contact
                  </NavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
