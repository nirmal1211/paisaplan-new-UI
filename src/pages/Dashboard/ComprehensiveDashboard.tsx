import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { DashboardHeader } from "./components/DashboardHeader";
import { RiskAssessment } from "./components/RiskAssessment";
import { HealthInsuranceTip } from "./components/HealthInsuranceTip";
import { HealthCoverageCalculator } from "./components/HealthCoverageCalculator";
import { ClaimsAnalytics } from "./components/ClaimsAnalytics";
import { GovernmentSchemes } from "./components/GovernmentSchemes";
import { initialRiskScores, claims, sharedPolicies } from "./data";
import { useAnimatedCounters } from "./hooks/useAnimatedCounters";
import { overallRiskScore } from "./utils";
import { RiskScore } from "./types";

export const ComprehensiveDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [riskScores] = useState<RiskScore[]>(initialRiskScores);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);

    return () => clearTimeout(t);
  }, []);

  const animatedValues = useAnimatedCounters(!isLoading);

  const totalPolicyValue = sharedPolicies.reduce((s, p) => s + p.value, 0);
  const overall = overallRiskScore(riskScores);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <div className="relative">
            <div
              className="w-20 h-20 border-4 border-opacity-20 rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: "var(--color-primary)" }}
            >
              <div
                className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin"
                style={{ borderTopColor: "var(--color-primary)" }}
              />
            </div>
            <Sparkles
              className="h-8 w-8 mx-auto mb-4 animate-pulse"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <h2
            className="text-2xl font-bold font-poppins mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            Loading Dashboard
          </h2>
          <p className="font-roboto" style={{ color: "var(--color-muted)" }}>
            Preparing your personalized insurance insights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 md:p-8 space-y-12"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          overallScore={animatedValues.overallScore}
          totalPolicyValue={totalPolicyValue}
          totalClaims={animatedValues.totalClaims}
          totalPolicies={animatedValues.totalPolicies}
        />
        <RiskAssessment
          riskScores={riskScores}
          overallScore={overall}
          onHover={setActiveSection}
          active={activeSection}
        />
        <HealthInsuranceTip />
        <HealthCoverageCalculator />
        <ClaimsAnalytics claims={claims} animatedValues={animatedValues} />
        <GovernmentSchemes />
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;
