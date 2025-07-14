import React, { useState } from "react";
import { Button } from "../../components/UI/button";
import { Input } from "../../components/UI/input";
import { Separator } from "../../components/UI/separator";
import { UploadCloud } from "lucide-react";

const mockPolicies = [
  {
    id: "POL-HLTH-2024-001",
    type: "Health",
    name: "Star Health Family Floater",
  },
  { id: "POL-HLTH-2024-006", type: "Health", name: "Max Bupa Individual" },
  { id: "POL-MOTR-2024-002", type: "Motor", name: "ICICI Lombard Car" },
  { id: "POL-LIFE-2024-003", type: "Life", name: "LIC Jeevan Anand" },
  { id: "POL-TRVL-2024-004", type: "Travel", name: "HDFC ERGO Travel" },
  { id: "POL-HOME-2024-005", type: "Home", name: "Bajaj Allianz Home" },
];

const dependentsList = [
  { name: "Aarav Sharma", relation: "Son", dob: "2015-08-12" },
  { name: "Priya Sharma", relation: "Spouse", dob: "1988-03-22" },
];

export function RequestClaimForm() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [healthFor, setHealthFor] = useState("");
  const [selectedDependent, setSelectedDependent] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [hospitalDays, setHospitalDays] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalReason, setHospitalReason] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billFiles, setBillFiles] = useState<File[]>([]);

  // Get unique policy types
  const policyTypes = Array.from(new Set(mockPolicies.map((p) => p.type)));

  // Filter policies by selected type
  const filteredPolicies = selectedType
    ? mockPolicies.filter((p) => p.type === selectedType)
    : [];

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBillFiles(Array.from(e.target.files));
    }
  };

  return (
    <form className="space-y-6">
      {/* Insurance Type & Policy Selection Side by Side */}
      <div className="flex flex-col md:flex-row md:space-x-6 gap-4 md:gap-0">
        {/* Insurance Type */}
        <div className="flex-1">
          <label
            className="block text-sm font-semibold font-roboto mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            Insurance Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setSelectedPolicy("");
              setHealthFor("");
              setSelectedDependent("");
            }}
            className="w-full border-2 rounded-xl px-4 py-3 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-foreground)",
            }}
          >
            <option value="">Select Insurance Type</option>
            {policyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Policy Selection */}
        <div className="flex-1">
          <label
            className="block text-sm font-semibold font-roboto mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            Policy
          </label>
          <select
            value={selectedPolicy}
            onChange={(e) => {
              setSelectedPolicy(e.target.value);
              setHealthFor("");
              setSelectedDependent("");
            }}
            className="w-full border-2 rounded-xl px-4 py-3 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-foreground)",
            }}
            disabled={!selectedType}
          >
            <option value="">Select Policy</option>
            {filteredPolicies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Health Insurance Extra Fields */}
      {selectedType === "Health" && selectedPolicy && (
        <>
          <Separator className="my-4" />
          <div>
            <label
              className="block text-sm font-semibold font-roboto mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              Claiming for
            </label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={healthFor === "myself" ? "default" : "outline"}
                className={
                  healthFor === "myself"
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                    : ""
                }
                style={
                  healthFor === "myself"
                    ? { borderColor: "var(--color-primary)" }
                    : {}
                }
                onClick={() => {
                  setHealthFor("myself");
                  setSelectedDependent("");
                }}
              >
                Myself
              </Button>
              <Button
                type="button"
                variant={healthFor === "dependent" ? "default" : "outline"}
                className={
                  healthFor === "dependent"
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                    : ""
                }
                style={
                  healthFor === "dependent"
                    ? { borderColor: "var(--color-primary)" }
                    : {}
                }
                onClick={() => setHealthFor("dependent")}
              >
                Dependent
              </Button>
            </div>
          </div>
          {healthFor === "dependent" && (
            <div className="mt-4">
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Select Dependent
              </label>
              <select
                value={selectedDependent}
                onChange={(e) => setSelectedDependent(e.target.value)}
                className="w-full border-2 rounded-xl px-4 py-3 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                }}
              >
                <option value="">Select Dependent</option>
                {dependentsList.map((d, idx) => (
                  <option key={idx} value={d.name}>
                    {d.name} ({d.relation})
                  </option>
                ))}
              </select>
              {selectedDependent && (
                <div
                  className="mt-2 text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  {(() => {
                    const dep = dependentsList.find(
                      (d) => d.name === selectedDependent
                    );
                    return dep
                      ? `Relation: ${dep.relation}, DOB: ${dep.dob}`
                      : null;
                  })()}
                </div>
              )}
            </div>
          )}
          {/* Health Claim Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Date of Admission
              </label>
              <Input
                type="date"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                className="w-full"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                No. of Days in Hospital
              </label>
              <Input
                type="number"
                min={1}
                value={hospitalDays}
                onChange={(e) => setHospitalDays(e.target.value)}
                className="w-full"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Hospital Name
              </label>
              <Input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Hospital Address
              </label>
              <Input
                type="text"
                value={hospitalAddress}
                onChange={(e) => setHospitalAddress(e.target.value)}
                className="w-full"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Reason for Hospitalization
              </label>
              <Input
                type="text"
                value={hospitalReason}
                onChange={(e) => setHospitalReason(e.target.value)}
                className="w-full"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Total Bill Amount (₹)
              </label>
              <Input
                type="number"
                min={0}
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  borderColor: "var(--color-border)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold font-roboto mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Upload Hospital Bills
              </label>
              <div className="flex items-center gap-2">
                <label
                  className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-roboto shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    color: "white",
                  }}
                >
                  <UploadCloud className="h-5 w-5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {billFiles.length > 0 && (
                  <span
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {billFiles.length} file(s) selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {/* TODO: Add dynamic fields for other policy types as needed */}
      {/* Submit Button moved to modal footer */}
    </form>
  );
}
