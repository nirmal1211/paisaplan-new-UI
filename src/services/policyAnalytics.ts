import { AnalyticsEvent, InsurancePolicy } from '../types/insurance';

export class PolicyAnalyticsService {
  private static instance: PolicyAnalyticsService;
  private events: AnalyticsEvent[] = [];
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds
  private analyticsEndpoint = '/api/analytics';

  private constructor() {
    this.startBatchFlush();
  }

  static getInstance(): PolicyAnalyticsService {
    if (!PolicyAnalyticsService.instance) {
      PolicyAnalyticsService.instance = new PolicyAnalyticsService();
    }
    return PolicyAnalyticsService.instance;
  }

  track(event: Omit<AnalyticsEvent, 'timestamp'>): void {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date()
    };

    this.events.push(analyticsEvent);

    // Flush if batch size reached
    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }

  trackPolicyView(policyId: string, userId: string, metadata?: Record<string, any>): void {
    this.track({
      eventType: 'policy_view',
      policyId,
      userId,
      metadata
    });
  }

  trackPremiumCalculation(userId: string, vehicleType: string, calculationParams: any): void {
    this.track({
      eventType: 'premium_calculation',
      userId,
      metadata: {
        vehicleType,
        calculationParams
      }
    });
  }

  trackClaimSubmission(policyId: string, userId: string, claimType: string, amount: number): void {
    this.track({
      eventType: 'claim_submission',
      policyId,
      userId,
      metadata: {
        claimType,
        amount
      }
    });
  }

  trackDocumentDownload(policyId: string, userId: string, documentType: string): void {
    this.track({
      eventType: 'document_download',
      policyId,
      userId,
      metadata: {
        documentType
      }
    });
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch(this.analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ events: eventsToSend })
      });
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Re-add events to queue for retry
      this.events.unshift(...eventsToSend);
    }
  }

  private startBatchFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  // Analytics reporting methods
  generatePolicyReport(policies: InsurancePolicy[]): {
    totalPolicies: number;
    activeCount: number;
    expiredCount: number;
    pendingCount: number;
    totalPremium: number;
    averagePremium: number;
    vehicleTypeDistribution: Record<string, number>;
    coverageTypeDistribution: Record<string, number>;
  } {
    const report = {
      totalPolicies: policies.length,
      activeCount: 0,
      expiredCount: 0,
      pendingCount: 0,
      totalPremium: 0,
      averagePremium: 0,
      vehicleTypeDistribution: {} as Record<string, number>,
      coverageTypeDistribution: {} as Record<string, number>
    };

    policies.forEach(policy => {
      // Status counts
      switch (policy.status) {
        case 'active':
          report.activeCount++;
          break;
        case 'expired':
          report.expiredCount++;
          break;
        case 'pending':
          report.pendingCount++;
          break;
      }

      // Premium calculations
      report.totalPremium += policy.premium.totalAmount;

      // Vehicle type distribution
      report.vehicleTypeDistribution[policy.insuranceType] = 
        (report.vehicleTypeDistribution[policy.insuranceType] || 0) + 1;

      // Coverage type distribution
      report.coverageTypeDistribution[policy.coverage.type] = 
        (report.coverageTypeDistribution[policy.coverage.type] || 0) + 1;
    });

    report.averagePremium = report.totalPolicies > 0 ? report.totalPremium / report.totalPolicies : 0;

    return report;
  }

  generateClaimsReport(policies: InsurancePolicy[]): {
    totalClaims: number;
    approvedClaims: number;
    pendingClaims: number;
    rejectedClaims: number;
    totalClaimAmount: number;
    averageClaimAmount: number;
    claimsByType: Record<string, number>;
  } {
    const report = {
      totalClaims: 0,
      approvedClaims: 0,
      pendingClaims: 0,
      rejectedClaims: 0,
      totalClaimAmount: 0,
      averageClaimAmount: 0,
      claimsByType: {} as Record<string, number>
    };

    policies.forEach(policy => {
      policy.claims.forEach(claim => {
        report.totalClaims++;
        report.totalClaimAmount += claim.amount;

        switch (claim.status) {
          case 'approved':
            report.approvedClaims++;
            break;
          case 'pending':
            report.pendingClaims++;
            break;
          case 'rejected':
            report.rejectedClaims++;
            break;
        }

        report.claimsByType[claim.type] = (report.claimsByType[claim.type] || 0) + 1;
      });
    });

    report.averageClaimAmount = report.totalClaims > 0 ? report.totalClaimAmount / report.totalClaims : 0;

    return report;
  }

  // Export analytics data
  exportAnalyticsData(startDate: Date, endDate: Date): AnalyticsEvent[] {
    return this.events.filter(event => 
      event.timestamp >= startDate && event.timestamp <= endDate
    );
  }

  // Clear analytics data
  clearAnalyticsData(): void {
    this.events = [];
  }
}