import React from "react";
import { Button } from "../../../components/UI/button";
import { ShieldCheck, Wallet, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  overallScore: number;
  totalPolicyValue: number;
  totalClaims: number;
  totalPolicies: number;
  onRefresh?: () => void;
  userName?: string;
}

export const DashboardHeader: React.FC<Props> = ({
  overallScore,
  totalPolicyValue,
  totalClaims,
  totalPolicies,
  onRefresh,
  userName = "User",
}) => {
  const { t } = useTranslation();
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t("DASHBOARD.GREETING.MORNING")
      : hour < 18
      ? t("DASHBOARD.GREETING.AFTERNOON")
      : t("DASHBOARD.GREETING.EVENING");
  const coverageCr = (totalPolicyValue / 10000000).toFixed(1);
  const riskPercent = Math.max(0, Math.min(100, Math.round(overallScore)));

  return (
    <section
      aria-label="Dashboard header"
      className="relative mb-6 rounded-md overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
      }}
    >
      {/* subtle frame lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-[200px]">
            <Monogram name={userName} />
            <div className="leading-tight">
              <h1
                className="font-poppins font-semibold text-lg md:text-xl tracking-tight"
                style={{ color: "var(--color-primary-foreground)" }}
              >
                {greeting}, <span style={{ opacity: 0.9 }}>{userName}</span>
              </h1>
              <p
                className="text-[10px] md:text-xs font-roboto"
                style={{
                  color: "var(--color-primary-foreground)",
                  opacity: 0.65,
                }}
              >
                {t("DASHBOARD.SNAPSHOT")}
              </p>
            </div>
          </div>
          {onRefresh && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              className="h-7 px-3 text-[11px]"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--color-primary-foreground)",
                color: "var(--color-primary-foreground)",
              }}
            >
              {t("DASHBOARD.REFRESH")}
            </Button>
          )}
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          aria-label="Key stats"
        >
          <CompactStat
            icon={<ShieldCheck className="h-4 w-4" />}
            label={t("DASHBOARD.STAT.POLICIES")}
            value={totalPolicies.toString()}
            footer={<SmallSub text={t("DASHBOARD.STAT.TOTAL_ACTIVE")} />}
            percent={riskPercent}
          />
          <CompactStat
            icon={<Wallet className="h-4 w-4" />}
            label={t("DASHBOARD.STAT.COVERAGE")}
            value={`₹${coverageCr}Cr`}
            footer={<SmallSub text={t("DASHBOARD.STAT.TOTAL_ACTIVE")} />}
          />
          <CompactStat
            icon={<FileText className="h-4 w-4" />}
            label={t("DASHBOARD.STAT.CLAIMS")}
            value={totalClaims.toString()}
            footer={<SmallSub text={t("DASHBOARD.STAT.ACTIVE")} />}
          />
        </div>
      </div>
    </section>
  );
};

/* Monogram */
const Monogram = ({ name }: { name: string }) => {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div
      className="h-11 w-11 rounded-lg flex items-center justify-center font-poppins font-semibold text-lg shadow-sm"
      style={{
        backgroundColor: "var(--color-primary-foreground)",
        color: "var(--color-primary)",
      }}
      aria-label={`User avatar for ${name}`}
    >
      {initial}
    </div>
  );
};

interface CompactStatProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  footer?: React.ReactNode;
  percent?: number;
}
const CompactStat: React.FC<CompactStatProps> = ({
  icon,
  label,
  value,
  footer,
  percent,
}) => (
  <div
    className="relative rounded-md border p-3 flex flex-col gap-2 overflow-hidden group"
    style={{
      backgroundColor: "var(--color-primary-foreground)",
      borderColor: "var(--color-primary-foreground)",
    }}
  >
    {typeof percent === "number" && (
      <div
        className="absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-[0.06]"
        style={{ border: "1px solid var(--color-primary)" }}
      />
    )}
    {/* Top row: icon + label left, value right */}
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        {icon && (
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
          >
            {icon}
          </div>
        )}
        <div
          className="text-[11px] md:text-xs font-roboto font-semibold uppercase tracking-wide truncate"
          style={{ color: "var(--color-primary)", opacity: 0.65 }}
        >
          {label}
        </div>
      </div>
      <div
        className="font-poppins font-bold text-xl md:text-2xl flex items-center justify-center shrink-0"
        style={{
          color: "var(--color-primary)",
        }}
      >
        {value}
      </div>
    </div>
    {footer && <div className="mt-1">{footer}</div>}
  </div>
);

const SmallSub = ({ text }: { text: string }) => (
  <span
    className="text-[9px] font-roboto"
    style={{ color: "var(--color-primary)", opacity: 0.55 }}
  >
    {text}
  </span>
);
