import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePurchase } from "../../contexts/PurchaseContext";
import { policyTypes } from "../../data/purchaseData";
import { FormField, Dependent } from "../../types/purchase";
import {
  Heart,
  Shield,
  Bike,
  Car,
  Plus,
  Trash2,
  Phone,
  Check,
  ArrowLeft,
  Star,
  Users,
  Award,
  Clock,
  ChevronRight,
  Info,
} from "lucide-react";

const PolicyInfoLayout: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");

  const currentPolicyType = policyType ? policyTypes[policyType] : null;

  React.useEffect(() => {
    if (policyType) {
      dispatch({ type: "SET_POLICY_TYPE", payload: policyType });
    }
  }, [policyType, dispatch]);

  const getIcon = (iconName: string) => {
    const icons = { Heart, Shield, Bike, Car };
    return icons[iconName as keyof typeof icons] || Shield;
  };

  const validateField = (field: FormField, value: any): string => {
    if (
      field.required &&
      (!value || (Array.isArray(value) && value.length === 0))
    ) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { min, max, pattern, message } = field.validation;

      if (min !== undefined && value < min) {
        return message || `${field.label} must be at least ${min}`;
      }

      if (max !== undefined && value > max) {
        return message || `${field.label} must be at most ${max}`;
      }

      if (pattern && !new RegExp(pattern).test(value)) {
        return message || `${field.label} format is invalid`;
      }
    }

    return "";
  };

  const handleInputChange = (fieldName: string, value: any) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { [fieldName]: value },
    });

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleDependentChange = (index: number, field: string, value: any) => {
    const dependents = [...(state.formData.dependents || [])];
    dependents[index] = { ...dependents[index], [field]: value };
    handleInputChange("dependents", dependents);
  };

  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      name: "",
      age: 0,
      relation: "",
      medicalHistory: [],
    };
    const dependents = [...(state.formData.dependents || []), newDependent];
    handleInputChange("dependents", dependents);
  };

  const removeDependent = (index: number) => {
    const dependents =
      state.formData.dependents?.filter((_, i) => i !== index) || [];
    handleInputChange("dependents", dependents);
  };

  const sendOtp = async () => {
    if (!state.formData.mobile) {
      setErrors((prev) => ({ ...prev, mobile: "Mobile number is required" }));
      return;
    }

    setShowOtpModal(true);
  };

  const verifyOtp = async () => {
    setIsVerifying(true);

    setTimeout(() => {
      if (otpCode === "123456") {
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { mobileVerified: true, otpCode },
        });
        setShowOtpModal(false);
        setIsVerifying(false);
      } else {
        setErrors((prev) => ({
          ...prev,
          otp: "Invalid OTP. Use 123456 for demo.",
        }));
        setIsVerifying(false);
      }
    }, 1500);
  };

  const validateForm = (): boolean => {
    if (!currentPolicyType) return false;

    const newErrors: Record<string, string> = {};

    currentPolicyType.baseFields.forEach((field) => {
      const value = state.formData[field.name as keyof typeof state.formData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (!state.formData.mobileVerified) {
      newErrors.mobile = "Mobile number must be verified";
    }

    if (policyType === "health-insurance" && state.formData.dependents) {
      state.formData.dependents.forEach((dependent, index) => {
        if (!dependent.name) {
          newErrors[`dependent_${index}_name`] = "Dependent name is required";
        }
        if (!dependent.age || dependent.age < 0) {
          newErrors[`dependent_${index}_age`] = "Valid age is required";
        }
        if (!dependent.relation) {
          newErrors[`dependent_${index}_relation`] = "Relation is required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      navigate("/buy-policy/providers");
    }
  };

  const renderField = (field: FormField) => {
    const value = state.formData[field.name as keyof typeof state.formData];
    const error = errors[field.name];

    switch (field.type) {
      case "text":
      case "number":
      case "email":
      case "tel":
        return (
          <div key={field.id} className="space-y-2">
            <label
              className="block text-sm font-medium font-roboto"
              style={{ color: "var(--color-foreground)" }}
            >
              {field.label}{" "}
              {field.required && (
                <span style={{ color: "var(--color-danger)" }}>*</span>
              )}
            </label>
            <input
              type={field.type}
              value={value || ""}
              onChange={(e) =>
                handleInputChange(
                  field.name,
                  field.type === "number"
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
              placeholder={field.placeholder}
              className={`w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all ${
                error ? "border-red-500" : ""
              }`}
              style={{
                borderColor: error
                  ? "var(--color-danger)"
                  : "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                "--tw-ring-color": "var(--color-primary)",
              }}
            />
            {error && (
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-danger)" }}
              >
                {error}
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <label
              className="block text-sm font-medium font-roboto"
              style={{ color: "var(--color-foreground)" }}
            >
              {field.label}{" "}
              {field.required && (
                <span style={{ color: "var(--color-danger)" }}>*</span>
              )}
            </label>
            <select
              value={value || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all ${
                error ? "border-red-500" : ""
              }`}
              style={{
                borderColor: error
                  ? "var(--color-danger)"
                  : "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground)",
                "--tw-ring-color": "var(--color-primary)",
              }}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-danger)" }}
              >
                {error}
              </p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="space-y-2">
            <label
              className="block text-sm font-medium font-roboto"
              style={{ color: "var(--color-foreground)" }}
            >
              {field.label}{" "}
              {field.required && (
                <span style={{ color: "var(--color-danger)" }}>*</span>
              )}
            </label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={((value as string[]) || []).includes(option.value)}
                    onChange={(e) => {
                      const currentValues = (value as string[]) || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v) => v !== option.value);
                      handleInputChange(field.name, newValues);
                    }}
                    className="w-4 h-4 rounded focus:ring-2"
                    style={{ accentColor: "var(--color-primary)" }}
                  />
                  <span
                    className="font-roboto"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-danger)" }}
              >
                {error}
              </p>
            )}
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="space-y-2">
            <label
              className="block text-sm font-medium font-roboto"
              style={{ color: "var(--color-foreground)" }}
            >
              {field.label}{" "}
              {field.required && (
                <span style={{ color: "var(--color-danger)" }}>*</span>
              )}
            </label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-4 h-4 focus:ring-2"
                    style={{ accentColor: "var(--color-primary)" }}
                  />
                  <span
                    className="font-roboto"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p
                className="text-sm font-roboto"
                style={{ color: "var(--color-danger)" }}
              >
                {error}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentPolicyType) {
    return (
      <div className="text-center py-12">
        <p
          className="text-lg font-roboto"
          style={{ color: "var(--color-muted)" }}
        >
          Policy type not found
        </p>
      </div>
    );
  }

  const Icon = getIcon(currentPolicyType.icon);

  // Mock policy information data
  const policyInfo = {
    overview: {
      title: `${currentPolicyType.name} Overview`,
      description:
        "Comprehensive coverage designed to protect what matters most to you.",
      keyFeatures: [
        "Comprehensive coverage with no hidden costs",
        "Quick and easy claim settlement process",
        "24/7 customer support and assistance",
        "Flexible premium payment options",
        "Wide network of service providers",
        "Digital policy management",
      ],
      benefits: [
        "Financial protection against unexpected events",
        "Peace of mind for you and your family",
        "Tax benefits under applicable sections",
        "Cashless services at network providers",
        "Emergency assistance services",
        "Annual policy review and updates",
      ],
    },
    coverage: {
      title: "Coverage Details",
      sections: [
        {
          name: "Basic Coverage",
          items: [
            "Primary protection as per policy terms",
            "Standard benefits included",
            "Minimum coverage requirements",
          ],
        },
        {
          name: "Enhanced Coverage",
          items: [
            "Additional protection options",
            "Premium add-on benefits",
            "Extended coverage limits",
          ],
        },
        {
          name: "Exclusions",
          items: [
            "Pre-existing conditions (waiting period applies)",
            "War and nuclear risks",
            "Self-inflicted injuries",
          ],
        },
      ],
    },
    process: {
      title: "How It Works",
      steps: [
        {
          step: 1,
          title: "Fill Application",
          description:
            "Complete your policy application with accurate information",
        },
        {
          step: 2,
          title: "Choose Provider",
          description: "Select from our network of trusted insurance providers",
        },
        {
          step: 3,
          title: "Customize Coverage",
          description: "Add optional coverage and customize your policy",
        },
        {
          step: 4,
          title: "Make Payment",
          description: "Secure payment processing with instant policy issuance",
        },
      ],
    },
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Main Layout */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Column - Policy Information (70%) */}
            <div className="lg:col-span-7">
              {/* Policy Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-3">
                  <div
                    className="p-2 rounded-2xl"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Icon
                      className="h-7 w-7"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                </div>
                <h1
                  className="text-xl font-bold font-poppins mb-1"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {currentPolicyType.name}
                </h1>
                <p
                  className="text-sm font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  {currentPolicyType.description}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div
                className="flex space-x-1 mb-6 p-1 rounded-xl"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                {["overview", "coverage", "process"].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`flex-1 px-2 py-2 rounded-lg font-medium font-roboto text-xs transition-all duration-200 ${
                      activeSection === section
                        ? "shadow-sm"
                        : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        activeSection === section
                          ? "var(--color-card)"
                          : "transparent",
                      color:
                        activeSection === section
                          ? "var(--color-primary)"
                          : "var(--color-muted)",
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {activeSection === "overview" && (
                  <div className="space-y-8">
                    {/* Overview */}
                    <div
                      className="rounded-xl shadow-lg p-3"
                      style={{ backgroundColor: "var(--color-card)" }}
                    >
                      <h2
                        className="text-base font-bold font-poppins mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {policyInfo.overview.title}
                      </h2>
                      <p
                        className="text-xs font-roboto mb-2"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {policyInfo.overview.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3
                            className="text-xs font-semibold font-poppins mb-1"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            Key Features
                          </h3>
                          <div className="space-y-2">
                            {policyInfo.overview.keyFeatures.map(
                              (feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span
                                    className="font-roboto text-xs"
                                    style={{ color: "var(--color-foreground)" }}
                                  >
                                    {feature}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h3
                            className="text-xs font-semibold font-poppins mb-1"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            Benefits
                          </h3>
                          <div className="space-y-2">
                            {policyInfo.overview.benefits.map(
                              (benefit, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span
                                    className="font-roboto text-xs"
                                    style={{ color: "var(--color-foreground)" }}
                                  >
                                    {benefit}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div
                        className="text-center p-6 rounded-xl"
                        style={{ backgroundColor: "var(--color-card)" }}
                      >
                        <Users
                          className="h-8 w-8 mx-auto mb-3"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <div
                          className="text-lg font-bold font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          10M+
                        </div>
                        <div
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Satisfied Customers
                        </div>
                      </div>

                      <div
                        className="text-center p-6 rounded-xl"
                        style={{ backgroundColor: "var(--color-card)" }}
                      >
                        <Award
                          className="h-8 w-8 mx-auto mb-3"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <div
                          className="text-lg font-bold font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          95%
                        </div>
                        <div
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Claim Settlement Ratio
                        </div>
                      </div>

                      <div
                        className="text-center p-6 rounded-xl"
                        style={{ backgroundColor: "var(--color-card)" }}
                      >
                        <Clock
                          className="h-8 w-8 mx-auto mb-3"
                          style={{ color: "var(--color-primary)" }}
                        />
                        <div
                          className="text-lg font-bold font-poppins"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          24/7
                        </div>
                        <div
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Customer Support
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "coverage" && (
                  <div
                    className="rounded-xl shadow-lg p-3"
                    style={{ backgroundColor: "var(--color-card)" }}
                  >
                    <h2
                      className="text-base font-bold font-poppins mb-2"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {policyInfo.coverage.title}
                    </h2>
                    <div className="space-y-4">
                      {policyInfo.coverage.sections.map((section, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-3"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          <h3
                            className="text-xs font-semibold font-poppins mb-1"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {section.name}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-start space-x-2"
                              >
                                <ChevronRight
                                  className="h-3 w-3 mt-0.5 flex-shrink-0"
                                  style={{ color: "var(--color-primary)" }}
                                />
                                <span
                                  className="font-roboto text-xs"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "process" && (
                  <div
                    className="rounded-xl shadow-lg p-3"
                    style={{ backgroundColor: "var(--color-card)" }}
                  >
                    <h2
                      className="text-base font-bold font-poppins mb-2"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {policyInfo.process.title}
                    </h2>
                    <div className="space-y-4">
                      {policyInfo.process.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs"
                              style={{
                                backgroundColor: "var(--color-primary)",
                              }}
                            >
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3
                              className="text-xs font-semibold font-poppins mb-0.5"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="font-roboto text-xs"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Floating Form (30%) */}
            <div className="lg:col-span-3">
              <div className="sticky top-8">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-xl shadow-2xl p-4 border"
                  style={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div className="text-center mb-3">
                    <h3
                      className="text-sm font-bold font-poppins mb-0.5"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Get Your Quote
                    </h3>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Fill in your details to get a personalized quote
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        className="block text-xs font-medium font-roboto"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Email Address{" "}
                        <span style={{ color: "var(--color-danger)" }}>*</span>
                      </label>
                      <input
                        type="email"
                        value={state.formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border rounded-lg font-roboto text-xs focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "var(--color-border)",
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-foreground)",
                          "--tw-ring-color": "var(--color-primary)",
                        }}
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <label
                        className="block text-xs font-medium font-roboto"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Mobile Number{" "}
                        <span style={{ color: "var(--color-danger)" }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={state.formData.mobile}
                          onChange={(e) =>
                            handleInputChange("mobile", e.target.value)
                          }
                          placeholder="Enter mobile number"
                          className="w-full px-3 py-2 border rounded-lg font-roboto text-xs focus:outline-none focus:ring-2 transition-all pr-20"
                          style={{
                            borderColor: errors.mobile
                              ? "var(--color-danger)"
                              : "var(--color-border)",
                            backgroundColor: "var(--color-background)",
                            color: "var(--color-foreground)",
                            "--tw-ring-color": "var(--color-primary)",
                          }}
                          required
                        />
                        <button
                          type="button"
                          onClick={sendOtp}
                          disabled={state.formData.mobileVerified}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs font-medium transition-colors"
                          style={{
                            backgroundColor: state.formData.mobileVerified
                              ? "var(--color-success)"
                              : "var(--color-primary)",
                            color: "white",
                          }}
                        >
                          {state.formData.mobileVerified ? (
                            <>
                              <Check className="h-3 w-3 inline mr-1" />
                              Verified
                            </>
                          ) : (
                            <>Verify</>
                          )}
                        </button>
                      </div>
                      {errors.mobile && (
                        <p
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-danger)" }}
                        >
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Progressive Disclosure - Policy-specific fields */}
                    {state.formData.mobileVerified && (
                      <div className="space-y-4 animate-slide-down">
                        {currentPolicyType.baseFields
                          .slice(0, 2)
                          .map(renderField)}
                      </div>
                    )}

                    {/* Dependents for Health Insurance */}
                    {policyType === "health-insurance" &&
                      state.formData.mobileVerified && (
                        <div className="space-y-4 animate-slide-down">
                          <div className="flex items-center justify-between">
                            <label
                              className="block text-xs font-medium font-roboto"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              Dependents
                            </label>
                            <button
                              type="button"
                              onClick={addDependent}
                              className="flex items-center space-x-1 text-xs font-medium transition-colors"
                              style={{ color: "var(--color-primary)" }}
                            >
                              <Plus className="h-3 w-3" />
                              <span>Add</span>
                            </button>
                          </div>

                          {state.formData.dependents?.map(
                            (dependent, index) => (
                              <div
                                key={dependent.id}
                                className="border rounded-lg p-3 space-y-3"
                                style={{ borderColor: "var(--color-border)" }}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className="text-xs font-medium font-roboto"
                                    style={{ color: "var(--color-foreground)" }}
                                  >
                                    Dependent {index + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeDependent(index)}
                                    className="p-1 rounded hover:opacity-80 transition-colors"
                                    style={{ color: "var(--color-danger)" }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>

                                <input
                                  type="text"
                                  value={dependent.name}
                                  onChange={(e) =>
                                    handleDependentChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Name"
                                  className="w-full px-2 py-1 border rounded text-xs font-roboto focus:outline-none focus:ring-1 transition-all"
                                  style={{
                                    borderColor: "var(--color-border)",
                                    backgroundColor: "var(--color-background)",
                                    color: "var(--color-foreground)",
                                    "--tw-ring-color": "var(--color-primary)",
                                  }}
                                />

                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="number"
                                    value={dependent.age || ""}
                                    onChange={(e) =>
                                      handleDependentChange(
                                        index,
                                        "age",
                                        Number(e.target.value)
                                      )
                                    }
                                    placeholder="Age"
                                    className="w-full px-2 py-1 border rounded text-xs font-roboto focus:outline-none focus:ring-1 transition-all"
                                    style={{
                                      borderColor: "var(--color-border)",
                                      backgroundColor:
                                        "var(--color-background)",
                                      color: "var(--color-foreground)",
                                      "--tw-ring-color": "var(--color-primary)",
                                    }}
                                  />

                                  <select
                                    value={dependent.relation}
                                    onChange={(e) =>
                                      handleDependentChange(
                                        index,
                                        "relation",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-2 py-1 border rounded text-xs font-roboto focus:outline-none focus:ring-1 transition-all"
                                    style={{
                                      borderColor: "var(--color-border)",
                                      backgroundColor:
                                        "var(--color-background)",
                                      color: "var(--color-foreground)",
                                      "--tw-ring-color": "var(--color-primary)",
                                    }}
                                  >
                                    <option value="">Relation</option>
                                    <option value="spouse">Spouse</option>
                                    <option value="child">Child</option>
                                    <option value="parent">Parent</option>
                                  </select>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-2 px-3 rounded-lg font-bold font-roboto text-white text-xs transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Continue to Providers
                  </button>

                  <div className="mt-4 text-center">
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      <Info className="h-3 w-3 inline mr-1" />
                      Your information is secure and encrypted
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <div className="text-center mb-6">
              <div
                className="p-3 rounded-full mx-auto mb-4 w-fit"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <Phone
                  className="h-8 w-8"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <h3
                className="text-xl font-bold font-poppins mb-2"
                style={{ color: "var(--color-foreground)" }}
              >
                Verify Mobile Number
              </h3>
              <p
                className="font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Enter the OTP sent to {state.formData.mobile}
              </p>
              <p
                className="text-sm font-roboto mt-2"
                style={{ color: "var(--color-muted)" }}
              >
                Demo OTP: 123456
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all text-center text-lg tracking-widest"
                  style={{
                    borderColor: errors.otp
                      ? "var(--color-danger)"
                      : "var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-foreground)",
                    "--tw-ring-color": "var(--color-primary)",
                  }}
                />
                {errors.otp && (
                  <p
                    className="text-sm font-roboto"
                    style={{ color: "var(--color-danger)" }}
                  >
                    {errors.otp}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 px-3 py-2 rounded-lg font-medium font-roboto text-xs transition-colors"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={isVerifying || otpCode.length !== 6}
                  className="flex-1 px-3 py-2 rounded-lg font-medium font-roboto text-xs text-white transition-colors disabled:opacity-50"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyInfoLayout;
