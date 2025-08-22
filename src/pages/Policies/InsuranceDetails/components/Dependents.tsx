import React from "react";
import { Users, CheckCircle, Shield, Info } from "lucide-react";
import { Policy, Dependent } from "../types";

interface DependentsProps {
  policy: Policy;
  onFormatDate: (dateString: string) => string;
  onGetStatusColor: (status: string) => string;
}

const Dependents: React.FC<DependentsProps> = ({
  policy,
  onFormatDate,
  onGetStatusColor,
}) => {
  // Mock dependents data - in real app this would come from policy data
  const dependents: Dependent[] = policy.dependents || [
    {
      id: "1",
      name: "Jane Doe",
      relationship: "Spouse",
      dateOfBirth: "1988-03-15",
      age: 37,
      sumInsured: "₹5,00,000",
      status: "Active",
      policyStartDate: "2024-01-15",
      claimHistory: {
        totalClaimed: 45000,
        pendingClaims: 15000,
        settledClaims: 30000,
        claimCount: 3,
      },
    },
    {
      id: "2",
      name: "Alex Doe",
      relationship: "Son",
      dateOfBirth: "2010-07-22",
      age: 14,
      sumInsured: "₹3,00,000",
      status: "Active",
      policyStartDate: "2024-01-15",
      claimHistory: {
        totalClaimed: 8500,
        pendingClaims: 0,
        settledClaims: 8500,
        claimCount: 1,
      },
    },
    {
      id: "3",
      name: "Emily Doe",
      relationship: "Daughter",
      dateOfBirth: "2015-11-08",
      age: 9,
      sumInsured: "₹3,00,000",
      status: "Active",
      policyStartDate: "2024-01-15",
      claimHistory: {
        totalClaimed: 0,
        pendingClaims: 0,
        settledClaims: 0,
        claimCount: 0,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-md font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Users
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Covered Dependents</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Users
              className="h-8 w-8 mx-auto mb-2"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-lg font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {dependents.length}
            </p>
            <p
              className="text-sm font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Total Dependents
            </p>
          </div>
          <div
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <CheckCircle
              className="h-8 w-8 mx-auto mb-2"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-lg font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {dependents.filter((d) => d.status === "Active").length}
            </p>
            <p
              className="text-sm font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Active Coverage
            </p>
          </div>
          <div
            className="text-center p-4 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Shield
              className="h-8 w-8 mx-auto mb-2"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-lg font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              ₹11,00,000
            </p>
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Total Coverage
            </p>
          </div>
        </div>
      </div>

      {/* Dependents List */}
      <div
        className="rounded-lg shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-md font-bold font-poppins flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Users
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Dependent Details</span>
          </h3>
        </div>

        <div className="space-y-4">
          {dependents.map((dependent) => (
            <div
              key={dependent.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Users
                      className="h-6 w-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {dependent.name}
                    </h4>
                    <p
                      className="font-roboto text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {dependent.relationship} • Age {dependent.age}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${onGetStatusColor(
                    dependent.status
                  )}`}
                >
                  {dependent.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Date of Birth
                  </p>
                  <p
                    className="font-medium font-poppins text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {onFormatDate(dependent.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Sum Insured
                  </p>
                  <p
                    className="font-medium font-poppins text-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {dependent.sumInsured}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Coverage Start
                  </p>
                  <p
                    className="font-medium font-poppins text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {onFormatDate(dependent.policyStartDate)}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Total Claims
                  </p>
                  <p className="font-medium font-poppins text-sm">
                    {dependent.claimHistory.claimCount} Claims
                  </p>
                </div>
              </div>

              {/* Claim History Section */}
              <div
                className="pt-4 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <h5
                  className="text-sm font-semibold font-poppins mb-3"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Claim History
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Total Claimed
                    </p>
                    <p
                      className="font-semibold font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      ₹{dependent.claimHistory.totalClaimed.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Settled Claims
                    </p>
                    <p className="font-semibold font-poppins text-sm text-green-600">
                      ₹{dependent.claimHistory.settledClaims.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Pending Claims
                    </p>
                    <p className="font-semibold font-poppins text-sm text-orange-600">
                      ₹{dependent.claimHistory.pendingClaims.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Progress Bar for Claims */}
                {dependent.claimHistory.totalClaimed > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Claim Utilization
                      </span>
                      <span
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {(
                          (dependent.claimHistory.totalClaimed /
                            parseInt(
                              dependent.sumInsured.replace(/[₹,]/g, "")
                            )) *
                          100
                        ).toFixed(1)}
                        % of Sum Insured
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="flex h-2 rounded-full overflow-hidden">
                        {/* Settled Claims Bar */}
                        <div
                          className="bg-green-500"
                          style={{
                            width: `${
                              (dependent.claimHistory.settledClaims /
                                parseInt(
                                  dependent.sumInsured.replace(/[₹,]/g, "")
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                        {/* Pending Claims Bar */}
                        <div
                          className="bg-orange-500"
                          style={{
                            width: `${
                              (dependent.claimHistory.pendingClaims /
                                parseInt(
                                  dependent.sumInsured.replace(/[₹,]/g, "")
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Settled
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {dependent.claimHistory.totalClaimed === 0 && (
                  <div className="text-center py-4">
                    <p
                      className="text-sm font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      No claims filed yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Limits */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-md font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Shield
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Coverage Information</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4
              className="font-semibold font-poppins text-sm mb-3"
              style={{ color: "var(--color-foreground)" }}
            >
              Family Floater Benefits
            </h4>
            <div className="space-y-2">
              {[
                "Shared sum insured across all family members",
                "No sub-limits for individual members",
                "Cumulative bonus applicable to entire family",
                "Cashless treatment for all dependents",
                "Pre and post hospitalization coverage",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-sm font-roboto"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4
              className="font-semibold font-poppins text-sm mb-3"
              style={{ color: "var(--color-foreground)" }}
            >
              Important Notes
            </h4>
            <div className="space-y-2">
              {[
                "Maternity coverage available after 2 years",
                "Pre-existing diseases covered after 2-4 years",
                "Annual health check-up for all members",
                "Dependent addition possible during renewal",
                "Age limits apply for dependent children",
              ].map((note, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-sm font-roboto"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dependents;
