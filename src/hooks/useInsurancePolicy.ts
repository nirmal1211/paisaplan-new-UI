import { useState, useEffect, useCallback } from 'react';
import { InsurancePolicy, PremiumCalculationParams, CalculationResult } from '../types/insurance';
import { PolicyApiService } from '../services/policyApi';
import { PolicyAnalyticsService } from '../services/policyAnalytics';

interface UsePolicyState {
  policy: InsurancePolicy | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface UsePolicyActions {
  fetchPolicy: (policyId: string, useCache?: boolean) => Promise<void>;
  updatePolicy: (updates: Partial<InsurancePolicy>) => Promise<void>;
  deletePolicy: () => Promise<void>;
  calculatePremium: (params: PremiumCalculationParams, vehicleType: 'two-wheeler' | 'motor') => Promise<CalculationResult | null>;
  validatePolicy: (policyData: Partial<InsurancePolicy>) => Promise<{ isValid: boolean; errors: string[] } | null>;
  refreshPolicy: () => Promise<void>;
  clearError: () => void;
}

export function useInsurancePolicy(initialPolicyId?: string): [UsePolicyState, UsePolicyActions] {
  const [state, setState] = useState<UsePolicyState>({
    policy: null,
    loading: false,
    error: null,
    lastUpdated: null
  });

  const apiService = PolicyApiService.getInstance();
  const analyticsService = PolicyAnalyticsService.getInstance();

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setPolicy = useCallback((policy: InsurancePolicy | null) => {
    setState(prev => ({ 
      ...prev, 
      policy, 
      lastUpdated: policy ? new Date() : null 
    }));
  }, []);

  const fetchPolicy = useCallback(async (policyId: string, useCache = true) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.fetchPolicy(policyId, useCache);
      
      if (response.success && response.data) {
        setPolicy(response.data);
        
        // Track analytics
        const userId = localStorage.getItem('userId') || 'anonymous';
        analyticsService.trackPolicyView(policyId, userId, {
          useCache,
          timestamp: new Date().toISOString()
        });
      } else {
        setError(response.error || 'Failed to fetch policy');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiService, analyticsService, setLoading, setError, setPolicy]);

  const updatePolicy = useCallback(async (updates: Partial<InsurancePolicy>) => {
    if (!state.policy) {
      setError('No policy loaded to update');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.updatePolicy(state.policy.policyId, updates);
      
      if (response.success && response.data) {
        setPolicy(response.data);
      } else {
        setError(response.error || 'Failed to update policy');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [state.policy, apiService, setLoading, setError, setPolicy]);

  const deletePolicy = useCallback(async () => {
    if (!state.policy) {
      setError('No policy loaded to delete');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.deletePolicy(state.policy.policyId);
      
      if (response.success) {
        setPolicy(null);
      } else {
        setError(response.error || 'Failed to delete policy');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [state.policy, apiService, setLoading, setError, setPolicy]);

  const calculatePremium = useCallback(async (
    params: PremiumCalculationParams, 
    vehicleType: 'two-wheeler' | 'motor'
  ): Promise<CalculationResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.calculatePremium(params, vehicleType);
      
      if (response.success && response.data) {
        // Track analytics
        const userId = localStorage.getItem('userId') || 'anonymous';
        analyticsService.trackPremiumCalculation(userId, vehicleType, params);
        
        return response.data;
      } else {
        setError(response.error || 'Failed to calculate premium');
        return null;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiService, analyticsService, setLoading, setError]);

  const validatePolicy = useCallback(async (
    policyData: Partial<InsurancePolicy>
  ): Promise<{ isValid: boolean; errors: string[] } | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.validatePolicy(policyData);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to validate policy');
        return null;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiService, setLoading, setError]);

  const refreshPolicy = useCallback(async () => {
    if (state.policy) {
      await fetchPolicy(state.policy.policyId, false); // Force refresh without cache
    }
  }, [state.policy, fetchPolicy]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Auto-fetch policy on mount if initialPolicyId is provided
  useEffect(() => {
    if (initialPolicyId) {
      fetchPolicy(initialPolicyId);
    }
  }, [initialPolicyId, fetchPolicy]);

  const actions: UsePolicyActions = {
    fetchPolicy,
    updatePolicy,
    deletePolicy,
    calculatePremium,
    validatePolicy,
    refreshPolicy,
    clearError
  };

  return [state, actions];
}

// Hook for managing multiple policies
export function useInsurancePolicies() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiService = PolicyApiService.getInstance();

  const fetchMultiplePolicies = useCallback(async (policyIds: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.fetchMultiplePolicies(policyIds);
      
      if (response.success && response.data) {
        setPolicies(response.data);
      } else {
        setError(response.error || 'Failed to fetch policies');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiService]);

  const addPolicy = useCallback((policy: InsurancePolicy) => {
    setPolicies(prev => [...prev, policy]);
  }, []);

  const removePolicy = useCallback((policyId: string) => {
    setPolicies(prev => prev.filter(p => p.policyId !== policyId));
  }, []);

  const updatePolicyInList = useCallback((updatedPolicy: InsurancePolicy) => {
    setPolicies(prev => prev.map(p => 
      p.policyId === updatedPolicy.policyId ? updatedPolicy : p
    ));
  }, []);

  return {
    policies,
    loading,
    error,
    fetchMultiplePolicies,
    addPolicy,
    removePolicy,
    updatePolicyInList,
    clearError: () => setError(null)
  };
}