export interface Coverage {
  title: string;
  description: string;
}

export interface AddOn {
  name: string;
  info: string;
}

export interface PolicyCoverage {
  coverages: Coverage[];
  addOns: AddOn[];
}

export const motorPolicyCoverages: PolicyCoverage = {
  coverages: [
    {
      title: "Own Damage Cover",
      description:
        "Covers damage to your vehicle due to accident, fire, theft, natural disasters, etc.",
    },
    {
      title: "Third Party Liability",
      description:
        "Covers legal liability for injury/death or property damage to third parties.",
    },
    {
      title: "Personal Accident Cover",
      description:
        "Provides compensation in case of death or permanent disability of the owner-driver.",
    },
  ],
  addOns: [
    {
      name: "Zero Depreciation",
      info: "Full claim without depreciation deduction on parts.",
    },
    {
      name: "Engine Protect",
      info: "Covers engine damage due to water ingression or oil leakage.",
    },
    {
      name: "Return to Invoice",
      info: "Pays the invoice value in case of total loss/theft.",
    },
    {
      name: "Roadside Assistance",
      info: "24x7 help for breakdowns, towing, fuel, etc.",
    },
    {
      name: "Consumables Cover",
      info: "Covers cost of consumables like oil, nuts, bolts, etc.",
    },
  ],
};

export const twoWheelerPolicyCoverages: PolicyCoverage = {
  coverages: [
    {
      title: "Own Damage Cover",
      description:
        "Covers damage to your bike/scooter due to accident, fire, theft, natural disasters, etc.",
    },
    {
      title: "Third Party Liability",
      description:
        "Covers legal liability for injury/death or property damage to third parties.",
    },
    {
      title: "Personal Accident Cover",
      description:
        "Compensation for death or permanent disability of the owner-rider.",
    },
  ],
  addOns: [
    {
      name: "Zero Depreciation",
      info: "No depreciation deduction on replaced bike parts.",
    },
    {
      name: "Helmet Cover",
      info: "Covers loss or damage to helmet.",
    },
    {
      name: "Roadside Assistance",
      info: "Help for breakdowns, towing, minor repairs, etc.",
    },
    {
      name: "Invoice Protection",
      info: "Pays invoice value in case of total loss/theft.",
    },
  ],
};
