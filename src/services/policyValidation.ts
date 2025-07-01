import { InsurancePolicy, ValidationRule } from '../types/insurance';

export class PolicyValidationService {
  private static validationRules: Record<string, ValidationRule[]> = {
    'two-wheeler': [
      { field: 'vehicle.registrationNumber', rule: 'required', message: 'Registration number is required' },
      { field: 'vehicle.engineNumber', rule: 'required', message: 'Engine number is required' },
      { field: 'vehicle.chassisNumber', rule: 'required', message: 'Chassis number is required' },
      { field: 'vehicle.cubic_capacity', rule: 'custom', message: 'CC must be between 50-1200 for two-wheelers', 
        customValidator: (value: number) => value >= 50 && value <= 1200 },
      { field: 'customer.contact.email', rule: 'email', message: 'Valid email is required' },
      { field: 'customer.contact.phone', rule: 'phone', message: 'Valid phone number is required' },
      { field: 'customer.contact.address.pincode', rule: 'pincode', message: 'Valid pincode is required' }
    ],
    'motor': [
      { field: 'vehicle.registrationNumber', rule: 'required', message: 'Registration number is required' },
      { field: 'vehicle.engineNumber', rule: 'required', message: 'Engine number is required' },
      { field: 'vehicle.chassisNumber', rule: 'required', message: 'Chassis number is required' },
      { field: 'vehicle.cubic_capacity', rule: 'custom', message: 'CC must be between 800-5000 for motor vehicles', 
        customValidator: (value: number) => value >= 800 && value <= 5000 },
      { field: 'vehicle.seatingCapacity', rule: 'custom', message: 'Seating capacity must be between 2-8', 
        customValidator: (value: number) => value >= 2 && value <= 8 },
      { field: 'customer.contact.email', rule: 'email', message: 'Valid email is required' },
      { field: 'customer.contact.phone', rule: 'phone', message: 'Valid phone number is required' },
      { field: 'customer.contact.address.pincode', rule: 'pincode', message: 'Valid pincode is required' }
    ]
  };

  static validatePolicy(policy: Partial<InsurancePolicy>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const rules = this.validationRules[policy.insuranceType || 'motor'];

    for (const rule of rules) {
      const value = this.getNestedValue(policy, rule.field);
      
      if (!this.validateField(value, rule)) {
        errors.push(rule.message);
      }
    }

    // Additional business logic validations
    if (policy.coverage?.startDate && policy.coverage?.endDate) {
      if (new Date(policy.coverage.startDate) >= new Date(policy.coverage.endDate)) {
        errors.push('Coverage start date must be before end date');
      }
    }

    if (policy.customer?.nominees) {
      const totalShare = policy.customer.nominees.reduce((sum, nominee) => sum + nominee.share, 0);
      if (totalShare !== 100) {
        errors.push('Nominee shares must total 100%');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateField(value: any, rule: ValidationRule): boolean {
    switch (rule.rule) {
      case 'required':
        return value !== undefined && value !== null && value !== '';
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      
      case 'phone':
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(value?.toString().replace(/\D/g, ''));
      
      case 'pincode':
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        return pincodeRegex.test(value?.toString());
      
      case 'custom':
        return rule.customValidator ? rule.customValidator(value) : true;
      
      default:
        return true;
    }
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  static validateRegistrationNumber(regNumber: string, vehicleType: 'two-wheeler' | 'motor'): boolean {
    // Indian vehicle registration number format: XX##XX####
    const regexPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
    return regexPattern.test(regNumber.replace(/\s/g, '').toUpperCase());
  }

  static validateEngineNumber(engineNumber: string): boolean {
    // Engine number should be alphanumeric, 8-17 characters
    const engineRegex = /^[A-Z0-9]{8,17}$/;
    return engineRegex.test(engineNumber.replace(/\s/g, '').toUpperCase());
  }

  static validateChassisNumber(chassisNumber: string): boolean {
    // Chassis number should be alphanumeric, 17 characters (VIN format)
    const chassisRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return chassisRegex.test(chassisNumber.replace(/\s/g, '').toUpperCase());
  }
}