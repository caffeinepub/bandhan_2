import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Crown, Lock, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "bandhan_membership";

type Tier = "free" | "premium" | "elite";

const plans = [
  {
    id: "free" as Tier,
    name: "Free",
    price: 0,
    icon: Star,
    color: "text-muted-foreground",
    bgColor: "bg-secondary",
    borderColor: "border-border",
    features: [
      "Browse profiles",
      "View basic info",
      "5 contact requests/month",
      "Basic match suggestions",
    ],
    cta: "Current Plan",
  },
  {
    id: "premium" as Tier,
    name: "Premium",
    price: 999,
    icon: Crown,
    color: "text-maroon",
    bgColor: "bg-white",
    borderColor: "border-maroon",
    popular: true,
    features: [
      "Unlimited profile browsing",
      "Unlimited messaging",
      "See contact details",
      "Priority listing in search",
      "Advanced filters",
      "Read receipts",
    ],
    cta: "Upgrade to Premium",
  },
  {
    id: "elite" as Tier,
    name: "Elite",
    price: 1999,
    icon: Sparkles,
    color: "text-gold",
    bgColor: "bg-maroon",
    borderColor: "border-gold",
    features: [
      "Everything in Premium",
      "Profile highlighted in results",
      "Dedicated personal matchmaker",
      "WhatsApp support",
      "Profile verification badge",
      "AI compatibility analysis",
      "Priority customer support",
    ],
    cta: "Upgrade to Elite",
  },
];

export default function MembershipPage() {
  const [currentPlan, setCurrentPlan] = useState<Tier>(
    () => (localStorage.getItem(STORAGE_KEY) as Tier) || "free",
  );
  const [upgrading, setUpgrading] = useState<Tier | null>(null);
  const [paying, setPaying] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handlePayNow = () => {
    if (!upgrading) return;
    setPaying(true);
    setTimeout(() => {
      setCurrentPlan(upgrading);
      localStorage.setItem(STORAGE_KEY, upgrading);
      setPaying(false);
      setUpgrading(null);
      setCardData({ number: "", name: "", expiry: "", cvv: "" });
      toast.success(
        `🎉 Welcome to ${upgrading.charAt(0).toUpperCase() + upgrading.slice(1)}! Your plan has been activated.`,
      );
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-background" data-ocid="membership.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Crown className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Membership Plans
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Find your perfect life partner faster with our premium features
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isCurrent = currentPlan === plan.id;
            const isElite = plan.id === "elite";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gold text-foreground font-semibold px-4 py-1 shadow-gold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full border-2 ${plan.borderColor} ${
                    isElite ? "bg-maroon text-white" : plan.bgColor
                  } ${plan.popular ? "shadow-card-hover scale-[1.02]" : "shadow-card"} transition-all`}
                  data-ocid={`membership.item.${i + 1}`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        isElite ? "bg-gold/20" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${isElite ? "text-gold" : plan.color}`}
                      />
                    </div>
                    <CardTitle
                      className={`font-display text-2xl ${
                        isElite ? "text-white" : "text-maroon"
                      }`}
                    >
                      {plan.name}
                    </CardTitle>
                    <div className="mt-2">
                      <span
                        className={`font-display text-4xl font-bold ${
                          isElite ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {plan.price === 0
                          ? "Free"
                          : `₹${plan.price.toLocaleString("en-IN")}`}
                      </span>
                      {plan.price > 0 && (
                        <span
                          className={`text-sm ml-1 ${
                            isElite ? "text-white/60" : "text-muted-foreground"
                          }`}
                        >
                          /month
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isElite ? "text-gold" : "text-maroon"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              isElite ? "text-white/90" : "text-foreground"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4">
                      {isCurrent ? (
                        <div
                          className="w-full text-center py-2.5 rounded-full text-sm font-semibold border-2 border-green-500 text-green-600 bg-green-50"
                          data-ocid={`membership.item.${i + 1}`}
                        >
                          ✓ Current Plan
                        </div>
                      ) : plan.id === "free" ? (
                        <Button
                          variant="outline"
                          className="w-full rounded-full"
                          disabled
                        >
                          Free Forever
                        </Button>
                      ) : (
                        <Button
                          className={`w-full rounded-full font-semibold ${
                            isElite
                              ? "bg-gold text-foreground hover:bg-gold/90"
                              : "bg-maroon text-white hover:bg-maroon-deep"
                          }`}
                          onClick={() => setUpgrading(plan.id)}
                          data-ocid="membership.primary_button"
                        >
                          {plan.cta}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-14 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4" /> Secure 256-bit SSL encryption
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> All major cards accepted
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" /> Cancel anytime
          </span>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog
        open={!!upgrading}
        onOpenChange={(open) => !open && setUpgrading(null)}
      >
        <DialogContent className="sm:max-w-md" data-ocid="membership.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-maroon text-xl">
              Complete Your Upgrade
            </DialogTitle>
          </DialogHeader>

          {upgrading && (
            <div className="space-y-5">
              {/* Order summary */}
              <div className="bg-secondary rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {upgrading.charAt(0).toUpperCase() + upgrading.slice(1)}{" "}
                    Plan
                  </span>
                  <span className="font-display text-xl text-maroon font-bold">
                    ₹
                    {(upgrading === "premium" ? 999 : 1999).toLocaleString(
                      "en-IN",
                    )}
                    /mo
                  </span>
                </div>
              </div>

              <Separator />

              {/* Card form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card-number" className="text-sm font-medium">
                    Card Number
                  </Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) =>
                      setCardData((prev) => ({
                        ...prev,
                        number: e.target.value,
                      }))
                    }
                    className="mt-1.5"
                    data-ocid="membership.input"
                  />
                </div>
                <div>
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    placeholder="Name as on card"
                    value={cardData.name}
                    onChange={(e) =>
                      setCardData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1.5"
                    data-ocid="membership.input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData((prev) => ({
                          ...prev,
                          expiry: e.target.value,
                        }))
                      }
                      className="mt-1.5"
                      data-ocid="membership.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData((prev) => ({
                          ...prev,
                          cvv: e.target.value,
                        }))
                      }
                      className="mt-1.5"
                      data-ocid="membership.input"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => setUpgrading(null)}
                  data-ocid="membership.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-maroon text-white hover:bg-maroon-deep rounded-full font-semibold"
                  onClick={handlePayNow}
                  disabled={paying}
                  data-ocid="membership.confirm_button"
                >
                  {paying ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      Pay Now <Lock className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secured by SSL. This is a demo — no
                real charge.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
