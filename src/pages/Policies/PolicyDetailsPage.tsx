import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Calculator,
  Shield,
  Car,
  User,
  FileText,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  RefreshCw,
  Download,
  Share2,
  Printer,
  AlertTriangle,
  CheckCircle,
  Info,
  Copy,
  Check,
  Eye,
  Search,
  Filter,
  Upload,
  Clock,
  Star,
  Navigation,
  Camera,
  Settings,
  Users,
  TrendingUp,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  Minus,
  X,
  HelpCircle,
  BarChart3,
  Gavel,
} from "lucide-react";
import {
  InsurancePolicy,
  NavigationState,
  PremiumCalculatorParams,
  AddOnCoverage,
} from "../../types/insurance";
import { mockVehicleDashboardData } from "../../data/vehicleDashboardData";

type DashboardSection =
  | "overview"
  | "vehicle"
  | "coverage"
  | "claims"
  | "documents"
  | "challans"
  | "endorsements";

const PolicyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract navigation state
  const navigationState = location.state as NavigationState | null;

  // Component state
  const [policy, setPolicy] = useState<InsurancePolicy | null>(
    navigationState?.policy || null
  );
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData>(
    mockVehicleDashboardData
  );
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "paid" | "pending" | "overdue" | "disputed"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Initialize component
  useEffect(() => {
    const fetchPolicyById = async (
      policyId: string
    ): Promise<InsurancePolicy | null> => {
      // TODO: Replace this with a real API call
      // For now, try to get from localStorage or mock data
      try {
        const stored = localStorage.getItem("policies");
        console.log(stored);
        if (stored) {
          const policies = JSON.parse(stored);
          const found = policies.find(
            (p: InsurancePolicy) => p.id === policyId
          );
          return found || null;
        }
        // Optionally, add a fetch from a mock file or API here
        return null;
      } catch {
        return null;
      }
    };

    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);
        let loadedPolicy = policy;
        // Fallback: fetch policy by ID if not in navigation state
        if (!navigationState || !policy) {
          if (id) {
            loadedPolicy = await fetchPolicyById(id);
            if (!loadedPolicy) {
              throw new Error("Policy data not found for this ID.");
            }
            setPolicy(loadedPolicy);
          } else {
            throw new Error(
              "Policy data not found. Please navigate from the policies page."
            );
          }
        }

        // Validate policy ID matches route parameter
        if (!loadedPolicy || loadedPolicy.id !== id) {
          throw new Error("Policy ID mismatch. Invalid navigation.");
        }

        // Update dashboard data with policy
        setDashboardData((prev) => ({ ...prev, policy: loadedPolicy }));

        // Load available add-ons
        // Update add-ons with current selections
        // Calculate initial premium
        console.log("Component initialized successfully");
      } catch (err) {
        console.error("Initialization error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load policy details"
        );
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [id, policy, navigationState]);

  // Copy policy number to clipboard
  const copyPolicyNumber = async () => {
    if (!policy) return;
    try {
      await navigator.clipboard.writeText(policy.policyNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy policy number:", err);
    }
  };

  // Toggle section expansion

  // Quick action handlers
  const handleDownload = () => {
    console.log("Downloading policy document...");
    // Implement download logic
  };

  // Navigation handler
  const handleGoBack = () => {
    const returnPath = navigationState?.returnPath || "/my-policy";
    navigate(returnPath);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "approved":
      case "paid":
      case "settled":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
      case "under_review":
      case "submitted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "settled":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate remaining coverage period
  const remainingDays = useMemo(() => {
    if (!policy) return 0;
    const endDate = new Date(policy.policyTerm.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [policy]);

  // Mock challan data
  const mockChallans = [
    {
      id: "1",
      challanId: "CH001234",
      dateOfViolation: "2024-01-15",
      violationType: "Over Speeding",
      location: "MG Road, Bangalore",
      fineAmount: 1000,
      paymentStatus: "pending" as const,
    },
    {
      id: "2",
      challanId: "CH001235",
      dateOfViolation: "2024-02-10",
      violationType: "Signal Jump",
      location: "Brigade Road, Bangalore",
      fineAmount: 500,
      paymentStatus: "paid" as const,
    },
  ];

  const challanSummary = {
    totalChallans: mockChallans.length,
    totalFineAmount: mockChallans.reduce(
      (sum, challan) => sum + challan.fineAmount,
      0
    ),
    paidAmount: mockChallans
      .filter((c) => c.paymentStatus === "paid")
      .reduce((sum, challan) => sum + challan.fineAmount, 0),
    pendingAmount: mockChallans
      .filter((c) => c.paymentStatus === "pending")
      .reduce((sum, challan) => sum + challan.fineAmount, 0),
  };

  const filteredChallans = mockChallans.filter((challan) => {
    const matchesStatus =
      statusFilter === "all" || challan.paymentStatus === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      challan.challanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challan.violationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challan.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const paginatedChallans = filteredChallans.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison =
          new Date(a.dateOfViolation).getTime() -
          new Date(b.dateOfViolation).getTime();
        break;
      case "amount":
        comparison = a.fineAmount - b.fineAmount;
        break;
      case "status":
        comparison = a.paymentStatus.localeCompare(b.paymentStatus);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Loading state
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <RefreshCw
            className="h-12 w-12 animate-spin mx-auto mb-4"
            style={{ color: "var(--color-primary)" }}
          />
          <p className="font-roboto" style={{ color: "var(--color-muted)" }}>
            Loading policy details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !policy) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2
            className="text-xl font-bold font-poppins mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            Unable to Load Policy
          </h2>
          <p
            className="font-roboto mb-4"
            style={{ color: "var(--color-muted)" }}
          >
            {error}
          </p>
          <button
            onClick={handleGoBack}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Go Back to Policies
          </button>
        </div>
      </div>
    );
  }

  if (!policy) return null;

  const renderChallans = () => (
    <div className="space-y-6">
      {/* Challan Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Gavel
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
            <span
              className="font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Total Challans
            </span>
          </div>
          <p
            className="text-2xl font-bold font-poppins"
            style={{ color: "var(--color-foreground)" }}
          >
            {challanSummary.totalChallans}
          </p>
        </div>

        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
            <span
              className="font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Total Fine
            </span>
          </div>
          <p
            className="text-2xl font-bold font-poppins"
            style={{ color: "var(--color-foreground)" }}
          >
            {formatCurrency(challanSummary.totalFineAmount)}
          </p>
        </div>

        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
            <span
              className="font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Paid Amount
            </span>
          </div>
          <p className="text-2xl font-bold font-poppins text-green-600">
            {formatCurrency(challanSummary.paidAmount)}
          </p>
        </div>

        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
            <span
              className="font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Pending Amount
            </span>
          </div>
          <p className="text-2xl font-bold font-poppins text-red-600">
            {formatCurrency(challanSummary.pendingAmount)}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
              style={{ color: "var(--color-muted)" }}
            />
            <input
              type="text"
              placeholder="Search by challan ID, violation type, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                "--tw-ring-color": "var(--color-primary)",
              }}
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border rounded-lg px-4 py-3 font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                "--tw-ring-color": "var(--color-primary)",
              }}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="disputed">Disputed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border rounded-lg px-4 py-3 font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                "--tw-ring-color": "var(--color-primary)",
              }}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="status">Sort by Status</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-3 border rounded-lg transition-all duration-200"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
              }}
            >
              {sortOrder === "asc" ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Challans Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Challan ID
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Date
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Violation Type
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Location
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Fine Amount
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Status
                </th>
                <th
                  className="text-left py-3 px-4 font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedChallans.map((challan) => (
                <tr
                  key={challan.id}
                  className="border-b hover:bg-opacity-50 transition-colors"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <td className="py-4 px-4">
                    <span
                      className="font-semibold font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {challan.challanId}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatDate(challan.dateOfViolation)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {challan.violationType}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="font-roboto text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {challan.location}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="font-bold font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatCurrency(challan.fineAmount)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(challan.paymentStatus)}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          challan.paymentStatus
                        )}`}
                      >
                        {challan.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="py-1 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        View
                      </button>
                      {challan.paymentStatus === "pending" ||
                      challan.paymentStatus === "overdue" ? (
                        <button
                          className="py-1 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          Pay Now
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPolicyOverview = () => {
    if (policy.policyType === "health" && policy.health) {
      // Health insurance overview
      return (
        <div className="space-y-4">
          <div
            className="rounded-xl shadow-lg overflow-hidden"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <div
              className="p-4 text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold font-poppins">
                        Health Insurance
                      </h1>
                      <p className="text-white/80 font-roboto text-xs">
                        {policy.provider}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 font-roboto text-xs">
                      Policy Number
                    </p>
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-bold font-poppins">
                        {policy.policyNumber}
                      </p>
                      <button
                        onClick={copyPolicyNumber}
                        className="p-1 rounded hover:bg-white/20 transition-colors"
                        title="Copy policy number"
                      >
                        {copied ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Shield className="h-4 w-4" />
                      <span className="font-roboto text-white/80 text-xs">
                        Sum Insured
                      </span>
                    </div>
                    <p className="text-lg font-bold font-poppins">
                      {formatCurrency(policy.health.sumInsured)}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-roboto text-white/80 text-xs">
                        Premium
                      </span>
                    </div>
                    <p className="text-lg font-bold font-poppins">
                      {formatCurrency(
                        policy.premiumBreakdown?.totalPremium || 0
                      )}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-roboto text-white/80 text-xs">
                        Days Remaining
                      </span>
                    </div>
                    <p className="text-lg font-bold font-poppins">
                      {remainingDays}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-roboto text-white/80 text-xs">
                        Status
                      </span>
                    </div>
                    <p className="text-base font-bold font-poppins capitalize">
                      {policy.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-4 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <button
                  className="flex items-center justify-center space-x-1 py-2 px-2 rounded font-semibold font-roboto text-xs text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Renew</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-1 py-2 px-2 rounded font-semibold font-roboto text-xs transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                >
                  <AlertTriangle className="h-3 w-3" />
                  <span>Raise a claim</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-1 py-2 px-2 rounded font-semibold font-roboto text-xs transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Edit className="h-3 w-3" />
                  <span>Request Changes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Insured Persons */}
          <div
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <h2
              className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
              style={{ color: "var(--color-foreground)" }}
            >
              <Users
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
              <span>Insured Persons</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policy.health.insuredPersons.map((person, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <p
                    className="font-semibold font-poppins text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {person.name}
                  </p>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Age: {person.age}
                  </p>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Relation: {person.relation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Network */}
          <div
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <h2
              className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
              style={{ color: "var(--color-foreground)" }}
            >
              <MapPin
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
              <span>Hospital Network</span>
            </h2>
            <ul className="list-disc pl-6">
              {policy.health.hospitalNetwork.map((hospital, idx) => (
                <li
                  key={idx}
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {hospital}
                </li>
              ))}
            </ul>
          </div>

          {/* Pre-existing Diseases */}
          {policy.health.preExistingDiseases &&
            policy.health.preExistingDiseases.length > 0 && (
              <div
                className="rounded-xl shadow-lg p-6"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <h2
                  className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
                  style={{ color: "var(--color-foreground)" }}
                >
                  <AlertTriangle
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span>Pre-existing Diseases</span>
                </h2>
                <ul className="list-disc pl-6">
                  {policy.health.preExistingDiseases.map((disease, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {disease}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Policy Features */}
          {policy.health.policyFeatures &&
            policy.health.policyFeatures.length > 0 && (
              <div
                className="rounded-xl shadow-lg p-6"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <h2
                  className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
                  style={{ color: "var(--color-foreground)" }}
                >
                  <Star
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span>Policy Features</span>
                </h2>
                <ul className="list-disc pl-6">
                  {policy.health.policyFeatures.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      );
    }
    // Default: vehicle insurance overview
    return (
      <div className="space-y-4">
        {/* Policy Header Card */}
        ...
      </div>
    );
  };

  const renderVehicleInfo = () => (
    <div className="space-y-6">
      {/* Vehicle Details */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text- font-bold font-poppins mb-6 flex items-center space-x-3"
          style={{ color: "var(--color-foreground)" }}
        >
          <Car className="h-6 w-6" style={{ color: "var(--color-primary)" }} />
          <span>Vehicle Information</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Make & Model
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.make} {policy.vehicle.model}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Registration Number
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.registrationNumber}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Year
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.year}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Engine Number
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.engineNumber}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Chassis Number
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.chassisNumber}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Fuel Type
            </p>
            <p
              className="font-medium font-poppins text-xs capitalize"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.fuelType}
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Engine Capacity
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              {policy.vehicle.cubicCapacity} CC
            </p>
          </div>

          <div>
            <p
              className="text-xs font-roboto mb-1"
              style={{ color: "var(--color-muted)" }}
            >
              Insured Value
            </p>
            <p
              className="font-medium font-poppins text-xs"
              style={{ color: "var(--color-primary)" }}
            >
              {formatCurrency(policy.coverage.ownDamage.sumInsured)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCoverageDetails = () => (
    <div className="space-y-6">
      {/* Coverage Limits */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <>
          <h2
            className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Shield
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Coverage Limits</span>
          </h2>
          <div className="space-y-4">
            {dashboardData.coverageLimits.map((coverage, index) => (
              <div
                key={index}
                className="border rounded-lg p-4"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-sm font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {coverage.type}
                  </h3>
                  <div className="text-right">
                    <p
                      className="text-base font-bold font-poppins"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {formatCurrency(coverage.limit)}
                    </p>
                    {coverage.deductible > 0 && (
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Deductible: {formatCurrency(coverage.deductible)}
                      </p>
                    )}
                  </div>
                </div>

                <p
                  className="font-roboto mb-2 text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  {coverage.explanation}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4
                      className="font-semibold font-poppins mb-1 text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      What's Covered
                    </h4>
                    <ul className="space-y-1">
                      {coverage.conditions.map((condition, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {condition}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className="font-semibold font-poppins mb-1 text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Exclusions
                    </h4>
                    <ul className="space-y-1">
                      {coverage.exclusions.map((exclusion, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <X className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                          <span
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {exclusion}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </div>

      {/* Add-on Coverages */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Plus className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
          <span>Add-on Coverages</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {policy.addOns
            .filter((addon) => addon.isSelected)
            .map((addon) => (
              <div
                key={addon.id}
                className="p-3 rounded-lg border"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className="font-semibold font-poppins text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {addon.name}
                  </h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-medium">
                    Active
                  </span>
                </div>
                <p
                  className="text-xs font-roboto mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  {addon.description}
                </p>
                <p
                  className="font-semibold font-poppins text-xs"
                  style={{ color: "var(--color-primary)" }}
                >
                  Premium: {formatCurrency(addon.premium)}
                </p>
                {addon.sumInsured && (
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Coverage: {formatCurrency(addon.sumInsured)}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderClaimsCenter = () => (
    <div className="space-y-6">
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="rounded-xl shadow-lg p-6 text-center"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div
            className="p-3 rounded-full mx-auto mb-3 w-fit"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <BarChart3
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <p
            className="text-2xl font-bold font-poppins"
            style={{ color: "var(--color-foreground)" }}
          >
            {dashboardData.claimsHistory.length}
          </p>
          <p
            className="text-sm font-roboto"
            style={{ color: "var(--color-muted)" }}
          >
            Total Claims
          </p>
        </div>

        <div
          className="rounded-xl shadow-lg p-6 text-center"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div
            className="p-3 rounded-full mx-auto mb-3 w-fit"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <CheckCircle
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <p
            className="text-2xl font-bold font-poppins"
            style={{ color: "var(--color-foreground)" }}
          >
            {
              dashboardData.claimsHistory.filter((c) => c.status === "settled")
                .length
            }
          </p>
          <p
            className="text-sm font-roboto"
            style={{ color: "var(--color-muted)" }}
          >
            Settled Claims
          </p>
        </div>

        <div
          className="rounded-xl shadow-lg p-6 text-center"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div
            className="p-3 rounded-full mx-auto mb-3 w-fit"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <DollarSign
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <p
            className="text-2xl font-bold font-poppins"
            style={{ color: "var(--color-foreground)" }}
          >
            {formatCurrency(
              dashboardData.claimsHistory.reduce(
                (sum, claim) => sum + (claim.settledAmount || 0),
                0
              )
            )}
          </p>
          <p
            className="text-sm font-roboto"
            style={{ color: "var(--color-muted)" }}
          >
            Total Settled
          </p>
        </div>

        <div
          className="rounded-xl shadow-lg p-6 text-center"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div
            className="p-3 rounded-full mx-auto mb-3 w-fit"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <TrendingUp
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <p
            className="text-2xl font-bold font-poppins"
            style={{ color: "var(--color-foreground)" }}
          >
            {policy.vehicle.ncbPercentage}%
          </p>
          <p
            className="text-sm font-roboto"
            style={{ color: "var(--color-muted)" }}
          >
            NCB Retained
          </p>
        </div>
      </div> */}

      {/* Claims History */}
      <div
        className="rounded-xl shadow-lg p-4 md:p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <FileText
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Claims History</span>
        </h2>

        <div className="space-y-4">
          {dashboardData.claimsHistory.map((claim) => (
            <div
              key={claim.id}
              className="border rounded-lg p-4 md:p-5"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3
                    className="text-sm font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Claim #{claim.claimNumber}
                  </h3>
                  <p
                    className="font-roboto text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {formatDate(claim.incidentDate)} •{" "}
                    {claim.incidentLocation.address}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                    claim.status
                  )}`}
                >
                  {claim.status.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Damage Type
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {claim.damageType.map((type, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-[10px] font-roboto mr-1 mb-1"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Requested Amount
                  </p>
                  <p
                    className="font-semibold font-poppins text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {formatCurrency(claim.requestedAmount)}
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Settled Amount
                  </p>
                  <p
                    className="font-semibold font-poppins text-xs"
                    style={{
                      color: claim.settledAmount
                        ? "var(--color-primary)"
                        : "var(--color-muted)",
                    }}
                  >
                    {claim.settledAmount
                      ? formatCurrency(claim.settledAmount)
                      : "Pending"}
                  </p>
                </div>
              </div>

              {/* Claim Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {claim.adjusterDetails && (
                  <div>
                    <h4
                      className="font-semibold font-poppins mb-1 text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Claims Adjuster
                    </h4>
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <p
                        className="font-medium font-poppins text-xs"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {claim.adjusterDetails.name}
                      </p>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {claim.adjusterDetails.phone}
                      </p>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {claim.adjusterDetails.email}
                      </p>
                    </div>
                  </div>
                )}

                {claim.repairShop && (
                  <div>
                    <h4
                      className="font-semibold font-poppins mb-1 text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Repair Shop
                    </h4>
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <p
                        className="font-medium font-poppins text-xs"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {claim.repairShop.name}
                      </p>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {claim.repairShop.address}
                      </p>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {claim.repairShop.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Future Impact */}
              <div
                className="p-3 rounded-lg mb-3"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <h4
                  className="font-semibold font-poppins mb-1 text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Impact on Future Premiums
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Premium Increase
                    </p>
                    <p
                      className="font-semibold font-poppins text-xs"
                      style={{ color: "var(--color-primary)" }}
                    >
                      +{formatCurrency(claim.futureImpact.premiumIncrease)}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      NCB Loss
                    </p>
                    <p
                      className="font-semibold font-poppins text-xs"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {claim.futureImpact.ncbLoss}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents and Photos */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FileText
                      className="h-3.5 w-3.5"
                      style={{ color: "var(--color-muted)" }}
                    />
                    <span
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {claim.documents.length} documents
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera
                      className="h-3.5 w-3.5"
                      style={{ color: "var(--color-muted)" }}
                    />
                    <span
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {claim.photos.length} photos
                    </span>
                  </div>
                </div>
                <button
                  className="py-1.5 px-3 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
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
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Document Upload */}
      <div
        className="rounded-xl shadow-lg p-4 md:p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="text-center">
          <div
            className="p-3 rounded-full mx-auto mb-3 w-fit"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Upload
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
          </div>
          <h2
            className="text-base font-bold font-poppins mb-1"
            style={{ color: "var(--color-foreground)" }}
          >
            Upload Documents
          </h2>
          <p
            className="font-roboto mb-4 text-xs"
            style={{ color: "var(--color-muted)" }}
          >
            Upload policy documents, receipts, or correspondence
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="py-1.5 px-4 rounded-lg font-semibold font-roboto text-xs text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Document Search */}
      <div
        className="rounded-xl shadow-lg p-4 md:p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
              style={{ color: "var(--color-muted)" }}
            />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border rounded-lg font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                "--tw-ring-color": "var(--color-primary)",
              }}
            />
          </div>
          <button
            className="flex items-center space-x-1 py-1.5 px-3 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-primary)",
            }}
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div
        className="rounded-xl shadow-lg p-4 md:p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-3 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <FileText
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Policy Documents</span>
        </h2>

        <div className="space-y-3">
          {dashboardData.documents
            .filter(
              (doc) =>
                searchQuery === "" ||
                doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.type.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-shadow"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <FileText
                      className="h-4 w-4"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold font-poppins text-xs"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {document.name}
                    </h3>
                    <p
                      className="text-[11px] font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {document.type.replace("_", " ")} • Version{" "}
                      {document.version} • {document.size}
                    </p>
                    <p
                      className="text-[11px] font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Uploaded: {formatDate(document.uploadDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {document.isLatest && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-medium">
                      Latest
                    </span>
                  )}
                  <button
                    className="p-1.5 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Endorsements section
  const renderEndorsementsSection = () => (
    <div className="space-y-5">
      <div
        className="rounded-xl shadow-lg p-4 md:p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-base font-bold font-poppins flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Edit
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Policy Endorsements</span>
          </h2>
        </div>
        <div className="space-y-3">
          {dashboardData.endorsements &&
          dashboardData.endorsements.length > 0 ? (
            dashboardData.endorsements.map((endorsement: any) => (
              <div
                key={endorsement.id}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div>
                  <h3
                    className="font-semibold font-poppins text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {endorsement.type}
                  </h3>
                  <p
                    className="text-[11px] font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {endorsement.description}
                  </p>
                  <p
                    className="text-[11px] font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Effective: {formatDate(endorsement.effectiveDate)} •
                    Premium: {formatCurrency(endorsement.premium)}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(
                    endorsement.status
                  )}`}
                >
                  {endorsement.status}
                </span>
              </div>
            ))
          ) : (
            <div
              className="text-center text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              No endorsements found for this policy.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "overview":
        return renderPolicyOverview();
      case "vehicle":
        return renderVehicleInfo();
      case "coverage":
        return renderCoverageDetails();
      case "claims":
        return renderClaimsCenter();
      case "documents":
        return renderDocuments();
      case "challans":
        return renderChallans();
      case "endorsements":
        return renderEndorsementsSection();
      default:
        return renderPolicyOverview();
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${policy.vehicle.make} ${policy.vehicle.model} Insurance Dashboard - ${policy.policyNumber} | Trovity`}</title>
        <meta
          name="description"
          content={`Comprehensive vehicle insurance dashboard with premium calculator, claims center, and policy management tools`}
        />
      </Helmet>

      <div
        className="min-h-screen relative"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-40 backdrop-blur-md border-b"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGoBack}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div>
                  <h1
                    className="text-lg font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {policy.vehicle.make} {policy.vehicle.model} Dashboard
                  </h1>
                  <p
                    className="text-sm font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {policy.policyType} Insurance -{policy.policyNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={"/oooCar.png"}
                  alt="Car"
                  style={{
                    position: "absolute",
                    right: 120,
                    top: -10,
                    width: 96,
                    height: "auto",
                    pointerEvents: "none",
                    userSelect: "none",
                    display: "block",
                    zIndex: 50,
                  }}
                />

                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                  title="Download Policy"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* oooCar image as a relative element in the bottom right of the main container */}

        {/* Navigation Tabs */}
        <div
          className="sticky top-16 z-30 backdrop-blur-md border-b"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2 px-1">
              {[
                { id: "overview", label: "Overview", icon: Shield },
                { id: "vehicle", label: "Vehicle Info", icon: Car },
                { id: "coverage", label: "Coverage", icon: Shield },
                { id: "claims", label: "Claims", icon: AlertTriangle },
                { id: "documents", label: "Documents", icon: FileText },
                { id: "endorsements", label: "Endorsements", icon: Edit },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id as DashboardSection)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded font-medium font-roboto text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
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
                      minHeight: 28,
                      minWidth: 60,
                    }}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderSectionContent()}
        </div>

        {/* Error Display */}
        {error && (
          <div className="fixed bottom-4 right-4 max-w-md p-4 rounded-lg bg-red-50 border border-red-200 shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="font-roboto text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PolicyDetailsPage;
