import React from "react";
import {
  FileText,
  MapPin,
  MessageSquare,
  Edit,
  CreditCard,
  Users,
} from "lucide-react";

export type TabType =
  | "overview"
  | "hospitals"
  | "claims"
  | "endorsements"
  | "faqs";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabClassName?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabClassName = "",
}) => {
  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: FileText },
    { id: "hospitals" as TabType, label: "Network Hospitals", icon: MapPin },
    { id: "claims" as TabType, label: "Claims History", icon: Users },
    { id: "endorsements" as TabType, label: "Endorsements", icon: Edit },
    { id: "faqs" as TabType, label: "FAQs", icon: MessageSquare },
  ];

  return (
    <div
      className="sticky top-20 z-30 backdrop-blur-md border-b"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide p-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "shadow-sm transform scale-105"
                    : "hover:opacity-80"
                } ${tabClassName}`}
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
                }}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
