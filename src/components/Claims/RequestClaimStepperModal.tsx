import React, { useState, useMemo } from "react";
import { FileText, Shield } from "lucide-react";
import { Input } from "../UI/input";
import { Button } from "../UI/button";
import { RequestClaimForm } from "./RequestClaimForm";
import { mockPolicies } from "../../data/mockData";

export function RequestClaimStepperModal() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("expiryDays");
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  // Move form state and submitting state to top-level (fixes React hooks error)
  const [form, setForm] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  // Sort and filter policies
  // Only show active policies
  const filteredPolicies = useMemo(() => {
    let filtered = mockPolicies.filter(
      (p) =>
        p.status &&
        p.status.toLowerCase() === "active" &&
        (p.policyNumber.toLowerCase().includes(search.toLowerCase()) ||
          p.provider.toLowerCase().includes(search.toLowerCase()) ||
          p.type.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === "expiryDays") {
      filtered = filtered.sort((a, b) => a.expiryDays - b.expiryDays);
    } else if (sort === "type") {
      filtered = filtered.sort((a, b) => a.type.localeCompare(b.type));
    }
    return filtered;
  }, [search, sort]);

  // Step 1: Select Policy
  if (step === 1) {
    return (
      <div className="flex flex-col h-full w-full  max-h-[80vh]">
        <div
          className="p-4 border-b flex items-center gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          <FileText className="h-5 w-5 text-[var(--color-primary)] mr-2" />
          <span className="font-bold font-poppins text-base text-[var(--color-foreground)]">
            Select Policy to Request Claim
          </span>
        </div>
        <div
          className="flex flex-col md:flex-row md:items-center gap-2 p-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Input
            placeholder="Search by Policy Number, Provider, or Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs md:text-sm max-w-xs"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-2 py-1 text-xs ml-auto"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-foreground)",
              background: "var(--color-background)",
            }}
          >
            <option value="expiryDays">Sort by Expiry</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
        <div className="flex-1  p-4 overflow-y-auto">
          {filteredPolicies.length === 0 ? (
            <div className="text-center text-[var(--color-muted)] font-roboto text-sm py-8 w-full">
              No policies found.
            </div>
          ) : (
            <div className="flex flex-col gap-4 ">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className={`border rounded-xl shadow-md bg-[var(--color-background)] p-4 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                    selectedPolicy && selectedPolicy.id === policy.id
                      ? "ring-2 ring-[var(--color-primary)]"
                      : ""
                  }`}
                  style={{ borderColor: "var(--color-border)" }}
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setTimeout(() => setStep(2), 200);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-[var(--color-primary)]" />
                    <span className="font-bold font-poppins text-sm text-[var(--color-foreground)] truncate">
                      {policy.provider}
                    </span>
                    <span className="text-xs font-roboto text-[var(--color-muted)] ml-2">
                      {policy.policyNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-roboto text-[var(--color-muted)]">
                    <span>
                      Type:{" "}
                      <span className="font-semibold text-[var(--color-foreground)]">
                        {policy.type}
                      </span>
                    </span>
                    <span className="ml-2">Status: {policy.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[var(--color-muted)]">
                      Sum Insured:
                    </span>
                    <span className="font-bold text-[var(--color-primary)]">
                      {policy.sumInsured}
                    </span>
                    <span className="ml-2 text-xs text-[var(--color-muted)]">
                      Premium:
                    </span>
                    <span className="font-bold text-[var(--color-foreground)]">
                      {policy.premium}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-xs font-bold ml-auto mt-2`}
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-foreground)",
                    }}
                  >
                    {policy.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Step 2: Show dynamic form based on policy type
  if (step === 2 && selectedPolicy) {
    // Map policy type to schema fields
    const getFieldsForPolicyType = (type) => {
      switch (type.toUpperCase()) {
        case "HEALTH":
        case "Health":
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            { name: "hospitalName", label: "Hospital Name", type: "text" },
            { name: "doctorName", label: "Doctor Name", type: "text" },
            { name: "diagnosisCode", label: "Diagnosis Code", type: "text" },
            {
              name: "treatmentDetails",
              label: "Treatment Details",
              type: "textarea",
            },
            { name: "admissionDate", label: "Admission Date", type: "date" },
            { name: "dischargeDate", label: "Discharge Date", type: "date" },
          ];
        case "MOTOR":
        case "Motor":
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            {
              name: "accidentType",
              label: "Accident Type",
              type: "select",
              options: [
                "COLLISION",
                "THEFT",
                "FIRE",
                "FLOOD",
                "VANDALISM",
                "OTHER",
              ],
            },
            { name: "vehicleDamage", label: "Vehicle Damage", type: "text" },
            {
              name: "repairEstimate",
              label: "Repair Estimate",
              type: "number",
            },
            { name: "garageName", label: "Garage Name", type: "text" },
            { name: "garageAddress", label: "Garage Address", type: "text" },
          ];
        case "LIFE":
        case "Life":
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            { name: "causeOfLoss", label: "Cause of Loss", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            {
              name: "deathCertificate",
              label: "Upload Death Certificate",
              type: "file",
            },
          ];
        case "TRAVEL":
        case "Travel":
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            {
              name: "description",
              label: "Incident Description",
              type: "textarea",
            },
            { name: "location", label: "Incident Location", type: "text" },
            {
              name: "supportingDocuments",
              label: "Upload Supporting Documents",
              type: "file",
            },
          ];
        case "HOME":
        case "Home":
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            { name: "causeOfLoss", label: "Cause of Loss", type: "text" },
            { name: "location", label: "Incident Location", type: "text" },
            { name: "description", label: "Description", type: "textarea" },
            {
              name: "supportingDocuments",
              label: "Upload Supporting Documents",
              type: "file",
            },
          ];
        case "PERSONAL_ACCIDENT":
        case "Personal Accident":
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            { name: "description", label: "Description", type: "textarea" },
            {
              name: "supportingDocuments",
              label: "Upload Supporting Documents",
              type: "file",
            },
          ];
        default:
          return [
            {
              name: "claimType",
              label: "Claim Type",
              type: "text",
              required: true,
            },
            {
              name: "incidentDate",
              label: "Incident Date",
              type: "date",
              required: true,
            },
            {
              name: "claimAmount",
              label: "Claim Amount",
              type: "number",
              required: true,
            },
            { name: "description", label: "Description", type: "textarea" },
          ];
      }
    };

    const fields = getFieldsForPolicyType(selectedPolicy.type);

    const handleChange = (e: React.ChangeEvent<any>, field: any) => {
      const value = field.type === "file" ? e.target.files[0] : e.target.value;
      setForm((prev: any) => ({ ...prev, [field.name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      // Simulate submit
      setTimeout(() => {
        setSubmitting(false);
        setStep(1);
        setForm({});
        setSelectedPolicy(null);
        alert("Claim submitted!");
      }, 1200);
    };

    return (
      <div className="flex flex-col h-full w-full max-h-[80vh]">
        <div
          className="p-4 border-b flex items-center gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          <FileText className="h-5 w-5 text-[var(--color-primary)] mr-2" />
          <span className="font-bold font-poppins text-base text-[var(--color-foreground)]">
            Claim Details for {selectedPolicy.type}
          </span>
        </div>
        <form className="flex-1 overflow-y-auto p-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-foreground)]">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {field.type === "text" && (
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 text-sm"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                    value={form[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                  />
                )}
                {field.type === "number" && (
                  <input
                    type="number"
                    className="border rounded-lg px-3 py-2 text-sm"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                    value={form[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                  />
                )}
                {field.type === "date" && (
                  <input
                    type="date"
                    className="border rounded-lg px-3 py-2 text-sm"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                    value={form[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    className="border rounded-lg px-3 py-2 text-sm col-span-2"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                    value={form[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                  />
                )}
                {field.type === "select" && (
                  <select
                    className="border rounded-lg px-3 py-2 text-sm"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                    value={form[field.name] || ""}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                  >
                    <option value="">Select</option>
                    {field.options &&
                      field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                )}
                {field.type === "file" && (
                  <input
                    type="file"
                    className="border rounded-lg px-3 py-2 text-sm"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep(1)}
            >
              Back to Policy Selection
            </Button>
            <div className="flex-1" />
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="flex items-center gap-2 shadow-lg px-3 py-2 text-xs"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                color: "white",
                borderRadius: "0.75rem",
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
              }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Claim"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return null;
}
