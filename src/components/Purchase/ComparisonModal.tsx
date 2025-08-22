import React, { useEffect, useRef } from "react";
import {
  X,
  Star,
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Phone,
  Info,
} from "lucide-react";
import { Provider } from "../../types/purchase";
import { mockProviders } from "../../data/purchaseData";

interface ComparisonModalProps {
  isOpen: boolean;
  selectedProviders: string[];
  onClose: () => void;
  onSelectProvider: (provider: Provider) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  selectedProviders,
  onClose,
  onSelectProvider,
}) => {
  const compareProviders = mockProviders.filter((p) =>
    selectedProviders.includes(p.id),
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

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
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (!isOpen || compareProviders.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden animate-scale-in"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Compact Header */}
        <div
          className="p-4 border-b sticky top-0 z-10 backdrop-blur-md"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              Compare Providers ({compareProviders.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:opacity-80 transition-colors"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
              }}
              aria-label="Close comparison"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-60px)] custom-scrollbar">
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-1/4"></th>
                    {compareProviders.map((provider) => (
                      <th
                        key={provider.id}
                        className="w-1/4 px-3 py-4 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-14 h-14 rounded-full object-cover shadow-md mb-2"
                          />
                          <h3
                            className="font-bold font-poppins text-base"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {provider.name}
                          </h3>
                          <div className="flex items-center mt-1">
                            {renderStars(provider.rating)}
                            <span
                              className="ml-1 text-xs"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {provider.rating}
                            </span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Premium Row */}
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td
                      className="px-3 py-4 font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Premium</span>
                        <div className="group relative">
                          <Info
                            className="h-4 w-4 cursor-help"
                            style={{ color: "var(--color-muted)" }}
                          />
                          <div
                            className="absolute left-0 bottom-full mb-2 w-48 p-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
                            style={{
                              backgroundColor: "var(--color-foreground)",
                              color: "var(--color-background)",
                            }}
                          >
                            Base premium without add-ons
                          </div>
                        </div>
                      </div>
                    </td>
                    {compareProviders.map((provider) => (
                      <td key={provider.id} className="px-3 py-4 text-center">
                        <span
                          className="text-lg font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {formatCurrency(provider.basePremium)}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Network Row */}
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td
                      className="px-3 py-4 font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      <div className="flex items-center space-x-2">
                        <Users
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <span>Network</span>
                      </div>
                    </td>
                    {compareProviders.map((provider) => (
                      <td key={provider.id} className="px-3 py-4 text-center">
                        <span
                          className="font-semibold"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {provider.features.cashlessHospitals?.toLocaleString()}
                          +
                        </span>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-muted)" }}
                        >
                          hospitals
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Claims Row */}
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td
                      className="px-3 py-4 font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      <div className="flex items-center space-x-2">
                        <TrendingUp
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <span>Claims</span>
                      </div>
                    </td>
                    {compareProviders.map((provider) => (
                      <td key={provider.id} className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <span
                            className="font-semibold"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {provider.features.claimSettlementRatio}%
                          </span>
                          {provider.features.claimSettlementRatio >= 85 && (
                            <Check className="h-4 w-4 text-green-500 ml-1" />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Coverage Row */}
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td
                      className="px-3 py-4 font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      <div className="flex items-center space-x-2">
                        <Shield
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <span>Coverage</span>
                      </div>
                    </td>
                    {compareProviders.map((provider) => (
                      <td key={provider.id} className="px-3 py-4 text-center">
                        <span
                          className="font-semibold"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {provider.features.networkSize}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Support Row */}
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td
                      className="px-3 py-4 font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      <div className="flex items-center space-x-2">
                        <Phone
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <span>Support</span>
                      </div>
                    </td>
                    {compareProviders.map((provider) => (
                      <td key={provider.id} className="px-3 py-4 text-center">
                        <span
                          className="font-semibold"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {provider.features.customerSupport}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Key Benefits Row */}
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td
                      className="px-3 py-4 font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      <span>Key Benefits</span>
                    </td>
                    {compareProviders.map((provider) => (
                      <td key={provider.id} className="px-3 py-4">
                        <ul className="space-y-2">
                          {provider.keyBenefits
                            .slice(0, 3)
                            .map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0 mr-2" />
                                <span
                                  className="text-sm"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {benefit.length > 30
                                    ? `${benefit.substring(0, 30)}...`
                                    : benefit}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div
              className="mt-6 pt-4 border-t flex flex-wrap justify-center gap-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              {compareProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    onSelectProvider(provider);
                    onClose();
                  }}
                  className="flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-bold font-roboto text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <span>Select {provider.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
