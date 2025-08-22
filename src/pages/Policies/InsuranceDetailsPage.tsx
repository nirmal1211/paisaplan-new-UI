import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Download, AlertTriangle } from "lucide-react";
import {
  DashboardSection,
  Policy,
  // Hospital,
} from "./InsuranceDetails/types";
import TabNavigation from "./InsuranceDetails/components/TabNavigation";
import PolicyOverview from "./InsuranceDetails/components/PolicyOverview";
import VehicleInfo from "./InsuranceDetails/components/VehicleInfo";
import Benefits from "./InsuranceDetails/components/Benefits";
import Hospitals from "./InsuranceDetails/components/Hospitals";
import Dependents from "./InsuranceDetails/components/Dependents";
import Documents from "./InsuranceDetails/components/Documents";
import Coverages from "./InsuranceDetails/components/Coverages";
import Claims from "./InsuranceDetails/components/Claims";
import Endorsements from "./InsuranceDetails/components/Endorsements";

const InsuranceDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract navigation state
  const navigationState = location.state;

  // Component state
  const [policy] = useState<Policy>(navigationState?.policy || null);
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
              distance: "5.2 km",
              cashless: true,
              type: "Multi-specialty",
              emergency: true,
            },
          ];
        }

        // Add dummy dependent data for health insurance policies
        if (
          policy &&
          (policy.type === "Health" || policy.category === "Health")
        ) {
          policy.dependents = [
            {
              id: "dep001",
              name: "Jane Doe",
              relationship: "Self",
              age: 35,
              dateOfBirth: "1989-03-15",
              sumInsured: "500000",
              status: "Active",
              policyStartDate: "2024-01-01",
              claimHistory: {
                totalClaimed: 120000,
                pendingClaims: 0,
                settledClaims: 1,
                claimCount: 1,
              },
            },
            {
              id: "dep002",
              name: "John Doe",
              relationship: "Spouse",
              age: 38,
              dateOfBirth: "1986-08-22",
              sumInsured: "500000",
              status: "Active",
              policyStartDate: "2024-01-01",
              claimHistory: {
                totalClaimed: 0,
                pendingClaims: 0,
                settledClaims: 0,
                claimCount: 0,
              },
            },
            {
              id: "dep003",
              name: "Alex Doe",
              relationship: "Son",
              age: 12,
              dateOfBirth: "2012-01-10",
              sumInsured: "300000",
              status: "Active",
              policyStartDate: "2024-01-01",
              claimHistory: {
                totalClaimed: 8500,
                pendingClaims: 0,
                settledClaims: 1,
                claimCount: 1,
              },
            },
            {
              id: "dep004",
              name: "Emily Doe",
              relationship: "Daughter",
              age: 8,
              dateOfBirth: "2016-11-05",
              sumInsured: "300000",
              status: "Active",
              policyStartDate: "2024-01-01",
              claimHistory: {
                totalClaimed: 0,
                pendingClaims: 0,
                settledClaims: 0,
                claimCount: 0,
              },
            },
          ];
        }

        // Add dummy vehicle data for motor insurance policies
        if (
          policy &&
          (policy.type === "Motor" ||
            policy.category === "Motor" ||
            policy.type === "Vehicle" ||
            policy.category === "Vehicle" ||
            policy.type === "Two Wheeler" ||
            policy.category === "Two Wheeler" ||
            policy.type === "Four Wheeler" ||
            policy.category === "Four Wheeler")
        ) {
          policy.vehicle = {
            make: "Maruti Suzuki",
            model: "Swift Dzire",
            year: "2022",
            registrationNumber: "MH 02 AB 1234",
            engineNumber: "G12B1234567",
            chassisNumber: "MA3EWDDE1N0123456",
            fuelType: "Petrol",
            variant: "ZXI Plus",
            engineCapacity: "1197 CC",
            seatingCapacity: 5,
            bodyType: "Sedan",
            color: "Pearl Arctic White",
            transmission: "Manual",
            mileage: "20.04 kmpl",
            maxSpeed: "165 kmph",
            registrationDate: "2022-03-15",
            fitnessValidTill: "2037-03-14",
            pucValidTill: "2025-03-14",
            insuranceValidTill: "2025-03-14",
            roadTaxValidTill: "2032-03-14",
            rcStatus: "Active",
            hypothecatedTo: "HDFC Bank Ltd",
            loanAccount: "HDFC123456789",
            previousInsurer: "ICICI Lombard",
            claimHistory: [
              {
                date: "2024-01-15",
                claimNumber: "CLM202400001",
                type: "Accidental Damage",
                amount: 15000,
                status: "Settled",
                garage: "Maruti Authorized Service Center",
              },
            ],
            accessories: [
              {
                name: "Music System",
                value: 25000,
                make: "Pioneer",
              },
              {
                name: "Alloy Wheels",
                value: 18000,
                make: "Michelin",
              },
            ],
            inspection: {
              lastInspectionDate: "2024-01-01",
              nextInspectionDue: "2025-01-01",
              inspectionAgency: "ARAI",
              inspectorName: "Mr. Suresh Patil",
              inspectionReport: "Vehicle in good condition",
              photos: ["front.jpg", "rear.jpg", "interior.jpg"],
            },
            roadworthiness: {
              batteryCondition: "Good",
              tyreCondition: "Excellent",
              brakeCondition: "Good",
              lightsCondition: "Excellent",
              suspensionCondition: "Good",
              engineCondition: "Excellent",
              lastServiceDate: "2024-06-15",
              nextServiceDue: "2024-12-15",
              serviceCenter: "Maruti Authorized Service Center",
            },
          };
        }

        setLoading(false);
      } catch (err) {
        console.error("Error initializing component:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    initializeComponent();
  }, [navigationState, policy]);

  // Handlers
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    console.log("Download policy document");
  };

  const handleCopyPolicyNumber = () => {
    if (policy?.policyNumber) {
      navigator.clipboard.writeText(policy.policyNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateRemainingDays = () => {
    if (!policy?.validTo && !policy?.policyTerm?.endDate) return 0;
    const endDate = new Date(
      policy.validTo || policy.policyTerm?.endDate || ""
    );
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "settled":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
      case "under review":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Early returns for loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading policy details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/policies")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back to Policies
          </button>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Policy Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            Unable to load policy details. Please try again.
          </p>
          <button
            onClick={() => navigate("/policies")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back to Policies
          </button>
        </div>
      </div>
    );
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <PolicyOverview
            policy={policy}
            remainingDays={calculateRemainingDays()}
            copied={copied}
            onCopyPolicyNumber={handleCopyPolicyNumber}
            onFormatDate={formatDate}
          />
        );
      case "vehicle":
        return <VehicleInfo policy={policy} />;
      case "benefits":
        return <Benefits policy={policy} />;
      case "hospitals":
        return (
          <Hospitals
            policy={policy}
            searchQuery={searchQuery}
            selectedSpecialty={selectedSpecialty}
            onSearchQueryChange={setSearchQuery}
            onSelectedSpecialtyChange={setSelectedSpecialty}
          />
        );
      case "dependents":
        return (
          <Dependents
            policy={policy}
            onFormatDate={formatDate}
            onGetStatusColor={getStatusColor}
          />
        );
      case "documents":
        return (
          <Documents
            policy={policy}
            selectedFiles={selectedFiles}
            editFileIndex={editFileIndex}
            editFileName={editFileName}
            onSelectedFilesChange={setSelectedFiles}
            onEditFileIndexChange={setEditFileIndex}
            onEditFileNameChange={setEditFileName}
          />
        );
      case "coverage":
        return <Coverages policy={policy} />;
      case "claims":
        return (
          <Claims
            policy={policy}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        );
      case "endorsements":
        return (
          <Endorsements
            policy={policy}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        );
      default:
        return (
          <PolicyOverview
            policy={policy}
            remainingDays={calculateRemainingDays()}
            copied={copied}
            onCopyPolicyNumber={handleCopyPolicyNumber}
            onFormatDate={formatDate}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Helmet>
        <title>{policy.policyNumber}</title>
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
      <TabNavigation
        policy={policy}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default InsuranceDetailsPage;
