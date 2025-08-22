import { useState, useEffect } from "react";
import { AnimatedValues } from "../types/dashboard.types";
import { animateValue } from "../utils/dashboard.utils";

export const useDashboardAnimations = (isLoading: boolean) => {
  const [animatedValues, setAnimatedValues] = useState<AnimatedValues>({
    overallScore: 0,
    totalClaims: 0,
    approvedClaims: 0,
    pendingClaims: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      animateValue(0, 75, 2000, (current) => {
        setAnimatedValues((prev) => ({ ...prev, overallScore: current }));
      });

      animateValue(0, 12, 1500, (current) => {
        setAnimatedValues((prev) => ({ ...prev, totalClaims: current }));
      });

      animateValue(0, 8, 1800, (current) => {
        setAnimatedValues((prev) => ({ ...prev, approvedClaims: current }));
      });

      animateValue(0, 2, 1200, (current) => {
        setAnimatedValues((prev) => ({ ...prev, pendingClaims: current }));
      });
    }
  }, [isLoading]);

  return animatedValues;
};
