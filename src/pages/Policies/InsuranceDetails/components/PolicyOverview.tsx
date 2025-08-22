import React from "react";
import {
  Shield,
  Heart,
  DollarSign,
  Calendar,
  Phone,
  CheckCircle,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  Edit,
} from "lucide-react";
import { Policy, EmergencyContact } from "../types";

interface PolicyOverviewProps {
  policy: Policy;
  remainingDays: number;
  copied: boolean;
  onCopyPolicyNumber: () => void;
  onFormatDate: (dateString: string) => string;
}

const PolicyOverview: React.FC<PolicyOverviewProps> = ({
  policy,
  remainingDays,
  copied,
  onCopyPolicyNumber,
  onFormatDate,
}) => {
  const emergencyContacts: EmergencyContact[] = [
    {
      name: "Customer Care",
      phone: "1800-123-4567",
      available24x7: true,
    },
    {
      name: "Claims Support",
      phone: "1800-765-4321",
      available24x7: true,
    },
    {
      name: "Roadside Assistance",
      phone: "1800-111-2222",
      available24x7: true,
    },
    {
      name: "Hospital Support",
      phone: "1800-333-4444",
      available24x7: false,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Policy Header Card */}
      <div
        className="rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Gradient Header */}
        <div
          className="p-4 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  {policy.type === "Health" ? (
                    <Heart className="h-5 w-5" />
                  ) : (
                    <Shield className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-bold font-poppins">
                    {policy.type === "Health"
                      ? `${policy.type} Insurance`
                      : `${policy.vehicle?.make || policy.type} ${
                          policy.vehicle?.model || "Insurance"
                        }`}
                  </h1>
                  <p className="text-white/80 font-roboto text-xs">
                    {policy.provider}
                  </p>
                </div>
              </div>
              {/* Policy Number with Copy */}
              <div className="text-right">
                <p className="text-white/80 font-roboto text-xs">
                  Policy Number
                </p>
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-bold font-poppins">
                    {policy.policyNumber}
                  </p>
                  <button
                    onClick={onCopyPolicyNumber}
                    className="p-1 rounded hover:bg-white/20 transition-colors"
                    title="Copy policy number"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Coverage
                  </span>
                </div>
                <p className="text-lg font-bold font-poppins">
                  {policy.sumInsured || "₹5,00,000"}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Premium
                  </span>
                </div>
                <p className="text-lg font-bold font-poppins">
                  {policy.premium || "₹12,000"}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Days Remaining
                  </span>
                </div>
                <p className="text-lg font-bold font-poppins">
                  {remainingDays}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Status
                  </span>
                </div>
                <p className="text-base font-bold font-poppins capitalize">
                  {policy.status}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              className="flex items-center justify-center space-x-1 py-2 px-2 rounded font-semibold font-roboto text-xs text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <RefreshCw className="h-3 w-3" />
              <span>Renew</span>
            </button>
            <button
              className="flex items-center justify-center space-x-1 py-2 px-2 rounded font-semibold font-roboto text-xs transition-all duration-200"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
              }}
            >
              <AlertTriangle className="h-3 w-3" />
              <span>Raise a claim</span>
            </button>
            <button
              className="flex items-center justify-center space-x-1 py-2 px-2 rounded font-semibold font-roboto text-xs transition-all duration-200"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
              }}
            >
              <Edit className="h-3 w-3" />
              <span>Request Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Dates Calendar */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Calendar
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="text-sm">Important Dates</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Calendar
              className="h-6 w-6 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Policy Start
            </p>
            <p
              className="text-sm font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {onFormatDate(
                policy.validFrom || policy.policyTerm?.startDate || ""
              )}
            </p>
          </div>
          <div
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Calendar
              className="h-6 w-6 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Policy End
            </p>
            <p
              className="text-sm font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {onFormatDate(policy.validTo || policy.policyTerm?.endDate || "")}
            </p>
          </div>
          <div
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Calendar
              className="h-6 w-6 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Next Payment
            </p>
            <p
              className="text-sm font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {onFormatDate(
                policy.validTo || policy.policyTerm?.renewalDate || ""
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Phone
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="text-sm">Emergency Contacts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <Phone
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-semibold font-poppins text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {contact.name}
                  </p>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {contact.phone}
                  </p>
                </div>
              </div>
              {contact.available24x7 && (
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-medium">
                  24x7
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyOverview;
