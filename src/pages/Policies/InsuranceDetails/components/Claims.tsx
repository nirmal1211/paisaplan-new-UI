import React from "react";
import {
  AlertTriangle,
  FileText,
  Edit,
  Upload,
  Eye,
  Phone,
  Users,
  CheckCircle,
  RefreshCw,
  DollarSign,
  Download,
} from "lucide-react";
import { Policy } from "../types";

interface ClaimsProps {
  policy: Policy;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
}

const Claims: React.FC<ClaimsProps> = ({
  policy,
  formatDate,
  getStatusColor,
}) => {
  // Mock claims data - in real app this would come from API
  const claims = policy.claims || [
    {
      id: "CLM-2024-001",
      claimNumber: "CLM-2024-001",
      type: "Hospitalization",
      description: "Emergency surgery for appendicitis",
      dateOfIncident: "2024-06-15",
      dateSubmitted: "2024-06-18",
      status: "Settled",
      claimedAmount: 125000,
      settledAmount: 120000,
      hospital: "Apollo Hospital, Mumbai",
      dependent: "Jane Doe (Self)",
      documents: ["Medical bills", "Discharge summary", "Lab reports"],
      remarks: "Claim settled successfully after verification",
    },
    {
      id: "CLM-2024-002",
      claimNumber: "CLM-2024-002",
      type: "Diagnostic Tests",
      description: "Annual health check-up and blood tests",
      dateOfIncident: "2024-05-20",
      dateSubmitted: "2024-05-22",
      status: "Under Review",
      claimedAmount: 8500,
      settledAmount: 0,
      hospital: "Fortis Healthcare, Mumbai",
      dependent: "Alex Doe (Son)",
      documents: ["Test reports", "Prescription"],
      remarks: "Under medical review for coverage verification",
    },
    {
      id: "CLM-2024-003",
      claimNumber: "CLM-2024-003",
      type: "Emergency Treatment",
      description: "Fracture treatment after accident",
      dateOfIncident: "2024-04-10",
      dateSubmitted: "2024-04-12",
      status: "Rejected",
      claimedAmount: 45000,
      settledAmount: 0,
      hospital: "Lilavati Hospital, Mumbai",
      dependent: "Emily Doe (Daughter)",
      documents: ["X-ray reports", "Treatment bills"],
      remarks: "Claim rejected due to pre-existing condition exclusion",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Raise New Claim Section */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-md font-bold font-poppins mb-3 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
        >
          <AlertTriangle
            className="h-4 w-4"
            style={{ color: "var(--color-primary)" }}
          />
          <span style={{ fontSize: "0.95rem" }}>Raise a New Claim</span>
        </h3>
        <p
          className="font-roboto mb-4 text-xs"
          style={{ color: "var(--color-muted)" }}
        >
          Need to file a claim? Follow these simple steps to submit your claim
          quickly and easily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
          {[
            {
              step: "1",
              title: "Gather Documents",
              description: "Collect all medical bills, reports, and receipts",
              icon: FileText,
            },
            {
              step: "2",
              title: "Fill Claim Form",
              description: "Complete the claim form with accurate details",
              icon: Edit,
            },
            {
              step: "3",
              title: "Submit Online",
              description: "Upload documents and submit your claim",
              icon: Upload,
            },
            {
              step: "4",
              title: "Track Status",
              description: "Monitor your claim progress in real-time",
              icon: Eye,
            },
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="text-center p-2 rounded-lg border"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <span className="text-white font-bold font-poppins text-xs">
                    {step.step}
                  </span>
                </div>
                <Icon
                  className="h-4 w-4 mx-auto mb-1"
                  style={{ color: "var(--color-primary)" }}
                />
                <h4
                  className="font-semibold font-poppins text-xs mb-0.5"
                  style={{
                    color: "var(--color-foreground)",
                    fontSize: "0.85rem",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-[10px] font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            className="flex items-center justify-center space-x-2 py-2 px-2 rounded-lg font-medium font-roboto text-xs text-white transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "var(--color-primary)",
              fontSize: "0.85rem",
            }}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>File New Claim</span>
          </button>
          <button
            className="flex items-center justify-center space-x-2 py-2 px-2 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-primary)",
              fontSize: "0.85rem",
            }}
          >
            <Phone className="h-3 w-3" />
            <span>Call Support</span>
          </button>
          <button
            className="flex items-center justify-center space-x-2 py-2 px-2 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-primary)",
              fontSize: "0.85rem",
            }}
          >
            <FileText className="h-3 w-3" />
            <span>Download Forms</span>
          </button>
        </div>
      </div>

      {/* Claims Summary */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-base font-bold font-poppins mb-3 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
        >
          <Users
            className="h-4 w-4"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Claims Summary</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className="text-center p-2 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <FileText
              className="h-5 w-5 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-base font-bold font-poppins"
              style={{
                color: "var(--color-foreground)",
                fontSize: "0.95rem",
              }}
            >
              {claims.length}
            </p>
            <p
              className="text-[11px] font-roboto"
              style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
            >
              Total Claims
            </p>
          </div>
          <div
            className="text-center p-2 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <CheckCircle
              className="h-5 w-5 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-base font-bold font-poppins"
              style={{
                color: "var(--color-foreground)",
                fontSize: "0.95rem",
              }}
            >
              {
                claims.filter(
                  (c: unknown) => (c as { status: string }).status === "Settled"
                ).length
              }
            </p>
            <p
              className="text-[11px] font-roboto"
              style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
            >
              Settled
            </p>
          </div>
          <div
            className="text-center p-2 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <RefreshCw
              className="h-5 w-5 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-base font-bold font-poppins"
              style={{
                color: "var(--color-foreground)",
                fontSize: "0.95rem",
              }}
            >
              {
                claims.filter(
                  (c: unknown) =>
                    (c as { status: string }).status === "Under Review"
                ).length
              }
            </p>
            <p
              className="text-[11px] font-roboto"
              style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
            >
              Under Review
            </p>
          </div>
          <div
            className="text-center p-2 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <DollarSign
              className="h-5 w-5 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-base font-bold font-poppins"
              style={{
                color: "var(--color-foreground)",
                fontSize: "0.95rem",
              }}
            >
              ₹
              {claims
                .reduce(
                  (sum: number, claim: unknown) =>
                    sum + (claim as { settledAmount: number }).settledAmount,
                  0
                )
                .toLocaleString()}
            </p>
            <p
              className="text-[11px] font-roboto"
              style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
            >
              Total Settled
            </p>
          </div>
        </div>
      </div>

      {/* Claims History */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-sm font-bold font-poppins mb-5 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)", fontSize: "0.95rem" }}
        >
          <FileText
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Claims History</span>
        </h3>

        <div className="space-y-4">
          {claims.map((claim: unknown) => {
            const claimData = claim as {
              id: string;
              claimNumber: string;
              type: string;
              status: string;
              dateSubmitted: string;
              claimedAmount: number;
              settledAmount: number;
              description: string;
              dependent: string;
              documents: string[];
              remarks: string;
            };
            return (
              <div
                key={claimData.id}
                className="border rounded-xl p-4 hover:shadow-md transition-shadow"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <FileText
                        className="h-6 w-6"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div>
                      <h4
                        className="text-lg font-bold font-poppins"
                        style={{
                          color: "var(--color-foreground)",
                          fontSize: "1.05rem",
                        }}
                      >
                        {claimData.type}
                      </h4>
                      <p
                        className="font-roboto text-sm"
                        style={{
                          color: "var(--color-muted)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Claim #{claimData.claimNumber}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      claimData.status
                    )}`}
                  >
                    {claimData.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Date of Incident
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatDate(claimData.dateSubmitted)}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Hospital
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {claimData.description}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Claimed Amount
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      ₹{claimData.claimedAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Settled Amount
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{
                        color:
                          claimData.settledAmount > 0
                            ? "var(--color-primary)"
                            : "var(--color-muted)",
                      }}
                    >
                      {claimData.settledAmount > 0
                        ? `₹${claimData.settledAmount.toLocaleString()}`
                        : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Description
                  </p>
                  <p
                    className="font-roboto text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {claimData.description}
                  </p>
                </div>

                <div className="mb-3">
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Dependent
                  </p>
                  <p
                    className="font-roboto text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {claimData.dependent}
                  </p>
                </div>

                <div className="mb-3">
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Documents Submitted
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {claimData.documents.map((doc: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {claimData.remarks && (
                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Remarks
                    </p>
                    <p
                      className="font-roboto text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {claimData.remarks}
                    </p>
                  </div>
                )}

                <div
                  className="flex space-x-3 mt-4 pt-4 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    View Details
                  </button>
                  <button
                    className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  {claimData.status === "Under Review" && (
                    <button
                      className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Track Status
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Contact */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-base font-bold font-poppins mb-3 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
        >
          <Phone
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Need Help?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <Phone
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <div>
              <p
                className="font-semibold font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Claims Helpline
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                1800-123-CLAIM (24x7)
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 p-4 rounded-lg border"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <AlertTriangle
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <div>
              <p
                className="font-semibold font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Emergency Claims
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                File within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claims;
