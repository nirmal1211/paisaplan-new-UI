import { VehicleDashboardData, VehiclePhoto, SafetyFeature, VehicleModification, AuthorizedDriver, ClaimDetail, PolicyDocument, PaymentRecord, Endorsement, CoverageLimit, TerritoryRestriction, EmergencyContact } from '../types/vehicleDashboard';

export const mockVehicleDashboardData: VehicleDashboardData = {
  policy: null, // Will be populated from existing policy data
  
  vehiclePhotos: [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      type: 'front',
      caption: 'Front view of vehicle',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      type: 'back',
      caption: 'Rear view of vehicle',
      uploadDate: '2024-01-15'
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      type: 'interior',
      caption: 'Interior dashboard view',
      uploadDate: '2024-01-15'
    }
  ],

  safetyFeatures: [
    {
      id: '1',
      name: 'Anti-lock Braking System (ABS)',
      category: 'active',
      premiumImpact: -5,
      description: 'Prevents wheel lockup during emergency braking'
    },
    {
      id: '2',
      name: 'Airbags (Driver & Passenger)',
      category: 'passive',
      premiumImpact: -8,
      description: 'Dual front airbags for occupant protection'
    },
    {
      id: '3',
      name: 'Electronic Stability Control',
      category: 'active',
      premiumImpact: -3,
      description: 'Helps maintain vehicle stability during cornering'
    },
    {
      id: '4',
      name: 'Reinforced Steel Frame',
      category: 'structural',
      premiumImpact: -2,
      description: 'High-strength steel construction for crash protection'
    }
  ],

  modifications: [
    {
      id: '1',
      type: 'Audio System',
      description: 'Premium sound system with subwoofer',
      value: 25000,
      approvalRequired: false,
      approvalStatus: 'not_required',
      installationDate: '2024-02-10'
    },
    {
      id: '2',
      type: 'Alloy Wheels',
      description: '17-inch custom alloy wheels',
      value: 40000,
      approvalRequired: true,
      approvalStatus: 'approved',
      installationDate: '2024-03-05'
    }
  ],

  authorizedDrivers: [
    {
      id: '1',
      name: 'John Doe',
      licenseNumber: 'MH01-20230001234',
      licenseExpiryDate: '2028-06-15',
      dateOfBirth: '1985-06-15',
      relationship: 'Primary',
      riskRating: 'low',
      premiumImpact: 0,
      drivingHistory: [
        {
          id: '1',
          type: 'violation',
          date: '2023-08-15',
          description: 'Speed limit violation',
          severity: 'minor',
          penaltyPoints: 2,
          fineAmount: 500,
          impactOnPremium: 200
        }
      ],
      restrictions: [],
      trainingCertificates: [
        {
          id: '1',
          name: 'Defensive Driving Course',
          issuingAuthority: 'Road Safety Institute',
          issueDate: '2023-01-15',
          expiryDate: '2026-01-15',
          discountPercentage: 5
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Doe',
      licenseNumber: 'MH01-20220005678',
      licenseExpiryDate: '2027-03-20',
      dateOfBirth: '1988-03-20',
      relationship: 'Spouse',
      riskRating: 'low',
      premiumImpact: 150,
      drivingHistory: [],
      restrictions: ['No night driving'],
      trainingCertificates: []
    }
  ],

  claimsHistory: [
    {
      id: '1',
      claimNumber: 'CLM2024001',
      incidentDate: '2024-03-15',
      incidentLocation: {
        address: 'Mumbai-Pune Highway, Near Lonavala',
        coordinates: { lat: 18.7537, lng: 73.4135 }
      },
      damageType: ['Front bumper damage', 'Headlight replacement'],
      severity: 'moderate',
      requestedAmount: 45000,
      settledAmount: 42000,
      status: 'settled',
      documents: [
        {
          id: '1',
          name: 'Repair Estimate',
          type: 'estimate',
          url: '/documents/estimate-001.pdf',
          uploadDate: '2024-03-16',
          size: '2.1 MB'
        },
        {
          id: '2',
          name: 'Final Invoice',
          type: 'invoice',
          url: '/documents/invoice-001.pdf',
          uploadDate: '2024-03-25',
          size: '1.8 MB'
        }
      ],
      photos: [
        {
          id: '1',
          url: 'https://images.pexels.com/photos/4315554/pexels-photo-4315554.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          type: 'damage',
          caption: 'Front bumper damage',
          uploadDate: '2024-03-15'
        }
      ],
      adjusterDetails: {
        name: 'Rajesh Kumar',
        phone: '+91-9876543210',
        email: 'rajesh.kumar@insurance.com'
      },
      repairShop: {
        name: 'Premium Auto Repairs',
        address: 'Shop No. 15, Auto Hub, Mumbai',
        phone: '+91-9876543211'
      },
      futureImpact: {
        premiumIncrease: 1500,
        ncbLoss: 0
      }
    },
    {
      id: '2',
      claimNumber: 'CLM2023002',
      incidentDate: '2023-11-08',
      incidentLocation: {
        address: 'Bandra West, Mumbai'
      },
      damageType: ['Side mirror replacement', 'Door panel scratch'],
      severity: 'minor',
      requestedAmount: 8500,
      settledAmount: 8000,
      status: 'settled',
      documents: [],
      photos: [],
      futureImpact: {
        premiumIncrease: 500,
        ncbLoss: 5
      }
    }
  ],

  documents: [
    {
      id: '1',
      name: 'Policy Certificate',
      type: 'policy',
      version: '1.0',
      url: '/documents/policy-certificate.pdf',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      isLatest: true
    },
    {
      id: '2',
      name: 'Premium Receipt',
      type: 'receipt',
      version: '1.0',
      url: '/documents/premium-receipt.pdf',
      uploadDate: '2024-01-15',
      size: '1.2 MB',
      isLatest: true
    },
    {
      id: '3',
      name: 'Vehicle Inspection Report',
      type: 'inspection',
      version: '1.0',
      url: '/documents/inspection-report.pdf',
      uploadDate: '2024-01-10',
      size: '3.1 MB',
      isLatest: true
    },
    {
      id: '4',
      name: 'Policy Amendment Notice',
      type: 'correspondence',
      version: '1.0',
      url: '/documents/amendment-notice.pdf',
      uploadDate: '2024-02-20',
      size: '0.8 MB',
      isLatest: true
    }
  ],

  paymentHistory: [
    {
      id: '1',
      amount: 16048,
      date: '2024-01-15',
      method: 'credit_card',
      status: 'paid',
      receiptNumber: 'RCP2024001',
      description: 'Annual premium payment'
    },
    {
      id: '2',
      amount: 2500,
      date: '2024-02-20',
      method: 'net_banking',
      status: 'paid',
      receiptNumber: 'RCP2024002',
      description: 'Endorsement premium for modifications'
    }
  ],

  endorsements: [
    {
      id: '1',
      type: 'Vehicle Modification',
      description: 'Addition of custom alloy wheels',
      effectiveDate: '2024-03-05',
      premium: 2500,
      status: 'active',
      documents: ['/documents/endorsement-001.pdf']
    },
    {
      id: '2',
      type: 'Additional Driver',
      description: 'Added spouse as authorized driver',
      effectiveDate: '2024-02-01',
      premium: 1800,
      status: 'active',
      documents: ['/documents/endorsement-002.pdf']
    }
  ],

  coverageLimits: [
    {
      type: 'Own Damage',
      limit: 650000,
      deductible: 5000,
      explanation: 'Covers damage to your vehicle due to accidents, theft, fire, and natural calamities',
      exclusions: [
        'Damage due to war or nuclear risks',
        'Damage while driving under influence',
        'Consequential losses',
        'Mechanical or electrical breakdown'
      ],
      conditions: [
        'Valid driving license required',
        'Vehicle must be in roadworthy condition',
        'Immediate reporting of claims required'
      ]
    },
    {
      type: 'Third Party Liability',
      limit: 1575000,
      deductible: 0,
      explanation: 'Covers legal liability for injury/death to third parties and damage to third party property',
      exclusions: [
        'Liability to employees under Workmen Compensation Act',
        'Contractual liability',
        'Damage to property belonging to or held in trust'
      ],
      conditions: [
        'Mandatory as per Motor Vehicles Act',
        'Unlimited coverage for bodily injury',
        'Property damage limited to ₹7.5 lakhs'
      ]
    }
  ],

  territoryRestrictions: [
    {
      type: 'geographical',
      description: 'Coverage Area',
      details: [
        'Valid throughout India',
        'Excludes areas under military operations',
        'Special permits required for certain border areas'
      ]
    },
    {
      type: 'usage',
      description: 'Vehicle Usage',
      details: [
        'Private car for personal use only',
        'No commercial or taxi usage allowed',
        'Ride-sharing requires separate coverage'
      ]
    }
  ],

  emergencyContacts: [
    {
      type: 'claims',
      name: 'Claims Helpline',
      phone: '1800-123-4567',
      email: 'claims@trovity.com',
      available24x7: true
    },
    {
      type: 'roadside',
      name: 'Roadside Assistance',
      phone: '1800-987-6543',
      available24x7: true
    },
    {
      type: 'customer_service',
      name: 'Customer Service',
      phone: '1800-555-0123',
      email: 'support@trovity.com',
      available24x7: false
    },
    {
      type: 'agent',
      name: 'Rajesh Kumar (Agent)',
      phone: '+91-9876543210',
      email: 'rajesh.kumar@trovity.com',
      available24x7: false
    }
  ]
};