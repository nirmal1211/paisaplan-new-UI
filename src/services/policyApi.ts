import { InsurancePolicy, ApiResponse, PolicyApiEndpoints, PremiumCalculationParams, CalculationResult } from '../types/insurance';
import { PolicyCacheService } from './policyCache';
import { PolicyValidationService } from './policyValidation';
import { PremiumCalculationService } from './premiumCalculation';

export class PolicyApiService {
  private static instance: PolicyApiService;
  private cache: PolicyCacheService;
  private baseUrl: string;
  private endpoints: PolicyApiEndpoints;

  private constructor() {
    this.cache = PolicyCacheService.getInstance();
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
    this.endpoints = {
      fetch: `${this.baseUrl}/policies`,
      create: `${this.baseUrl}/policies`,
      update: `${this.baseUrl}/policies`,
      delete: `${this.baseUrl}/policies`,
      calculate: `${this.baseUrl}/policies/calculate`,
      validate: `${this.baseUrl}/policies/validate`
    };
  }

  static getInstance(): PolicyApiService {
    if (!PolicyApiService.instance) {
      PolicyApiService.instance = new PolicyApiService();
    }
    return PolicyApiService.instance;
  }

  async fetchPolicy(policyId: string, useCache = true): Promise<ApiResponse<InsurancePolicy>> {
    const startTime = Date.now();

    try {
      // Check cache first
      if (useCache) {
        const cachedPolicy = this.cache.getCachedPolicy(policyId);
        if (cachedPolicy) {
          return {
            success: true,
            data: cachedPolicy,
            timestamp: new Date()
          };
        }
      }

      const response = await fetch(`${this.endpoints.fetch}/${policyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const policy: InsurancePolicy = await response.json();
      
      // Validate the received policy
      const validation = PolicyValidationService.validatePolicy(policy);
      if (!validation.isValid) {
        throw new Error(`Invalid policy data: ${validation.errors.join(', ')}`);
      }

      // Cache the policy
      this.cache.cachePolicy(policy);

      return {
        success: true,
        data: policy,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error fetching policy:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    } finally {
      const loadTime = Date.now() - startTime;
      this.updateMetrics('loadTime', loadTime);
    }
  }

  async createPolicy(policyData: Partial<InsurancePolicy>): Promise<ApiResponse<InsurancePolicy>> {
    try {
      // Validate policy data before sending
      const validation = PolicyValidationService.validatePolicy(policyData);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Validation failed: ${validation.errors.join(', ')}`,
          timestamp: new Date()
        };
      }

      const response = await fetch(this.endpoints.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(policyData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const policy: InsurancePolicy = await response.json();
      
      // Cache the new policy
      this.cache.cachePolicy(policy);

      return {
        success: true,
        data: policy,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error creating policy:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  async updatePolicy(policyId: string, updates: Partial<InsurancePolicy>): Promise<ApiResponse<InsurancePolicy>> {
    try {
      const response = await fetch(`${this.endpoints.update}/${policyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const policy: InsurancePolicy = await response.json();
      
      // Update cache
      this.cache.cachePolicy(policy);

      return {
        success: true,
        data: policy,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error updating policy:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  async deletePolicy(policyId: string): Promise<ApiResponse<boolean>> {
    try {
      const response = await fetch(`${this.endpoints.delete}/${policyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove from cache
      this.cache.invalidatePolicyCache(policyId);

      return {
        success: true,
        data: true,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error deleting policy:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  async calculatePremium(
    params: PremiumCalculationParams,
    vehicleType: 'two-wheeler' | 'motor',
    useCache = true
  ): Promise<ApiResponse<CalculationResult>> {
    try {
      // Validate calculation parameters
      const validation = PremiumCalculationService.validateCalculationParams(params);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Validation failed: ${validation.errors.join(', ')}`,
          timestamp: new Date()
        };
      }

      const cacheKey = JSON.stringify({ params, vehicleType });

      // Check cache first
      if (useCache) {
        const cachedResult = this.cache.getCachedPremiumCalculation(cacheKey);
        if (cachedResult) {
          return {
            success: true,
            data: cachedResult,
            timestamp: new Date()
          };
        }
      }

      // Calculate premium locally (can also be done via API)
      const result = PremiumCalculationService.calculatePremium(params, vehicleType);

      // Cache the result
      this.cache.cachePremiumCalculation(cacheKey, result);

      return {
        success: true,
        data: result,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error calculating premium:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  async validatePolicy(policyData: Partial<InsurancePolicy>): Promise<ApiResponse<{ isValid: boolean; errors: string[] }>> {
    try {
      const validation = PolicyValidationService.validatePolicy(policyData);
      
      return {
        success: true,
        data: validation,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error validating policy:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  // Batch operations
  async fetchMultiplePolicies(policyIds: string[]): Promise<ApiResponse<InsurancePolicy[]>> {
    try {
      const promises = policyIds.map(id => this.fetchPolicy(id));
      const results = await Promise.allSettled(promises);
      
      const policies: InsurancePolicy[] = [];
      const errors: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success && result.value.data) {
          policies.push(result.value.data);
        } else {
          errors.push(`Failed to fetch policy ${policyIds[index]}`);
        }
      });

      return {
        success: errors.length === 0,
        data: policies,
        error: errors.length > 0 ? errors.join(', ') : undefined,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Error fetching multiple policies:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  // Utility methods
  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  private updateMetrics(metric: keyof typeof this.cache.getMetrics, value: number): void {
    // Update performance metrics
    const currentMetrics = this.cache.getMetrics();
    // Implementation would update the specific metric
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Clear all caches
  clearCache(): void {
    this.cache.clear();
  }

  // Get performance metrics
  getPerformanceMetrics() {
    return this.cache.getMetrics();
  }
}