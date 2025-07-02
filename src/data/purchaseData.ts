import { PolicyType, Provider } from '../types/purchase';

export const policyTypes: Record<string, PolicyType> = {
  'health-insurance': {
    id: 'health-insurance',
    name: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family',
    icon: 'Heart',
    baseFields: [
      {
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        id: 'age',
        name: 'age',
        type: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        required: true,
        validation: { min: 18, max: 80, message: 'Age must be between 18 and 80' }
      },
      {
        id: 'medicalHistory',
        name: 'medicalHistory',
        type: 'checkbox',
        label: 'Medical History',
        required: false,
        options: [
          { value: 'diabetes', label: 'Diabetes' },
          { value: 'hypertension', label: 'Hypertension' },
          { value: 'heart_disease', label: 'Heart Disease' },
          { value: 'asthma', label: 'Asthma' },
          { value: 'none', label: 'None of the above' }
        ]
      }
    ]
  },
  'life-insurance': {
    id: 'life-insurance',
    name: 'Life Insurance',
    description: 'Financial security for your loved ones',
    icon: 'Shield',
    baseFields: [
      {
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        id: 'age',
        name: 'age',
        type: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        required: true,
        validation: { min: 18, max: 65, message: 'Age must be between 18 and 65' }
      },
      {
        id: 'annualIncome',
        name: 'annualIncome',
        type: 'select',
        label: 'Annual Income',
        required: true,
        options: [
          { value: '0-3', label: 'Up to ₹3 Lakhs' },
          { value: '3-5', label: '₹3-5 Lakhs' },
          { value: '5-10', label: '₹5-10 Lakhs' },
          { value: '10+', label: 'Above ₹10 Lakhs' }
        ]
      }
    ]
  },
  'two-wheeler-insurance': {
    id: 'two-wheeler-insurance',
    name: 'Two Wheeler Insurance',
    description: 'Complete protection for your bike or scooter',
    icon: 'Bike',
    baseFields: [
      {
        id: 'vehicleRegistrationNumber',
        name: 'vehicleRegistrationNumber',
        type: 'text',
        label: 'Vehicle Registration Number',
        placeholder: 'e.g., MH01AB1234',
        required: true,
        validation: { pattern: '^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$', message: 'Invalid registration format' }
      },
      {
        id: 'manufacturingYear',
        name: 'manufacturingYear',
        type: 'number',
        label: 'Manufacturing Year',
        placeholder: 'Enter manufacturing year',
        required: true,
        validation: { min: 2000, max: new Date().getFullYear(), message: 'Invalid year' }
      },
      {
        id: 'previousClaims',
        name: 'previousClaims',
        type: 'radio',
        label: 'Previous Claims History',
        required: true,
        options: [
          { value: 'none', label: 'No previous claims' },
          { value: '1-2', label: '1-2 claims in last 3 years' },
          { value: '3+', label: '3+ claims in last 3 years' }
        ]
      }
    ]
  },
  'motor-insurance': {
    id: 'motor-insurance',
    name: 'Motor Insurance',
    description: 'Comprehensive coverage for your car',
    icon: 'Car',
    baseFields: [
      {
        id: 'vehicleRegistrationNumber',
        name: 'vehicleRegistrationNumber',
        type: 'text',
        label: 'Vehicle Registration Number',
        placeholder: 'e.g., MH01AB1234',
        required: true,
        validation: { pattern: '^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$', message: 'Invalid registration format' }
      },
      {
        id: 'manufacturingYear',
        name: 'manufacturingYear',
        type: 'number',
        label: 'Manufacturing Year',
        placeholder: 'Enter manufacturing year',
        required: true,
        validation: { min: 2000, max: new Date().getFullYear(), message: 'Invalid year' }
      },
      {
        id: 'vehicleType',
        name: 'vehicleType',
        type: 'select',
        label: 'Vehicle Type',
        required: true,
        options: [
          { value: 'hatchback', label: 'Hatchback' },
          { value: 'sedan', label: 'Sedan' },
          { value: 'suv', label: 'SUV' },
          { value: 'luxury', label: 'Luxury Car' }
        ]
      },
      {
        id: 'previousClaims',
        name: 'previousClaims',
        type: 'radio',
        label: 'Previous Claims History',
        required: true,
        options: [
          { value: 'none', label: 'No previous claims' },
          { value: '1-2', label: '1-2 claims in last 3 years' },
          { value: '3+', label: '3+ claims in last 3 years' }
        ]
      }
    ]
  }
};

