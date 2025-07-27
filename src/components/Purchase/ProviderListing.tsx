import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchase } from "../../contexts/PurchaseContext";
import { mockProviders } from "../../data/purchaseData";
import { Provider } from "../../types/purchase";
import {
  Star,
  Check,
  ArrowRight,
  Users,
  Shield,
  Phone,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Award,
  HelpCircle,
  MessageCircle,
  Clock,
  Zap,
  Heart,
  Car,
  Home,
  Briefcase,
  Activity,
  User,
  Calendar,
  MapPin,
  IndianRupee,
} from "lucide-react";
import ComparisonPanel from "./ComparisonPanel";
import ComparisonModal from "./ComparisonModal";

const ProviderListing: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleProviderSelect = (providerId: string) => {
    if (
      selectedProviders.length >= 3 &&
      !selectedProviders.includes(providerId)
    ) {
      alert("You can compare maximum 3 providers");
      return;
    }

    const newSelection = selectedProviders.includes(providerId)
      ? selectedProviders.filter((id) => id !== providerId)
      : [...selectedProviders, providerId];

    setSelectedProviders(newSelection);
    dispatch({ type: "SET_SELECTED_PROVIDERS", payload: newSelection });
  };

  const handleProviderDetails = (provider: Provider) => {
    dispatch({ type: "SET_CURRENT_PROVIDER", payload: provider });
    navigate(`/buy-policy/provider/${provider.id}`);
  };

  const handleRemoveProvider = (providerId: string) => {
    const newSelection = selectedProviders.filter((id) => id !== providerId);
    setSelectedProviders(newSelection);
    dispatch({ type: "SET_SELECTED_PROVIDERS", payload: newSelection });
  };

  const handleClearAll = () => {
    setSelectedProviders([]);
    dispatch({ type: "SET_SELECTED_PROVIDERS", payload: [] });
  };

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

  return (
    <div
      className="min-h-screen py-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header Section */}
        <div className="mb-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center space-x-2 mb-4 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{ 
              color: "var(--color-primary)",
              backgroundColor: "var(--color-secondary)"
            }}
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-medium font-roboto">Back</span>
          </button>

          {/* Header Title */}
          <div className="text-center mb-6">
            <h1
              className="text-2xl lg:text-3xl font-bold font-poppins mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              Choose Your Insurance Provider
            </h1>
            <p
              className="text-sm font-roboto max-w-2xl mx-auto"
              style={{ color: "var(--color-muted)" }}
            >
              Compare top-rated providers and find the perfect {state.policyType.replace("-", " ")} policy for your needs
            </p>
            
            {/* Quick Stats */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="text-center">
                <div 
                  className="text-lg font-bold font-poppins"
                  style={{ color: "var(--color-primary)" }}
                >
                  {mockProviders.length}
                </div>
                <div 
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Providers
                </div>
              </div>
              <div className="text-center">
                <div 
                  className="text-lg font-bold font-poppins"
                  style={{ color: "var(--color-primary)" }}
                >
                  24/7
                </div>
                <div 
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Support
                </div>
              </div>
              <div className="text-center">
                <div 
                  className="text-lg font-bold font-poppins"
                  style={{ color: "var(--color-primary)" }}
                >
                  100%
                </div>
                <div 
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Transparent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Details Card - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* User Details Card */}
              <div 
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)"
                }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-sm font-bold font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Your Details
                    </h3>
                    <p 
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Insurance requirements
                    </p>
                  </div>
                </div>

                {/* User Information */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Name:
                    </span>
                    <span 
                      className="text-xs font-medium font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {state.personalDetails?.name || "John Doe"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Age:
                    </span>
                    <span 
                      className="text-xs font-medium font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {state.personalDetails?.age || "28"} years
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      City:
                    </span>
                    <span 
                      className="text-xs font-medium font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {state.personalDetails?.city || "Mumbai"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Policy Type:
                    </span>
                    <span 
                      className="text-xs font-medium font-roboto capitalize px-2 py-0.5 rounded-full"
                      style={{ 
                        color: "var(--color-primary)",
                        backgroundColor: "var(--color-secondary)"
                      }}
                    >
                      {state.policyType.replace("-", " ")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Coverage:
                    </span>
                    <span 
                      className="text-xs font-medium font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatCurrency(state.coverageAmount || 500000)}
                    </span>
                  </div>

                  {state.familyMembers && (
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Family Size:
                      </span>
                      <span 
                        className="text-xs font-medium font-roboto"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {state.familyMembers} members
                      </span>
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="w-full mt-3 py-1.5 px-3 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    color: "var(--color-primary)",
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-secondary)"
                  }}
                >
                  <span className="text-xs font-medium font-roboto">Edit Details</span>
                </button>
              </div>

              {/* Help Section */}
              <div
                className="rounded-xl shadow-md p-4 text-center border"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="mb-3">
                  <div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <HelpCircle
                      className="w-6 h-6"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <h3
                    className="text-sm font-bold font-poppins mb-1"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Need Help?
                  </h3>
                  <p
                    className="text-xs font-roboto mb-3"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Expert guidance for the right policy.
                  </p>
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-center space-x-1.5">
                    <Check className="w-2.5 h-2.5 text-green-500" />
                    <span
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Free consultation
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-1.5">
                    <Check className="w-2.5 h-2.5 text-green-500" />
                    <span
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Expert recommendations
                    </span>
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-center space-x-1.5 py-2 px-2 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  onClick={() => {
                    console.log("Talk to expert clicked");
                  }}
                >
                  <MessageCircle className="h-3 w-3" />
                  <span className="text-xs">Talk to Expert</span>
                </button>

                <p
                  className="text-xs font-roboto mt-2"
                  style={{ color: "var(--color-muted)" }}
                >
                  9 AM - 9 PM
                </p>
              </div>
            </div>
          </div>

          {/* Provider Cards - Right Content */}
          <div className="lg:col-span-3 space-y-3">
            {mockProviders.map((provider, index) => (
              <div
                key={provider.id}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border ${
                  selectedProviders.includes(provider.id) 
                    ? "shadow-md scale-[1.01]" 
                    : "shadow-sm hover:shadow-md"
                }`}
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: selectedProviders.includes(provider.id)
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                  borderWidth: selectedProviders.includes(provider.id) ? "2px" : "1px"
                }}
              >
                {/* Selection Indicator */}
                {selectedProviders.includes(provider.id) && (
                  <div 
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  ></div>
                )}

                <div className="p-4">
                  {/* Header Row - Compact */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {/* Compact Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedProviders.includes(provider.id)}
                        onChange={() => handleProviderSelect(provider.id)}
                        className="w-4 h-4 rounded transition-all duration-200"
                        style={{ 
                          accentColor: "var(--color-primary)"
                        }}
                      />

                      {/* Provider Identity - Compact */}
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-10 h-10 rounded-lg object-cover shadow-sm"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: "var(--color-success)" }}>
                            <Check className="w-1.5 h-1.5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3
                            className="text-base font-bold font-poppins mb-0.5"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {provider.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(provider.rating)}
                              <span
                                className="text-xs font-medium font-roboto ml-1"
                                style={{ color: "var(--color-primary)" }}
                              >
                                {provider.rating}
                              </span>
                            </div>
                            <span
                              className="text-xs font-roboto px-1.5 py-0.5 rounded-full"
                              style={{ 
                                color: "var(--color-muted)",
                                backgroundColor: "var(--color-secondary)"
                              }}
                            >
                              {provider.reviewCount || "2.5k"} reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Premium Display - Compact */}
                    <div className="text-right">
                      <div className="flex items-baseline space-x-1">
                        <span
                          className="text-xl font-bold font-poppins"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {formatCurrency(provider.basePremium).replace(/,/g, ',')}
                        </span>
                        <span
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          /year
                        </span>
                      </div>
                      <div className="flex items-center justify-end space-x-1 mt-0.5">
                        <Zap className="w-2.5 h-2.5 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">Best Value</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Row - Compact */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div
                      className="text-center py-2 px-2 rounded-lg border"
                      style={{ 
                        backgroundColor: "var(--color-secondary)",
                        borderColor: "var(--color-border)"
                      }}
                    >
                      <div
                        className="text-sm font-bold font-poppins mb-0.5"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {provider.features.cashlessHospitals?.toLocaleString()}+
                      </div>
                      <div
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Hospitals
                      </div>
                    </div>

                    <div
                      className="text-center py-2 px-2 rounded-lg border"
                      style={{ 
                        backgroundColor: "var(--color-secondary)",
                        borderColor: "var(--color-border)"
                      }}
                    >
                      <div
                        className="text-sm font-bold font-poppins mb-0.5"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {provider.features.claimSettlementRatio}%
                      </div>
                      <div
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Claims
                      </div>
                    </div>

                    <div
                      className="text-center py-2 px-2 rounded-lg border"
                      style={{ 
                        backgroundColor: "var(--color-secondary)",
                        borderColor: "var(--color-border)"
                      }}
                    >
                      <div
                        className="text-sm font-bold font-poppins mb-0.5"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {provider.features.customerSupport}
                      </div>
                      <div
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Support
                      </div>
                    </div>

                    <div
                      className="text-center py-2 px-2 rounded-lg border"
                      style={{ 
                        backgroundColor: "var(--color-secondary)",
                        borderColor: "var(--color-border)"
                      }}
                    >
                      <div
                        className="text-sm font-bold font-poppins mb-0.5"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        2-3
                      </div>
                      <div
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Days
                      </div>
                    </div>
                  </div>

                  {/* Key Benefits - Compact Horizontal */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {provider.keyBenefits.slice(0, 4).map((benefit, index) => (
                        <div 
                          key={index} 
                          className="flex items-center space-x-1.5 px-2 py-1 rounded-full border"
                          style={{ 
                            backgroundColor: "var(--color-card)",
                            borderColor: "var(--color-border)"
                          }}
                        >
                          <Check className="h-2.5 w-2.5 text-green-500 flex-shrink-0" />
                          <span
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Row - Compact */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleProviderDetails(provider)}
                        className="group flex items-center space-x-1.5 px-4 py-1.5 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <span className="text-xs">View Details</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>

                      <button
                        onClick={() => handleProviderSelect(provider.id)}
                        className={`group flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium font-roboto transition-all duration-200 hover:scale-105 border text-xs ${
                          selectedProviders.includes(provider.id)
                            ? "text-white"
                            : ""
                        }`}
                        style={{
                          backgroundColor: selectedProviders.includes(provider.id)
                            ? "var(--color-primary)"
                            : "var(--color-card)",
                          color: selectedProviders.includes(provider.id)
                            ? "white"
                            : "var(--color-primary)",
                          borderColor: "var(--color-primary)"
                        }}
                      >
                        <BarChart3 className="h-3 w-3" />
                        <span>{selectedProviders.includes(provider.id) ? "Added" : "Compare"}</span>
                      </button>
                    </div>

                    {/* Quick Action Icons - Compact */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                        title="Quick Quote"
                      >
                        <Clock className="w-3 h-3" style={{ color: "var(--color-primary)" }} />
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                        title="Customer Support"
                      >
                        <Phone className="w-3 h-3" style={{ color: "var(--color-primary)" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Persistent Comparison Panel */}
        <ComparisonPanel
          selectedProviders={selectedProviders}
          onRemoveProvider={handleRemoveProvider}
          onClearAll={handleClearAll}
          onCompare={() => setShowComparison(true)}
          onSelectProvider={handleProviderDetails}
        />

        {/* Comparison Modal */}
        <ComparisonModal
          isOpen={showComparison}
          selectedProviders={selectedProviders}
          onClose={() => setShowComparison(false)}
          onSelectProvider={handleProviderDetails}
        />
      </div>
    </div>
  );
};

export default ProviderListing;
