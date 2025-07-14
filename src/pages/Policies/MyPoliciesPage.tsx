import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Shield,
  FileText,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import { mockPolicies, mockFAQs, insuranceSlides } from "../../data/mockData";
import { Policy, FAQ } from "../../types/policy";
import {
  InsurancePolicy,
  NavigationState,
  isValidPolicyType,
  isValidPolicyId,
  isCompletePolicy,
} from "../../types/insurance";
import InsuranceCarousel from "../../components/UI/carousel-insurance";
import UploadPolicyModal from "../../components/UploadPolicyModal";
import PolicyRenewalListModal from "../../components/PolicyRenewalListModal";

const MyPoliciesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"policies" | "faqs">("policies");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
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
      const statusMatch =
        statusFilter === "all" ||
        policy.status.toLowerCase() === statusFilter.toLowerCase();
      const typeMatch = typeFilter === "all" || policy.type === typeFilter;
      const searchMatch =
        searchQuery === "" ||
        policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.type.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && typeMatch && searchMatch;
    });
  }, [statusFilter, typeFilter, searchQuery]);

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
  const handleViewMoreClick = async (
    policyId: string,
    policyType: "two-wheeler" | "motor",
    policyDetails: InsurancePolicy
  ): Promise<void> => {
    try {
      setIsNavigating(true);

      // 1. Validate input parameters
      if (!isValidPolicyId(policyId)) {
        throw new Error("Invalid policy ID format");
      }

      if (!isValidPolicyType(policyType)) {
        throw new Error(
          'Invalid policy type. Must be "two-wheeler" or "motor"'
        );
      }

      if (!isCompletePolicy(policyDetails)) {
        throw new Error("Incomplete policy data. Missing required fields");
      }

      // 2. Validate policy data completeness
      const requiredFields = [
        "policyHolder.name",
        "policyHolder.email",
        "vehicle.make",
        "vehicle.model",
        "vehicle.registrationNumber",
        "coverage.ownDamage.sumInsured",
        "premiumBreakdown.totalPremium",
      ];

      for (const field of requiredFields) {
        const value = field
          .split(".")
          .reduce((obj, key) => obj?.[key], policyDetails);
        if (!value) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // 3. Prepare premium calculator parameters

      // 6. Prepare navigation state
      const navigationState: NavigationState = {
        policy: policyDetails,
        returnPath: "/my-policy",
      };

      // 7. Validate navigation state
      if (!navigationState.policy) {
        throw new Error("Failed to prepare navigation data");
      }

      // 8. Navigate to universal insurance details page
      const targetRoute = `/universal-insurance/${policyId}`;

      console.log("Navigating to:", targetRoute);
      console.log("Navigation state:", navigationState);

      navigate(targetRoute, {
        state: navigationState,
        replace: false,
      });

      // 9. Log successful navigation for analytics
      console.log(`Successfully navigated to policy details: ${policyId}`);
    } catch (error) {
      console.error("Navigation error:", error);

      // Handle different types of errors
      if (error instanceof Error) {
        switch (error.message) {
          case "Invalid policy ID format":
            alert("Invalid policy ID. Please try again.");
            break;
          case 'Invalid policy type. Must be "two-wheeler" or "motor"':
            alert("This policy type is not supported for detailed view.");
            break;
          case "Incomplete policy data. Missing required fields":
            alert("Policy data is incomplete. Please contact support.");
            break;
          default:
            alert(`Unable to view policy details: ${error.message}`);
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsNavigating(false);
    }
  };

  /**
   * Mock function to create sample insurance policy data
   * In a real application, this would fetch from an API
   */
  const createMockInsurancePolicy = (
    policyId: string,
    type: "two-wheeler" | "motor"
  ): InsurancePolicy => {
    return {
      id: policyId,
      policyNumber: `${type.toUpperCase()}-2024-${policyId}`,
      policyType: type,
      status: "active",
      provider: "Sample Insurance Co.",
      policyHolder: {
        id: "holder-1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91-9876543210",
        dateOfBirth: "1985-06-15",
        address: {
          street: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
        panNumber: "ABCDE1234F",
        aadharNumber: "1234-5678-9012",
        drivingLicenseNumber: "MH01-20230001234",
        licenseExpiryDate: "2028-06-15",
      },
      vehicle: {
        make: type === "two-wheeler" ? "Honda" : "Maruti Suzuki",
        model: type === "two-wheeler" ? "Activa 6G" : "Swift",
        year: 2022,
        registrationNumber:
          type === "two-wheeler" ? "MH01AB1234" : "MH01CD5678",
        engineNumber: "ENG123456789",
        chassisNumber: "CHS987654321",
        fuelType: type === "two-wheeler" ? "petrol" : "petrol",
        vehicleType: type === "two-wheeler" ? "two-wheeler" : "four-wheeler",
        cubicCapacity: type === "two-wheeler" ? 109 : 1197,
        seatingCapacity: type === "two-wheeler" ? 2 : 5,
        vehicleValue: type === "two-wheeler" ? 75000 : 650000,
        registrationDate: "2022-03-15",
        previousInsurer: "Previous Insurance Co.",
        ncbPercentage: 20,
      },
      coverage: {
        ownDamage: {
          sumInsured: type === "two-wheeler" ? 75000 : 650000,
          deductible: type === "two-wheeler" ? 1000 : 5000,
          coverage: ["Accident", "Theft", "Fire", "Natural Calamities"],
        },
        thirdPartyLiability: {
          bodilyInjury: 1500000,
          propertyDamage: 75000,
        },
        personalAccident: {
          ownerDriver: 1500000,
          passengers: type === "two-wheeler" ? 100000 : 200000,
        },
      },
      addOns: [
        {
          id: "zero-dep",
          name: "Zero Depreciation",
          description: "No depreciation on claim settlement",
          premium: type === "two-wheeler" ? 800 : 3500,
          isSelected: true,
          isAvailable: true,
        },
        {
          id: "roadside-assistance",
          name: "Roadside Assistance",
          description: "24x7 roadside assistance",
          premium: 500,
          isSelected: true,
          isAvailable: true,
        },
      ],
      premiumBreakdown: {
        basePremium: type === "two-wheeler" ? 2500 : 12000,
        addOnPremiums: type === "two-wheeler" ? 1300 : 4000,
        discounts: {
          ncb: type === "two-wheeler" ? 500 : 2400,
          loyalty: 0,
          multiPolicy: 0,
          others: 0,
        },
        taxes: {
          gst: type === "two-wheeler" ? 612 : 2448,
          serviceTax: 0,
        },
        totalPremium: type === "two-wheeler" ? 3912 : 16048,
        payableAmount: type === "two-wheeler" ? 3912 : 16048,
      },
      policyTerm: {
        startDate: "2024-01-15",
        endDate: "2025-01-14",
        duration: 12,
        renewalDate: "2025-01-14",
        gracePeriod: 30,
      },
      claimsHistory: [],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      documents: {
        policyDocument: "/documents/policy.pdf",
        rcCopy: "/documents/rc.pdf",
        drivingLicense: "/documents/license.pdf",
      },
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
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

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none border rounded-md px-2 py-1.5 pr-6 font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-foreground)",
                    "--tw-ring-color": "var(--color-primary)",
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
                <ChevronDown
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                  style={{ color: "var(--color-muted)" }}
                />
              </div>

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
                  onClick={() => setActiveTab("policies")}
                  className={`px-2.5 py-1.5 rounded font-medium font-roboto text-xs transition-all ${
                    activeTab === "policies" ? "shadow-sm" : "hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "policies"
                        ? "var(--color-card)"
                        : "transparent",
                    color:
                      activeTab === "policies"
                        ? "var(--color-primary)"
                        : "var(--color-muted)",
                  }}
                >
                  Policies
                </button>
                <button
                  onClick={() => setActiveTab("faqs")}
                  className={`px-2.5 py-1.5 rounded font-medium font-roboto text-xs transition-all ${
                    activeTab === "faqs" ? "shadow-sm" : "hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "faqs"
                        ? "var(--color-card)"
                        : "transparent",
                    color:
                      activeTab === "faqs"
                        ? "var(--color-primary)"
                        : "var(--color-muted)",
                  }}
                >
                  FAQs
                </button>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && activeTab === "policies" && (
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
              </p>
            </div>
          )}
        </div>

        {/* Content Area */}
        {activeTab === "policies" ? (
          /* Policy Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="rounded-md shadow group overflow-hidden bg-[var(--color-card)] hover:shadow-lg transition-all duration-200 cursor-pointer min-h-[170px]"
                style={{ fontSize: "13px" }}
              >
                <div className="p-2.5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <Shield
                          className="h-3.5 w-3.5"
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-semibold font-poppins text-xs"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {policy.provider}
                        </h3>
                        <p
                          className="text-[11px] font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {policy.type} Insurance
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(
                        policy.status
                      )}`}
                    >
                      {policy.status}
                    </span>
                  </div>

                  {/* Policy Details */}
                  <div className="space-y-1 mb-2">
                    <div>
                      <p
                        className="text-[11px] font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Policy Number
                      </p>
                      <p
                        className="font-semibold font-poppins text-xs"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {policy.policyNumber}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p
                          className="text-[11px] font-roboto"
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
                          className="text-[11px] font-roboto"
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
                          className="text-[11px] font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Sum Insured
                        </p>
                        <p
                          className="font-semibold font-poppins text-xs"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {policy.sumInsured}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-[11px] font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Premium
                        </p>
                        <p
                          className="font-semibold font-poppins text-xs"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {policy.premium}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex space-x-1 pt-2 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      onClick={() => {
                        // Navigate to UniversalInsuranceDetailsPage for all policy types
                        navigate(`/universal-insurance/${policy.id}`, {
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
                      }}
                      disabled={isNavigating}
                      className="flex-1 font-medium py-1.5 px-2 rounded-md transition-colors font-roboto text-white hover:opacity-90 disabled:opacity-50 text-xs"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      {isNavigating ? "Loading..." : "View Details"}
                    </button>
                    <button
                      className="flex items-center justify-center p-1.5 rounded-md transition-colors"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* FAQ Section */
          <div
            className="rounded-xl shadow-lg p-4"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <h2
              className="text-base font-bold font-poppins mb-3"
              style={{ color: "var(--color-foreground)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-1.5">
              {mockFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-2.5 py-1.5 text-left hover:opacity-80 transition-colors flex items-center justify-between"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <span
                      className="font-medium font-roboto text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp
                        className="h-3 w-3"
                        style={{ color: "var(--color-muted)" }}
                      />
                    ) : (
                      <ChevronDown
                        className="h-3 w-3"
                        style={{ color: "var(--color-muted)" }}
                      />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div
                      className="px-2.5 py-1.5"
                      style={{ backgroundColor: "var(--color-card)" }}
                    >
                      <p
                        className="font-roboto leading-relaxed text-[11px]"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {faq.answer}
                      </p>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full font-medium"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Policies */}
        {activeTab === "policies" && filteredPolicies.length === 0 && (
          <div
            className="rounded-xl shadow-lg p-8 text-center"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <div
              className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <Shield
                className="h-6 w-6"
                style={{ color: "var(--color-muted)" }}
              />
            </div>
            <h3
              className="text-xl font-semibold font-poppins mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              {searchQuery ? "No Matching Policies" : "No Policies Found"}
            </h3>
            <p
              className="font-roboto mb-4"
              style={{ color: "var(--color-muted)" }}
            >
              {searchQuery
                ? `No policies match your search for "${searchQuery}". Try adjusting your search terms or filters.`
                : "No policies match your current filter criteria. Try adjusting your filters or add a new policy."}
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mr-3 font-semibold py-2 px-4 rounded-lg transition-colors font-roboto border hover:opacity-80"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-secondary)",
                }}
              >
                Clear Search
              </button>
            )}
            <button
              className="font-semibold py-2 px-4 rounded-lg transition-colors font-roboto text-white hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Add New Policy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPoliciesPage;
