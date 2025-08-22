import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogClose } from "./UI/dialog";
import { Search } from "lucide-react";
import { FileText, Shield } from "lucide-react";

// Dummy data for renewal policies (not using mockPolicies)
const dummyRenewalPolicies = [
  {
    id: "r1",
    policyNumber: "DUMMY1001",
    provider: "Future Generali",
    type: "Health",
    status: "Active",
    validFrom: "2024-07-01",
    validTo: "2025-06-30",
    sumInsured: "₹5,00,000",
    premium: "₹7,800",
    expiryDays: 12,
  },
  {
    id: "r2",
    policyNumber: "DUMMY1002",
    provider: "Tata AIG",
    type: "Motor",
    status: "Active",
    validFrom: "2024-08-01",
    validTo: "2025-07-31",
    sumInsured: "₹3,00,000",
    premium: "₹5,200",
    expiryDays: 25,
  },
  {
    id: "r3",
    policyNumber: "DUMMY1003",
    provider: "HDFC ERGO",
    type: "Two-wheeler",
    status: "Active",
    validFrom: "2024-07-15",
    validTo: "2025-07-14",
    sumInsured: "₹80,000",
    premium: "₹1,200",
    expiryDays: 5,
  },
];

const PolicyRenewalListModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("expiryDays");

  // Filter and sort dummy data
  const renewalPolicies = useMemo(() => {
    let filtered = dummyRenewalPolicies.filter(
      (p) =>
        p.policyNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.provider.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "expiryDays") {
      filtered = filtered.sort((a, b) => a.expiryDays - b.expiryDays);
    } else if (sort === "provider") {
      filtered = filtered.sort((a, b) => a.provider.localeCompare(b.provider));
    }
    return filtered;
  }, [search, sort]);

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
        {/* Header - Claim Stepper style */}
        <div
          className="p-4 border-b flex items-center gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          <FileText className="h-5 w-5 text-[var(--color-primary)] mr-2" />
          <span className="font-bold font-poppins text-base text-[var(--color-foreground)]">
            Renewal Policies
          </span>
        </div>
        {/* Compact Search and Sort */}
        <div
          className="flex items-center px-4 py-2 border-b gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search policies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-7 pr-2 py-1 border rounded font-roboto text-xs focus:outline-none focus:ring-1 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
              }}
            />
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3"
              style={{ color: "var(--color-muted)" }}
            />
          </div>
          <div className="flex-1" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-2 py-1 text-xs ml-auto"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-foreground)",
              background: "var(--color-background)",
            }}
          >
            <option value="expiryDays">Expiry</option>
            <option value="provider">Provider</option>
          </select>
        </div>
        {/* List of renewal policies - Claim Stepper card style */}
        <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 0 }}>
          {renewalPolicies.length === 0 ? (
            <div className="text-center text-[var(--color-muted)] font-roboto text-sm py-8 w-full">
              No renewal policies found.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {renewalPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className={`border rounded-xl shadow-md bg-[var(--color-background)] p-4 hover:shadow-lg transition-all duration-200 cursor-pointer`}
                  style={{ borderColor: "var(--color-border)" }}
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
                    Renewal
                  </span>
                  <div
                    className="flex space-x-2 pt-2 border-t mt-3 items-center"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      className="font-medium py-1 px-3 rounded-md transition-colors font-roboto text-white hover:opacity-90 text-xs"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        minWidth: 70,
                      }}
                    >
                      Renew
                    </button>
                    <button
                      className="font-medium py-1 px-3 rounded-md transition-colors font-roboto border border-[var(--color-primary)] text-[var(--color-primary)] bg-white hover:bg-gray-50 text-xs"
                      style={{ minWidth: 120 }}
                    >
                      Explore Other Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogClose className="absolute right-4 top-4" />
      </DialogContent>
    </Dialog>
  );
};

export default PolicyRenewalListModal;
