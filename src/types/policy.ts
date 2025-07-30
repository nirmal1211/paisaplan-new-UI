export interface Policy {
  id: string;
  policyNumber: string;
  provider: string;
  type:
    | "Health"
    | "Motor"
    | "Two-wheeler"
    | "Life"
    | "Travel"
    | "Home"
    | "Fire"
    | "Marine"
    | "Cyber"
    | "Professional";
  status: "Active" | "Pending" | "Expired" | "Verification Pending";
  validFrom: string;
  validTo: string;
  sumInsured: string;
  premium: string;
  expiryDays: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InsuranceSlide {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}