export const mockProviders: Provider[] = [
  {
    id: 'star-health',
    name: 'Star Health Insurance',
    logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 4.5,
    basePremium: 12000,
    keyBenefits: [
      'Cashless treatment at 9000+ hospitals',
      'Pre and post hospitalization coverage',
      'No room rent capping',
      'Free annual health checkup'
    ],
    description: 'Leading health insurance provider with comprehensive coverage',
    features: {
      cashlessHospitals: 9000,
      claimSettlementRatio: 85,
      networkSize: 'Pan India',
      customerSupport: '24x7'
    },
    addOns: [
      {
        id: 'critical-illness',
        name: 'Critical Illness Cover',
        description: 'Additional coverage for critical illnesses',
        premium: 2500,
        isSelected: false,
        isRecommended: true
      },
      {
        id: 'maternity',
        name: 'Maternity Cover',
        description: 'Coverage for maternity expenses',
        premium: 3000,
        isSelected: false
      }
    ],
    termsAndConditions: [
      'Policy is valid for 1 year from the date of issuance',
      'Pre-existing diseases covered after 2 years',
      'Waiting period of 30 days for most illnesses'
    ]
  },
  {
    id: 'hdfc-ergo',
    name: 'HDFC ERGO',
    logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 4.3,
    basePremium: 11500,
    keyBenefits: [
      'Cashless treatment at 8500+ hospitals',
      'Wellness benefits included',
      'Quick claim settlement',
      'Online policy management'
    ],
    description: 'Trusted insurance partner with innovative solutions',
    features: {
      cashlessHospitals: 8500,
      claimSettlementRatio: 82,
      networkSize: 'Pan India',
      customerSupport: '24x7'
    },
    addOns: [
      {
        id: 'wellness',
        name: 'Wellness Program',
        description: 'Preventive health checkups and wellness benefits',
        premium: 1500,
        isSelected: false,
        isRecommended: true
      },
      {
        id: 'ambulance',
        name: 'Ambulance Cover',
        description: 'Emergency ambulance services',
        premium: 800,
        isSelected: false
      }
    ],
    termsAndConditions: [
      'Policy is valid for 1 year from the date of issuance',
      'Pre-existing diseases covered after 3 years',
      'Waiting period of 30 days for most illnesses'
    ]
  },
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard',
    logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    rating: 4.4,
    basePremium: 13200,
    keyBenefits: [
      'Cashless treatment at 7500+ hospitals',
      'Global coverage available',
      'Instant policy issuance',
      'Mobile app for easy claims'
    ],
    description: 'Premium insurance solutions with global reach',
    features: {
      cashlessHospitals: 7500,
      claimSettlementRatio: 88,
      networkSize: 'Global',
      customerSupport: '24x7'
    },
    addOns: [
      {
        id: 'international',
        name: 'International Coverage',
        description: 'Coverage for treatment abroad',
        premium: 4000,
        isSelected: false,
        isRecommended: false
      },
      {
        id: 'dental',
        name: 'Dental Care',
        description: 'Dental treatment coverage',
        premium: 1200,
        isSelected: false
      }
    ],
    termsAndConditions: [
      'Policy is valid for 1 year from the date of issuance',
      'Pre-existing diseases covered after 2 years',
      'Waiting period of 30 days for most illnesses'
    ]
  }
];