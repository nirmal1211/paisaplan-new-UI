import { 
  PremiumCalculatorParams, 
  PremiumCalculationResult, 
  AddOnCoverage,
  ClaimsHistory 
} from '../types/insurance';

// Base premium rates by vehicle type and cubic capacity
const BASE_PREMIUM_RATES = {
  'two-wheeler': {
    '0-75': 1500,
    '76-150': 2000,
    '151-350': 2500,
    '351+': 3000
  },
  'four-wheeler': {
    '0-1000': 8000,
    '1001-1500': 12000,
    '1501-2000': 16000,
    '2001+': 20000
  }
};

// Third party premium rates (fixed by government)
const THIRD_PARTY_RATES = {
  'two-wheeler': {
    '0-75': 482,
    '76-150': 752,
    '151-350': 1193,
    '351+': 2323
  },
  'four-wheeler': {
    '0-1000': 2072,
    '1001-1500': 3221,
    '1501-2000': 7890,
    '2001+': 7890
  }
};

// NCB discount rates
const NCB_RATES = {
  0: 0,
  20: 0.20,
  25: 0.25,
  35: 0.35,
  45: 0.45,
  50: 0.50
};

// Add-on premium rates
const ADDON_RATES = {
  'zero-dep': 0.15, // 15% of OD premium
  'engine-protect': 0.08, // 8% of OD premium
  'roadside-assistance': 500, // Fixed amount
  'key-replacement': 300,
  'tyre-protection': 0.05, // 5% of OD premium
  'return-to-invoice': 0.12, // 12% of OD premium
  'personal-accident-enhanced': 1000,
  'consumables': 0.06 // 6% of OD premium
};

// City multipliers for premium calculation
const CITY_MULTIPLIERS = {
  'mumbai': 1.2,
  'delhi': 1.15,
  'bangalore': 1.1,
  'chennai': 1.1,
  'hyderabad': 1.05,
  'pune': 1.05,
  'kolkata': 1.0,
  'ahmedabad': 1.0,
  'default': 0.95
};

// Age depreciation factors
const AGE_DEPRECIATION = {
  0: 1.0,   // New vehicle
  1: 0.95,  // 1 year old
  2: 0.90,  // 2 years old
  3: 0.85,  // 3 years old
  4: 0.80,  // 4 years old
  5: 0.75   // 5+ years old
};

export class PremiumCalculator {
  private getCapacityRange(capacity: number, vehicleType: 'two-wheeler' | 'four-wheeler'): string {
    if (vehicleType === 'two-wheeler') {
      if (capacity <= 75) return '0-75';
      if (capacity <= 150) return '76-150';
      if (capacity <= 350) return '151-350';
      return '351+';
    } else {
      if (capacity <= 1000) return '0-1000';
      if (capacity <= 1500) return '1001-1500';
      if (capacity <= 2000) return '1501-2000';
      return '2001+';
    }
  }

  private calculateBasePremium(params: PremiumCalculatorParams): number {
    const capacityRange = this.getCapacityRange(params.cubicCapacity, params.vehicleType);
    const baseRate = BASE_PREMIUM_RATES[params.vehicleType][capacityRange];
    
    // Apply vehicle value factor
    const valueMultiplier = Math.min(params.vehicleValue / 100000, 10); // Cap at 10x
    
    // Apply age depreciation
    const currentYear = new Date().getFullYear();
    const vehicleAge = Math.min(currentYear - params.registrationYear, 5);
    const ageMultiplier = AGE_DEPRECIATION[vehicleAge];
    
    // Apply city multiplier
    const cityMultiplier = CITY_MULTIPLIERS[params.city.toLowerCase()] || CITY_MULTIPLIERS.default;
    
    return Math.round(baseRate * valueMultiplier * ageMultiplier * cityMultiplier);
  }

  private calculateThirdPartyPremium(params: PremiumCalculatorParams): number {
    const capacityRange = this.getCapacityRange(params.cubicCapacity, params.vehicleType);
    return THIRD_PARTY_RATES[params.vehicleType][capacityRange];
  }

  private calculatePersonalAccidentPremium(vehicleType: 'two-wheeler' | 'four-wheeler'): number {
    return vehicleType === 'two-wheeler' ? 750 : 1000;
  }

  private calculateAddOnPremiums(basePremium: number, selectedAddOns: string[]): { [key: string]: number } {
    const addOnPremiums: { [key: string]: number } = {};
    
    selectedAddOns.forEach(addOnId => {
      const rate = ADDON_RATES[addOnId];
      if (rate) {
        if (typeof rate === 'number' && rate < 1) {
          // Percentage of base premium
          addOnPremiums[addOnId] = Math.round(basePremium * rate);
        } else {
          // Fixed amount
          addOnPremiums[addOnId] = rate;
        }
      }
    });
    
    return addOnPremiums;
  }

  private calculateDiscounts(
    basePremium: number, 
    params: PremiumCalculatorParams
  ): { ncb: number; loyalty: number; multiPolicy: number; others: number } {
    const ncbDiscount = Math.round(basePremium * (NCB_RATES[params.ncbPercentage] || 0));
    
    // Loyalty discount for existing customers
    const loyaltyDiscount = params.previousInsurer ? Math.round(basePremium * 0.05) : 0;
    
    // Multi-policy discount (placeholder)
    const multiPolicyDiscount = 0;
    
    // Other discounts (placeholder)
    const otherDiscounts = 0;
    
    return {
      ncb: ncbDiscount,
      loyalty: loyaltyDiscount,
      multiPolicy: multiPolicyDiscount,
      others: otherDiscounts
    };
  }

