import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Shield,
  Car,
  FileText,
  DollarSign,
  Calendar,
  Phone,
  MapPin,
  Edit,
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
  Users,
  X,
  Heart,
  Upload,
  ArrowUpCircle,
} from "lucide-react";

type DashboardSection =
  | "overview"
  | "vehicle"
  | "coverage"
  | "claims"
  | "documents"
  | "challans"
  | "endorsements"
  | "hospitals"
  | "benefits"
  | "dependents"
  | "faqs";

const UniversalInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract navigation state
  const navigationState = location.state;

  // Component state
  const [policy] = useState<any>(navigationState?.policy || null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editFileIndex, setEditFileIndex] = useState<number | null>(null);
  const [editFileName, setEditFileName] = useState<string>("");
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("overview");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate navigation state
        if (!navigationState || !policy) {
          throw new Error(
            "Policy data not found. Please navigate from the policies page."
          );
        }

        // Add dummy hospital data for health insurance policies
        if (
          policy &&
          (policy.type === "Health" || policy.category === "Health")
        ) {
          policy.hospitals = [
            {
              id: "hosp001",
              name: "Apollo Hospital",
              city: "Mumbai",
              address: "Sahar Road, Andheri East, Mumbai - 400099",
              phone: "+91 22 6767 1000",
              specialties: [
                "Cardiology",
                "Neurology",
                "Orthopedics",
                "Emergency Care",
              ],
              rating: 4.8,
              distance: "2.5 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp002",
              name: "Fortis Hospital",
              city: "Mumbai",
              address:
                "Mulund Goregaon Link Road, Mulund West, Mumbai - 400078",
              phone: "+91 22 6754 2222",
              specialties: [
                "Oncology",
                "Gastroenterology",
                "Pediatrics",
                "Dermatology",
              ],
              rating: 4.6,
              distance: "3.8 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp003",
              name: "Lilavati Hospital",
              city: "Mumbai",
              address:
                "A-791, Bandra Reclamation, Bandra West, Mumbai - 400050",
              phone: "+91 22 2675 1000",
              specialties: [
                "Cardiology",
                "Nephrology",
                "Endocrinology",
                "Emergency Care",
              ],
              rating: 4.7,
              distance: "1.2 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp004",
              name: "Kokilaben Dhirubhai Ambani Hospital",
              city: "Mumbai",
              address:
                "Rao Saheb, Achutrao Patwardhan Marg, Four Bunglows, Andheri West, Mumbai - 400053",
              phone: "+91 22 4269 6969",
              specialties: [
                "Neurology",
                "Cardiac Surgery",
                "Transplant",
                "Cancer Care",
              ],
              rating: 4.9,
              distance: "4.1 km",
              cashless: true,
              type: "Super-specialty",
              emergency: true,
            },
            {
              id: "hosp005",
              name: "Nanavati Super Speciality Hospital",
              city: "Mumbai",
              address: "S.V. Road, Vile Parle West, Mumbai - 400056",
              phone: "+91 22 2626 7500",
              specialties: [
                "Orthopedics",
                "Urology",
                "Pulmonology",
                "Emergency Care",
              ],
              rating: 4.5,
              distance: "3.2 km",
              cashless: true,
              type: "Super-specialty",
              emergency: true,
            },
            {
              id: "hosp006",
              name: "Breach Candy Hospital",
              city: "Mumbai",
              address:
                "60-A, Bhulabhai Desai Road, Breach Candy, Mumbai - 400026",
              phone: "+91 22 2367 8888",
              specialties: [
                "Maternity",
                "Pediatrics",
                "General Surgery",
                "Emergency Care",
              ],
              rating: 4.4,
              distance: "5.7 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp007",
              name: "Hinduja Hospital",
              city: "Mumbai",
              address: "Veer Savarkar Marg, Mahim, Mumbai - 400016",
              phone: "+91 22 2445 1515",
              specialties: [
                "Nephrology",
                "Rheumatology",
                "Plastic Surgery",
                "Emergency Care",
              ],
              rating: 4.6,
              distance: "6.3 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp008",
              name: "Wockhardt Hospital",
              city: "Mumbai",
              address:
                "1877, Dr Anand Rao Nair Road, Near Agripada Police Station, Mumbai - 400011",
              phone: "+91 22 2659 9999",
              specialties: [
                "Cardiology",
                "Neurosurgery",
                "Joint Replacement",
                "Emergency Care",
              ],
              rating: 4.3,
              distance: "7.1 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp009",
              name: "Global Hospital",
              city: "Mumbai",
              address:
                "35, Dr E Borges Road, Hospital Avenue, Parel, Mumbai - 400012",
              phone: "+91 22 6700 7000",
              specialties: [
                "Liver Transplant",
                "Gastroenterology",
                "Critical Care",
                "Emergency Care",
              ],
              rating: 4.7,
              distance: "4.9 km",
              cashless: true,
              type: "Super-specialty",
              emergency: true,
            },
            {
              id: "hosp010",
              name: "Bombay Hospital",
              city: "Mumbai",
              address: "12, New Marine Lines, Mumbai - 400020",
              phone: "+91 22 2206 7676",
              specialties: [
                "General Medicine",
                "Surgery",
                "Psychiatry",
                "Emergency Care",
              ],
              rating: 4.2,
              distance: "8.2 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp011",
              name: "Holy Family Hospital",
              city: "Mumbai",
              address: "St Andrew Road, Bandra West, Mumbai - 400050",
              phone: "+91 22 2640 5151",
              specialties: [
                "Maternity",
                "Pediatrics",
                "Orthopedics",
                "Emergency Care",
              ],
              rating: 4.4,
              distance: "2.8 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
            {
              id: "hosp012",
              name: "Jaslok Hospital",
              city: "Mumbai",
              address: "15, Dr Deshmukh Marg, Pedder Road, Mumbai - 400026",
              phone: "+91 22 6657 3434",
              specialties: [
                "Cardiology",
                "Oncology",
                "Neurology",
                "Emergency Care",
              ],
              rating: 4.6,
              distance: "5.4 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
          ];
        }

        // Add dummy vehicle data for motor and two-wheeler policies
        if (
          policy &&
          (policy.type === "Motor" ||
            policy.type === "Two-wheeler" ||
            policy.category === "Motor" ||
            policy.category === "Two-wheeler")
        ) {
          policy.vehicle = {
            make: policy.vehicle?.make || "Honda",
            model: policy.vehicle?.model || "City",
            year: policy.vehicle?.year || "2022",
            registrationNumber:
              policy.vehicle?.registrationNumber || "MH 12 AB 1234",
            engineNumber: "G4FC123456789",
            chassisNumber: "KMHCT41BAFU123456",
            fuelType: "Petrol",
            variant: "VX CVT",
            engineCapacity: "1498 CC",
            seatingCapacity: 5,
            bodyType: "Sedan",
            color: "Pearl White",
            transmission: "Automatic",
            mileage: "17.8 kmpl",
            maxSpeed: "180 kmph",
            registrationDate: "2022-03-15",
            fitnessValidTill: "2037-03-14",
            pucValidTill: "2024-09-14",
            insuranceValidTill: "2025-03-14",
            roadTaxValidTill: "2027-03-14",
            rcStatus: "Active",
            hypothecatedTo: "HDFC Bank",
            loanAccount: "HDFC123456789",
            previousInsurer: "ICICI Lombard",
            claimHistory: [
              {
                date: "2023-08-15",
                claimNumber: "CLM2023001",
                type: "Accident",
                amount: 45000,
                status: "Settled",
                garage: "Authorized Service Center",
              },
              {
                date: "2023-02-10",
                claimNumber: "CLM2023002",
                type: "Theft",
                amount: 8500,
                status: "Settled",
                garage: "Local Garage",
              },
            ],
            accessories: [
              {
                name: "Music System",
                value: 25000,
                make: "Sony",
              },
              {
                name: "Alloy Wheels",
                value: 40000,
                make: "OEM",
              },
              {
                name: "Sunroof",
                value: 35000,
                make: "Aftermarket",
              },
            ],
            inspection: {
              lastInspectionDate: "2024-01-15",
              nextInspectionDue: "2025-01-15",
              inspectionAgency: "Royal Sundaram",
              inspectorName: "Mr. Rajesh Kumar",
              inspectionReport: "Vehicle in good condition",
              photos: ["front.jpg", "rear.jpg", "dashboard.jpg", "engine.jpg"],
            },
            roadworthiness: {
              batteryCondition: "Good",
              tyreCondition: "Good",
              brakeCondition: "Excellent",
              lightsCondition: "Good",
              suspensionCondition: "Good",
              engineCondition: "Excellent",
              lastServiceDate: "2024-05-20",
              nextServiceDue: "2024-11-20",
              serviceCenter: "Honda Authorized Service Center",
            },
          };
        }

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

  // Quick action handlers
  const handleDownload = () => {
    console.log("Downloading policy document...");
  };

  // const handleShare = () => {
  //   console.log("Sharing policy...");
  // };

  // Navigation handler
  const handleGoBack = () => {
    const returnPath = navigationState?.returnPath || "/my-policy";
    navigate(returnPath);
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

  // Calculate remaining coverage period
  const remainingDays = useMemo(() => {
    if (!policy) return 0;
    const endDate = new Date(policy.validTo || policy.policyTerm?.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [policy]);

  // Filter hospitals based on search and specialty
  const filteredHospitals =
    policy?.hospitals?.filter((hospital: any) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specialties.some((s: string) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesSpecialty =
        selectedSpecialty === "all" ||
        hospital.specialties.includes(selectedSpecialty);
      return matchesSearch && matchesSpecialty;
    }) || [];

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(policy?.hospitals?.flatMap((h: any) => h.specialties) || [])
  ).sort();

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

  const renderTabNavigation = () => {
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

    const tabs = getTabsForPolicyType(policy.type || policy.policyType);

    return (
      <div
        className="sticky top-20 z-30 backdrop-blur-md border-b"
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
                  onClick={() => setActiveSection(tab.id as DashboardSection)}
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
                    height: isActive ? "32px" : "28px", // slightly larger when active
                    fontSize: isActive ? "0.95rem" : "0.85rem", // slightly larger when active
                    paddingLeft: isActive ? "0.75rem" : "0.5rem", // slightly larger when active
                    paddingRight: isActive ? "0.75rem" : "0.5rem", // slightly larger when active
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

  const renderPolicyOverview = () => (
    <div className="space-y-4">
      {/* Policy Header Card */}
      <div
        className="rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Gradient Header */}
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
                  {policy.type === "Health" ? (
                    <Heart className="h-5 w-5" />
                  ) : (
                    <Shield className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-bold font-poppins">
                    {policy.type === "Health"
                      ? `${policy.type} Insurance`
                      : `${policy.vehicle?.make || policy.type} ${
                          policy.vehicle?.model || "Insurance"
                        }`}
                  </h1>
                  <p className="text-white/80 font-roboto text-xs">
                    {policy.provider}
                  </p>
                </div>
              </div>
              {/* Policy Number with Copy */}
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
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Coverage
                  </span>
                </div>
                <p className="text-lg font-bold font-poppins">
                  {policy.sumInsured || "₹5,00,000"}
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
                  {policy.premium || "₹12,000"}
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
        {/* Quick Actions */}
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

      {/* Key Dates Calendar */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Calendar
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="text-sm">Important Dates</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Calendar
              className="h-6 w-6 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Policy Start
            </p>
            <p
              className="text-sm font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {formatDate(policy.validFrom || policy.policyTerm?.startDate)}
            </p>
          </div>
          <div
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Calendar
              className="h-6 w-6 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Policy End
            </p>
            <p
              className="text-sm font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {formatDate(policy.validTo || policy.policyTerm?.endDate)}
            </p>
          </div>
          <div
            className="text-center p-3 rounded-lg"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Calendar
              className="h-6 w-6 mx-auto mb-1"
              style={{ color: "var(--color-primary)" }}
            />
            <p
              className="text-xs font-roboto"
              style={{ color: "var(--color-muted)" }}
            >
              Next Payment
            </p>
            <p
              className="text-sm font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              {formatDate(policy.validTo || policy.policyTerm?.renewalDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h2
          className="text-base font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Phone
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="text-sm">Emergency Contacts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              name: "Customer Care",
              phone: "1800-123-4567",
              available24x7: true,
            },
            {
              name: "Claims Support",
              phone: "1800-765-4321",
              available24x7: true,
            },
            {
              name: "Roadside Assistance",
              phone: "1800-111-2222",
              available24x7: true,
            },
            {
              name: "Hospital Support",
              phone: "1800-333-4444",
              available24x7: false,
            },
          ].map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="p-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <Phone
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-semibold font-poppins text-xs"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {contact.name}
                  </p>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {contact.phone}
                  </p>
                </div>
              </div>
              {contact.available24x7 && (
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-medium">
                  24x7
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVehicleInfo = () => (
    <div className="space-y-6">
      {/* Vehicle Overview Card */}
      <div
        className="rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        {/* Vehicle Header */}
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-poppins">
                    {policy.vehicle?.make} {policy.vehicle?.model}
                  </h1>
                  <p className="text-white/80 font-roboto">
                    {policy.vehicle?.year} • {policy.vehicle?.variant}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 font-roboto text-sm">
                  Registration No.
                </p>
                <p className="text-lg font-bold font-poppins">
                  {policy.vehicle?.registrationNumber}
                </p>
              </div>
            </div>

            {/* Key Vehicle Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Car className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Engine
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {policy.vehicle?.engineCapacity}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Fuel
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {policy.vehicle?.fuelType}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Mileage
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {policy.vehicle?.mileage}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-roboto text-white/80 text-xs">
                    Status
                  </span>
                </div>
                <p className="text-sm font-bold font-poppins">
                  {policy.vehicle?.rcStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Vehicle Information */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Car
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Vehicle Details</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Make & Model
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.make} {policy.vehicle?.model}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Year of Manufacture
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.year}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Variant
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.variant}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Body Type
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.bodyType}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Color
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.color}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Seating Capacity
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.seatingCapacity} Seater
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Transmission
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.transmission}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Max Speed
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.maxSpeed}
              </p>
            </div>
          </div>
        </div>

        {/* Engine & Technical Details */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Shield
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Technical Specifications</span>
          </h3>
          <div className="space-y-4">
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Engine Number
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.engineNumber}
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
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.chassisNumber}
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
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.engineCapacity}
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
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.fuelType}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-roboto mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Mileage
              </p>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {policy.vehicle?.mileage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Claim History */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <FileText
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Vehicle Claim History</span>
        </h3>
        <div className="space-y-4">
          {policy.vehicle?.claimHistory?.map((claim: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4
                    className="font-semibold font-poppins text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {claim.claimNumber}
                  </h4>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {claim.type} • {formatDate(claim.date)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    claim.status
                  )}`}
                >
                  {claim.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Claim Amount
                  </p>
                  <p
                    className="font-semibold font-poppins text-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ₹{claim.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Garage
                  </p>
                  <p
                    className="font-medium font-poppins text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {claim.garage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-8">
      {/* Policy Benefits */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6"
          style={{ color: "var(--color-foreground)" }}
        >
          Policy Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            policy.benefits || [
              "Cashless hospitalization",
              "Pre and post hospitalization",
              "Ambulance charges",
              "Day care procedures",
              "Domiciliary treatment",
              "Annual health check-up",
            ]
          ).map((benefit: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span
                className="font-roboto text-sm"
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
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6"
          style={{ color: "var(--color-foreground)" }}
        >
          Policy Exclusions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            policy.exclusions || [
              "Pre-existing diseases (first 2 years)",
              "Cosmetic surgery",
              "Dental treatment",
              "Self-inflicted injuries",
              "War and nuclear risks",
              "Experimental treatments",
            ]
          ).map((exclusion: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span
                className="font-roboto text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                {exclusion}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDependents = () => {
    // Mock dependents data - in real app this would come from policy data
    const dependents = policy.dependents || [
      {
        id: "1",
        name: "Jane Doe",
        relationship: "Spouse",
        dateOfBirth: "1988-03-15",
        age: 37,
        sumInsured: "₹5,00,000",
        status: "Active",
        policyStartDate: "2024-01-15",
        claimHistory: {
          totalClaimed: 45000,
          pendingClaims: 15000,
          settledClaims: 30000,
          claimCount: 3,
        },
      },
      {
        id: "2",
        name: "Alex Doe",
        relationship: "Son",
        dateOfBirth: "2010-07-22",
        age: 14,
        sumInsured: "₹3,00,000",
        status: "Active",
        policyStartDate: "2024-01-15",
        claimHistory: {
          totalClaimed: 8500,
          pendingClaims: 0,
          settledClaims: 8500,
          claimCount: 1,
        },
      },
      {
        id: "3",
        name: "Emily Doe",
        relationship: "Daughter",
        dateOfBirth: "2015-11-08",
        age: 9,
        sumInsured: "₹3,00,000",
        status: "Active",
        policyStartDate: "2024-01-15",
        claimHistory: {
          totalClaimed: 0,
          pendingClaims: 0,
          settledClaims: 0,
          claimCount: 0,
        },
      },
    ];

    return (
      <div className="space-y-6">
        {/* Summary Card */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-md font-bold font-poppins mb-4 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Users
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Covered Dependents</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <Users
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-lg font-bold font-poppins"
                style={{ color: "var(--color-foreground)" }}
              >
                {dependents.length}
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Total Dependents
              </p>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <CheckCircle
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-lg font-bold font-poppins"
                style={{ color: "var(--color-foreground)" }}
              >
                {dependents.filter((d: any) => d.status === "Active").length}
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Active Coverage
              </p>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <Shield
                className="h-8 w-8 mx-auto mb-2"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-lg font-bold font-poppins"
                style={{ color: "var(--color-foreground)" }}
              >
                ₹11,00,000
              </p>
              <p
                className="text-xs font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Total Coverage
              </p>
            </div>
          </div>
        </div>

        {/* Dependents List */}
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-md font-bold font-poppins flex items-center space-x-2"
              style={{ color: "var(--color-foreground)" }}
            >
              <Users
                className="h-5 w-5"
                style={{ color: "var(--color-primary)" }}
              />
              <span>Dependent Details</span>
            </h3>
          </div>

          <div className="space-y-4">
            {dependents.map((dependent: any) => (
              <div
                key={dependent.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <Users
                        className="h-6 w-6"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-bold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {dependent.name}
                      </h4>
                      <p
                        className="font-roboto text-sm"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {dependent.relationship} • Age {dependent.age}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      dependent.status
                    )}`}
                  >
                    {dependent.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Date of Birth
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatDate(dependent.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Sum Insured
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {dependent.sumInsured}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Coverage Start
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatDate(dependent.policyStartDate)}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Total Claims
                    </p>
                    <p className="font-medium font-poppins text-sm">
                      {dependent.claimHistory.claimCount} Claims
                    </p>
                  </div>
                </div>

                {/* Claim History Section */}
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <h5
                    className="text-sm font-semibold font-poppins mb-3"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Claim History
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p
                        className="text-xs font-roboto mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Total Claimed
                      </p>
                      <p
                        className="font-semibold font-poppins text-sm"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        ₹{dependent.claimHistory.totalClaimed.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-roboto mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Settled Claims
                      </p>
                      <p className="font-semibold font-poppins text-sm text-green-600">
                        ₹{dependent.claimHistory.settledClaims.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-roboto mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Pending Claims
                      </p>
                      <p className="font-semibold font-poppins text-sm text-orange-600">
                        ₹{dependent.claimHistory.pendingClaims.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar for Claims */}
                  {dependent.claimHistory.totalClaimed > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Claim Utilization
                        </span>
                        <span
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {(
                            (dependent.claimHistory.totalClaimed /
                              parseInt(
                                dependent.sumInsured.replace(/[₹,]/g, "")
                              )) *
                            100
                          ).toFixed(1)}
                          % of Sum Insured
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="flex h-2 rounded-full overflow-hidden">
                          {/* Settled Claims Bar */}
                          <div
                            className="bg-green-500"
                            style={{
                              width: `${
                                (dependent.claimHistory.settledClaims /
                                  parseInt(
                                    dependent.sumInsured.replace(/[₹,]/g, "")
                                  )) *
                                100
                              }%`,
                            }}
                          ></div>
                          {/* Pending Claims Bar */}
                          <div
                            className="bg-orange-500"
                            style={{
                              width: `${
                                (dependent.claimHistory.pendingClaims /
                                  parseInt(
                                    dependent.sumInsured.replace(/[₹,]/g, "")
                                  )) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-muted)" }}
                          >
                            Settled
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-muted)" }}
                          >
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {dependent.claimHistory.totalClaimed === 0 && (
                    <div className="text-center py-4">
                      <p
                        className="text-sm font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        No claims filed yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Limits */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-md font-bold font-poppins mb-4 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)" }}
          >
            <Shield
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Coverage Information</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4
                className="font-semibold font-poppins text-sm mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                Family Floater Benefits
              </h4>
              <div className="space-y-2">
                {[
                  "Shared sum insured across all family members",
                  "No sub-limits for individual members",
                  "Cumulative bonus applicable to entire family",
                  "Cashless treatment for all dependents",
                  "Pre and post hospitalization coverage",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span
                      className="text-sm font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4
                className="font-semibold font-poppins text-sm mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                Important Notes
              </h4>
              <div className="space-y-2">
                {[
                  "Maternity coverage available after 2 years",
                  "Pre-existing diseases covered after 2-4 years",
                  "Annual health check-up for all members",
                  "Dependent addition possible during renewal",
                  "Age limits apply for dependent children",
                ].map((note, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span
                      className="text-sm font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHospitals = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="flex flex-col lg:flex-row gap-3">
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
              className="w-full pl-9 pr-3 py-2 border rounded-lg font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                fontSize: "0.85rem",
              }}
            />
          </div>
          <div className="flex gap-1">
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="appearance-none border rounded-lg px-3 py-2 pr-7 font-roboto text-xs focus:outline-none focus:ring-2 transition-all min-w-36"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-foreground)",
                  fontSize: "0.85rem",
                }}
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={String(specialty)} value={String(specialty)}>
                    {String(specialty)}
                  </option>
                ))}
              </select>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-2 py-2 border rounded-lg text-xs transition-all duration-200 hover:shadow-md"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                  fontSize: "0.85rem",
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Summary Stats */}
      </div>

      {/* Hospital List */}
      <div
        className="rounded-xl shadow-lg p-5"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-md font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
        >
          <MapPin
            className="h-4 w-4"
            style={{ color: "var(--color-primary)" }}
          />
          <span style={{ fontSize: "0.95rem" }}>
            Network Hospitals ({filteredHospitals.length})
          </span>
        </h3>

        {filteredHospitals.length === 0 ? (
          <div className="text-center py-8">
            <MapPin
              className="h-10 w-10 mx-auto mb-3"
              style={{ color: "var(--color-muted)" }}
            />
            <h4
              className="text-base font-semibold font-poppins mb-1"
              style={{ color: "var(--color-foreground)", fontSize: "0.95rem" }}
            >
              No hospitals found
            </h4>
            <p
              className="font-roboto text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              Try adjusting your search criteria or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHospitals.map((hospital: any) => (
              <div
                key={hospital.id}
                className="border rounded-xl p-4 hover:shadow-lg transition-all duration-200"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start space-x-2 mb-3">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Heart
                      className="h-4 w-4"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-0.5">
                      <h4
                        className="font-semibold font-poppins text-xs"
                        style={{
                          color: "var(--color-foreground)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {hospital.name}
                      </h4>
                      {hospital.cashless && (
                        <span className="px-1.5 py-0.5 text-[10px] font-roboto rounded-full bg-green-100 text-green-800 border border-green-200">
                          Cashless
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs font-roboto flex items-center space-x-1"
                      style={{
                        color: "var(--color-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>
                        {hospital.city} • {hospital.distance}
                      </span>
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-[10px] ${
                              i < Math.floor(hospital.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span
                        className="text-[10px] font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {hospital.rating}/5
                      </span>
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-roboto rounded-full"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {hospital.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p
                    className="text-[10px] font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Specialties:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties
                      .slice(0, 3)
                      .map((specialty: string, index: number) => (
                        <span
                          key={index}
                          className="px-1.5 py-0.5 text-[10px] font-roboto rounded-md"
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    {hospital.specialties.length > 3 && (
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-roboto rounded-md"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-muted)",
                        }}
                      >
                        +{hospital.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-3">
                  <div
                    className="text-center p-1 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Phone
                      className="h-3 w-3 mx-auto mb-0.5"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <p
                      className="text-[10px] font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      24x7 Contact
                    </p>
                  </div>
                  <div
                    className="text-center p-1 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <AlertTriangle
                      className="h-3 w-3 mx-auto mb-0.5"
                      style={{
                        color: hospital.emergency
                          ? "var(--color-primary)"
                          : "var(--color-muted)",
                      }}
                    />
                    <p
                      className="text-[10px] font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Emergency
                    </p>
                  </div>
                </div>

                <div className="flex space-x-1">
                  <button
                    className="flex-1 py-1.5 px-2 rounded-lg font-medium font-roboto text-xs text-white transition-all duration-200 hover:opacity-90"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <Eye className="h-3 w-3 inline mr-1" />
                    View Details
                  </button>
                  <button
                    className="py-1.5 px-2 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <MapPin className="h-3 w-3 inline mr-1" />
                    Route
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Mock coverages data for motor and two-wheeler policies
  const mockCoverages = {
    motor: {
      coverages: [
        {
          title: "Own Damage Cover",
          description:
            "Covers damage to your vehicle due to accident, fire, theft, or natural calamities.",
        },
        {
          title: "Third Party Liability",
          description:
            "Covers legal liability for injury/death or property damage to third parties.",
        },
        {
          title: "Personal Accident Cover",
          description:
            "Provides compensation in case of death or disability of the owner-driver.",
        },
      ],
      addOns: [
        {
          title: "Zero Depreciation",
          description:
            "Full claim without deduction for depreciation on parts.",
        },
        {
          title: "Engine Protect",
          description:
            "Covers damage to engine and gearbox due to water ingression or oil leakage.",
        },
        {
          title: "Roadside Assistance",
          description:
            "24x7 support for breakdowns, towing, fuel delivery, and more.",
        },
      ],
    },
    twoWheeler: {
      coverages: [
        {
          title: "Own Damage Cover",
          description:
            "Covers accidental damage, fire, theft, and natural disasters for your bike.",
        },
        {
          title: "Third Party Liability",
          description:
            "Covers injury/death or property damage to third parties.",
        },
        {
          title: "Personal Accident Cover",
          description: "Compensation for owner-rider in case of accident.",
        },
      ],
      addOns: [
        {
          title: "Helmet Cover",
          description: "Covers loss or damage to helmet.",
        },
        {
          title: "NCB Protect",
          description: "Retain No Claim Bonus even after a claim.",
        },
        {
          title: "Roadside Assistance",
          description: "Emergency help for breakdowns and towing.",
        },
      ],
    },
  };

  // Render method for Coverages tab
  const renderCoverages = () => {
    // Determine policy type
    const type = (policy.type || policy.policyType || "motor").toLowerCase();
    const data = type.includes("two")
      ? mockCoverages.twoWheeler
      : mockCoverages.motor;
    return (
      <div className="space-y-8">
        {/* What the policy covers */}
        <div
          className="rounded-xl shadow-lg p-5"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
            borderWidth: 1,
          }}
        >
          <h3
            className="text-base font-bold font-poppins mb-4 flex items-center gap-2"
            style={{ color: "var(--color-primary)" }}
          >
            <Shield
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            What This Policy Covers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.coverages.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-3 flex flex-col gap-1 hover:shadow-lg transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h4
                    className="font-semibold font-poppins text-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.title}
                  </h4>
                </div>
                <p
                  className="font-roboto text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Add-ons */}
        <div
          className="rounded-xl shadow-lg p-5"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
            borderWidth: 1,
          }}
        >
          <h3
            className="text-base font-bold font-poppins mb-4 flex items-center gap-2"
            style={{ color: "var(--color-primary)" }}
          >
            <RefreshCw
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            Popular Add-ons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.addOns.map((addon, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-3 flex flex-col gap-1 hover:shadow-lg transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw
                    className="h-4 w-4"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h4
                    className="font-semibold font-poppins text-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {addon.title}
                  </h4>
                </div>
                <p
                  className="font-roboto text-xs"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderClaims = () => {
    // Mock claims data - in real app this would come from API
    const claims = policy.claims || [
      {
        id: "CLM-2024-001",
        claimNumber: "CLM-2024-001",
        type: "Hospitalization",
        description: "Emergency surgery for appendicitis",
        dateOfIncident: "2024-06-15",
        dateSubmitted: "2024-06-18",
        status: "Settled",
        claimedAmount: 125000,
        settledAmount: 120000,
        hospital: "Apollo Hospital, Mumbai",
        dependent: "Jane Doe (Self)",
        documents: ["Medical bills", "Discharge summary", "Lab reports"],
        remarks: "Claim settled successfully after verification",
      },
      {
        id: "CLM-2024-002",
        claimNumber: "CLM-2024-002",
        type: "Diagnostic Tests",
        description: "Annual health check-up and blood tests",
        dateOfIncident: "2024-05-20",
        dateSubmitted: "2024-05-22",
        status: "Under Review",
        claimedAmount: 8500,
        settledAmount: 0,
        hospital: "Fortis Healthcare, Mumbai",
        dependent: "Alex Doe (Son)",
        documents: ["Test reports", "Prescription"],
        remarks: "Under medical review for coverage verification",
      },
      {
        id: "CLM-2024-003",
        claimNumber: "CLM-2024-003",
        type: "Emergency Treatment",
        description: "Fracture treatment after accident",
        dateOfIncident: "2024-04-10",
        dateSubmitted: "2024-04-12",
        status: "Rejected",
        claimedAmount: 45000,
        settledAmount: 0,
        hospital: "Lilavati Hospital, Mumbai",
        dependent: "Emily Doe (Daughter)",
        documents: ["X-ray reports", "Treatment bills"],
        remarks: "Claim rejected due to pre-existing condition exclusion",
      },
    ];

    return (
      <div className="space-y-6">
        {/* Raise New Claim Section */}
        <div
          className="rounded-xl shadow-lg p-5"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-md font-bold font-poppins mb-3 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
          >
            <AlertTriangle
              className="h-4 w-4"
              style={{ color: "var(--color-primary)" }}
            />
            <span style={{ fontSize: "0.95rem" }}>Raise a New Claim</span>
          </h3>
          <p
            className="font-roboto mb-4 text-xs"
            style={{ color: "var(--color-muted)" }}
          >
            Need to file a claim? Follow these simple steps to submit your claim
            quickly and easily.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
            {[
              {
                step: "1",
                title: "Gather Documents",
                description: "Collect all medical bills, reports, and receipts",
                icon: FileText,
              },
              {
                step: "2",
                title: "Fill Claim Form",
                description: "Complete the claim form with accurate details",
                icon: Edit,
              },
              {
                step: "3",
                title: "Submit Online",
                description: "Upload documents and submit your claim",
                icon: Upload,
              },
              {
                step: "4",
                title: "Track Status",
                description: "Monitor your claim progress in real-time",
                icon: Eye,
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="text-center p-2 rounded-lg border"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <span className="text-white font-bold font-poppins text-xs">
                      {step.step}
                    </span>
                  </div>
                  <Icon
                    className="h-4 w-4 mx-auto mb-1"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h4
                    className="font-semibold font-poppins text-xs mb-0.5"
                    style={{
                      color: "var(--color-foreground)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-[10px] font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button
              className="flex items-center justify-center space-x-2 py-2 px-2 rounded-lg font-medium font-roboto text-xs text-white transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "var(--color-primary)",
                fontSize: "0.85rem",
              }}
            >
              <AlertTriangle className="h-3 w-3" />
              <span>File New Claim</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 py-2 px-2 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
                fontSize: "0.85rem",
              }}
            >
              <Phone className="h-3 w-3" />
              <span>Call Support</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 py-2 px-2 rounded-lg font-medium font-roboto text-xs transition-all duration-200"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
                fontSize: "0.85rem",
              }}
            >
              <FileText className="h-3 w-3" />
              <span>Download Forms</span>
            </button>
          </div>
        </div>

        {/* Claims Summary */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-base font-bold font-poppins mb-3 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
          >
            <Users
              className="h-4 w-4"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Claims Summary</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              className="text-center p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <FileText
                className="h-5 w-5 mx-auto mb-1"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-base font-bold font-poppins"
                style={{
                  color: "var(--color-foreground)",
                  fontSize: "0.95rem",
                }}
              >
                {claims.length}
              </p>
              <p
                className="text-[11px] font-roboto"
                style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
              >
                Total Claims
              </p>
            </div>
            <div
              className="text-center p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <CheckCircle
                className="h-5 w-5 mx-auto mb-1"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-base font-bold font-poppins"
                style={{
                  color: "var(--color-foreground)",
                  fontSize: "0.95rem",
                }}
              >
                {claims.filter((c: any) => c.status === "Settled").length}
              </p>
              <p
                className="text-[11px] font-roboto"
                style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
              >
                Settled
              </p>
            </div>
            <div
              className="text-center p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <RefreshCw
                className="h-5 w-5 mx-auto mb-1"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-base font-bold font-poppins"
                style={{
                  color: "var(--color-foreground)",
                  fontSize: "0.95rem",
                }}
              >
                {claims.filter((c: any) => c.status === "Under Review").length}
              </p>
              <p
                className="text-[11px] font-roboto"
                style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
              >
                Under Review
              </p>
            </div>
            <div
              className="text-center p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <DollarSign
                className="h-5 w-5 mx-auto mb-1"
                style={{ color: "var(--color-primary)" }}
              />
              <p
                className="text-base font-bold font-poppins"
                style={{
                  color: "var(--color-foreground)",
                  fontSize: "0.95rem",
                }}
              >
                ₹
                {claims
                  .reduce(
                    (sum: number, claim: any) => sum + claim.settledAmount,
                    0
                  )
                  .toLocaleString()}
              </p>
              <p
                className="text-[11px] font-roboto"
                style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}
              >
                Total Settled
              </p>
            </div>
          </div>
        </div>

        {/* Claims History */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-sm font-bold font-poppins mb-5 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)", fontSize: "0.95rem" }}
          >
            <FileText
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Claims History</span>
          </h3>

          <div className="space-y-4">
            {claims.map((claim: any) => (
              <div
                key={claim.id}
                className="border rounded-xl p-4 hover:shadow-md transition-shadow"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <FileText
                        className="h-6 w-6"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div>
                      <h4
                        className="text-lg font-bold font-poppins"
                        style={{
                          color: "var(--color-foreground)",
                          fontSize: "1.05rem",
                        }}
                      >
                        {claim.type}
                      </h4>
                      <p
                        className="font-roboto text-sm"
                        style={{
                          color: "var(--color-muted)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Claim #{claim.claimNumber}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      claim.status
                    )}`}
                  >
                    {claim.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Date of Incident
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatDate(claim.dateOfIncident)}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Hospital
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {claim.hospital}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Claimed Amount
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      ₹{claim.claimedAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Settled Amount
                    </p>
                    <p
                      className="font-medium font-poppins text-sm"
                      style={{
                        color:
                          claim.settledAmount > 0
                            ? "var(--color-primary)"
                            : "var(--color-muted)",
                      }}
                    >
                      {claim.settledAmount > 0
                        ? `₹${claim.settledAmount.toLocaleString()}`
                        : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Description
                  </p>
                  <p
                    className="font-roboto text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {claim.description}
                  </p>
                </div>

                <div className="mb-3">
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Dependent
                  </p>
                  <p
                    className="font-roboto text-sm"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {claim.dependent}
                  </p>
                </div>

                <div className="mb-3">
                  <p
                    className="text-xs font-roboto mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Documents Submitted
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {claim.documents.map((doc: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {claim.remarks && (
                  <div
                    className="pt-4 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <p
                      className="text-xs font-roboto mb-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Remarks
                    </p>
                    <p
                      className="font-roboto text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {claim.remarks}
                    </p>
                  </div>
                )}

                <div
                  className="flex space-x-3 mt-4 pt-4 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <button
                    className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    View Details
                  </button>
                  <button
                    className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  {claim.status === "Under Review" && (
                    <button
                      className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Track Status
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <h3
            className="text-base font-bold font-poppins mb-3 flex items-center space-x-2"
            style={{ color: "var(--color-foreground)", fontSize: "1rem" }}
          >
            <Phone
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
            <span>Need Help?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="flex items-center space-x-3 p-4 rounded-lg border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <Phone
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <div>
                <p
                  className="font-semibold font-poppins text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Claims Helpline
                </p>
                <p
                  className="text-sm font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  1800-123-CLAIM (24x7)
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-3 p-4 rounded-lg border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <AlertTriangle
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <div>
                <p
                  className="font-semibold font-poppins text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Emergency Claims
                </p>
                <p
                  className="text-sm font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  File within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDocuments = () => (
    <div
      className="rounded-xl shadow-lg p-6"
      style={{ backgroundColor: "var(--color-card)" }}
    >
      {/* Upload Document Option */}
      {/* Upload Document Option with Choose, Upload, and Delete */}
      <div className="mb-8 w-full">
        <div
          className="w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-secondary)",
          }}
        >
          <Upload
            className="h-10 w-10 mb-2 text-primary"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="font-semibold font-poppins text-base mb-1">
            Upload New Document
          </span>
          <span
            className="text-xs font-roboto mb-2"
            style={{ color: "var(--color-muted)" }}
          >
            PDF, JPG, PNG up to 10MB
          </span>
          <input
            id="upload-document"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles((prev) => [...prev, ...files]);
            }}
          />
          <div className="flex gap-2 mt-2">
            <label
              htmlFor="upload-document"
              className="px-4 py-2 rounded text-white text-sm font-roboto cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Upload
                className="h-4 w-4"
                style={{ color: "var(--color-background)" }}
              />
              Choose Files
            </label>
            <button
              className="px-4 py-2 rounded text-white text-sm font-roboto hover:opacity-90 transition-all flex items-center gap-2"
              style={{ backgroundColor: "var(--color-success)" }}
              disabled={selectedFiles.length === 0}
              onClick={() => {
                if (selectedFiles.length > 0) {
                  // TODO: Implement upload logic here
                  alert(
                    `Uploading: ${selectedFiles.map((f) => f.name).join(", ")}`
                  );
                  setSelectedFiles([]);
                }
              }}
            >
              <ArrowUpCircle
                className="h-4 w-4"
                style={{ color: "var(--color-background)" }}
              />
              Upload
            </button>
          </div>
          {/* Grid structure for selected files */}
          {selectedFiles.length > 0 && (
            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded px-3 py-2 shadow border"
                  style={{
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    {editFileIndex === idx ? (
                      <input
                        type="text"
                        value={editFileName}
                        onChange={(e) => setEditFileName(e.target.value)}
                        className="border rounded px-2 py-1 text-sm font-roboto flex-1 mr-2"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-card)",
                          color: "var(--color-foreground)",
                        }}
                        onBlur={() => {
                          if (editFileName.trim()) {
                            // Rename logic (temporary, only UI)
                            const renamed = new File([file], editFileName, {
                              type: file.type,
                            });
                            setSelectedFiles((files) =>
                              files.map((f, i) => (i === idx ? renamed : f))
                            );
                          }
                          setEditFileIndex(null);
                          setEditFileName("");
                        }}
                      />
                    ) : (
                      <span
                        className="text-sm font-roboto cursor-pointer"
                        style={{ color: "var(--color-primary)" }}
                        onClick={() => {
                          setEditFileIndex(idx);
                          setEditFileName(file.name);
                        }}
                      >
                        {file.name}
                      </span>
                    )}
                    <div className="flex gap-2">
                      <button
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-accent)",
                          color: "var(--color-background)",
                        }}
                        onClick={() => {
                          setEditFileIndex(idx);
                          setEditFileName(file.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: "var(--color-danger)",
                          color: "var(--color-background)",
                        }}
                        onClick={() =>
                          setSelectedFiles((files) =>
                            files.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {file.type} • {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(policy.documents
          ? Object.entries(policy.documents)
          : [
              ["Policy Document", "/documents/policy.pdf"],
              ["Certificate", "/documents/certificate.pdf"],
              ["Terms & Conditions", "/documents/terms.pdf"],
            ]
        ).map(([name], index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <FileText
                  className="h-5 w-5"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <div className="flex-1">
                <h4
                  className="font-semibold font-poppins text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {name}
                </h4>
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  PDF • 2.5 MB
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View
              </button>
              <button
                className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEndorsements = () => (
    <div className="space-y-6">
      {/* Request New Endorsement */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Edit className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
          <span>Request Policy Endorsement</span>
        </h3>
        <p
          className="font-roboto mb-6 text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Need to make changes to your policy? Request an endorsement for
          updates like address change, nominee details, coverage modifications,
          and more.
        </p>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              type: "Address Change",
              description: "Update your registered address",
              icon: MapPin,
              fee: "₹100",
            },
            {
              type: "Nominee Update",
              description: "Change or add nominee details",
              icon: Users,
              fee: "₹50",
            },
            {
              type: "Coverage Enhancement",
              description: "Increase sum insured or add-ons",
              icon: Shield,
              fee: "Pro-rated",
            },
            {
              type: "Vehicle Modification",
              description: "Update vehicle specifications",
              icon: Car,
              fee: "₹200",
            },
            {
              type: "Contact Update",
              description: "Change phone or email",
              icon: Phone,
              fee: "Free",
            },
            {
              type: "Other Changes",
              description: "Any other policy modifications",
              icon: Edit,
              fee: "Varies",
            },
          ].map((endorsement, index) => {
            const Icon = endorsement.icon;
            return (
              <div
                key={index}
                className="border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-opacity-60"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold font-poppins text-sm"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {endorsement.type}
                    </h4>
                    <p
                      className="text-xs font-roboto mt-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {endorsement.description}
                    </p>
                    <span
                      className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Fee: {endorsement.fee}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Request
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Endorsement History */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-6 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <FileText
            className="h-5 w-5"
            style={{ color: "var(--color-primary)" }}
          />
          <span>Endorsement History</span>
        </h3>

        {/* Sample endorsement data - in real app this would come from API */}
        {policy.endorsements && policy.endorsements.length > 0 ? (
          <div className="space-y-4">
            {policy.endorsements.map((endorsement: any, index: number) => (
              <div
                key={index}
                className="border rounded-xl p-4"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
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
                      <h4
                        className="font-semibold font-poppins text-sm"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {endorsement.type}
                      </h4>
                      <p
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Endorsement #{endorsement.number}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      endorsement.status
                    )}`}
                  >
                    {endorsement.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Requested Date
                    </p>
                    <p
                      className="font-medium font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {formatDate(endorsement.requestedDate)}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Effective Date
                    </p>
                    <p
                      className="font-medium font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {endorsement.effectiveDate
                        ? formatDate(endorsement.effectiveDate)
                        : "Pending"}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Fee
                    </p>
                    <p
                      className="font-medium font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {endorsement.fee}
                    </p>
                  </div>
                </div>
                {endorsement.description && (
                  <div
                    className="mt-3 pt-3 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Description
                    </p>
                    <p
                      className="text-sm font-roboto mt-1"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {endorsement.description}
                    </p>
                  </div>
                )}
                {endorsement.status === "completed" && (
                  <div className="mt-3 flex space-x-2">
                    <button
                      className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <Eye className="h-4 w-4 inline mr-1" />
                      View Certificate
                    </button>
                    <button
                      className="py-2 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* No endorsements */
          <div className="text-center py-8">
            <Edit
              className="h-12 w-12 mx-auto mb-4"
              style={{ color: "var(--color-muted)" }}
            />
            <p
              className="text-lg font-semibold font-poppins mb-2"
              style={{ color: "var(--color-foreground)" }}
            >
              No Endorsements Found
            </p>
            <p
              className="font-roboto mb-4"
              style={{ color: "var(--color-muted)" }}
            >
              You haven't requested any policy modifications yet.
            </p>
            <button
              className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Request Endorsement
            </button>
          </div>
        )}
      </div>

      {/* Important Notes */}
      <div
        className="rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <h3
          className="text-lg font-bold font-poppins mb-4 flex items-center space-x-2"
          style={{ color: "var(--color-foreground)" }}
        >
          <Info className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
          <span>Important Information</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Processing Time
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Most endorsements are processed within 2-3 business days
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Documentation Required
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Supporting documents may be required based on the type of
                endorsement
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Premium Impact
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Some endorsements may result in premium adjustments
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p
                className="font-medium font-poppins text-sm"
                style={{ color: "var(--color-foreground)" }}
              >
                Policy Terms
              </p>
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                All endorsements are subject to policy terms and conditions
              </p>
            </div>
          </div>
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
      case "benefits":
        return renderBenefits();
      case "dependents":
        return renderDependents();
      case "hospitals":
        return renderHospitals();
      case "claims":
        return renderClaims();
      case "coverage":
        return renderCoverages();
      case "documents":
        return renderDocuments();
      case "endorsements":
        return renderEndorsements();
      default:
        return renderPolicyOverview();
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Helmet>
        <title>{policy.policyNumber} - Policy Details | Insurance Portal</title>
      </Helmet>

      {/* Header with Navigation */}
      <div className="border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="p-2 rounded-lg transition-all duration-200 hover:opacity-80"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1
                  className="text-xl font-bold font-poppins"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {policy.policyType} insurance
                </h1>
                <p
                  className="text-sm font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  {policy.policyName} - {policy.policyNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  policy.status
                )}`}
              >
                {policy.status}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
                {/* <button
                  onClick={handleShare}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                  title="Share"
                >
                  <Share2 className="h-5 w-5" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      {renderTabNavigation()}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default UniversalInsuranceDetailsPage;
