import React, { useState, useEffect } from "react";
import { rupeesToWords } from "../../lib/numberToWords";
import { Shield, Users, Calendar, DollarSign } from "lucide-react";
import { PolicyDetails } from "../../data/policyDetails";

interface PolicyOverviewProps {
  policy: PolicyDetails;
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
}

const PolicyOverview: React.FC<PolicyOverviewProps> = ({
  policy,
  className = "",
  cardClassName = "",
  titleClassName = "",
  valueClassName = "",
  labelClassName = "",
}) => {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [daysToExpiry, setDaysToExpiry] = useState(0);
  const [showWords, setShowWords] = useState(false);

  // Animate sum insured counter
  useEffect(() => {
    const targetAmount = parseInt(policy.sumInsured.replace(/[₹,]/g, ""));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetAmount / steps;
    let current = 0;
    setShowWords(false);

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetAmount) {
        setAnimatedAmount(targetAmount);
        setShowWords(true);
        clearInterval(timer);
      } else {
        setAnimatedAmount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [policy.sumInsured]);

  // Calculate days to expiry
  useEffect(() => {
    const expiryDate = new Date(policy.validTo);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysToExpiry(diffDays);
  }, [policy.validTo]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden ${className} ${cardClassName}`}
      style={{ backgroundColor: "var(--color-card)" }}
    >
      {/* Gradient Header */}
      <div
        className="p-8 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1
                  className={`text-3xl font-bold font-poppins ${titleClassName}`}
                >
                  {policy.type} Insurance
                </h1>
                <p
                  className={`text-white/80 font-roboto text-lg ${labelClassName}`}
                >
                  {policy.provider}
                </p>
              </div>
            </div>

            {/* Policy Number - Mobile Responsive */}
            <div className="text-right">
              <p className="text-white/80 font-roboto text-sm">Policy Number</p>
              <p className={`text-xl font-bold font-poppins ${valueClassName}`}>
                {policy.policyNumber}
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sum Insured with Animation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="h-6 w-6" />
                <span className={`font-roboto text-white/80 ${labelClassName}`}>
                  Sum Insured
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className={`text-3xl font-bold font-poppins ${valueClassName}`}
                >
                  {formatCurrency(animatedAmount)}
                </p>
                {showWords && (
                  <span className="text-xs md:text-sm font-roboto text-white/80 italic">
                    {rupeesToWords(animatedAmount)}
                  </span>
                )}
              </div>
            </div>

            {/* Premium */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-6 w-6" />
                <span className={`font-roboto text-white/80 ${labelClassName}`}>
                  Annual Premium
                </span>
              </div>
              <p
                className={`text-3xl font-bold font-poppins ${valueClassName}`}
              >
                {policy.premium}
              </p>
              <p
                className={`text-sm text-white/60 font-roboto mt-1 ${labelClassName}`}
              >
                Next due: {formatDate(policy.validTo)}
              </p>
            </div>

            {/* Validity Dates or Days to Expiry */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-6 w-6" />
                <span className={`font-roboto text-white/80 ${labelClassName}`}>
                  Policy Validity
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xs md:text-xs font-poppins pb-1 ${valueClassName} `}
                >
                  Valid From: {formatDate(policy.validFrom)}
                </span>
                <span
                  className={`text-xs md:text-xs font-poppins ${valueClassName}`}
                >
                  Valid To: {formatDate(policy.validTo)}
                </span>
                {daysToExpiry < 30 && daysToExpiry >= 0 && (
                  <span className="text-xs md:text-sm font-roboto text-yellow-200 italic mt-1">
                    {daysToExpiry} day{daysToExpiry !== 1 ? "s" : ""} remaining
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Covered Members - use full width */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <Users
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
            <h3
              className={`text-xl font-bold font-poppins ${titleClassName}`}
              style={{ color: "var(--color-foreground)" }}
            >
              Covered Members ({policy.dependents.length + 1})
            </h3>
          </div>
          {/* Show covered members in a grid, 2 per row, full width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Primary Member */}
            <div
              className="flex items-center space-x-4 p-4 rounded-xl w-full"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                You
              </div>
              <div className="flex-1">
                <p
                  className={`font-semibold font-poppins ${titleClassName}`}
                  style={{ color: "var(--color-foreground)" }}
                >
                  Primary Member
                </p>
                <p
                  className={`text-sm font-roboto ${labelClassName}`}
                  style={{ color: "var(--color-muted)" }}
                >
                  Coverage: {policy.sumInsured}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Active
              </span>
            </div>

            {/* Dependents */}
            {policy.dependents.map((dependent) => (
              <div
                key={dependent.id}
                className="flex items-center space-x-4 p-4 rounded-xl w-full"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <img
                  src={dependent.avatar}
                  alt={dependent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p
                    className={`font-semibold font-poppins ${titleClassName}`}
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {dependent.name}
                  </p>
                  <p
                    className={`text-sm font-roboto ${labelClassName}`}
                    style={{ color: "var(--color-muted)" }}
                  >
                    {dependent.relation} • Age {dependent.age} • Coverage:{" "}
                    {dependent.coverage}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dependent.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {dependent.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <button
            className={`flex-1 py-1.5 px-3 rounded-md font-semibold font-roboto text-white text-[11px] md:text-xs transition-all duration-200 hover:opacity-90 hover:scale-105 ${valueClassName}`}
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Renew Policy
          </button>
          <button
            className={`flex-1 py-1.5 px-3 rounded-md font-semibold font-roboto text-[11px] md:text-xs transition-all duration-200 hover:scale-105 ${valueClassName}`}
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-primary)",
            }}
          >
            File a Claim
          </button>
          <button
            className={`flex-1 py-1.5 px-3 rounded-md font-semibold font-roboto text-[11px] md:text-xs transition-all duration-200 hover:scale-105 ${valueClassName}`}
            style={{
              backgroundColor: "var(--color-card)",
              color: "var(--color-primary)",
              border: `1px solid var(--color-border)`,
            }}
          >
            Request Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyOverview;
