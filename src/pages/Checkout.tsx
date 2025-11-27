import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const FORM_ENDPOINT = "https://formspree.io/f/mwpdbwye";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.address.trim()
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleEmailOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const subtotal = getCartTotal();
      const shipping = subtotal > 500 ? 0 : 50;
      const total = subtotal + shipping;

      const orderText =
        `New Order from Miller's Corp\n\n` +
        `Customer Details:\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Address: ${formData.address}\n` +
        `${formData.notes ? `Notes: ${formData.notes}\n` : ""}\n\n` +
        `Order Items:\n` +
        cart
          .map(
            (item) =>
              `${item.quantity}x ${item.name} - R${(
                item.price * item.quantity
              ).toFixed(2)}`
          )
          .join("\n") +
        `\n\nTotal: R${total.toFixed(2)}\nShipping: ${
          shipping === 0 ? "FREE" : `R${shipping}`
        }`;

      // Send email through Formspree
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New Order from Miller's Corp",
          message: orderText,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Email order failed");
      }

      clearCart();
      navigate("/order-success?method=email");
    } catch (error) {
      toast.error("Failed to send order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    const message = encodeURIComponent(
      `*New Order from Miller's Corp*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Address: ${formData.address}\n` +
        `${formData.notes ? `Notes: ${formData.notes}\n` : ""}\n\n` +
        `*Order Items:*\n` +
        cart
          .map(
            (item) =>
              `${item.quantity}x ${item.name} - R${(
                item.price * item.quantity
              ).toFixed(2)}`
          )
          .join("\n") +
        `\n\n*Total: R${total.toFixed(2)}*`
    );

    const whatsappNumber = "0747862736"; // your business number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    clearCart();
    navigate("/order-success?method=whatsapp");
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Customer Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+27 11 123 4567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St, Johannesburg, 2000"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions..."
                    rows={2}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      R {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "FREE" : `R ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-accent">
                      R {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Complete Your Order</h3>

              <div className="space-y-3">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={handleEmailOrder}
                  disabled={isSubmitting}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Processing..." : "Place Order via Email"}
                </Button>

                <Button
                  variant="highlight"
                  size="lg"
                  className="w-full"
                  onClick={handleWhatsAppOrder}
                  disabled={isSubmitting}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing an order, you agree to our terms and conditions
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
