import React, { useState } from "react";
import { Dialog, DialogContent } from "./UI/dialog";
import { Shield, Upload } from "lucide-react";

const policyTypes = [
  "Health",
  "Motor",
  "Two-wheeler",
  "Life",
  "Travel",
  "Home",
  "Fire",
  "Marine",
  "Cyber",
  "Professional",
];

const subTypes: Record<string, string[]> = {
  Motor: ["Car", "Commercial Vehicle"],
  "Two-wheeler": ["Bike", "Scooter"],
  Health: ["Individual", "Family Floater", "Senior Citizen"],
  // Add more as needed
};

const UploadPolicyModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setSelectedSubType("");
  };

  const handleSubTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubType(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      setSelectedType("");
      setSelectedSubType("");
      setFile(null);
      alert("Policy uploaded and digitized!");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-xl shadow-lg p-0 w-full max-w-lg flex flex-col"
        style={{
          backgroundColor: "var(--color-card)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header - like renewal modal */}
        <div
          className="p-4 border-b flex items-center gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Upload className="h-5 w-5 text-[var(--color-primary)] mr-2" />
          <span className="font-bold font-poppins text-base text-[var(--color-foreground)]">
            Upload & Digitize Policy
          </span>
        </div>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold mb-1 text-[var(--color-foreground)]">
              Policy Type
            </label>
            <select
              value={selectedType}
              onChange={handleTypeChange}
              className="border rounded px-2 py-1 text-xs w-full"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
                background: "var(--color-background)",
              }}
              required
            >
              <option value="">Select Policy Type</option>
              {policyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {selectedType && subTypes[selectedType] && (
            <div>
              <label className="block text-xs font-semibold mb-1 text-[var(--color-foreground)]">
                Sub Type
              </label>
              <select
                value={selectedSubType}
                onChange={handleSubTypeChange}
                className="border rounded px-2 py-1 text-xs w-full"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-foreground)",
                  background: "var(--color-background)",
                }}
                required
              >
                <option value="">Select Sub Type</option>
                {subTypes[selectedType].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold mb-1 text-[var(--color-foreground)]">
              Upload Document
            </label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="border rounded px-2 py-1 text-xs w-full"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
                background: "var(--color-background)",
              }}
              required
            />
            {file && (
              <span className="block mt-1 text-xs text-[var(--color-muted)]">
                {file.name}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white font-semibold py-2 px-4 rounded hover:bg-opacity-90 transition-colors text-xs mt-2"
            disabled={submitting}
          >
            {submitting ? "Uploading..." : "Submit & Digitize"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPolicyModal;