  private calculateClaimsPenalty(claimsHistory: ClaimsHistory[]): number {
    const recentClaims = claimsHistory.filter(claim => {
      const claimDate = new Date(claim.claimDate);
      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
      return claimDate > threeYearsAgo && claim.status === 'approved';
    });
    
    // 10% penalty per claim in last 3 years
    return recentClaims.length * 0.1;
  }

  public calculatePremium(params: PremiumCalculatorParams): PremiumCalculationResult {
    try {
      // Calculate base components
      const ownDamagePremium = this.calculateBasePremium(params);
      const thirdPartyPremium = this.calculateThirdPartyPremium(params);
      const personalAccidentPremium = this.calculatePersonalAccidentPremium(params.vehicleType);
      
      // Calculate add-on premiums
      const addOnPremiums = this.calculateAddOnPremiums(ownDamagePremium, params.selectedAddOns);
      const totalAddOnPremium = Object.values(addOnPremiums).reduce((sum, premium) => sum + premium, 0);
      
      // Calculate discounts
      const discounts = this.calculateDiscounts(ownDamagePremium, params);
      const totalDiscounts = Object.values(discounts).reduce((sum, discount) => sum + discount, 0);
      
      // Apply claims penalty
      const claimsPenalty = this.calculateClaimsPenalty(params.claimsHistory);
      const penaltyAmount = Math.round(ownDamagePremium * claimsPenalty);
      
      // Calculate subtotal
      const subtotal = ownDamagePremium + thirdPartyPremium + personalAccidentPremium + 
                     totalAddOnPremium - totalDiscounts + penaltyAmount;
      
      // Calculate taxes
      const gst = Math.round(subtotal * 0.18); // 18% GST
      const serviceTax = 0; // Service tax is now included in GST
      
      const totalPremium = subtotal + gst + serviceTax;
      
      return {
        basePremium: ownDamagePremium,
        addOnPremiums,
        discounts,
        taxes: {
          gst,
          serviceTax
        },
        totalPremium,
        breakdown: {
          ownDamage: ownDamagePremium,
          thirdParty: thirdPartyPremium,
          personalAccident: personalAccidentPremium,
          addOns: totalAddOnPremium
        }
      };
    } catch (error) {
      console.error('Premium calculation error:', error);
      throw new Error('Failed to calculate premium. Please check input parameters.');
    }
  }

  public getAvailableAddOns(vehicleType: 'two-wheeler' | 'four-wheeler'): AddOnCoverage[] {
    const commonAddOns = [
      {
        id: 'zero-dep',
        name: 'Zero Depreciation',
        description: 'Get claim amount without depreciation deduction',
        premium: 0, // Will be calculated
        isSelected: false,
        isAvailable: true,
        terms: ['Available for vehicles up to 5 years old', 'Maximum 2 claims per policy year']
      },
      {
        id: 'roadside-assistance',
        name: 'Roadside Assistance',
        description: '24x7 roadside assistance for breakdowns',
        premium: 500,
        isSelected: false,
        isAvailable: true,
        terms: ['Available 24x7', 'Covers towing up to 50km']
      },
      {
        id: 'personal-accident-enhanced',
        name: 'Enhanced Personal Accident',
        description: 'Additional personal accident cover',
        premium: 1000,
        sumInsured: 500000,
        isSelected: false,
        isAvailable: true,
        terms: ['Covers driver and passengers', 'Additional ₹5 lakh coverage']
      }
    ];

    const vehicleSpecificAddOns = vehicleType === 'four-wheeler' ? [
      {
        id: 'engine-protect',
        name: 'Engine Protection',
        description: 'Protection against engine damage due to water ingression',
        premium: 0,
        isSelected: false,
        isAvailable: true,
        terms: ['Covers engine damage due to flooding', 'Hydrostatic lock coverage included']
      },
      {
        id: 'key-replacement',
        name: 'Key Replacement',
        description: 'Coverage for lost or stolen keys',
        premium: 300,
        sumInsured: 5000,
        isSelected: false,
        isAvailable: true,
        terms: ['Covers key replacement cost', 'Lock replacement included']
      },
      {
        id: 'tyre-protection',
        name: 'Tyre Protection',
        description: 'Coverage for tyre and rim damage',
        premium: 0,
        isSelected: false,
        isAvailable: true,
        terms: ['Covers tyre puncture and damage', 'Rim damage included']
      },
      {
        id: 'return-to-invoice',
        name: 'Return to Invoice',
        description: 'Get invoice value in case of total loss',
        premium: 0,
        isSelected: false,
        isAvailable: true,
        terms: ['Available for vehicles up to 3 years old', 'Covers difference between IDV and invoice value']
      },
      {
        id: 'consumables',
        name: 'Consumables Cover',
        description: 'Coverage for consumable items during repairs',
        premium: 0,
        isSelected: false,
        isAvailable: true,
        terms: ['Covers engine oil, coolant, brake oil', 'Nuts, bolts, and washers included']
      }
    ] : [
      {
        id: 'tyre-protection',
        name: 'Tyre Protection',
        description: 'Coverage for tyre damage',
        premium: 0,
        isSelected: false,
        isAvailable: true,
        terms: ['Covers tyre puncture and damage', 'Tube replacement included']
      }
    ];

    return [...commonAddOns, ...vehicleSpecificAddOns];
  }
}

export const premiumCalculator = new PremiumCalculator();