import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  User,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  Briefcase,
  Heart,
  Bell,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
  Save,
  Edit,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Users,
} from "lucide-react";

interface Dependent {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  contact: string;
}

interface Loan {
  id: string;
  type: string;
  amount: number;
  emi: number;
  tenure: number;
}

interface Investment {
  id: string;
  type: string;
  value: number;
  date: string;
}

interface MedicalCondition {
  id: string;
  name: string;
  since: string;
  severity: "mild" | "moderate" | "severe";
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface Surgery {
  id: string;
  name: string;
  date: string;
  hospital: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: number;
  uploadDate: string;
  url: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [incomeType, setIncomeType] = useState<"monthly" | "annual">("monthly");
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form data
  const [formData, setFormData] = useState({
    username: user?.name || "",
    fullName: user?.name || "",
    mobile: "",
    email: user?.email || "",
    dob: "",
    age: "",
    gender: "",
    maritalStatus: "",
    personalIncome: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    occupation: "",
    employer: user?.company || "",
  });

  // Dependents
  const [dependents, setDependents] = useState<Dependent[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      relationship: "Spouse",
      age: 32,
      gender: "Female",
      contact: "+91-9876543210",
    },
    {
      id: "2",
      name: "Mike Johnson",
      relationship: "Son",
      age: 8,
      gender: "Male",
      contact: "",
    },
  ]);

  // Financial Information
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "1",
      type: "Home",
      amount: 3500000,
      emi: 32000,
      tenure: 240,
    },
  ]);

  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      type: "Mutual Funds",
      value: 500000,
      date: "2023-01-15",
    },
    {
      id: "2",
      type: "Fixed Deposits",
      value: 200000,
      date: "2022-06-10",
    },
  ]);

  // Medical History
  const [medicalConditions, setMedicalConditions] = useState<
    MedicalCondition[]
  >([
    {
      id: "1",
      name: "Hypertension",
      since: "2020-03",
      severity: "mild",
    },
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
    },
  ]);

  const [surgeries, setSurgeries] = useState<Surgery[]>([
    {
      id: "1",
      name: "Appendectomy",
      date: "2018-05-12",
      hospital: "Apollo Hospital",
    },
  ]);

  const [familyHistory, setFamilyHistory] = useState<string[]>([
    "Diabetes (Father)",
    "Hypertension (Mother)",
  ]);

  const [lastCheckup, setLastCheckup] = useState("2023-11-15");

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    loginReminders: true,
    policyUploadReminders: true,
    policyExpiryAlerts: true,
    policyExpiredNotifications: true,
  });

  // Documents
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Aadhar Card.pdf",
      type: "application/pdf",
      category: "ID Proof",
      size: 1024 * 1024 * 2.5, // 2.5 MB
      uploadDate: "2023-10-15",
      url: "#",
    },
    {
      id: "2",
      name: "Income Tax Return.pdf",
      type: "application/pdf",
      category: "Income Proof",
      size: 1024 * 1024 * 1.8, // 1.8 MB
      uploadDate: "2023-09-20",
      url: "#",
    },
  ]);

  // Calculate age from DOB
  const calculateAge = (dob: string): string => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age.toString();
  };

  // Handle DOB change
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    setFormData({
      ...formData,
      dob,
      age: calculateAge(dob),
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle notification toggle
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  // Add dependent
  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      age: 0,
      gender: "",
      contact: "",
    };
    setDependents([...dependents, newDependent]);
  };

  // Remove dependent
  const removeDependent = (id: string) => {
    setDependents(dependents.filter((dep) => dep.id !== id));
  };

  // Update dependent
  const updateDependent = (
    id: string,
    field: keyof Dependent,
    value: string | number
  ) => {
    setDependents(
      dependents.map((dep) =>
        dep.id === id ? { ...dep, [field]: value } : dep
      )
    );
  };

  // Add loan
  const addLoan = () => {
    const newLoan: Loan = {
      id: Date.now().toString(),
      type: "",
      amount: 0,
      emi: 0,
      tenure: 0,
    };
    setLoans([...loans, newLoan]);
  };

  // Remove loan
  const removeLoan = (id: string) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  // Update loan
  const updateLoan = (
    id: string,
    field: keyof Loan,
    value: string | number
  ) => {
    setLoans(
      loans.map((loan) =>
        loan.id === id
          ? {
              ...loan,
              [field]:
                typeof value === "string" && field !== "type"
                  ? parseFloat(value) || 0
                  : value,
            }
          : loan
      )
    );
  };

  // Add investment
  const addInvestment = () => {
    const newInvestment: Investment = {
      id: Date.now().toString(),
      type: "",
      value: 0,
      date: new Date().toISOString().split("T")[0],
    };
    setInvestments([...investments, newInvestment]);
  };

  // Remove investment
  const removeInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };

  // Update investment
  const updateInvestment = (
    id: string,
    field: keyof Investment,
    value: string | number
  ) => {
    setInvestments(
      investments.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              [field]:
                field === "value" && typeof value === "string"
                  ? parseFloat(value) || 0
                  : value,
            }
          : inv
      )
    );
  };

  // Add medical condition
  const addMedicalCondition = () => {
    const newCondition: MedicalCondition = {
      id: Date.now().toString(),
      name: "",
      since: new Date().toISOString().split("T")[0].substring(0, 7),
      severity: "mild",
    };
    setMedicalConditions([...medicalConditions, newCondition]);
  };

  // Remove medical condition
  const removeMedicalCondition = (id: string) => {
    setMedicalConditions(medicalConditions.filter((cond) => cond.id !== id));
  };

  // Update medical condition
  const updateMedicalCondition = (
    id: string,
    field: keyof MedicalCondition,
    value: string
  ) => {
    setMedicalConditions(
      medicalConditions.map((cond) =>
        cond.id === id ? { ...cond, [field]: value } : cond
      )
    );
  };

  // Add medication
  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      frequency: "",
    };
    setMedications([...medications, newMedication]);
  };

  // Remove medication
  const removeMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  // Update medication
  const updateMedication = (
    id: string,
    field: keyof Medication,
    value: string
  ) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  // Add surgery
  const addSurgery = () => {
    const newSurgery: Surgery = {
      id: Date.now().toString(),
      name: "",
      date: new Date().toISOString().split("T")[0],
      hospital: "",
    };
    setSurgeries([...surgeries, newSurgery]);
  };

  // Remove surgery
  const removeSurgery = (id: string) => {
    setSurgeries(surgeries.filter((surgery) => surgery.id !== id));
  };

  // Update surgery
  const updateSurgery = (id: string, field: keyof Surgery, value: string) => {
    setSurgeries(
      surgeries.map((surgery) =>
        surgery.id === id ? { ...surgery, [field]: value } : surgery
      )
    );
  };

  // Add family history
  const addFamilyHistory = () => {
    setFamilyHistory([...familyHistory, ""]);
  };

  // Remove family history
  const removeFamilyHistory = (index: number) => {
    setFamilyHistory(familyHistory.filter((_, i) => i !== index));
  };

  // Update family history
  const updateFamilyHistory = (index: number, value: string) => {
    setFamilyHistory(
      familyHistory.map((item, i) => (i === index ? value : item))
    );
  };

  // File upload handlers
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    // Simulate file upload
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Add documents
          const newDocuments: Document[] = Array.from(files).map((file) => ({
            id:
              Date.now().toString() +
              Math.random().toString(36).substring(2, 9),
            name: file.name,
            type: file.type,
            category: "Other",
            size: file.size,
            uploadDate: new Date().toISOString().split("T")[0],
            url: "#",
          }));

          setDocuments([...documents, ...newDocuments]);

          // Show success toast
          setToast({
            message: `${files.length} document${
              files.length > 1 ? "s" : ""
            } uploaded successfully`,
            type: "success",
          });

          setTimeout(() => setToast(null), 3000);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    setToast({
      message: "Document deleted successfully",
      type: "info",
    });
    setTimeout(() => setToast(null), 3000);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Save profile
  const saveProfile = () => {
    setIsEditing(false);
    setToast({
      message: "Profile updated successfully",
      type: "success",
    });
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle section
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Calculate profile completion percentage
  useEffect(() => {
    const totalFields = 14; // Total number of fields in personal information
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const percentage = Math.round((filledFields / totalFields) * 100);
    setProgress(percentage);
  }, [formData]);

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold font-poppins mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            My Profile
          </h1>
          <p className="font-roboto" style={{ color: "var(--color-muted)" }}>
            Manage your personal information and preferences
          </p>
        </div>

        {/* Profile Completion Progress */}
        <div
          className="rounded-xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: "var(--color-card)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold font-poppins"
              style={{ color: "var(--color-foreground)" }}
            >
              Profile Completion
            </h2>
            <span
              className="text-lg font-bold font-poppins"
              style={{ color: "var(--color-primary)" }}
            >
              {progress}%
            </span>
          </div>
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--color-primary)",
              }}
            ></div>
          </div>
          <p
            className="text-sm font-roboto mt-2"
            style={{ color: "var(--color-muted)" }}
          >
            Complete your profile to get personalized insurance recommendations
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Picture and Quick Links */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Profile Picture */}
              <div
                className="rounded-xl shadow-lg p-6 text-center"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={
                      user?.avatar ||
                      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                    }
                    alt={user?.name || "User"}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <button
                    className="absolute bottom-0 right-0 p-2 rounded-full shadow-md"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <h3
                  className="text-xl font-bold font-poppins mb-1"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {user?.name || "John Doe"}
                </h3>
                <p
                  className="font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  {user?.email || "john.doe@example.com"}
                </p>
                <div className="mt-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {user?.role === "retail_customer"
                      ? "Retail Customer"
                      : "Customer"}
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div
                className="rounded-xl shadow-lg p-6"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <h3
                  className="text-lg font-bold font-poppins mb-4"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-foreground)",
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText
                        className="h-5 w-5"
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span className="font-roboto">My Policies</span>
                    </div>
                    <ChevronRight
                      className="h-4 w-4"
                      style={{ color: "var(--color-muted)" }}
                    />
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-foreground)",
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <AlertCircle
                        className="h-5 w-5"
                        style={{ color: "var(--color-primary)" }}
                      />
                      <span className="font-roboto">Claims</span>
                    </div>
                    <ChevronRight
                      className="h-4 w-4"
                      style={{ color: "var(--color-muted)" }}
                    />
                  </button>
                  {/* <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="font-roboto">Payment Methods</span>
                    </div>
                    <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                  </button>
                  <button 
                    className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="font-roboto">Notifications</span>
                    </div>
                    <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                style={{
                  backgroundColor:
                    activeSection === "personal"
                      ? "var(--color-secondary)"
                      : "var(--color-card)",
                  borderBottom:
                    activeSection === "personal"
                      ? "none"
                      : `1px solid var(--color-border)`,
                }}
                onClick={() => toggleSection("personal")}
              >
                <div className="flex items-center space-x-3">
                  <User
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h2
                    className="text-xl font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Personal Information
                  </h2>
                </div>
                {activeSection === "personal" ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                )}
              </div>

              {activeSection === "personal" && (
                <div
                  className="p-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      <span>{isEditing ? "Cancel" : "Edit"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Email ID */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Email ID
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleDobChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Age (Auto-calculated) */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        disabled
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Marital Status
                      </label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Occupation */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Occupation
                      </label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>

                    {/* Employer */}
                    <div>
                      <label
                        className="block text-sm font-medium font-roboto mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Employer
                      </label>
                      <input
                        type="text"
                        name="employer"
                        value={formData.employer}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all disabled:opacity-70"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: isEditing
                            ? "var(--color-background)"
                            : "var(--color-secondary)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={saveProfile}
                        className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium font-roboto text-white transition-colors"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dependents Section */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                style={{
                  backgroundColor:
                    activeSection === "dependents"
                      ? "var(--color-secondary)"
                      : "var(--color-card)",
                  borderBottom:
                    activeSection === "dependents"
                      ? "none"
                      : `1px solid var(--color-border)`,
                }}
                onClick={() => toggleSection("dependents")}
              >
                <div className="flex items-center space-x-3">
                  <Users
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h2
                    className="text-xl font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Dependents
                  </h2>
                </div>
                {activeSection === "dependents" ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                )}
              </div>

              {activeSection === "dependents" && (
                <div
                  className="p-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={addDependent}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Dependent</span>
                    </button>
                  </div>

                  {dependents.length === 0 ? (
                    <div className="text-center py-8">
                      <p
                        className="font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        No dependents added yet
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dependents.map((dependent) => (
                        <div
                          key={dependent.id}
                          className="border rounded-lg p-4"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3
                              className="font-semibold font-poppins"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {dependent.name || "New Dependent"}
                            </h3>
                            <button
                              onClick={() => removeDependent(dependent.id)}
                              className="p-1 rounded hover:bg-opacity-80 transition-colors"
                              style={{ color: "var(--color-danger)" }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                              <label
                                className="block text-xs font-medium font-roboto mb-1"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                value={dependent.name}
                                onChange={(e) =>
                                  updateDependent(
                                    dependent.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  borderColor: "var(--color-border)",
                                  backgroundColor: "var(--color-background)",
                                  color: "var(--color-foreground)",
                                  "--tw-ring-color": "var(--color-primary)",
                                }}
                              />
                            </div>

                            {/* Relationship */}
                            <div>
                              <label
                                className="block text-xs font-medium font-roboto mb-1"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Relationship
                              </label>
                              <select
                                value={dependent.relationship}
                                onChange={(e) =>
                                  updateDependent(
                                    dependent.id,
                                    "relationship",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  borderColor: "var(--color-border)",
                                  backgroundColor: "var(--color-background)",
                                  color: "var(--color-foreground)",
                                  "--tw-ring-color": "var(--color-primary)",
                                }}
                              >
                                <option value="">Select Relationship</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Child">Child</option>
                                <option value="Parent">Parent</option>
                                <option value="Sibling">Sibling</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            {/* Age */}
                            <div>
                              <label
                                className="block text-xs font-medium font-roboto mb-1"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Age
                              </label>
                              <input
                                type="number"
                                value={dependent.age || ""}
                                onChange={(e) =>
                                  updateDependent(
                                    dependent.id,
                                    "age",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  borderColor: "var(--color-border)",
                                  backgroundColor: "var(--color-background)",
                                  color: "var(--color-foreground)",
                                  "--tw-ring-color": "var(--color-primary)",
                                }}
                              />
                            </div>

                            {/* Gender */}
                            <div>
                              <label
                                className="block text-xs font-medium font-roboto mb-1"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Gender
                              </label>
                              <select
                                value={dependent.gender}
                                onChange={(e) =>
                                  updateDependent(
                                    dependent.id,
                                    "gender",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  borderColor: "var(--color-border)",
                                  backgroundColor: "var(--color-background)",
                                  color: "var(--color-foreground)",
                                  "--tw-ring-color": "var(--color-primary)",
                                }}
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            {/* Contact */}
                            <div className="md:col-span-2">
                              <label
                                className="block text-xs font-medium font-roboto mb-1"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Contact Information (Optional)
                              </label>
                              <input
                                type="tel"
                                value={dependent.contact}
                                onChange={(e) =>
                                  updateDependent(
                                    dependent.id,
                                    "contact",
                                    e.target.value
                                  )
                                }
                                className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  borderColor: "var(--color-border)",
                                  backgroundColor: "var(--color-background)",
                                  color: "var(--color-foreground)",
                                  "--tw-ring-color": "var(--color-primary)",
                                }}
                                placeholder="Phone number or email"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Financial Information */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                style={{
                  backgroundColor:
                    activeSection === "financial"
                      ? "var(--color-secondary)"
                      : "var(--color-card)",
                  borderBottom:
                    activeSection === "financial"
                      ? "none"
                      : `1px solid var(--color-border)`,
                }}
                onClick={() => toggleSection("financial")}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h2
                    className="text-xl font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Financial Information
                  </h2>
                </div>
                {activeSection === "financial" ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                )}
              </div>

              {activeSection === "financial" && (
                <div
                  className="p-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {/* Personal Income */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Personal Income
                      </h3>
                      <div
                        className="flex items-center space-x-2 p-1 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <button
                          onClick={() => setIncomeType("monthly")}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            incomeType === "monthly" ? "text-white" : ""
                          }`}
                          style={{
                            backgroundColor:
                              incomeType === "monthly"
                                ? "var(--color-primary)"
                                : "transparent",
                            color:
                              incomeType === "monthly"
                                ? "white"
                                : "var(--color-foreground)",
                          }}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setIncomeType("annual")}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            incomeType === "annual" ? "text-white" : ""
                          }`}
                          style={{
                            backgroundColor:
                              incomeType === "annual"
                                ? "var(--color-primary)"
                                : "transparent",
                            color:
                              incomeType === "annual"
                                ? "white"
                                : "var(--color-foreground)",
                          }}
                        >
                          Annual
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="number"
                        name="personalIncome"
                        value={formData.personalIncome}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                        placeholder={`Enter your ${incomeType} income`}
                      />
                    </div>
                  </div>

                  {/* Loans */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Loans
                      </h3>
                      <button
                        onClick={addLoan}
                        className="flex items-center space-x-1 text-xs font-medium transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Loan</span>
                      </button>
                    </div>

                    {loans.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No loans added yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {loans.map((loan) => (
                          <div
                            key={loan.id}
                            className="border rounded-lg p-4"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4
                                className="font-medium font-poppins text-sm"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {loan.type || "New Loan"}
                              </h4>
                              <button
                                onClick={() => removeLoan(loan.id)}
                                className="p-1 rounded hover:bg-opacity-80 transition-colors"
                                style={{ color: "var(--color-danger)" }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Loan Type */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Type
                                </label>
                                <select
                                  value={loan.type}
                                  onChange={(e) =>
                                    updateLoan(loan.id, "type", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                >
                                  <option value="">Select Type</option>
                                  <option value="Home">Home</option>
                                  <option value="Car">Car</option>
                                  <option value="Personal">Personal</option>
                                  <option value="Education">Education</option>
                                  <option value="Business">Business</option>
                                </select>
                              </div>

                              {/* Outstanding Amount */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Outstanding Amount
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500 text-xs">
                                      ₹
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    value={loan.amount || ""}
                                    onChange={(e) =>
                                      updateLoan(
                                        loan.id,
                                        "amount",
                                        e.target.value
                                      )
                                    }
                                    className="w-full pl-7 pr-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                      borderColor: "var(--color-border)",
                                      backgroundColor:
                                        "var(--color-background)",
                                      color: "var(--color-foreground)",
                                      "--tw-ring-color": "var(--color-primary)",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* EMI */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Monthly EMI
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500 text-xs">
                                      ₹
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    value={loan.emi || ""}
                                    onChange={(e) =>
                                      updateLoan(loan.id, "emi", e.target.value)
                                    }
                                    className="w-full pl-7 pr-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                      borderColor: "var(--color-border)",
                                      backgroundColor:
                                        "var(--color-background)",
                                      color: "var(--color-foreground)",
                                      "--tw-ring-color": "var(--color-primary)",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Tenure */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Remaining Tenure (months)
                                </label>
                                <input
                                  type="number"
                                  value={loan.tenure || ""}
                                  onChange={(e) =>
                                    updateLoan(
                                      loan.id,
                                      "tenure",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Investments */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Investments
                      </h3>
                      <button
                        onClick={addInvestment}
                        className="flex items-center space-x-1 text-xs font-medium transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Investment</span>
                      </button>
                    </div>

                    {investments.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No investments added yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {investments.map((investment) => (
                          <div
                            key={investment.id}
                            className="border rounded-lg p-4"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4
                                className="font-medium font-poppins text-sm"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {investment.type || "New Investment"}
                              </h4>
                              <button
                                onClick={() => removeInvestment(investment.id)}
                                className="p-1 rounded hover:bg-opacity-80 transition-colors"
                                style={{ color: "var(--color-danger)" }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Investment Type */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Type
                                </label>
                                <select
                                  value={investment.type}
                                  onChange={(e) =>
                                    updateInvestment(
                                      investment.id,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                >
                                  <option value="">Select Type</option>
                                  <option value="Stocks">Stocks</option>
                                  <option value="Mutual Funds">
                                    Mutual Funds
                                  </option>
                                  <option value="Fixed Deposits">
                                    Fixed Deposits
                                  </option>
                                  <option value="Real Estate">
                                    Real Estate
                                  </option>
                                  <option value="Gold">Gold</option>
                                  <option value="Others">Others</option>
                                </select>
                              </div>

                              {/* Current Value */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Current Value
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500 text-xs">
                                      ₹
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    value={investment.value || ""}
                                    onChange={(e) =>
                                      updateInvestment(
                                        investment.id,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                    className="w-full pl-7 pr-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                      borderColor: "var(--color-border)",
                                      backgroundColor:
                                        "var(--color-background)",
                                      color: "var(--color-foreground)",
                                      "--tw-ring-color": "var(--color-primary)",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Investment Date */}
                              <div className="col-span-2">
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Investment Date
                                </label>
                                <input
                                  type="date"
                                  value={investment.date}
                                  onChange={(e) =>
                                    updateInvestment(
                                      investment.id,
                                      "date",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Medical History */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                style={{
                  backgroundColor:
                    activeSection === "medical"
                      ? "var(--color-secondary)"
                      : "var(--color-card)",
                  borderBottom:
                    activeSection === "medical"
                      ? "none"
                      : `1px solid var(--color-border)`,
                }}
                onClick={() => toggleSection("medical")}
              >
                <div className="flex items-center space-x-3">
                  <Heart
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h2
                    className="text-xl font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Medical History
                  </h2>
                </div>
                {activeSection === "medical" ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                )}
              </div>

              {activeSection === "medical" && (
                <div
                  className="p-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {/* Pre-existing Conditions */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Pre-existing Conditions
                      </h3>
                      <button
                        onClick={addMedicalCondition}
                        className="flex items-center space-x-1 text-xs font-medium transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Condition</span>
                      </button>
                    </div>

                    {medicalConditions.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No pre-existing conditions added
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {medicalConditions.map((condition) => (
                          <div
                            key={condition.id}
                            className="border rounded-lg p-3"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4
                                className="font-medium font-poppins text-sm"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {condition.name || "New Condition"}
                              </h4>
                              <button
                                onClick={() =>
                                  removeMedicalCondition(condition.id)
                                }
                                className="p-1 rounded hover:bg-opacity-80 transition-colors"
                                style={{ color: "var(--color-danger)" }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Condition Name */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Condition
                                </label>
                                <input
                                  type="text"
                                  value={condition.name}
                                  onChange={(e) =>
                                    updateMedicalCondition(
                                      condition.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                  placeholder="e.g., Diabetes, Hypertension"
                                />
                              </div>

                              {/* Since When */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Since (Month/Year)
                                </label>
                                <input
                                  type="month"
                                  value={condition.since}
                                  onChange={(e) =>
                                    updateMedicalCondition(
                                      condition.id,
                                      "since",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>

                              {/* Severity */}
                              <div className="col-span-2">
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Severity
                                </label>
                                <select
                                  value={condition.severity}
                                  onChange={(e) =>
                                    updateMedicalCondition(
                                      condition.id,
                                      "severity",
                                      e.target.value as
                                        | "mild"
                                        | "moderate"
                                        | "severe"
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                >
                                  <option value="mild">Mild</option>
                                  <option value="moderate">Moderate</option>
                                  <option value="severe">Severe</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Current Medications */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Current Medications
                      </h3>
                      <button
                        onClick={addMedication}
                        className="flex items-center space-x-1 text-xs font-medium transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Medication</span>
                      </button>
                    </div>

                    {medications.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No medications added
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {medications.map((medication) => (
                          <div
                            key={medication.id}
                            className="border rounded-lg p-3"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4
                                className="font-medium font-poppins text-sm"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {medication.name || "New Medication"}
                              </h4>
                              <button
                                onClick={() => removeMedication(medication.id)}
                                className="p-1 rounded hover:bg-opacity-80 transition-colors"
                                style={{ color: "var(--color-danger)" }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              {/* Medication Name */}
                              <div className="col-span-3 sm:col-span-1">
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Medication Name
                                </label>
                                <input
                                  type="text"
                                  value={medication.name}
                                  onChange={(e) =>
                                    updateMedication(
                                      medication.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>

                              {/* Dosage */}
                              <div className="col-span-3 sm:col-span-1">
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Dosage
                                </label>
                                <input
                                  type="text"
                                  value={medication.dosage}
                                  onChange={(e) =>
                                    updateMedication(
                                      medication.id,
                                      "dosage",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                  placeholder="e.g., 10mg"
                                />
                              </div>

                              {/* Frequency */}
                              <div className="col-span-3 sm:col-span-1">
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Frequency
                                </label>
                                <input
                                  type="text"
                                  value={medication.frequency}
                                  onChange={(e) =>
                                    updateMedication(
                                      medication.id,
                                      "frequency",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                  placeholder="e.g., Twice daily"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Past Surgeries/Procedures */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Past Surgeries/Procedures
                      </h3>
                      <button
                        onClick={addSurgery}
                        className="flex items-center space-x-1 text-xs font-medium transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Surgery</span>
                      </button>
                    </div>

                    {surgeries.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No surgeries/procedures added
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {surgeries.map((surgery) => (
                          <div
                            key={surgery.id}
                            className="border rounded-lg p-3"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4
                                className="font-medium font-poppins text-sm"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {surgery.name || "New Surgery"}
                              </h4>
                              <button
                                onClick={() => removeSurgery(surgery.id)}
                                className="p-1 rounded hover:bg-opacity-80 transition-colors"
                                style={{ color: "var(--color-danger)" }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {/* Surgery Name */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Surgery/Procedure
                                </label>
                                <input
                                  type="text"
                                  value={surgery.name}
                                  onChange={(e) =>
                                    updateSurgery(
                                      surgery.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>

                              {/* Date */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Date
                                </label>
                                <input
                                  type="date"
                                  value={surgery.date}
                                  onChange={(e) =>
                                    updateSurgery(
                                      surgery.id,
                                      "date",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>

                              {/* Hospital */}
                              <div>
                                <label
                                  className="block text-xs font-medium font-roboto mb-1"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Hospital
                                </label>
                                <input
                                  type="text"
                                  value={surgery.hospital}
                                  onChange={(e) =>
                                    updateSurgery(
                                      surgery.id,
                                      "hospital",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Family Medical History */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Family Medical History
                      </h3>
                      <button
                        onClick={addFamilyHistory}
                        className="flex items-center space-x-1 text-xs font-medium transition-colors"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add History</span>
                      </button>
                    </div>

                    {familyHistory.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No family medical history added
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {familyHistory.map((history, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="text"
                              value={history}
                              onChange={(e) =>
                                updateFamilyHistory(index, e.target.value)
                              }
                              className="flex-1 px-3 py-2 border rounded-lg font-roboto text-sm focus:outline-none focus:ring-2 transition-all"
                              style={{
                                borderColor: "var(--color-border)",
                                backgroundColor: "var(--color-background)",
                                color: "var(--color-foreground)",
                                "--tw-ring-color": "var(--color-primary)",
                              }}
                              placeholder="e.g., Diabetes (Father)"
                            />
                            <button
                              onClick={() => removeFamilyHistory(index)}
                              className="p-2 rounded hover:bg-opacity-80 transition-colors"
                              style={{ color: "var(--color-danger)" }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Last Health Checkup */}
                  <div>
                    <h3
                      className="font-semibold font-poppins mb-4"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Last Health Checkup
                    </h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="date"
                        value={lastCheckup}
                        onChange={(e) => setLastCheckup(e.target.value)}
                        className="px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                      />
                      <div
                        className="text-sm font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {lastCheckup
                          ? `${Math.floor(
                              (new Date().getTime() -
                                new Date(lastCheckup).getTime()) /
                                (1000 * 60 * 60 * 24 * 30)
                            )} months ago`
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Preferences */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                style={{
                  backgroundColor:
                    activeSection === "notifications"
                      ? "var(--color-secondary)"
                      : "var(--color-card)",
                  borderBottom:
                    activeSection === "notifications"
                      ? "none"
                      : `1px solid var(--color-border)`,
                }}
                onClick={() => toggleSection("notifications")}
              >
                <div className="flex items-center space-x-3">
                  <Bell
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h2
                    className="text-xl font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Notification Preferences
                  </h2>
                </div>
                {activeSection === "notifications" ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                )}
              </div>

              {activeSection === "notifications" && (
                <div
                  className="p-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="space-y-4">
                    {/* Login Reminders */}
                    <div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <div>
                        <h3
                          className="font-medium font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Login Reminders
                        </h3>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Receive reminders to log in to your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.loginReminders}
                          onChange={() =>
                            handleNotificationToggle("loginReminders")
                          }
                        />
                        <div
                          className={`w-11 h-6 rounded-full peer-focus:ring-2 peer-focus:ring-offset-2 transition-colors ${
                            notifications.loginReminders ? "" : "bg-gray-300"
                          }`}
                          style={{
                            backgroundColor: notifications.loginReminders
                              ? "var(--color-primary)"
                              : undefined,
                            "--tw-ring-color": "var(--color-primary)",
                            "--tw-ring-offset-color": "var(--color-background)",
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              notifications.loginReminders
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                            style={{
                              transform: notifications.loginReminders
                                ? "translateX(20px)"
                                : "translateX(2px)",
                              top: "2px",
                              position: "relative",
                            }}
                          ></div>
                        </div>
                      </label>
                    </div>

                    {/* Policy Upload Reminders */}
                    <div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <div>
                        <h3
                          className="font-medium font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Policy Upload Reminders
                        </h3>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Receive reminders to upload your policy documents
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.policyUploadReminders}
                          onChange={() =>
                            handleNotificationToggle("policyUploadReminders")
                          }
                        />
                        <div
                          className={`w-11 h-6 rounded-full peer-focus:ring-2 peer-focus:ring-offset-2 transition-colors ${
                            notifications.policyUploadReminders
                              ? ""
                              : "bg-gray-300"
                          }`}
                          style={{
                            backgroundColor: notifications.policyUploadReminders
                              ? "var(--color-primary)"
                              : undefined,
                            "--tw-ring-color": "var(--color-primary)",
                            "--tw-ring-offset-color": "var(--color-background)",
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              notifications.policyUploadReminders
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                            style={{
                              transform: notifications.policyUploadReminders
                                ? "translateX(20px)"
                                : "translateX(2px)",
                              top: "2px",
                              position: "relative",
                            }}
                          ></div>
                        </div>
                      </label>
                    </div>

                    {/* Policy Expiry Alerts */}
                    <div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <div>
                        <h3
                          className="font-medium font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Policy Expiry Alerts
                        </h3>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Receive alerts before your policy expires
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.policyExpiryAlerts}
                          onChange={() =>
                            handleNotificationToggle("policyExpiryAlerts")
                          }
                        />
                        <div
                          className={`w-11 h-6 rounded-full peer-focus:ring-2 peer-focus:ring-offset-2 transition-colors ${
                            notifications.policyExpiryAlerts
                              ? ""
                              : "bg-gray-300"
                          }`}
                          style={{
                            backgroundColor: notifications.policyExpiryAlerts
                              ? "var(--color-primary)"
                              : undefined,
                            "--tw-ring-color": "var(--color-primary)",
                            "--tw-ring-offset-color": "var(--color-background)",
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              notifications.policyExpiryAlerts
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                            style={{
                              transform: notifications.policyExpiryAlerts
                                ? "translateX(20px)"
                                : "translateX(2px)",
                              top: "2px",
                              position: "relative",
                            }}
                          ></div>
                        </div>
                      </label>
                    </div>

                    {/* Policy Expired Notifications */}
                    <div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                    >
                      <div>
                        <h3
                          className="font-medium font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Policy Expired Notifications
                        </h3>
                        <p
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Receive notifications when your policy expires
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications.policyExpiredNotifications}
                          onChange={() =>
                            handleNotificationToggle(
                              "policyExpiredNotifications"
                            )
                          }
                        />
                        <div
                          className={`w-11 h-6 rounded-full peer-focus:ring-2 peer-focus:ring-offset-2 transition-colors ${
                            notifications.policyExpiredNotifications
                              ? ""
                              : "bg-gray-300"
                          }`}
                          style={{
                            backgroundColor:
                              notifications.policyExpiredNotifications
                                ? "var(--color-primary)"
                                : undefined,
                            "--tw-ring-color": "var(--color-primary)",
                            "--tw-ring-offset-color": "var(--color-background)",
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform ${
                              notifications.policyExpiredNotifications
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                            style={{
                              transform:
                                notifications.policyExpiredNotifications
                                  ? "translateX(20px)"
                                  : "translateX(2px)",
                              top: "2px",
                              position: "relative",
                            }}
                          ></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                style={{
                  backgroundColor:
                    activeSection === "documents"
                      ? "var(--color-secondary)"
                      : "var(--color-card)",
                  borderBottom:
                    activeSection === "documents"
                      ? "none"
                      : `1px solid var(--color-border)`,
                }}
                onClick={() => toggleSection("documents")}
              >
                <div className="flex items-center space-x-3">
                  <FileText
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h2
                    className="text-xl font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Document Upload
                  </h2>
                </div>
                {activeSection === "documents" ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                )}
              </div>

              {activeSection === "documents" && (
                <div
                  className="p-6 border-t"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {/* Drag and Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragActive
                        ? "border-opacity-100"
                        : "hover:border-opacity-80"
                    }`}
                    style={{
                      borderColor: dragActive
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                      backgroundColor: dragActive
                        ? "var(--color-secondary)"
                        : "transparent",
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center">
                      <div
                        className="p-4 rounded-full mb-4"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <Upload
                          className="h-8 w-8"
                          style={{ color: "var(--color-primary)" }}
                        />
                      </div>

                      <h3
                        className="text-lg font-semibold font-poppins mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Upload Documents
                      </h3>

                      <p
                        className="font-roboto mb-4"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Drag and drop your files here, or{" "}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="font-medium underline hover:opacity-80"
                          style={{ color: "var(--color-primary)" }}
                        >
                          browse
                        </button>
                      </p>

                      <div
                        className="text-sm font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        <p>Supported formats: PDF, JPG, PNG</p>
                        <p>Maximum file size: 10MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {progress > 0 && progress < 100 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Uploading...
                        </span>
                        <span
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {progress}%
                        </span>
                      </div>
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: "var(--color-primary)",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Document Categories */}
                  <div className="mt-8">
                    <h3
                      className="font-semibold font-poppins mb-4"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Document Categories
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      <div
                        className="text-center p-3 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <div
                          className="font-medium font-poppins mb-1"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          ID Proof
                        </div>
                        <div
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Aadhar, PAN, Passport
                        </div>
                      </div>
                      <div
                        className="text-center p-3 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <div
                          className="font-medium font-poppins mb-1"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Address Proof
                        </div>
                        <div
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Utility bills, Rental agreement
                        </div>
                      </div>
                      <div
                        className="text-center p-3 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <div
                          className="font-medium font-poppins mb-1"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Income Proof
                        </div>
                        <div
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Salary slips, ITR
                        </div>
                      </div>
                      <div
                        className="text-center p-3 rounded-lg"
                        style={{ backgroundColor: "var(--color-secondary)" }}
                      >
                        <div
                          className="font-medium font-poppins mb-1"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Medical Records
                        </div>
                        <div
                          className="text-sm font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Reports, Prescriptions
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Documents */}
                  <div>
                    <h3
                      className="font-semibold font-poppins mb-4"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Uploaded Documents
                    </h3>

                    {documents.length === 0 ? (
                      <div className="text-center py-4">
                        <p
                          className="font-roboto text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No documents uploaded yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {documents.map((document) => (
                          <div
                            key={document.id}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-secondary)",
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: "var(--color-card)" }}
                              >
                                <FileText
                                  className="h-5 w-5"
                                  style={{ color: "var(--color-primary)" }}
                                />
                              </div>
                              <div>
                                <h4
                                  className="font-medium font-poppins text-sm"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {document.name}
                                </h4>
                                <div
                                  className="flex items-center space-x-2 text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  <span>{formatFileSize(document.size)}</span>
                                  <span>•</span>
                                  <span>{document.category}</span>
                                  <span>•</span>
                                  <span>
                                    {new Date(
                                      document.uploadDate
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                className="p-2 rounded-lg hover:opacity-80 transition-colors"
                                style={{
                                  backgroundColor: "var(--color-card)",
                                  color: "var(--color-primary)",
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => removeDocument(document.id)}
                                className="p-2 rounded-lg hover:opacity-80 transition-colors"
                                style={{
                                  backgroundColor: "var(--color-card)",
                                  color: "var(--color-danger)",
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md animate-slide-up flex items-center space-x-3 ${
            toast.type === "success"
              ? "bg-green-100"
              : toast.type === "error"
              ? "bg-red-100"
              : "bg-blue-100"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : toast.type === "error" ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Info className="h-5 w-5 text-blue-500" />
          )}
          <span className="font-roboto text-gray-800">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
