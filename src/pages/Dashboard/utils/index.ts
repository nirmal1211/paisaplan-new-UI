import { Claim, RiskScore } from "../types";

export const calculateBMI = (height: number, weight: number): number => {
  const h = height / 100;
  return weight / (h * h);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

export const getRiskColor = (level: string): string => {
  switch (level) {
    case "low":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "medium":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "high":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    case "active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "expired":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-amber-500";
    case "low":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};

export const overallRiskScore = (riskScores: RiskScore[]) =>
  Math.round(riskScores.reduce((s, r) => s + r.score, 0) / riskScores.length);
export const claimStats = (claims: Claim[]) => ({
  total: claims.length,
  pending: claims.filter((c) => c.status === "pending").length,
  approved: claims.filter((c) => c.status === "approved").length,
  rejected: claims.filter((c) => c.status === "rejected").length,
});
