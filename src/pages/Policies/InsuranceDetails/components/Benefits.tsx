import React from "react";
import { CheckCircle, X } from "lucide-react";
import { Policy } from "../types";

interface BenefitsProps {
  policy: Policy;
}

const Benefits: React.FC<BenefitsProps> = ({ policy }) => {
  const defaultBenefits = [
    "Cashless hospitalization",
    "Pre and post hospitalization",
    "Ambulance charges",
    "Day care procedures",
    "Domiciliary treatment",
    "Annual health check-up",
  ];

  const defaultExclusions = [
    "Pre-existing diseases (first 2 years)",
    "Cosmetic surgery",
    "Dental treatment",
    "Self-inflicted injuries",
    "War and nuclear risks",
    "Experimental treatments",
  ];

  const benefits = policy.benefits || defaultBenefits;
  const exclusions = policy.exclusions || defaultExclusions;

  return (
    <div className="space-y-8">
      {/* Policy Benefits */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6"
          style={{ color: "var(--color-foreground)" }}
        >
          Policy Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span
                className="font-roboto text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Exclusions */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6"
          style={{ color: "var(--color-foreground)" }}
        >
          Policy Exclusions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exclusions.map((exclusion: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span
                className="font-roboto text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {exclusion}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
