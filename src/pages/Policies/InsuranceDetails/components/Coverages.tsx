import React from "react";
import { Shield, RefreshCw } from "lucide-react";
import { Policy } from "../types";

interface CoveragesProps {
  policy: Policy;
}

const Coverages: React.FC<CoveragesProps> = ({ policy }) => {
  // Mock coverages data for motor and two-wheeler policies
  const mockCoverages = {
    motor: {
      coverages: [
        {
          title: "Own Damage Cover",
          description:
            "Covers damage to your vehicle due to accident, fire, theft, or natural calamities.",
        },
        {
          title: "Third Party Liability",
          description:
            "Covers legal liability for injury/death or property damage to third parties.",
        },
        {
          title: "Personal Accident Cover",
          description:
            "Provides compensation in case of death or disability of the owner-driver.",
        },
      ],
      addOns: [
        {
          title: "Zero Depreciation",
          description:
            "Full claim without deduction for depreciation on parts.",
        },
        {
          title: "Engine Protect",
          description:
            "Covers damage to engine and gearbox due to water ingression or oil leakage.",
        },
        {
          title: "Roadside Assistance",
          description:
            "24x7 support for breakdowns, towing, fuel delivery, and more.",
        },
      ],
    },
    twoWheeler: {
      coverages: [
        {
          title: "Own Damage Cover",
          description:
            "Covers accidental damage, fire, theft, and natural disasters for your bike.",
        },
        {
          title: "Third Party Liability",
          description:
            "Covers injury/death or property damage to third parties.",
        },
        {
          title: "Personal Accident Cover",
          description: "Compensation for owner-rider in case of accident.",
        },
      ],
      addOns: [
        {
          title: "Helmet Cover",
          description: "Covers loss or damage to helmet.",
        },
        {
          title: "NCB Protect",
          description: "Retain No Claim Bonus even after a claim.",
        },
        {
          title: "Roadside Assistance",
          description: "Emergency help for breakdowns and towing.",
        },
      ],
    },
  };

  // Determine policy type
  const type = (policy.type || policy.policyType || "motor").toLowerCase();
  const data = type.includes("two")
    ? mockCoverages.twoWheeler
    : mockCoverages.motor;

  return (
    <div className="space-y-8">
      {/* What the policy covers */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-border)",
          borderWidth: 1,
        }}
      >
        <h3
          className="text-base font-bold font-poppins mb-4 flex items-center gap-2"
          style={{ color: "var(--color-primary)" }}
        >
          <Shield
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          What This Policy Covers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.coverages.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-3 flex flex-col gap-1 hover:shadow-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--color-secondary)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Shield
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <h4
                  className="font-semibold font-poppins text-sm"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.title}
                </h4>
              </div>
              <p
                className="font-roboto text-xs"
                style={{ color: "var(--color-foreground)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-border)",
          borderWidth: 1,
        }}
      >
        <h3
          className="text-base font-bold font-poppins mb-4 flex items-center gap-2"
          style={{ color: "var(--color-primary)" }}
        >
          <RefreshCw
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          Popular Add-ons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.addOns.map((addon, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-3 flex flex-col gap-1 hover:shadow-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--color-secondary)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <RefreshCw
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <h4
                  className="font-semibold font-poppins text-sm"
                  style={{ color: "var(--color-primary)" }}
                >
                  {addon.title}
                </h4>
              </div>
              <p
                className="font-roboto text-xs"
                style={{ color: "var(--color-foreground)" }}
              >
                {addon.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coverages;
