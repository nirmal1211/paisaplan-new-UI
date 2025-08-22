import React, { useState, useEffect } from "react";
import { X, BarChart3, ChevronLeft, Star, ArrowRight } from "lucide-react";
import { Provider } from "../../types/purchase";
import { mockProviders } from "../../data/purchaseData";

interface ComparisonPanelProps {
  selectedProviders: string[];
  onRemoveProvider: (providerId: string) => void;
  onClearAll: () => void;
  onCompare: () => void;
  onSelectProvider: (provider: Provider) => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  selectedProviders,
  onRemoveProvider,
  onClearAll,
  onCompare,
  onSelectProvider,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isMobile, setIsMobile] = useState(false); // Currently unused

  useEffect(() => {
    const checkMobile = () => {
      // setIsMobile(window.innerWidth < 768); // Currently unused
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const compareProviders = mockProviders.filter((p) =>
    selectedProviders.includes(p.id)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (selectedProviders.length === 0) return null;

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
        isExpanded ? "w-96" : "w-16"
      }`}
    >
      <div
        className="rounded-r-2xl shadow-2xl overflow-hidden border-r-2"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-primary)",
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-center transition-all duration-200 hover:opacity-90 relative"
          style={{ backgroundColor: "var(--color-primary)", color: "white" }}
        >
          {isExpanded ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <div className="flex flex-col items-center">
              <BarChart3 className="h-5 w-5 mb-1" />
              <span className="text-xs font-bold">
                {selectedProviders.length}
              </span>
            </div>
          )}

          {/* Pulse animation for attention */}
          {!isExpanded && selectedProviders.length > 0 && (
            <div className="absolute inset-0 rounded-r-2xl animate-pulse bg-white/20"></div>
          )}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-bold font-poppins text-lg"
                style={{ color: "var(--color-foreground)" }}
              >
                Compare ({selectedProviders.length}/3)
              </h3>
              <button
                onClick={onClearAll}
                className="p-1 rounded-lg hover:opacity-80 transition-colors text-xs font-medium"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                Clear All
              </button>
            </div>

            {/* Provider Cards */}
            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto custom-scrollbar">
              {compareProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="group border rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    borderColor: "var(--color-border)",
                  }}
                  onClick={() => onSelectProvider(provider)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className="font-semibold font-poppins truncate"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {provider.name}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveProvider(provider.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:opacity-80 transition-all"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(provider.rating)}
                        <span
                          className="text-xs font-roboto ml-1"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {provider.rating}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className="text-sm font-bold font-poppins"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {formatCurrency(provider.basePremium)}
                        </span>
                        <ArrowRight
                          className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>

                      {/* Quick features */}
                      <div className="mt-2 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span style={{ color: "var(--color-muted)" }}>
                            Hospitals:
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {provider.features.cashlessHospitals?.toLocaleString()}
                            +
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "var(--color-muted)" }}>
                            Claims:
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {provider.features.claimSettlementRatio}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compare Button */}
            <button
              onClick={onCompare}
              disabled={selectedProviders.length < 2}
              className="w-full py-3 px-4 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {selectedProviders.length < 2
                ? `Add ${2 - selectedProviders.length} more to compare`
                : `Compare All (${selectedProviders.length})`}
            </button>

            {/* Help Text */}
            <p
              className="text-xs font-roboto text-center mt-3"
              style={{ color: "var(--color-muted)" }}
            >
              Select up to 3 providers for detailed comparison
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPanel;
