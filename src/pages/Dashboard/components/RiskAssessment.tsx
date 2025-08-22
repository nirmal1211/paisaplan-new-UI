import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/UI/card";
import { Target, Zap, Heart, Activity, Shield } from "lucide-react";
import { RiskScore } from "../types";
import { getRiskColor } from "../utils";
import { getTrendIcon } from "../utils/icons";

interface Props {
  riskScores: RiskScore[];
  overallScore: number;
  onHover: (type: string | null) => void;
  active?: string | null;
}

export const RiskAssessment: React.FC<Props> = ({
  riskScores,
  overallScore,
  onHover,
  active,
}) => {
  // Compact ring sizing
  const overallPercent = Math.max(0, Math.min(100, overallScore));
  const ringSize = 60;
  const ringStroke = 5;
  const ringRadius = ringSize / 2 - ringStroke;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset =
    ringCircumference - (overallPercent / 100) * ringCircumference;

  // Risk-based background and colors (higher score = more risk)
  // let cardBackground = "var(--color-card)";
  // let borderColor = "var(--color-border)";
  // let severityColor = "var(--color-primary)";

  // if (overallScore <= 30) {
  //   // Low risk (safe) - light green
  //   cardBackground =
  //     "linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.04) 100%)";
  //   borderColor = "rgba(34, 197, 94, 0.3)";
  //   severityColor = "var(--color-success)";
  // } else if (overallScore > 30 && overallScore <= 70) {
  //   // Medium risk (neutral) - light yellow/orange
  //   cardBackground =
  //     "linear-gradient(135deg, rgba(250, 204, 21, 0.14) 0%, rgba(250, 204, 21, 0.05) 100%)";
  //   borderColor = "rgba(250, 204, 21, 0.35)";
  //   severityColor = "var(--color-warning)";
  // } else {
  //   // High risk (dangerous) - light red
  //   cardBackground =
  //     "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(239, 68, 68, 0.04) 100%)";
  //   borderColor = "rgba(239, 68, 68, 0.3)";
  //   severityColor = "var(--color-danger)";
  // }
  return (
    <div className="relative mb-10" aria-label="Risk assessment section">
      <Card
        className="rounded-xl p-4 md:p-5 relative overflow-hidden border"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <CardHeader className="p-0 mb-4 flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <Target
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
              <CardTitle
                className="text-base md:text-lg font-bold font-poppins tracking-tight"
                style={{ color: "var(--color-foreground)" }}
              >
                Risk Assessment
              </CardTitle>
            </div>
            <p
              className="text-[10px] md:text-[11px] font-roboto leading-snug max-w-md"
              style={{ color: "var(--color-muted)" }}
            >
              AI-powered analysis of your insurance risk profile across
              categories
            </p>
          </div>
          <div className="text-center">
            <div className="relative">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative"
                style={{
                  backgroundColor: "var(--color-card)",
                  boxShadow: "0 0 0 3px rgba(0,0,0,0.04)",
                  border: "2px solid var(--color-primary)",
                }}
              >
                <svg
                  width={ringSize}
                  height={ringSize}
                  className="absolute inset-0 m-auto rotate-[-90deg]"
                  aria-hidden="true"
                >
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={ringRadius}
                    stroke="var(--color-primary)"
                    strokeWidth={ringStroke}
                    opacity={0.15}
                    fill="transparent"
                  />
                  <circle
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={ringRadius}
                    stroke="var(--color-primary)"
                    strokeWidth={ringStroke}
                    fill="transparent"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                </svg>
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div
                    className="text-base md:text-lg font-bold font-poppins leading-none"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {overallScore}
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1">
                <Zap
                  className="h-3 w-3"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
            </div>
            <div
              className="text-[10px] font-roboto mt-1"
              style={{ color: "var(--color-muted)" }}
            >
              Overall Score
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {riskScores.map((risk) => (
              <Card
                key={risk.type}
                className="group rounded-lg p-3 relative transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
                style={{
                  backgroundColor: "var(--color-card)",
                  border:
                    active === risk.type
                      ? "2px solid var(--color-primary)"
                      : "1px solid var(--color-border)",
                  boxShadow:
                    active === risk.type
                      ? "0 4px 14px -4px rgba(0,0,0,0.18)"
                      : "0 1px 4px -1px rgba(0,0,0,0.08)",
                  transform:
                    active === risk.type ? "translateY(-3px)" : "translateY(0)",
                }}
                onMouseEnter={() => onHover(risk.type)}
                onMouseLeave={() => onHover(null)}
                aria-label={`${risk.type} insurance risk card`}
              >
                <CardHeader className="p-0 mb-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div
                        className={`p-1.5 rounded-lg transition-all duration-300 ${
                          active === risk.type ? "scale-105" : ""
                        }`}
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {risk.type === "life" && (
                          <Heart
                            className="h-4 w-4"
                            style={{ color: "var(--color-primary)" }}
                          />
                        )}
                        {risk.type === "health" && (
                          <Activity
                            className="h-4 w-4"
                            style={{ color: "var(--color-primary)" }}
                          />
                        )}
                        {risk.type === "accident" && (
                          <Shield
                            className="h-4 w-4"
                            style={{ color: "var(--color-primary)" }}
                          />
                        )}
                      </div>
                      <div>
                        <CardTitle
                          className="text-[13px] font-semibold font-poppins capitalize tracking-wide"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {risk.type} Insurance
                        </CardTitle>
                        <div className="flex items-center space-x-1 mt-0.5">
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${getRiskColor(
                              risk.level
                            )}`}
                          >
                            {risk.level.toUpperCase()} RISK
                          </span>
                          {getTrendIcon(risk.trend)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-sm font-semibold font-poppins leading-none"
                        style={{
                          color: "var(--color-primary)",
                          textShadow: "0 1px 0 rgba(0,0,0,0.06)",
                        }}
                      >
                        {risk.score}
                      </div>
                      <div
                        className="text-[10px] font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        /100
                      </div>
                      <div
                        className="mt-1 h-1.5 w-14 rounded-full overflow-hidden ml-auto"
                        style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
                        aria-hidden="true"
                      >
                        <div
                          className="h-full"
                          style={{
                            width: `${risk.score}%`,
                            backgroundColor: "var(--color-primary)",
                            transition: "width 0.6s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative z-10">
                  <h4
                    className="text-[10px] font-semibold font-roboto uppercase tracking-wide mb-1.5"
                    style={{
                      color: "var(--color-foreground)",
                      letterSpacing: "0.07em",
                    }}
                  >
                    Risk Factors
                  </h4>
                  {risk.factors.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center text-[10px] font-roboto transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: "var(--color-muted)", lineHeight: 1.2 }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-sm mr-2"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      />
                      {f}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
