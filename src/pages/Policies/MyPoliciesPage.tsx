import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Shield,
  FileText,
  ChevronDown,
  Search,
  X,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { mockPolicies, insuranceSlides } from "../../data/mockData";
import InsuranceCarousel from "../../components/UI/carousel-insurance";
import UploadPolicyModal from "../../components/UploadPolicyModal";
import PolicyRenewalListModal from "../../components/PolicyRenewalListModal";

const MyPoliciesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "active" | "verification" | "expired"
  >("active");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Get the policy with the nearest expiry for renewal card
  const nearestExpiryPolicy = useMemo(() => {
    const activePolicies = mockPolicies.filter(
      (p) => p.status === "Active" && p.expiryDays > 0
    );
    return activePolicies.reduce((nearest, current) =>
      current.expiryDays < nearest.expiryDays ? current : nearest
    );
  }, []);

  // Filter policies based on selected filters and search query
  const filteredPolicies = useMemo(() => {
    return mockPolicies.filter((policy) => {
      const typeMatch = typeFilter === "all" || policy.type === typeFilter;
      const searchMatch =
        searchQuery === "" ||
        policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.type.toLowerCase().includes(searchQuery.toLowerCase());

      return typeMatch && searchMatch;
    });
  }, [typeFilter, searchQuery]);

  // Separate verification pending and active policies
  const verificationPendingPolicies = useMemo(() => {
    return filteredPolicies.filter(
      (policy) => policy.status === "Verification Pending"
    );
  }, [filteredPolicies]);

  const activePolicies = useMemo(() => {
    return filteredPolicies.filter(
      (policy) =>
        policy.status !== "Verification Pending" && policy.status !== "Expired"
    );
  }, [filteredPolicies]);

  const expiredPolicies = useMemo(() => {
    return filteredPolicies.filter((policy) => policy.status === "Expired");
  }, [filteredPolicies]);

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

  /**
   * Handles navigation to vehicle insurance details page with comprehensive data validation
   * and premium calculator integration
   */

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Verification Pending":
        return "bg-orange-100 text-orange-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h1
                className="text-base md:text-lg font-bold font-poppins mb-0.5"
                style={{ color: "var(--color-foreground)" }}
              >
                My Policies
              </h1>
              <p
                className="font-roboto text-[11px] md:text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                Manage and track all your insurance policies in one place
              </p>
            </div>

            {/* Policy View Controls - Only show when on verification, active, or expired tabs */}
            {(activeTab === "verification" ||
              activeTab === "active" ||
              activeTab === "expired") && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Policy Statistics */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span
                      className="font-roboto text-xs font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {verificationPendingPolicies.length} Pending
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span
                      className="font-roboto text-xs font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {
                        activePolicies.filter((p) => p.status === "Active")
                          .length
                      }{" "}
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span
                      className="font-roboto text-xs font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {expiredPolicies.length} Expired
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span
                      className="font-roboto text-xs font-medium"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {filteredPolicies.length} Total
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Section - 3 Column Flex - Full Width, No Overflow, Responsive */}
        <div className="flex flex-col md:flex-row gap-2 mb-3 w-full">
          {/* Column 1 - Renewal Card */}
          <div className="flex-1 min-w-0 rounded-md shadow group overflow-visible bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white flex flex-col justify-between min-h-[170px] h-[170px] max-w-full">
            {/* Top: Title, Pending Count, and Days */}
            <div className="flex items-center justify-between mb-1 p-2.5 w-full">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 opacity-80" />
                <h2 className="text-sm font-bold font-poppins">Renewal Due</h2>
                <span className="ml-2 bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {
                    mockPolicies.filter(
                      (p) =>
                        p.status === "Active" &&
                        p.expiryDays > 0 &&
                        p.expiryDays <= 30
                    ).length
                  }{" "}
                  Pending
                </span>
              </div>
              <div className="bg-white/10 rounded px-2 py-1 flex flex-col items-center min-w-[48px]">
                <span className="text-base font-bold font-poppins leading-none">
                  {nearestExpiryPolicy.expiryDays}
                </span>
                <span className="text-[10px] font-roboto opacity-80 leading-none">
                  Days
                </span>
              </div>
            </div>

            {/* Policy Type & Provider - prominent, below title */}
            <div className="flex flex-row gap-3 px-2.5 mb-1 w-full">
              <div className="flex flex-col">
                <span className="font-roboto text-[11px] opacity-80">Type</span>
                <span className="font-poppins text-xs font-semibold">
                  {nearestExpiryPolicy.type}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-roboto text-[11px] opacity-80">
                  Provider
                </span>
                <span className="font-poppins text-xs font-semibold">
                  {nearestExpiryPolicy.provider}
                </span>
              </div>
            </div>

            {/* Remaining fields - Policy#, Sum Insured, Premium */}
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 px-2.5 mb-2 w-full text-xs items-center">
              <div className="flex flex-col min-w-[90px]">
                <span className="font-roboto text-[11px] opacity-80">
                  Policy#
                </span>
                <span className="font-poppins font-semibold truncate">
                  {nearestExpiryPolicy.policyNumber}
                </span>
              </div>
              <div className="flex flex-col min-w-[90px]">
                <span className="font-roboto text-[11px] opacity-80">
                  Sum Insured
                </span>
                <span className="font-poppins font-semibold truncate">
                  {nearestExpiryPolicy.sumInsured}
                </span>
              </div>
              <div className="flex flex-col min-w-[90px]">
                <span className="font-roboto text-[11px] opacity-80">
                  Premium
                </span>
                <span className="font-poppins font-semibold truncate">
                  {nearestExpiryPolicy.premium}
                </span>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-1 px-2.5 mb-2 w-full items-center">
              <button
                className="bg-white font-semibold py-1 px-3 rounded hover:bg-gray-50 transition-colors font-roboto text-[11px] text-center"
                style={{ color: "var(--color-primary)", minWidth: 80 }}
              >
                Renew
              </button>
              <button
                className="bg-white font-semibold py-1 px-3 rounded hover:bg-gray-50 transition-colors font-roboto text-[11px] text-center border border-[var(--color-primary)] ml-1"
                style={{ color: "var(--color-primary)", minWidth: 120 }}
              >
                Explore Other Plan
              </button>
              {/* More button opens modal */}
              <PolicyRenewalListModal
                open={showRenewalModal}
                onOpenChange={setShowRenewalModal}
              />
              <button
                className="text-center text-white/80 hover:text-white text-[10px] font-roboto underline ml-2"
                onClick={() => setShowRenewalModal(true)}
                style={{ minWidth: 48 }}
              >
                More
              </button>
            </div>
          </div>
          {/* Column 2 - Insurance Carousel - Full Width, No Overflow */}
          <div className="flex-1 min-w-0 rounded-md shadow bg-[var(--color-card)] flex flex-col justify-center min-h-[170px] h-[170px] max-w-full overflow-visible">
            <div className="flex items-center justify-center h-full w-full p-0">
              <div className="w-full h-full flex items-center justify-center px-0">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <InsuranceCarousel slides={insuranceSlides} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Column 3 - Upload & Digitize Policy */}
          <div className="flex-1 min-w-0 rounded-md shadow bg-[var(--color-card)] flex flex-col justify-center items-center min-h-[170px] h-[170px] max-w-full overflow-visible">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="font-poppins font-semibold text-sm mb-2 text-[var(--color-foreground] text-center">
                Upload & Digitize Any Policy
              </span>
              <span className="font-roboto text-xs mb-4 text-[var(--color-muted)] text-center">
                Upload your existing policy document to digitize and manage it
                here.
              </span>
              <button
                className="bg-[var(--color-primary)] text-white font-semibold py-1.5 px-4 rounded hover:bg-opacity-90 transition-colors text-xs"
                onClick={() => setShowUploadModal(true)}
              >
                Upload Policy
              </button>
              <UploadPolicyModal
                open={showUploadModal}
                onOpenChange={setShowUploadModal}
              />
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div
          className="rounded-xl shadow-lg p-2 mb-3"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xs">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                style={{ color: "var(--color-muted)" }}
              />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 border rounded-md font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  "--tw-ring-color": "var(--color-primary)",
                }}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-muted)" }}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none border rounded-md px-2 py-1.5 pr-6 font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-foreground)",
                    "--tw-ring-color": "var(--color-primary)",
                  }}
                >
                  <option value="all">All Types</option>
                  {policyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                  style={{ color: "var(--color-muted)" }}
                />
              </div>

              {/* Tabs */}
              <div
                className="flex rounded-md p-0.5"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-2.5 py-1.5 rounded font-medium font-roboto text-xs transition-all ${
                    activeTab === "active" ? "shadow-sm" : "hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "active"
                        ? "var(--color-card)"
                        : "transparent",
                    color:
                      activeTab === "active"
                        ? "var(--color-success)"
                        : "var(--color-muted)",
                  }}
                >
                  <CheckCircle className="h-3 w-3 inline mr-1" />
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("verification")}
                  className={`px-2.5 py-1.5 rounded font-medium font-roboto text-xs transition-all ${
                    activeTab === "verification"
                      ? "shadow-sm"
                      : "hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "verification"
                        ? "var(--color-card)"
                        : "transparent",
                    color:
                      activeTab === "verification"
                        ? "var(--color-warning)"
                        : "var(--color-muted)",
                  }}
                >
                  <Clock className="h-3 w-3 inline mr-1" />
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("expired")}
                  className={`px-2.5 py-1.5 rounded font-medium font-roboto text-xs transition-all ${
                    activeTab === "expired" ? "shadow-sm" : "hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "expired"
                        ? "var(--color-card)"
                        : "transparent",
                    color:
                      activeTab === "expired"
                        ? "var(--color-destructive)"
                        : "var(--color-muted)",
                  }}
                >
                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                  Expired
                </button>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery &&
            (activeTab === "verification" ||
              activeTab === "active" ||
              activeTab === "expired") && (
              <div
                className="mt-2 pt-2 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Found {filteredPolicies.length} result
                  {filteredPolicies.length !== 1 ? "s" : ""} for "{searchQuery}"
                  {verificationPendingPolicies.length > 0 && (
                    <span className="ml-2 text-orange-600">
                      ({verificationPendingPolicies.length} pending
                      verification)
                    </span>
                  )}
                </p>
              </div>
            )}
        </div>

        {/* Content Area */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {/* Active Policies Section */}
            {activePolicies.length > 0 ? (
              <div
                className="rounded-xl shadow-lg overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {/* Policies Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {activePolicies.map((policy) => (
                      <div
                        key={policy.id}
                        className="rounded-lg shadow group overflow-hidden bg-[var(--color-card)] hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100"
                        style={{ fontSize: "13px" }}
                      >
                        <div className="p-3">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div
                                className="p-1.5 rounded-md"
                                style={{
                                  backgroundColor: "var(--color-secondary)",
                                }}
                              >
                                <Shield
                                  className="h-4 w-4"
                                  style={{ color: "var(--color-primary)" }}
                                />
                              </div>
                              <div>
                                <h3
                                  className="font-semibold font-poppins text-sm"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {policy.provider}
                                </h3>
                                <p
                                  className="text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  {policy.type} Insurance
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                policy.status
                              )}`}
                            >
                              {policy.status}
                            </span>
                          </div>

                          {/* Policy Details */}
                          <div className="space-y-2 mb-3">
                            <div>
                              <p
                                className="text-xs font-roboto"
                                style={{ color: "var(--color-muted)" }}
                              >
                                Policy Number
                              </p>
                              <p
                                className="font-semibold font-poppins text-sm"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {policy.policyNumber}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p
                                  className="text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  Valid From
                                </p>
                                <p
                                  className="font-medium font-roboto text-xs"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {formatDate(policy.validFrom)}
                                </p>
                              </div>
                              <div>
                                <p
                                  className="text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  Valid To
                                </p>
                                <p
                                  className="font-medium font-roboto text-xs"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {formatDate(policy.validTo)}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p
                                  className="text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  Sum Insured
                                </p>
                                <p
                                  className="font-semibold font-poppins text-sm"
                                  style={{ color: "var(--color-primary)" }}
                                >
                                  {policy.sumInsured}
                                </p>
                              </div>
                              <div>
                                <p
                                  className="text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  Premium
                                </p>
                                <p
                                  className="font-semibold font-poppins text-sm"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {policy.premium}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div
                            className="flex space-x-2 pt-2 border-t"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <button
                              onClick={() => {
                                setIsNavigating(true);
                                navigate(`/insurance-details/${policy.id}`, {
                                  state: {
                                    policy: {
                                      ...policy,
                                      type: policy.type,
                                      category: policy.type,
                                      policyType: policy.type,
                                      policyNumber: policy.policyNumber,
                                      provider: policy.provider,
                                      status: policy.status,
                                      sumInsured: policy.sumInsured,
                                      premium: policy.premium,
                                      validFrom: policy.validFrom,
                                      validTo: policy.validTo,
                                      policyTerm: {
                                        startDate: policy.validFrom,
                                        endDate: policy.validTo,
                                        renewalDate: policy.validTo,
                                      },
                                    },
                                    returnPath: "/my-policy",
                                  },
                                });
                                setTimeout(() => setIsNavigating(false), 1000);
                              }}
                              disabled={isNavigating}
                              className="flex-1 font-medium py-2 px-3 rounded-md transition-colors font-roboto text-white hover:opacity-90 disabled:opacity-50 text-xs"
                              style={{
                                backgroundColor: "var(--color-primary)",
                              }}
                            >
                              {isNavigating ? "Loading..." : "View Details"}
                            </button>
                            <button
                              className="flex items-center justify-center p-2 rounded-md transition-colors"
                              style={{
                                backgroundColor: "var(--color-secondary)",
                                color: "var(--color-primary)",
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-6 text-center border border-green-200 bg-green-50">
                <div className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold font-poppins mb-2 text-green-800">
                  No Active Policies
                </h3>
                <p className="text-sm text-green-700">
                  You don't have any active policies at the moment.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "verification" && (
          <div className="space-y-4">
            {/* Verification Pending Policies Section */}
            {verificationPendingPolicies.length > 0 ? (
              <div
                className="rounded-xl shadow-lg overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {/* Policies Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {verificationPendingPolicies.map((policy) => (
                      <div
                        key={policy.id}
                        className="rounded-lg shadow group overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                        style={{ fontSize: "13px" }}
                      >
                        <div className="p-3">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="p-1.5 rounded-md bg-orange-100">
                                <Shield className="h-4 w-4 text-orange-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold font-poppins text-sm text-gray-800">
                                  {policy.provider}
                                </h3>
                                <p className="text-xs font-roboto text-gray-600">
                                  {policy.type} Insurance
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Pending
                            </span>
                          </div>

                          {/* Policy Details */}
                          <div className="space-y-2 mb-3">
                            <div>
                              <p className="text-xs font-roboto text-gray-600">
                                Policy Number
                              </p>
                              <p className="font-semibold font-poppins text-sm text-gray-800">
                                {policy.policyNumber}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs font-roboto text-gray-600">
                                  Sum Insured
                                </p>
                                <p className="font-semibold font-poppins text-sm text-orange-700">
                                  {policy.sumInsured}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-roboto text-gray-600">
                                  Premium
                                </p>
                                <p className="font-semibold font-poppins text-sm text-gray-800">
                                  {policy.premium}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 pt-2 border-t border-orange-200">
                            <button className="flex-1 font-medium py-2 px-3 rounded-md transition-colors font-roboto text-white hover:opacity-90 text-xs bg-orange-600">
                              Complete Verification
                            </button>
                            <button className="flex items-center justify-center p-2 rounded-md transition-colors bg-orange-100 text-orange-600">
                              <FileText className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-6 text-center border border-orange-200 bg-orange-50">
                <div className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-orange-100">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold font-poppins mb-2 text-orange-800">
                  No Verification Pending Policies
                </h3>
                <p className="text-sm text-orange-700">
                  All your policies have been verified and are active.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "expired" && (
          <div className="space-y-4">
            {/* Expired Policies Section */}
            {expiredPolicies.length > 0 ? (
              <div
                className="rounded-xl shadow-lg overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                {/* Policies Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {expiredPolicies.map((policy) => (
                      <div
                        key={policy.id}
                        className="rounded-lg shadow group overflow-hidden bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                        style={{ fontSize: "13px" }}
                      >
                        <div className="p-3">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="p-1.5 rounded-md bg-red-100">
                                <Shield className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold font-poppins text-sm text-gray-800">
                                  {policy.provider}
                                </h3>
                                <p className="text-xs font-roboto text-gray-600">
                                  {policy.type} Insurance
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Expired
                            </span>
                          </div>

                          {/* Policy Details */}
                          <div className="space-y-2 mb-3">
                            <div>
                              <p className="text-xs font-roboto text-gray-600">
                                Policy Number
                              </p>
                              <p className="font-semibold font-poppins text-sm text-gray-800">
                                {policy.policyNumber}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs font-roboto text-gray-600">
                                  Valid From
                                </p>
                                <p className="font-medium font-roboto text-xs text-gray-800">
                                  {formatDate(policy.validFrom)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-roboto text-gray-600">
                                  Expired On
                                </p>
                                <p className="font-medium font-roboto text-xs text-red-700">
                                  {formatDate(policy.validTo)}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs font-roboto text-gray-600">
                                  Sum Insured
                                </p>
                                <p className="font-semibold font-poppins text-sm text-red-700">
                                  {policy.sumInsured}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-roboto text-gray-600">
                                  Premium
                                </p>
                                <p className="font-semibold font-poppins text-sm text-gray-800">
                                  {policy.premium}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 pt-2 border-t border-red-200">
                            <button className="flex-1 font-medium py-2 px-3 rounded-md transition-colors font-roboto text-white hover:opacity-90 text-xs bg-red-600">
                              Renew Policy
                            </button>
                            <button className="flex items-center justify-center p-2 rounded-md transition-colors bg-red-100 text-red-600">
                              <FileText className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-6 text-center border border-red-200 bg-red-50">
                <div className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold font-poppins mb-2 text-red-800">
                  No Expired Policies
                </h3>
                <p className="text-sm text-red-700">
                  You don't have any expired policies at the moment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPoliciesPage;
