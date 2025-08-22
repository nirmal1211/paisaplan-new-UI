import React from "react";
import {
  Edit,
  MapPin,
  Users,
  Shield,
  Car,
  Phone,
  FileText,
  Info,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
} from "lucide-react";
import { Policy, Endorsement } from "../types";

interface EndorsementsProps {
  policy: Policy;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => string;
}

const Endorsements: React.FC<EndorsementsProps> = ({
  policy,
  formatDate,
  getStatusColor,
}) => {
  return (
    <div className="space-y-6">
      {/* Request New Endorsement */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Edit className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
          <span>Request Policy Endorsement</span>
        </h3>
        <p
          className="font-roboto mb-6 text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Need to make changes to your policy? Request an endorsement for
          updates like address change, nominee details, coverage modifications,
          and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              type: "Address Change",
              description: "Update your registered address",
              icon: MapPin,
            },
            {
              type: "Nominee Update",
              description: "Change or add nominee details",
              icon: Users,
            },
            {
              type: "Coverage Enhancement",
              description: "Increase sum insured or add-ons",
              icon: Shield,
            },
            {
              type: "Vehicle Modification",
              description: "Update vehicle specifications",
              icon: Car,
            },
            {
              type: "Contact Update",
              description: "Change phone or email",
              icon: Phone,
            },
            {
              type: "Other Changes",
              description: "Any other policy modifications",
              icon: Edit,
            },
          ].map((endorsement, index) => {
            const Icon = endorsement.icon;
            return (
              <div
                key={index}
                className="border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-opacity-60"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {endorsement.type}
                    </h4>
                    <p
                      className="text-xs font-roboto mt-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {endorsement.description}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Request
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Endorsement History */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <FileText
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Endorsement History</span>
        </h3>

        {/* Sample endorsement data - in real app this would come from API */}
        {policy.endorsements && policy.endorsements.length > 0 ? (
          <div className="space-y-4">
            {policy.endorsements.map(
              (endorsement: Endorsement, index: number) => (
                <div
                  key={index}
                  className="border rounded-xl p-4"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <Edit
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-semibold font-poppins text-sm"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {endorsement.type}
                        </h4>
                        <p
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Endorsement #{endorsement.number}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        endorsement.status
                      )}`}
                    >
                      {endorsement.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Requested Date
                      </p>
                      <p
                        className="font-medium font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {formatDate(endorsement.requestedDate)}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Effective Date
                      </p>
                      <p
                        className="font-medium font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {endorsement.effectiveDate
                          ? formatDate(endorsement.effectiveDate)
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                  {endorsement.description && (
                    <div
                      className="mt-3 pt-3 border-t"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Description
                      </p>
                      <p
                        className="text-sm font-roboto mt-1"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {endorsement.description}
                      </p>
                    </div>
                  )}
                  {endorsement.status === "completed" && (
                    <div className="mt-3 flex space-x-2">
                      <button
                        className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <Eye className="h-4 w-4 inline mr-1" />
                        View Certificate
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
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          /* No endorsements */
          <div className="text-center py-8">
            <Edit
              className="h-12 w-12 mx-auto mb-4"
              style={{ color: "var(--color-muted)" }}
            />
            <p
              className="text-lg font-semibold font-poppins mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              No Endorsements Found
            </p>
            <p
              className="font-roboto mb-4"
              style={{ color: "var(--color-muted)" }}
            >
              You haven't requested any policy modifications yet.
            </p>
            <button
              className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Request Endorsement
            </button>
          </div>
        )}
      </div>

      {/* Important Notes */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Info className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
          <span>Important Information</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Processing Time
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Most endorsements are processed within 2-3 business days
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Documentation Required
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Supporting documents may be required based on the type of
                endorsement
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Premium Impact
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Some endorsements may result in premium adjustments
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Policy Terms
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                All endorsements are subject to policy terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endorsements;
