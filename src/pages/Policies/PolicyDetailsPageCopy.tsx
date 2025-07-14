import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockPolicyDetails, mockFAQsDetailed } from "../../data/policyDetails";
import { Skeleton } from "../../components/UI/skeleton";
import PolicyHeader from "../../components/PolicyDetails/PolicyHeader";
import PolicyOverview from "../../components/PolicyDetails/PolicyOverview";
import TabNavigation, {
  TabType,
} from "../../components/PolicyDetails/TabNavigation";
import {
  FileText,
  MapPin,
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Phone,
  Navigation,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  CreditCard,
  Edit,
  Shield,
  Mail,
  MapPinIcon,
  MessageSquare,
} from "lucide-react";

const PolicyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState(mockPolicyDetails);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  // Claims History accordion state (must be at top level, not inside renderTabContent)
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );
  const toggleComments = (claimId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(claimId)) {
        newSet.delete(claimId);
      } else {
        newSet.add(claimId);
      }
      return newSet;
    });
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle policy not found and prevent hook mismatch errors
  // Only render main content if policy is a valid object and not null/undefined
  if (!loading && (!policy || typeof policy !== "object")) {
    // If policy is missing after loading, redirect
    return <Navigate to="/my-policy" replace />;
  }

  // If policy is undefined/null during render (should not happen, but guard anyway), show skeleton
  if (typeof policy !== "object" || policy === null) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="w-full h-96 rounded-2xl mb-8" />
        </div>
      </div>
    );
  }

  // Quick action handlers
  const handleDownload = () => {
    console.log("Downloading policy...");
    // Implement download logic
  };

  const handleShare = () => {
    console.log("Sharing policy...");
    // Implement share logic
  };

  const handlePrint = () => {
    console.log("Printing policy...");
    window.print();
  };

  // Filter hospitals based on search and specialty
  const filteredHospitals =
    policy?.hospitals.filter((hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specialties.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSpecialty =
        selectedSpecialty === "all" ||
        hospital.specialties.includes(selectedSpecialty);

      return matchesSearch && matchesSpecialty;
    }) || [];

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(policy?.hospitals.flatMap((h) => h.specialties) || [])
  ).sort();

  // Filter FAQs based on search
  const filteredFAQs = mockFAQsDetailed.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {/* Header Skeleton */}
        <div
          className="border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-64 h-6" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-20 h-8" />
                <div className="flex space-x-2">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="w-10 h-10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="w-full h-96 rounded-2xl mb-8" />
          <div className="flex space-x-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-32 h-10 rounded-lg" />
            ))}
          </div>
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Policy Benefits */}
            <div
              className="rounded-xl shadow-lg p-4"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <h3
                className="text-base font-bold font-poppins mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                Policy Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {policy.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span
                      className="font-roboto text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Exclusions */}
            <div
              className="rounded-xl shadow-lg p-4"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <h3
                className="text-base font-bold font-poppins mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                Policy Exclusions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {policy.exclusions.map((exclusion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span
                      className="font-roboto text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {exclusion}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div
              className="rounded-xl shadow-lg p-4"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <h3
                className="text-base font-bold font-poppins mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                Policy Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {policy.documents
                  .filter((doc) => doc.name.toLowerCase() !== "premium receipt")
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="border rounded-xl p-2 hover:shadow-md transition-shadow"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className="p-1 rounded-lg"
                          style={{ backgroundColor: "var(--color-secondary)" }}
                        >
                          <FileText
                            className="h-4 w-4"
                            style={{ color: "var(--color-primary)" }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4
                            className="font-semibold font-poppins text-xs"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {doc.name}
                          </h4>
                          <p
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-muted)" }}
                          >
                            {doc.size} • {formatDate(doc.uploadDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          className="flex-1 py-1 px-2 rounded font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 text-xs"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <Eye className="h-3 w-3 inline mr-1" />
                          View
                        </button>
                        <button
                          className="py-1 px-2 rounded transition-all duration-200 text-xs"
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            color: "var(--color-primary)",
                          }}
                        >
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case "hospitals":
        return (
          <div className="space-y-4">
            {/* Search and Filter */}
            <div
              className="rounded-xl shadow-lg p-4"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: "var(--color-muted)" }}
                  />
                  <input
                    type="text"
                    placeholder="Search hospitals by name, city, or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-md font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="appearance-none border rounded-md px-3 py-2 pr-8 font-roboto text-xs focus:outline-none focus:ring-2 transition-all min-w-32"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-foreground)",
                    }}
                  >
                    <option value="all">All Specialties</option>
                    {allSpecialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  <Filter
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                    style={{ color: "var(--color-muted)" }}
                  />
                </div>
              </div>
            </div>

            {/* Hospital Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow"
                  style={{ backgroundColor: "var(--color-card)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className="text-base font-bold font-poppins mb-1"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {hospital.name}
                      </h3>
                      <p
                        className="font-roboto mb-1 text-xs"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {hospital.address}, {hospital.city}, {hospital.state} -{" "}
                        {hospital.pincode}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(hospital.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span
                            className="text-xs font-roboto ml-1"
                            style={{ color: "var(--color-muted)" }}
                          >
                            {hospital.rating} • {hospital.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {hospital.cashless && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-medium">
                          Cashless
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <h4
                      className="font-semibold font-roboto mb-1 text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="flex-1 py-1 px-2 rounded font-medium font-roboto text-white text-xs transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <Phone className="h-3 w-3 inline mr-1" />
                      Call Hospital
                    </button>
                    <button
                      className="py-1 px-2 rounded transition-all duration-200 text-xs"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Navigation className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredHospitals.length === 0 && (
              <div
                className="rounded-xl shadow-lg p-6 text-center"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <MapPin
                  className="h-8 w-8 mx-auto mb-2"
                  style={{ color: "var(--color-muted)" }}
                />
                <h3
                  className="text-base font-semibold font-poppins mb-1"
                  style={{ color: "var(--color-foreground)" }}
                >
                  No Hospitals Found
                </h3>
                <p
                  className="font-roboto text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  No hospitals match your search criteria. Try adjusting your
                  search terms or filters.
                </p>
              </div>
            )}
          </div>
        );

      case "claims":
        return (
          <div className="space-y-4">
            {/* Claims Header */}

            {/* Claims List */}
            <div className="space-y-2">
              {policy.claims.map((claim) => (
                <div
                  key={claim.id}
                  className="rounded-xl shadow-lg p-3"
                  style={{ backgroundColor: "var(--color-card)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        {getStatusIcon(claim.status)}
                      </div>
                      <div>
                        <h3
                          className="text-xs font-bold font-poppins mb-0.5"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {claim.claimNumber}
                        </h3>
                        <p
                          className="font-roboto mb-1 text-xs"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {claim.description}
                        </p>
                        <div
                          className="flex items-center space-x-2 text-[10px] font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <span>Type: {claim.type}</span>
                          <span>Amount: {claim.amount}</span>
                          <span>
                            Submitted: {formatDate(claim.dateSubmitted)}
                          </span>
                          {claim.dateProcessed && (
                            <span>
                              Processed: {formatDate(claim.dateProcessed)}
                            </span>
                          )}
                        </div>
                        {/* Accordion Comments Section */}
                        <div className="mt-2">
                          <button
                            onClick={() => toggleComments(claim.id)}
                            className="flex items-center text-2xs text-[var(--color-primary)] hover:underline font-semibold gap-1 px-2 py-1 rounded-lg"
                          >
                            <MessageSquare className="h-3 w-3" />
                            Comments
                            {expandedComments.has(claim.id) ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </button>
                          {expandedComments.has(claim.id) &&
                            claim.comments &&
                            claim.comments.length > 0 && (
                              <div className="mt-2 p-2 rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-background)] animate-slide-down space-y-1">
                                {claim.comments.map((comment, idx) => {
                                  // If you want to show who gave the comment, you can use a format like 'User: Comment'
                                  // For now, just show the comment. If you want to split by ":", do it here.
                                  let author = "";
                                  let text = comment;
                                  if (comment.includes(":")) {
                                    [author, text] = comment.split(":", 2);
                                  }
                                  return (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="font-semibold text-xs text-[var(--color-primary)] min-w-[60px]">
                                        {author ? author.trim() : "Unknown"}
                                      </span>
                                      <span className="text-xs font-roboto text-[var(--color-foreground)] bg-gray-100 rounded px-2 py-1 flex-1">
                                        {text.trim()}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        claim.status
                      )}`}
                    >
                      {claim.status}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-end pt-2 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      className="py-1 px-2 rounded font-medium font-roboto text-xs transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "endorsements":
        return (
          <div className="space-y-4">
            {/* Endorsements List */}
            <div className="space-y-2">
              {policy.endorsements.map((endorsement) => (
                <div
                  key={endorsement.id}
                  className="rounded-xl shadow-lg p-3"
                  style={{ backgroundColor: "var(--color-card)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <Edit
                          className="h-4 w-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-xs font-bold font-poppins mb-0.5"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {endorsement.type}
                        </h3>
                        <p
                          className="font-roboto mb-1 text-xs"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {endorsement.description}
                        </p>
                        <div
                          className="flex items-center space-x-2 text-[10px] font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <span>Premium: {endorsement.premium}</span>
                          <span>
                            Requested: {formatDate(endorsement.requestDate)}
                          </span>
                          {endorsement.effectiveDate && (
                            <span>
                              Effective: {formatDate(endorsement.effectiveDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        endorsement.status
                      )}`}
                    >
                      {endorsement.status}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-end pt-2 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      className="py-1 px-2 rounded font-medium font-roboto text-xs transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // "payments" tab and rendering removed

      case "faqs":
        return (
          <div className="space-y-6">
            {/* FAQ Search */}
            <div
              className="rounded-xl shadow-lg p-4"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "var(--color-muted)" }}
                />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-md font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-foreground)",
                    "--tw-ring-color": "var(--color-primary)",
                  }}
                />
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-2">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl shadow-lg overflow-hidden"
                  style={{ backgroundColor: "var(--color-card)" }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-4 py-2 text-left hover:opacity-80 transition-colors flex items-center justify-between text-xs"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <div className="flex-1">
                      <h3
                        className="font-semibold font-poppins text-xs"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {faq.question}
                      </h3>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full font-medium"
                        style={{
                          backgroundColor: "var(--color-card)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {faq.category}
                      </span>
                    </div>
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
                      className="px-4 py-2 border-t"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <p
                        className="font-roboto text-xs leading-relaxed"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div
                className="rounded-xl shadow-lg p-6 text-center"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <Search
                  className="h-8 w-8 mx-auto mb-2"
                  style={{ color: "var(--color-muted)" }}
                />
                <h3
                  className="text-xs font-semibold font-poppins mb-1"
                  style={{ color: "var(--color-foreground)" }}
                >
                  No FAQs Found
                </h3>
                <p
                  className="font-roboto text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  No FAQs match your search query. Try different keywords or
                  browse all categories.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${policy.type} Insurance - ${policy.policyNumber} | InsureTech Pro`}</title>
        <meta
          name="description"
          content={`View details for your ${policy.type} insurance policy ${policy.policyNumber} with ${policy.provider}`}
        />
        <meta
          name="keywords"
          content={`insurance, ${policy.type}, policy details, ${policy.provider}`}
        />
      </Helmet>

      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {/* Sticky Header */}
        <div className="max-w-[1200px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
          {/* Top Section: Policy Header */}
          <div className="mb-4">
            <PolicyHeader
              policyNumber={policy.policyNumber}
              provider={policy.provider}
              status={policy.status}
              onDownload={handleDownload}
              onShare={handleShare}
              onPrint={handlePrint}
              className="text-xs md:text-sm"
            />
          </div>
          {/* Policy Overview Card */}
          <div className="mb-4">
            {/* Health Insurance Card: Reduce font and component sizes further for compactness */}
            <PolicyOverview
              policy={policy}
              className="text-[11px] md:text-xs leading-tight p-3 md:p-4 rounded-lg md:rounded-xl gap-2 md:gap-3"
              cardClassName="text-[11px] md:text-xs leading-tight p-3 md:p-4 rounded-lg md:rounded-xl gap-2 md:gap-3"
              titleClassName="text-xs md:text-sm font-semibold mb-1 md:mb-2"
              valueClassName="text-xs md:text-base font-medium"
              labelClassName="text-[10px] md:text-xs font-normal"
            />
          </div>

          {/* Tab Navigation */}
          <div className="mb-2">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabClassName="text-xs px-2 py-1 rounded font-medium font-roboto"
            />
          </div>

          {/* Tab Content */}
          <div className="py-4 text-xs">{renderTabContent()}</div>

          {/* Support Section */}
          <div
            className="mt-16 rounded-xl shadow-lg p-6 border"
            style={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="text-center mb-6">
              <h2
                className="text-base font-bold font-poppins mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Need Support?
              </h2>

              {/* Trovity Logo */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className="text-base font-bold font-poppins"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Trovity
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Contact Email */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Mail
                      className="h-5 w-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Email Support
                </h3>
                <a
                  href="mailto:support@trovity.com"
                  className="font-roboto hover:underline transition-colors text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  support@trovity.com
                </a>
              </div>

              {/* Phone Number */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Phone
                      className="h-5 w-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Phone Support
                </h3>
                <a
                  href="tel:+911800123456"
                  className="font-roboto hover:underline transition-colors text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  +91 1800 123 456
                </a>
              </div>

              {/* Business Hours */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Clock
                      className="h-5 w-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Business Hours
                </h3>
                <div
                  className="font-roboto text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>

              {/* Physical Address */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <MapPinIcon
                      className="h-5 w-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                </div>
                <h3
                  className="font-semibold font-poppins mb-1 text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Office Address
                </h3>
                <div
                  className="font-roboto text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  <p>Trovity Insurance Ltd.</p>
                  <p>123 Business District</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyDetailsPage;
