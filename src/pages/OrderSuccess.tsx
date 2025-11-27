import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, MessageCircle, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isEmail = method === "email";

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 md:p-12 text-center animate-scale-in">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Order Received!</h1>
            <p className="text-muted-foreground">Thank you for choosing MCorp</p>
          </div>

          <Card className="p-6 bg-muted/30 mb-8">
            {isEmail ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-accent">
                  <Mail className="h-6 w-6" />
                  <span className="font-semibold text-lg">Order Sent via Email</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We've received your order and sent you a confirmation email. Our team will contact you shortly to confirm payment and delivery/pickup details.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-highlight">
                  <MessageCircle className="h-6 w-6" />
                  <span className="font-semibold text-lg">Order Sent via WhatsApp</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your order has been sent to our WhatsApp Business. We'll respond shortly with payment instructions and delivery/pickup timeline.
                </p>
              </div>
            )}
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <div className="text-left space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent">1</span>
                </div>
                <p>We'll review your order and confirm availability within 24 hours</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent">2</span>
                </div>
                <p>You'll receive payment instructions and total amount</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent">3</span>
                </div>
                <p>Once payment is confirmed, we'll process and ship your order or schedule a pickup</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-accent">4</span>
                </div>
                <p>You'll receive tracking information for your delivery</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-border">
            <Link to="/browse" className="flex-1">
              <Button variant="accent" size="lg" className="w-full">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
