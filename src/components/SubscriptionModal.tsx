import React, { useState } from "react";
import { Crown, Check, Star, Shield, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./UI/dialog";
import { Button } from "./UI/button";

// Add bounce animation styles
const bounceStyles = `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0) translateX(-50%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(-4px) translateX(-50%);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
  
  .bounce-badge {
    animation: bounce 2s infinite;
  }
`;

// Inject styles into document head
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("bounce-styles");
  if (existingStyle) {
    existingStyle.remove();
  }
  const styleElement = document.createElement("style");
  styleElement.id = "bounce-styles";
  styleElement.textContent = bounceStyles;
  document.head.appendChild(styleElement);
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  buttonText: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "₹0",
    period: "/year",
    features: [
      "Up to 3 insurance policies",
      "Basic claim assistance",
      "Email support",
      "Mobile app access",
    ],
    icon: Shield,
    buttonText: "",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹199",
    originalPrice: "₹499",
    period: "/year",
    features: [
      "Unlimited insurance policies",
      "Priority claim assistance",
      "24/7 phone & chat support",
      "Advanced analytics",
      "Family member management",
      "Premium advisor consultation",
    ],
    popular: true,
    icon: Crown,
    buttonText: "Upgrade to Premium",
  },
];

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    console.log("Selected plan:", planId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl shadow-2xl border-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-card) 0%, var(--color-secondary) 100%)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-4 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
            style={{ color: "var(--color-primary-foreground)" }}
          >
            <X className="h-5 w-5" />
          </button>
          
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, var(--color-primary-foreground) 50%, transparent 70%)",
            }}
          ></div>
          <DialogHeader className="relative z-10">
            <DialogTitle
              className="text-xl font-bold text-center mb-1"
              style={{ color: "var(--color-primary-foreground)" }}
            >
              Choose Your Plan
            </DialogTitle>
            <DialogDescription
              className="text-sm text-center opacity-90"
              style={{ color: "var(--color-primary-foreground)" }}
            >
              Unlock premium features with yearly subscriptions
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl p-4 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${
                  isSelected ? "ring-2 ring-offset-2" : ""
                }`}
                style={{
                  backgroundColor: plan.popular
                    ? "#fdf2f8" // rose-50 equivalent - rich pink background
                    : "var(--color-card)",
                  borderColor: plan.popular
                    ? "#be185d" // rose-700 - rich deep pink border
                    : "var(--color-border)",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  boxShadow: plan.popular
                    ? "0 10px 25px rgba(190, 24, 93, 0.15), 0 4px 6px rgba(190, 24, 93, 0.1)"
                    : "0 4px 15px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={(e) => {
                  if (plan.popular) {
                    e.currentTarget.style.backgroundColor = "#fce7f3"; // rose-100
                    e.currentTarget.style.borderColor = "#9d174d"; // rose-800
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(190, 24, 93, 0.25), 0 8px 16px rgba(190, 24, 93, 0.15)";
                  } else {
                    e.currentTarget.style.backgroundColor = "#f8fafc"; // slate-50
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0, 0, 0, 0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.popular) {
                    e.currentTarget.style.backgroundColor = "#fdf2f8"; // rose-50
                    e.currentTarget.style.borderColor = "#be185d"; // rose-700
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(190, 24, 93, 0.15), 0 4px 6px rgba(190, 24, 93, 0.1)";
                  } else {
                    e.currentTarget.style.backgroundColor = "var(--color-card)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0, 0, 0, 0.08)";
                  }
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 bounce-badge">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-foreground)",
                      }}
                    >
                      <Star className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="inline-flex p-2 rounded-xl mb-3 shadow-lg"
                  style={{
                    backgroundColor: plan.popular
                      ? "var(--color-primary)"
                      : "var(--color-accent)",
                  }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: "var(--color-card-foreground)" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex justify-center items-center gap-2 mb-3">
                  {plan.originalPrice && (
                    <span
                      className="text-sm line-through opacity-60"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {plan.originalPrice}
                    </span>
                  )}
                  <span
                    className="text-xl font-bold"
                    style={{ color: "var(--color-card-foreground)" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm opacity-70"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Savings Badge */}
                {plan.originalPrice && (
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-success) 0%, #16a34a 100%)",
                      color: "white",
                    }}
                  >
                    💰 Save ₹
                    {parseInt(
                      plan.originalPrice.replace("₹", "").replace(",", "")
                    ) - parseInt(plan.price.replace("₹", "").replace(",", ""))}
                  </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 text-left">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div
                        className="rounded-full p-1 mt-0.5 shadow-sm flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-success) 0%, #16a34a 100%)",
                        }}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-card-foreground)" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {plan.buttonText !== "" && (
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full rounded-lg py-2 text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg text-white ${
                      isSelected ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{
                      backgroundColor: plan.popular
                        ? "#be185d" // rose-700 - rich deep pink
                        : "#475569", // slate-600 - sophisticated gray
                      boxShadow: plan.popular
                        ? "0 6px 20px rgba(190, 24, 93, 0.3)"
                        : "0 4px 15px rgba(71, 85, 105, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      if (plan.popular) {
                        e.currentTarget.style.backgroundColor = "#9d174d"; // rose-800
                        e.currentTarget.style.boxShadow =
                          "0 8px 25px rgba(190, 24, 93, 0.4)";
                      } else {
                        e.currentTarget.style.backgroundColor = "#334155"; // slate-700
                        e.currentTarget.style.boxShadow =
                          "0 6px 20px rgba(71, 85, 105, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (plan.popular) {
                        e.currentTarget.style.backgroundColor = "#be185d"; // rose-700
                        e.currentTarget.style.boxShadow =
                          "0 6px 20px rgba(190, 24, 93, 0.3)";
                      } else {
                        e.currentTarget.style.backgroundColor = "#475569"; // slate-600
                        e.currentTarget.style.boxShadow =
                          "0 4px 15px rgba(71, 85, 105, 0.3)";
                      }
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust Section */}
        <div
          className="px-4 py-3 border-t text-center text-sm relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-card) 100%)",
            borderColor: "var(--color-border)",
            color: "var(--color-muted)",
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, var(--color-primary) 50%, transparent 70%)",
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-4 flex-wrap text-xs">
              <span className="flex items-center gap-1 font-medium">
                ✨ <span>Trusted by 10,000+ users</span>
              </span>
              <span className="flex items-center gap-1">
                🔒 <span>Secure</span>
              </span>
              <span className="flex items-center gap-1">
                ✅ <span>Cancel Anytime</span>
              </span>
              <span className="flex items-center gap-1">
                📞 <span>24/7 Support</span>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
