import { useState } from "react";

interface Inputs {
  age: number;
  height: number;
  weight: number;
  preExistingConditions: string[];
}

export const useHealthCalculator = () => {
  const [inputs, setInputs] = useState<Inputs>({
    age: 30,
    height: 170,
    weight: 70,
    preExistingConditions: [],
  });
  const [coverage, setCoverage] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const toggleCondition = (condition: string) => {
    setInputs((prev) => ({
      ...prev,
      preExistingConditions: prev.preExistingConditions.includes(condition)
        ? prev.preExistingConditions.filter((c) => c !== condition)
        : [...prev.preExistingConditions, condition],
    }));
  };

  const calculateRecommendedCoverage = async () => {
    setCalculating(true);
    await new Promise((r) => setTimeout(r, 1200));
    const { age, height, weight, preExistingConditions } = inputs;
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let base = 500000;
    if (age > 60) base *= 2.0;
    else if (age > 50) base *= 1.8;
    else if (age > 45) base *= 1.5;
    else if (age > 35) base *= 1.3;
    else if (age > 25) base *= 1.1;
    if (bmi > 35) base *= 1.8;
    else if (bmi > 30) base *= 1.4;
    else if (bmi > 25) base *= 1.2;
    else if (bmi < 18.5) base *= 1.3;
    const high = [
      "Heart Disease",
      "Cancer History",
      "Kidney Disease",
      "Liver Disease",
    ];
    const mid = ["Diabetes", "Hypertension", "Thyroid"];
    let mult = 1;
    preExistingConditions.forEach((c) => {
      if (high.includes(c)) mult += 0.5;
      else if (mid.includes(c)) mult += 0.3;
      else mult += 0.2;
    });
    base *= mult;
    const finalCoverage = Math.round(base / 100000) * 100000;
    setCoverage(finalCoverage);
    setCalculating(false);
  };

  return {
    inputs,
    setInputs,
    coverage,
    calculating,
    toggleCondition,
    calculateRecommendedCoverage,
  };
};
