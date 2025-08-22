import React from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Claim } from "../types";
import {
  claimStats as calcClaimStats,
  getStatusColor,
  getPriorityColor,
} from "../utils";
import { getStatusIcon } from "../utils/icons";

interface Props {
  claims: Claim[];
  animatedValues: { totalClaims: number; approvedClaims: number };
}

export const ClaimsAnalytics: React.FC<Props> = ({
  claims,
  animatedValues,
}) => {
  const stats = calcClaimStats(claims);
  return (
    <section className="mb-16 relative">
      <div
        className="rounded-2xl shadow-xl p-4 md:p-6 relative"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex items-center space-x-2 mb-6">
          <div
            className="p-2 rounded-xl shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              Claims Analytics
            </h2>
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Real-time tracking and insights for all your insurance claims
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Claims"
            value={animatedValues.totalClaims}
            accent="primary"
            extra={
              <>
                <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                <span className="text-xs font-roboto text-emerald-600">
                  +2 this month
                </span>
              </>
            }
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            accent="warning"
            icon={<Clock className="h-3 w-3 text-amber-500 mr-1" />}
            sub="Avg 5 days"
          />
          <StatCard
            label="Approved"
            value={animatedValues.approvedClaims}
            accent="success"
            icon={<CheckCircle className="h-3 w-3 text-emerald-500 mr-1" />}
            sub="95% rate"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            accent="danger"
            icon={<XCircle className="h-3 w-3 text-red-500 mr-1" />}
            sub="Review needed"
          />
        </div>
        <div>
          <h3
            className="text-base md:text-lg font-bold font-poppins mb-4 md:mb-6"
            style={{ color: "var(--color-foreground)" }}
          >
            Recent Claims Activity
          </h3>
          <div className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="group border-2 rounded-xl p-3 md:p-4 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="absolute left-0 top-0 w-1 h-full transition-all duration-300 group-hover:w-2"
                  style={{ backgroundColor: getPriorityColor(claim.priority) }}
                />
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="p-1 md:p-2 rounded-xl"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      {getStatusIcon(claim.status)}
                    </div>
                    <div>
                      <h4
                        className="text-sm md:text-base font-bold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {claim.type}
                      </h4>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Claim ID: {claim.id} • {claim.priority.toUpperCase()}{" "}
                        Priority
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(
                        claim.status
                      )}`}
                    >
                      {claim.status.charAt(0).toUpperCase() +
                        claim.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <Field label="Amount" value={claim.amount} />
                  <Field label="Submitted" value={claim.dateSubmitted} />
                  <Field label="Last Updated" value={claim.lastUpdated} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-roboto text-[var(--color-muted)]">
      {label}
    </span>
    <span className="text-xs font-roboto text-[var(--color-foreground)]">
      {value}
    </span>
  </div>
);

const StatCard = ({
  label,
  value,
  accent,
  extra,
  icon,
  sub,
}: {
  label: string;
  value: number;
  accent: "primary" | "warning" | "success" | "danger";
  extra?: React.ReactNode;
  icon?: React.ReactNode;
  sub?: string;
}) => {
  const colorMap: Record<string, string> = {
    primary: "var(--color-primary)",
    warning: "var(--color-warning)",
    success: "var(--color-success)",
    danger: "var(--color-danger)",
  };
  return (
    <div
      className="text-center p-3 rounded-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: colorMap[accent] }}
      />
      <div className="relative z-10">
        <div
          className="text-xl font-bold font-poppins mb-1"
          style={{ color: colorMap[accent] }}
        >
          {value}
        </div>
        <div
          className="text-xs font-roboto uppercase tracking-wide"
          style={{ color: "var(--color-muted)" }}
        >
          {label}
        </div>
        {extra && (
          <div className="mt-1 flex items-center justify-center">{extra}</div>
        )}
        {icon && sub && !extra && (
          <div className="mt-1 flex items-center justify-center">
            {icon}
            <span
              className="text-xs font-roboto"
              style={{ color: colorMap[accent] }}
            >
              {sub}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
