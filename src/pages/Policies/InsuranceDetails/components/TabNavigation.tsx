import React from "react";
import {
  FileText,
  Car,
  Shield,
  Users,
  Heart,
  MapPin,
  Edit,
} from "lucide-react";
import { DashboardSection, Policy } from "../types";

interface TabNavigationProps {
  policy: Policy;
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  policy,
  activeSection,
  onSectionChange,
}) => {
  const getTabsForPolicyType = (policyType: string) => {
    switch (policyType?.toLowerCase()) {
      case "motor":
      case "two-wheeler":
        return [
          { id: "overview", label: "Overview", icon: FileText },
          { id: "vehicle", label: "Vehicle Info", icon: Car },
          { id: "coverage", label: "Coverage", icon: Shield },
          { id: "claims", label: "Claims", icon: Users },
          { id: "endorsements", label: "Endorsements", icon: Edit },
          { id: "documents", label: "Documents", icon: FileText },
        ];
      case "health":
        return [
          { id: "overview", label: "Overview", icon: FileText },
          { id: "benefits", label: "Benefits", icon: Heart },
          { id: "dependents", label: "Dependents", icon: Users },
          { id: "hospitals", label: "Network Hospitals", icon: MapPin },
          { id: "claims", label: "Claims", icon: Users },
          { id: "endorsements", label: "Endorsements", icon: Edit },
          { id: "documents", label: "Documents", icon: FileText },
        ];
      default:
        return [
          { id: "overview", label: "Overview", icon: FileText },
          { id: "coverage", label: "Coverage", icon: Shield },
          { id: "claims", label: "Claims", icon: Users },
          { id: "endorsements", label: "Endorsements", icon: Edit },
          { id: "documents", label: "Documents", icon: FileText },
        ];
    }
  };

  const tabs = getTabsForPolicyType(policy.type || policy.policyType || "");

  return (
    <div
      className="sticky top-0 z-30 backdrop-blur-md border-b"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSectionChange(tab.id as DashboardSection)}
                className={`flex items-center gap-1 px-2 py-1 rounded font-roboto text-xs font-medium transition-all duration-200 focus:outline-none whitespace-nowrap ${
                  isActive
                    ? "shadow-sm transform scale-105"
                    : "hover:opacity-80"
                }`}
                style={{
                  backgroundColor: isActive
                    ? "var(--color-card)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-muted)",
                  border: isActive
                    ? `1px solid var(--color-border)`
                    : "1px solid transparent",
                  minWidth: "auto",
                  height: isActive ? "32px" : "28px",
                  fontSize: isActive ? "0.95rem" : "0.85rem",
                  paddingLeft: isActive ? "0.75rem" : "0.5rem",
                  paddingRight: isActive ? "0.75rem" : "0.5rem",
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
