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
import InsuranceCarousel from "../../components/UI/carousel-insurance";
import FileUpload from "../../components/UI/file-upload";

const MyPoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"policies" | "faqs">("policies");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const navigate = useNavigate();

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
        <div className="mb-6">
          <h1
            className="text-3xl font-bold font-poppins mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            My Policies
          </h1>
          <p className="font-roboto" style={{ color: "var(--color-muted)" }}>
            Manage and track all your insurance policies in one place
          </p>
        </div>

        {/* Top Section - 3 Column Grid - Reduced Height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Column 1 - Renewal Card - Reduced Height */}
          <div
            className="rounded-xl p-4 text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              color: "var(--color-secondary)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold font-poppins">Renewal Due</h2>
              <Calendar className="h-5 w-5" />
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-roboto opacity-80">Policy Number</p>
                <p className="font-semibold font-poppins text-sm">
                  {nearestExpiryPolicy.policyNumber}
                </p>
              </div>

              <div>
                <p className="text-xs font-roboto opacity-80">Provider</p>
                <p className="font-semibold font-poppins text-sm">
                  {nearestExpiryPolicy.provider}
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xl font-bold font-poppins">
                  {nearestExpiryPolicy.expiryDays}
                </p>
                <p className="text-xs font-roboto opacity-80">Days to Expiry</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                className="w-full bg-white font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors font-roboto text-sm"
                style={{
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-secondary)",
                }}
              >
                Renew Now
              </button>
              <Link
                to="/renewals"
                className="block text-center text-white/80 hover:text-white text-xs font-roboto underline"
                style={{ color: "var(--color-secondary)" }}
              >
                View More Renewals
              </Link>
            </div>
          </div>

          {/* Column 2 - Insurance Carousel - Reduced Height */}
          <div className="h-80">
            <InsuranceCarousel slides={insuranceSlides} />
          </div>

          {/* Column 3 - Document Upload - Reduced Height */}
          <div
            className="rounded-xl shadow-lg p-4 h-80 overflow-y-auto"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <FileUpload
              onFileSelect={(files) => console.log("Files uploaded:", files)}
            />
          </div>
        </div>

        {/* Search and Filter Section */}
        <div
          className="rounded-xl shadow-lg p-4 mb-4"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "var(--color-muted)" }}
              />
              <input
                type="text"
                placeholder="Search policies by number, provider, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-muted)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none border rounded-lg px-3 py-2 pr-8 font-roboto focus:outline-none focus:ring-2 transition-all"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                  style={{ color: "var(--color-muted)" }}
                />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none border rounded-lg px-3 py-2 pr-8 font-roboto focus:outline-none focus:ring-2 transition-all"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                  style={{ color: "var(--color-muted)" }}
                />
              </div>

              {/* Tabs */}
              <div
                className="flex rounded-lg p-1"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <button
                  onClick={() => setActiveTab("policies")}
                  className={`px-4 py-2 rounded-md font-medium font-roboto transition-all ${
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
                  className={`px-4 py-2 rounded-md font-medium font-roboto transition-all ${
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
              className="mt-3 pt-3 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p
                className="text-sm font-roboto"
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <Shield
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-semibold font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {policy.provider}
                        </h3>
                        <p
                          className="text-sm font-roboto"
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
                        className="text-sm font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Policy Number
                      </p>
                      <p
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {policy.policyNumber}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Valid From
                        </p>
                        <p
                          className="font-medium font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {formatDate(policy.validFrom)}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Valid To
                        </p>
                        <p
                          className="font-medium font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {formatDate(policy.validTo)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Sum Insured
                        </p>
                        <p
                          className="font-semibold font-poppins"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {policy.sumInsured}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Premium
                        </p>
                        <p
                          className="font-semibold font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {policy.premium}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="flex space-x-2 pt-3 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      className="flex-1 font-medium py-2 px-3 rounded-lg transition-colors font-roboto text-white hover:opacity-90"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-secondary)",
                      }}
                      onClick={() => {
                        navigate(`/my-policy/${encodeURIComponent(policy.id)}`);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="flex items-center justify-center p-2 rounded-lg transition-colors"
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
        ) : (
          /* FAQ Section */
          <div
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <h2
              className="text-2xl font-bold font-poppins mb-6"
              style={{ color: "var(--color-foreground)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {mockFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-4 py-3 text-left hover:opacity-80 transition-colors flex items-center justify-between"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <span
                      className="font-medium font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp
                        className="h-4 w-4"
                        style={{ color: "var(--color-muted)" }}
                      />
                    ) : (
                      <ChevronDown
                        className="h-4 w-4"
                        style={{ color: "var(--color-muted)" }}
                      />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div
                      className="px-4 py-3"
                      style={{ backgroundColor: "var(--color-card)" }}
                    >
                      <p
                        className="font-roboto leading-relaxed"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {faq.answer}
                      </p>
                      <span
                        className="inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium"
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
