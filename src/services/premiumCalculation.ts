import { PremiumCalculationParams, CalculationResult } from '../types/insurance';

export class PremiumCalculationService {
  private static basePremiumRates = {
    'two-wheeler': {
      'comprehensive': 0.025,
      'third-party': 0.008,
      'zero-dep': 0.035
    },
    'motor': {
      'comprehensive': 0.03,
      'third-party': 0.01,
      'zero-dep': 0.04
    }
  };

  private static addOnRates = {
    'zero-depreciation': 0.15,
    'engine-protection': 0.08,
    'roadside-assistance': 0.02,
    'return-to-invoice': 0.12,
    'consumables-cover': 0.05,
    'key-replacement': 0.01,
    'tyre-protection': 0.03
  };

  private static locationMultipliers = {
    'metro': 1.2,
    'tier1': 1.1,
    'tier2': 1.0,
    'tier3': 0.9,
    'rural': 0.8
  };

  private static ageMultipliers = {
    vehicle: {
      '0-1': 1.0,
      '1-3': 1.1,
      '3-5': 1.2,
      '5-10': 1.4,
      '10+': 1.6
    },
    driver: {
      '18-25': 1.3,
      '25-35': 1.0,
      '35-50': 0.9,
      '50-65': 0.95,
      '65+': 1.2
    }
  };

  static calculatePremium(
    params: PremiumCalculationParams,
    vehicleType: 'two-wheeler' | 'motor'
  ): CalculationResult {
    const breakdown: Array<{component: string; amount: number; percentage?: number}> = [];

    // Base premium calculation
    const baseRate = this.basePremiumRates[vehicleType][params.coverageType];
    const baseAmount = params.vehicleValue * baseRate;
    breakdown.push({ component: 'Base Premium', amount: baseAmount });

    // Age adjustments
    const vehicleAgeMultiplier = this.getVehicleAgeMultiplier(params.vehicleAge);
    const driverAgeMultiplier = this.getDriverAgeMultiplier(params.driverAge);
    const ageAdjustment = baseAmount * (vehicleAgeMultiplier + driverAgeMultiplier - 2);
    breakdown.push({ component: 'Age Adjustment', amount: ageAdjustment });

    // Location adjustment
    const locationMultiplier = this.locationMultipliers[params.location as keyof typeof this.locationMultipliers] || 1.0;
    const locationAdjustment = baseAmount * (locationMultiplier - 1);
    breakdown.push({ component: 'Location Adjustment', amount: locationAdjustment });

    // Claims history adjustment
    const claimsAdjustment = baseAmount * (params.previousClaims * 0.1);
    breakdown.push({ component: 'Claims History', amount: claimsAdjustment });

    // Add-ons calculation
    let addOnCost = 0;
    for (const addOn of params.addOns) {
      const rate = this.addOnRates[addOn as keyof typeof this.addOnRates] || 0;
      const cost = params.vehicleValue * rate;
      addOnCost += cost;
      breakdown.push({ component: `Add-on: ${addOn}`, amount: cost });
    }

    // Voluntary deductible discount
    const deductibleDiscount = (baseAmount + addOnCost) * (params.voluntaryDeductible * 0.05);
    breakdown.push({ component: 'Voluntary Deductible Discount', amount: -deductibleDiscount });

    // Calculate subtotal
    const subtotal = baseAmount + ageAdjustment + locationAdjustment + claimsAdjustment + addOnCost - deductibleDiscount;

    // Taxes (18% GST)
    const taxes = subtotal * 0.18;
    breakdown.push({ component: 'GST (18%)', amount: taxes, percentage: 18 });

    // No Claim Bonus (if applicable)
    const ncbDiscount = this.calculateNCBDiscount(params.previousClaims, subtotal);
    if (ncbDiscount > 0) {
      breakdown.push({ component: 'No Claim Bonus', amount: -ncbDiscount });
    }

    // Online discount (2%)
    const onlineDiscount = subtotal * 0.02;
    breakdown.push({ component: 'Online Discount (2%)', amount: -onlineDiscount, percentage: 2 });

    const totalDiscounts = deductibleDiscount + ncbDiscount + onlineDiscount;
    const totalAmount = subtotal + taxes - ncbDiscount - onlineDiscount;

    return {
      baseAmount: Math.round(baseAmount),
      addOnCost: Math.round(addOnCost),
      taxes: Math.round(taxes),
      discounts: Math.round(totalDiscounts),
      totalAmount: Math.round(totalAmount),
      breakdown: breakdown.map(item => ({
        ...item,
        amount: Math.round(item.amount)
      }))
    };
  }

  private static getVehicleAgeMultiplier(age: number): number {
    if (age <= 1) return this.ageMultipliers.vehicle['0-1'];
    if (age <= 3) return this.ageMultipliers.vehicle['1-3'];
    if (age <= 5) return this.ageMultipliers.vehicle['3-5'];
    if (age <= 10) return this.ageMultipliers.vehicle['5-10'];
    return this.ageMultipliers.vehicle['10+'];
  }

  private static getDriverAgeMultiplier(age: number): number {
    if (age < 25) return this.ageMultipliers.driver['18-25'];
    if (age < 35) return this.ageMultipliers.driver['25-35'];
    if (age < 50) return this.ageMultipliers.driver['35-50'];
    if (age < 65) return this.ageMultipliers.driver['50-65'];
    return this.ageMultipliers.driver['65+'];
  }

  private static calculateNCBDiscount(previousClaims: number, amount: number): number {
    if (previousClaims === 0) {
      // No claims in previous year - 20% discount
      return amount * 0.20;
    }
    return 0;
  }

  static calculateInstallmentOptions(totalAmount: number): Array<{
    installments: number;
    amountPerInstallment: number;
    processingFee: number;
    totalWithFee: number;
  }> {
    const options = [
      { installments: 1, processingFeeRate: 0 },
      { installments: 2, processingFeeRate: 0.02 },
      { installments: 4, processingFeeRate: 0.04 },
      { installments: 12, processingFeeRate: 0.08 }
    ];

    return options.map(option => {
      const processingFee = totalAmount * option.processingFeeRate;
      const totalWithFee = totalAmount + processingFee;
      const amountPerInstallment = totalWithFee / option.installments;

      return {
        installments: option.installments,
        amountPerInstallment: Math.round(amountPerInstallment),
        processingFee: Math.round(processingFee),
        totalWithFee: Math.round(totalWithFee)
      };
    });
  }

  static validateCalculationParams(params: PremiumCalculationParams): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (params.vehicleValue <= 0) {
      errors.push('Vehicle value must be greater than 0');
    }

    if (params.vehicleAge < 0 || params.vehicleAge > 20) {
      errors.push('Vehicle age must be between 0 and 20 years');
    }

    if (params.driverAge < 18 || params.driverAge > 80) {
      errors.push('Driver age must be between 18 and 80 years');
    }

    if (params.previousClaims < 0 || params.previousClaims > 10) {
      errors.push('Previous claims must be between 0 and 10');
    }

    if (params.voluntaryDeductible < 0 || params.voluntaryDeductible > 5) {
      errors.push('Voluntary deductible must be between 0 and 5');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}