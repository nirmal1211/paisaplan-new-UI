import { InsurancePolicy, CacheConfig, PerformanceMetrics } from '../types/insurance';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

export class PolicyCacheService {
  private static instance: PolicyCacheService;
  private cache: Map<string, CacheEntry<any>> = new Map();
  private config: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
    strategy: 'lru'
  };
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    cacheHitRate: 0,
    apiResponseTime: 0,
    errorRate: 0
  };
  private totalRequests = 0;
  private cacheHits = 0;

  static getInstance(): PolicyCacheService {
    if (!PolicyCacheService.instance) {
      PolicyCacheService.instance = new PolicyCacheService();
    }
    return PolicyCacheService.instance;
  }

  configure(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config };
  }

  set<T>(key: string, data: T): void {
    const now = Date.now();
    
    // Check if cache is full and evict based on strategy
    if (this.cache.size >= this.config.maxSize) {
      this.evict();
    }

    this.cache.set(key, {
      data,
      timestamp: now,
      accessCount: 1,
      lastAccessed: now
    });
  }

  get<T>(key: string): T | null {
    this.totalRequests++;
    const entry = this.cache.get(key);

    if (!entry) {
      this.updateCacheHitRate();
      return null;
    }

    const now = Date.now();
    
    // Check if entry has expired
    if (now - entry.timestamp > this.config.ttl) {
      this.cache.delete(key);
      this.updateCacheHitRate();
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = now;
    this.cacheHits++;
    this.updateCacheHitRate();

    return entry.data as T;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.resetMetrics();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now - entry.timestamp > this.config.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  private evict(): void {
    if (this.cache.size === 0) return;

    let keyToEvict: string;

    switch (this.config.strategy) {
      case 'lru':
        keyToEvict = this.findLRUKey();
        break;
      case 'lfu':
        keyToEvict = this.findLFUKey();
        break;
      case 'fifo':
        keyToEvict = this.findFIFOKey();
        break;
      default:
        keyToEvict = this.cache.keys().next().value;
    }

    this.cache.delete(keyToEvict);
  }

  private findLRUKey(): string {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  private findLFUKey(): string {
    let leastUsedKey = '';
    let leastCount = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.accessCount < leastCount) {
        leastCount = entry.accessCount;
        leastUsedKey = key;
      }
    }

    return leastUsedKey;
  }

  private findFIFOKey(): string {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  private updateCacheHitRate(): void {
    this.metrics.cacheHitRate = this.totalRequests > 0 ? (this.cacheHits / this.totalRequests) * 100 : 0;
  }

  private resetMetrics(): void {
    this.totalRequests = 0;
    this.cacheHits = 0;
    this.metrics = {
      loadTime: 0,
      cacheHitRate: 0,
      apiResponseTime: 0,
      errorRate: 0
    };
  }

  // Policy-specific cache methods
  cachePolicy(policy: InsurancePolicy): void {
    this.set(`policy:${policy.policyId}`, policy);
  }

  getCachedPolicy(policyId: string): InsurancePolicy | null {
    return this.get<InsurancePolicy>(`policy:${policyId}`);
  }

  cachePremiumCalculation(params: string, result: any): void {
    this.set(`premium:${params}`, result);
  }

  getCachedPremiumCalculation(params: string): any | null {
    return this.get(`premium:${params}`);
  }

  invalidatePolicyCache(policyId: string): void {
    this.delete(`policy:${policyId}`);
    
    // Also invalidate related cache entries
    const keysToDelete: string[] = [];
    for (const key of this.cache.keys()) {
      if (key.includes(policyId)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => this.delete(key));
  }
}