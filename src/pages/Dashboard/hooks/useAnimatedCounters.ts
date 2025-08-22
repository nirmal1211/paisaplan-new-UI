import { useEffect, useState } from "react";

export interface AnimatedCounterValues {
  overallScore: number;
  totalClaims: number;
  totalPolicies: number;
  approvedClaims: number;
  pendingClaims: number;
}

export const useAnimatedCounters = (start: boolean): AnimatedCounterValues => {
  const [values, setValues] = useState<AnimatedCounterValues>({
    overallScore: 0,
    totalClaims: 0,
    totalPolicies: 0,
    approvedClaims: 0,
    pendingClaims: 0,
  });

  useEffect(() => {
    if (!start) return;
    const animate = (
      end: number,
      duration: number,
      key: keyof AnimatedCounterValues
    ) => {
      const begin = 0;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        const current = Math.round(begin + (end - begin) * eased);
        setValues((v) => ({ ...v, [key]: current }));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    animate(75, 2000, "overallScore");
    animate(12, 1500, "totalClaims");
    animate(12, 1500, "totalPolicies");
    animate(8, 1800, "approvedClaims");
    animate(2, 1200, "pendingClaims");
  }, [start]);

  return values;
};
