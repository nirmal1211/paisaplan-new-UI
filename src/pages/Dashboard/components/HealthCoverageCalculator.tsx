import React from "react";
import {
  Calculator,
  Sparkles,
  RefreshCw,
  CheckCircle,
  Info,
  Weight,
  User,
} from "lucide-react";
import { calculateBMI, getBMICategory } from "../utils";
import { useHealthCalculator } from "../hooks/useHealthCalculator";
import { preExistingConditions } from "../data";

export const HealthCoverageCalculator: React.FC = () => {
  const {
    inputs,
    setInputs,
    coverage,
    calculating,
    toggleCondition,
    calculateRecommendedCoverage,
  } = useHealthCalculator();
  return (
    <section className="mb-16">
      <div
        className="rounded-2xl shadow-xl p-4 md:p-6 relative overflow-hidden"
        style={{ backgroundColor: "var(--color-card)" }}
      >
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <div
              className="p-2 rounded-xl shadow-lg"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2
                className="text-lg font-bold font-poppins"
                style={{ color: "var(--color-foreground)" }}
              >
                AI Coverage Calculator
              </h2>
              <p
                className="text-xs font-roboto"
                style={{ color: "var(--color-muted)" }}
              >
                Get personalized health insurance recommendations powered by
                machine learning
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3
                className="text-base font-bold font-poppins mb-3"
                style={{ color: "var(--color-foreground)" }}
              >
                Personal Information
              </h3>
              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Age: {inputs.age} years
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min={18}
                    max={80}
                    value={inputs.age}
                    onChange={(e) =>
                      setInputs((p) => ({
                        ...p,
                        age: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${
                        ((inputs.age - 18) / (80 - 18)) * 100
                      }%, var(--color-border) ${
                        ((inputs.age - 18) / (80 - 18)) * 100
                      }%, var(--color-border) 100%)`,
                    }}
                  />
                  <div
                    className="flex justify-between text-xs font-roboto mt-2"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <span>18</span>
                    <span>80</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  label="Height (cm)"
                  icon={
                    <User
                      className="h-4 w-4"
                      style={{ color: "var(--color-muted)" }}
                    />
                  }
                  value={inputs.height}
                  onChange={(v) => setInputs((p) => ({ ...p, height: v }))}
                  min={100}
                  max={250}
                />
                <NumberInput
                  label="Weight (kg)"
                  icon={
                    <Weight
                      className="h-4 w-4"
                      style={{ color: "var(--color-muted)" }}
                    />
                  }
                  value={inputs.weight}
                  onChange={(v) => setInputs((p) => ({ ...p, weight: v }))}
                  min={30}
                  max={200}
                />
              </div>
              <div
                className="p-3 rounded-xl border-2"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-sm font-bold font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      BMI Analysis
                    </span>
                    <p
                      className="text-xs font-roboto mt-1"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Body Mass Index calculation
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-lg font-bold font-poppins"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {calculateBMI(inputs.height, inputs.weight).toFixed(1)}
                    </span>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {getBMICategory(
                        calculateBMI(inputs.height, inputs.weight)
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold font-roboto"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Pre-existing Conditions
                </label>
                <p
                  className="text-xs font-roboto"
                  style={{ color: "var(--color-muted)" }}
                >
                  Select all conditions that apply to get accurate coverage
                  recommendations
                </p>
                <div
                  className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 rounded-lg"
                  style={{ backgroundColor: "var(--color-background)" }}
                >
                  {preExistingConditions.map((cond) => (
                    <label
                      key={cond}
                      className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:shadow-md transition-all duration-200"
                      style={{ backgroundColor: "var(--color-card)" }}
                    >
                      <input
                        type="checkbox"
                        checked={inputs.preExistingConditions.includes(cond)}
                        onChange={() => toggleCondition(cond)}
                        className="w-4 h-4 rounded focus:ring-4"
                        style={{ accentColor: "var(--color-primary)" }}
                      />
                      <span
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {cond}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={calculateRecommendedCoverage}
                disabled={calculating}
                className="w-full py-2 px-4 rounded-xl font-bold font-roboto text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {calculating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing Your Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Calculate AI Recommendations</span>
                  </div>
                )}
              </button>
            </div>
            <div className="space-y-6">
              <h3
                className="text-base font-bold font-poppins"
                style={{ color: "var(--color-foreground)" }}
              >
                AI Recommendations
              </h3>
              {coverage ? (
                <div className="space-y-4">
                  <div
                    className="p-4 rounded-xl border-2 relative overflow-hidden"
                    style={{
                      borderColor: "var(--color-primary)",
                      backgroundColor: "var(--color-secondary)",
                    }}
                  >
                    <div className="relative z-10 text-center">
                      <Sparkles
                        className="h-6 w-6 mx-auto mb-2 animate-pulse"
                        style={{ color: "var(--color-primary)" }}
                      />
                      <div
                        className="text-2xl font-bold font-poppins mb-1"
                        style={{ color: "var(--color-primary)" }}
                      >
                        ₹{(coverage / 100000).toFixed(0)} Lakhs
                      </div>
                      <div
                        className="text-xs font-roboto"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Recommended Health Insurance Coverage
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4
                      className="text-sm font-bold font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Personalized Insights
                    </h4>
                    <Insight
                      title="Family Floater Recommended"
                      desc={`₹${(coverage / 100000).toFixed(
                        0
                      )} lakhs coverage for comprehensive protection`}
                    />
                    <Insight
                      title="Critical Illness Add-on"
                      desc="Enhanced protection for serious health conditions"
                    />
                    <Insight
                      title="Wellness Benefits"
                      desc="Annual health checkups and preventive care included"
                    />
                    {inputs.preExistingConditions.length > 0 && (
                      <Insight
                        icon={<Info className="h-4 w-4 text-blue-500 mt-0.5" />}
                        title="Pre-existing Condition Coverage"
                        desc="Waiting period applies, consider immediate coverage options"
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="py-2 px-3 rounded-lg font-bold font-roboto transition-all duration-300 hover:scale-105 text-white text-xs"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      View Plans
                    </button>
                    <button
                      className="py-2 px-3 rounded-lg font-bold font-roboto transition-all duration-300 hover:scale-105 text-xs"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="relative">
                    <Calculator
                      className="h-10 w-10 mx-auto mb-3 animate-pulse"
                      style={{ color: "var(--color-muted)" }}
                    />
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="h-4 w-4 text-yellow-500 animate-bounce" />
                    </div>
                  </div>
                  <h4
                    className="text-base font-bold font-poppins mb-2"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Ready for AI Analysis
                  </h4>
                  <p
                    className="font-roboto text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Complete your profile and get personalized insurance
                    recommendations powered by machine learning
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  icon: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label
      className="block text-sm font-semibold font-roboto"
      style={{ color: "var(--color-foreground)" }}
    >
      {label}
    </label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || min)}
        min={min}
        max={max}
        className="w-full px-3 py-2 border-2 rounded-xl font-roboto text-sm focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-background)",
          color: "var(--color-foreground)",
        }}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">{icon}</div>
    </div>
  </div>
);

const Insight = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) => (
  <div
    className="flex items-start space-x-2 p-2 rounded-lg"
    style={{ backgroundColor: "var(--color-background)" }}
  >
    {icon || <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />}
    <div>
      <p
        className="font-semibold font-roboto"
        style={{ color: "var(--color-foreground)" }}
      >
        {title}
      </p>
      <p
        className="text-sm font-roboto"
        style={{ color: "var(--color-muted)" }}
      >
        {desc}
      </p>
    </div>
  </div>
);
