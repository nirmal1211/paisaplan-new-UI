import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Car, 
  Bike, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Calculator, 
  Download, 
  Share2, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Play,
  Users,
  Clock,
  Award,
  TrendingUp,
  FileText,
  Info,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';

interface PolicyType {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  keyBenefits: string[];
  whyChoose: string[];
  coverageDetails: {
    covered: string[];
    notCovered: string[];
    limits: string[];
  };
  features: {
    waitingPeriods: string[];
    claimProcess: string[];
    networkBenefits: string[];
  };
  faqs: { question: string; answer: string; }[];
  testimonials: { name: string; rating: number; comment: string; avatar: string; }[];
}

interface FormData {
  mobile: string;
  fullName: string;
  email: string;
  // Health specific
  age?: number;
  preExistingConditions?: string[];
  dependents?: { name: string; age: number; relationship: string; }[];
  // Motor specific
  vehicleRegNumber?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  manufacturingYear?: number;
  claimsHistory?: { count: number; lastClaimDate?: string; amount?: number; };
  // Life specific
  occupation?: string;
  annualIncome?: number;
  smokingHabits?: string;
  coverageAmount?: number;
}

const BuyPolicyPage: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    mobile: '',
    fullName: '',
    email: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState<string[]>(['benefits']);
  const [activeInfoSection, setActiveInfoSection] = useState('overview');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const policyTypes: Record<string, PolicyType> = {
    health: {
      id: 'health',
      name: 'Health Insurance',
      icon: Heart,
      description: 'Comprehensive health coverage for you and your family with cashless treatment at 9000+ network hospitals.',
      keyBenefits: [
        'Cashless treatment at network hospitals',
        'Pre & post hospitalization coverage',
        'Annual health checkups included',
        'No claim bonus up to 50%'
      ],
      whyChoose: [
        'Rising medical costs protection',
        'Tax benefits under Section 80D',
        'Peace of mind for family health',
        'Wide network of hospitals'
      ],
      coverageDetails: {
        covered: [
          'Hospitalization expenses',
          'Pre & post hospitalization (30-60 days)',
          'Day care procedures',
          'Ambulance charges',
          'Room rent & nursing expenses',
          'ICU charges',
          'Surgeon & anesthetist fees',
          'Medical tests & diagnostics'
        ],
        notCovered: [
          'Pre-existing diseases (first 2-4 years)',
          'Cosmetic surgery',
          'Dental treatment (unless accidental)',
          'Pregnancy expenses (first 2 years)',
          'Self-inflicted injuries',
          'War & nuclear risks',
          'Drug & alcohol abuse',
          'Experimental treatments'
        ],
        limits: [
          'Room rent: Up to 1% of sum insured per day',
          'Ambulance: Up to ₹2,000 per claim',
          'Pre-existing waiting period: 2-4 years',
          'Maternity waiting period: 2 years'
        ]
      },
      features: {
        waitingPeriods: [
          'Initial waiting period: 30 days',
          'Pre-existing diseases: 2-4 years',
          'Specific diseases: 1-2 years',
          'Maternity: 2 years'
        ],
        claimProcess: [
          'Cashless: Pre-authorization at network hospitals',
          'Reimbursement: Submit documents within 30 days',
          'Online claim tracking available',
          'Average settlement time: 7-10 days'
        ],
        networkBenefits: [
          '9000+ network hospitals across India',
          'Cashless treatment facility',
          'Direct billing with hospitals',
          'Quality healthcare providers'
        ]
      },
      faqs: [
        {
          question: 'What is the waiting period for pre-existing diseases?',
          answer: 'Pre-existing diseases have a waiting period of 2-4 years depending on the policy and insurer.'
        },
        {
          question: 'Can I add my parents to the policy?',
          answer: 'Yes, you can add your parents as dependents. Premium will be calculated based on their age and health conditions.'
        },
        {
          question: 'What documents are required for claims?',
          answer: 'Hospital bills, discharge summary, diagnostic reports, and policy documents are typically required.'
        }
      ],
      testimonials: [
        {
          name: 'Priya Sharma',
          rating: 5,
          comment: 'Excellent coverage and quick claim settlement. Very satisfied with the service.',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        },
        {
          name: 'Rajesh Kumar',
          rating: 5,
          comment: 'Cashless treatment worked seamlessly. Highly recommend this policy.',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        }
      ]
    },
    motor: {
      id: 'motor',
      name: 'Motor Insurance',
      icon: Car,
      description: 'Comprehensive car insurance with own damage cover, third-party liability, and personal accident protection.',
      keyBenefits: [
        'Own damage & third-party coverage',
        'Personal accident cover included',
        'Roadside assistance 24x7',
        'No claim bonus up to 50%'
      ],
      whyChoose: [
        'Legal compliance requirement',
        'Financial protection against damages',
        'Peace of mind while driving',
        'Comprehensive coverage options'
      ],
      coverageDetails: {
        covered: [
          'Own damage due to accidents',
          'Theft and burglary',
          'Fire and explosion',
          'Natural calamities',
          'Third-party liability',
          'Personal accident cover',
          'Vandalism and malicious acts',
          'Riots and strikes'
        ],
        notCovered: [
          'Normal wear and tear',
          'Mechanical breakdown',
          'Driving under influence',
          'Using vehicle for commercial purposes',
          'War and nuclear risks',
          'Consequential losses',
          'Damage to tyres and tubes',
          'Electrical/electronic accessories'
        ],
        limits: [
          'IDV: Insured Declared Value of vehicle',
          'Third-party: Unlimited for bodily injury',
          'Property damage: Up to ₹7.5 lakhs',
          'Personal accident: ₹15 lakhs'
        ]
      },
      features: {
        waitingPeriods: [
          'No waiting period for accidental damages',
          'Policy effective immediately after payment',
          'Claims can be filed anytime during policy period'
        ],
        claimProcess: [
          'Intimate insurer within 24 hours',
          'File FIR for theft cases',
          'Get vehicle inspected',
          'Submit required documents'
        ],
        networkBenefits: [
          '4500+ authorized garages',
          'Cashless repair facility',
          'Quality spare parts guarantee',
          'Direct settlement with garages'
        ]
      },
      faqs: [
        {
          question: 'What is IDV and how is it calculated?',
          answer: 'IDV (Insured Declared Value) is the maximum amount you can claim for total loss. It\'s calculated based on manufacturer\'s selling price minus depreciation.'
        },
        {
          question: 'Can I transfer my NCB to a new vehicle?',
          answer: 'Yes, No Claim Bonus can be transferred to a new vehicle within 90 days of policy expiry.'
        }
      ],
      testimonials: [
        {
          name: 'Amit Patel',
          rating: 5,
          comment: 'Quick claim settlement and excellent garage network. Very professional service.',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        }
      ]
    },
    'two-wheeler': {
      id: 'two-wheeler',
      name: 'Two Wheeler Insurance',
      icon: Bike,
      description: 'Affordable two-wheeler insurance with comprehensive coverage for your bike or scooter.',
      keyBenefits: [
        'Comprehensive damage coverage',
        'Third-party liability protection',
        'Personal accident cover',
        'Affordable premiums'
      ],
      whyChoose: [
        'Mandatory by law',
        'Protection against theft',
        'Accident coverage',
        'Easy claim process'
      ],
      coverageDetails: {
        covered: [
          'Own damage coverage',
          'Theft protection',
          'Third-party liability',
          'Personal accident',
          'Fire and explosion',
          'Natural calamities'
        ],
        notCovered: [
          'Normal wear and tear',
          'Mechanical breakdown',
          'Driving without license',
          'Commercial use',
          'War risks'
        ],
        limits: [
          'IDV: Based on vehicle value',
          'Third-party: As per Motor Tariff',
          'Personal accident: ₹1 lakh'
        ]
      },
      features: {
        waitingPeriods: ['No waiting period'],
        claimProcess: [
          'Immediate claim intimation',
          'Quick documentation',
          'Fast settlement'
        ],
        networkBenefits: [
          '3000+ authorized service centers',
          'Genuine spare parts',
          'Quality repairs'
        ]
      },
      faqs: [
        {
          question: 'Is personal accident cover mandatory?',
          answer: 'Yes, personal accident cover for owner-driver is mandatory as per Motor Vehicles Act.'
        }
      ],
      testimonials: [
        {
          name: 'Sneha Reddy',
          rating: 4,
          comment: 'Good coverage at reasonable premium. Claim process was smooth.',
          avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        }
      ]
    },
    life: {
      id: 'life',
      name: 'Life Insurance',
      icon: Shield,
      description: 'Term life insurance providing financial security for your family with high coverage at low premiums.',
      keyBenefits: [
        'High coverage at low premium',
        'Tax benefits under Section 80C',
        'Financial security for family',
        'Flexible premium payment options'
      ],
      whyChoose: [
        'Family financial protection',
        'Debt coverage',
        'Income replacement',
        'Tax saving benefits'
      ],
      coverageDetails: {
        covered: [
          'Death benefit',
          'Accidental death benefit',
          'Terminal illness benefit',
          'Permanent disability benefit'
        ],
        notCovered: [
          'Suicide within first year',
          'Death due to war',
          'Self-inflicted injuries',
          'Death while committing crime'
        ],
        limits: [
          'Maximum age at entry: 65 years',
          'Maximum coverage: Up to ₹10 crores',
          'Policy term: Up to age 80'
        ]
      },
      features: {
        waitingPeriods: [
          'Suicide: 12 months',
          'No waiting for accidental death'
        ],
        claimProcess: [
          'Claim intimation',
          'Document submission',
          'Verification process',
          'Claim settlement'
        ],
        networkBenefits: [
          'Online policy management',
          'Multiple premium payment options',
          'Quick claim settlement'
        ]
      },
      faqs: [
        {
          question: 'How much life insurance do I need?',
          answer: 'Generally, 10-15 times your annual income is recommended to ensure adequate family protection.'
        }
      ],
      testimonials: [
        {
          name: 'Vikram Singh',
          rating: 5,
          comment: 'Excellent term plan with comprehensive coverage. Peace of mind for my family.',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        }
      ]
    }
  };

  const currentPolicy = policyTypes[policyType || 'health'];

  useEffect(() => {
    if (!currentPolicy) {
      navigate('/policies');
    }
  }, [policyType, currentPolicy, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.fullName)) {
      newErrors.fullName = 'Name should contain only letters and be 2-50 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Policy-specific validation
    if (policyType === 'health' && currentStep === 2) {
      if (!formData.age) {
        newErrors.age = 'Age is required';
      }
    }

    if ((policyType === 'motor' || policyType === 'two-wheeler') && currentStep === 2) {
      if (!formData.vehicleRegNumber) {
        newErrors.vehicleRegNumber = 'Vehicle registration number is required';
      }
      if (!formData.vehicleMake) {
        newErrors.vehicleMake = 'Vehicle make is required';
      }
    }

    if (policyType === 'life' && currentStep === 2) {
      if (!formData.occupation) {
        newErrors.occupation = 'Occupation is required';
      }
      if (!formData.annualIncome) {
        newErrors.annualIncome = 'Annual income is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      if (currentStep === 1) {
        setCurrentStep(2);
      } else {
        // Navigate to provider selection
        navigate(`/buy-policy/${policyType}/providers`, { state: { formData } });
      }
    }
  };

  const renderBasicForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
        Basic Information
      </h3>
      
      <div>
        <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
          Mobile Number *
        </label>
        <input
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          placeholder="+91-XXXXXXXXXX"
          className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: errors.mobile ? '#ef4444' : 'var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            '--tw-ring-color': 'var(--color-primary)'
          }}
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1 font-roboto">{errors.mobile}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
          Full Name *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: errors.fullName ? '#ef4444' : 'var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            '--tw-ring-color': 'var(--color-primary)'
          }}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1 font-roboto">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: errors.email ? '#ef4444' : 'var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            '--tw-ring-color': 'var(--color-primary)'
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 font-roboto">{errors.email}</p>
        )}
      </div>
    </div>
  );

  const renderPolicySpecificForm = () => {
    switch (policyType) {
      case 'health':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Health Insurance Details
            </h3>
            
            <div>
              <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                Age *
              </label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                placeholder="Enter your age"
                min="18"
                max="80"
                className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: errors.age ? '#ef4444' : 'var(--color-border)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1 font-roboto">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                Pre-existing Health Conditions
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'None'].map(condition => (
                  <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preExistingConditions?.includes(condition) || false}
                      onChange={(e) => {
                        const conditions = formData.preExistingConditions || [];
                        if (e.target.checked) {
                          handleInputChange('preExistingConditions', [...conditions, condition]);
                        } else {
                          handleInputChange('preExistingConditions', conditions.filter(c => c !== condition));
                        }
                      }}
                      className="rounded"
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {condition}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'motor':
      case 'two-wheeler':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Vehicle Details
            </h3>
            
            <div>
              <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                Vehicle Registration Number *
              </label>
              <input
                type="text"
                value={formData.vehicleRegNumber || ''}
                onChange={(e) => handleInputChange('vehicleRegNumber', e.target.value.toUpperCase())}
                placeholder="MH01AB1234"
                className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: errors.vehicleRegNumber ? '#ef4444' : 'var(--color-border)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              />
              {errors.vehicleRegNumber && (
                <p className="text-red-500 text-sm mt-1 font-roboto">{errors.vehicleRegNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Vehicle Make *
                </label>
                <select
                  value={formData.vehicleMake || ''}
                  onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: errors.vehicleMake ? '#ef4444' : 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="">Select Make</option>
                  {policyType === 'motor' ? 
                    ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota'].map(make => (
                      <option key={make} value={make}>{make}</option>
                    )) :
                    ['Honda', 'Hero', 'Bajaj', 'TVS', 'Yamaha', 'Royal Enfield'].map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))
                  }
                </select>
                {errors.vehicleMake && (
                  <p className="text-red-500 text-sm mt-1 font-roboto">{errors.vehicleMake}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Manufacturing Year
                </label>
                <select
                  value={formData.manufacturingYear || ''}
                  onChange={(e) => handleInputChange('manufacturingYear', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 'life':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Life Insurance Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Occupation *
                </label>
                <select
                  value={formData.occupation || ''}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: errors.occupation ? '#ef4444' : 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="">Select Occupation</option>
                  {['Salaried', 'Business', 'Professional', 'Self-employed', 'Retired'].map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
                {errors.occupation && (
                  <p className="text-red-500 text-sm mt-1 font-roboto">{errors.occupation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Annual Income *
                </label>
                <select
                  value={formData.annualIncome || ''}
                  onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: errors.annualIncome ? '#ef4444' : 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="">Select Income</option>
                  <option value={300000}>₹3-5 Lakhs</option>
                  <option value={500000}>₹5-10 Lakhs</option>
                  <option value={1000000}>₹10-20 Lakhs</option>
                  <option value={2000000}>₹20+ Lakhs</option>
                </select>
                {errors.annualIncome && (
                  <p className="text-red-500 text-sm mt-1 font-roboto">{errors.annualIncome}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                Smoking/Tobacco Habits
              </label>
              <div className="flex space-x-4">
                {['Non-smoker', 'Occasional smoker', 'Regular smoker'].map(habit => (
                  <label key={habit} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="smokingHabits"
                      value={habit}
                      checked={formData.smokingHabits === habit}
                      onChange={(e) => handleInputChange('smokingHabits', e.target.value)}
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {habit}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderInfoPanel = () => (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <currentPolicy.icon className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {currentPolicy.name}
            </h2>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              {currentPolicy.description}
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="space-y-2">
          {currentPolicy.keyBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 bg-white border-b p-4" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex space-x-2 overflow-x-auto">
          {['overview', 'coverage', 'features', 'faqs', 'testimonials'].map(section => (
            <button
              key={section}
              onClick={() => setActiveInfoSection(section)}
              className={`px-3 py-2 rounded-lg font-medium font-roboto whitespace-nowrap transition-all ${
                activeInfoSection === section ? 'shadow-sm' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeInfoSection === section ? 'var(--color-card)' : 'transparent',
                color: activeInfoSection === section ? 'var(--color-primary)' : 'var(--color-muted)',
                border: activeInfoSection === section ? `1px solid var(--color-border)` : '1px solid transparent'
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 space-y-8">
        {activeInfoSection === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold font-poppins mb-3" style={{ color: 'var(--color-foreground)' }}>
                Why Choose This Policy?
              </h3>
              <div className="space-y-2">
                {currentPolicy.whyChoose.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Premium Calculator
                </h4>
              </div>
              <p className="text-sm font-roboto mb-3" style={{ color: 'var(--color-muted)' }}>
                Get an instant premium estimate based on your details
              </p>
              <button className="w-full py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                Calculate Premium
              </button>
            </div>
          </div>
        )}

        {activeInfoSection === 'coverage' && (
          <div className="space-y-6">
            {/* What's Covered */}
            <div>
              <button
                onClick={() => toggleSection('covered')}
                className="flex items-center justify-between w-full p-4 rounded-lg transition-all"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    What's Covered
                  </h3>
                </div>
                {expandedSections.includes('covered') ? 
                  <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} /> :
                  <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                }
              </button>
              {expandedSections.includes('covered') && (
                <div className="mt-3 space-y-2 pl-4">
                  {currentPolicy.coverageDetails.covered.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What's Not Covered */}
            <div>
              <button
                onClick={() => toggleSection('notCovered')}
                className="flex items-center justify-between w-full p-4 rounded-lg transition-all"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <div className="flex items-center space-x-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    What's Not Covered
                  </h3>
                </div>
                {expandedSections.includes('notCovered') ? 
                  <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} /> :
                  <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                }
              </button>
              {expandedSections.includes('notCovered') && (
                <div className="mt-3 space-y-2 pl-4">
                  {currentPolicy.coverageDetails.notCovered.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Coverage Limits */}
            <div>
              <button
                onClick={() => toggleSection('limits')}
                className="flex items-center justify-between w-full p-4 rounded-lg transition-all"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <div className="flex items-center space-x-3">
                  <Info className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                  <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Coverage Limits
                  </h3>
                </div>
                {expandedSections.includes('limits') ? 
                  <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} /> :
                  <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                }
              </button>
              {expandedSections.includes('limits') && (
                <div className="mt-3 space-y-2 pl-4">
                  {currentPolicy.coverageDetails.limits.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                      <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeInfoSection === 'features' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold font-poppins mb-3 flex items-center space-x-2" style={{ color: 'var(--color-foreground)' }}>
                <Clock className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                <span>Waiting Periods</span>
              </h3>
              <div className="space-y-2">
                {currentPolicy.features.waitingPeriods.map((period, index) => (
                  <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-poppins mb-3 flex items-center space-x-2" style={{ color: 'var(--color-foreground)' }}>
                <FileText className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                <span>Claim Process</span>
              </h3>
              <div className="space-y-2">
                {currentPolicy.features.claimProcess.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: 'var(--color-primary)' }}>
                      {index + 1}
                    </div>
                    <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-poppins mb-3 flex items-center space-x-2" style={{ color: 'var(--color-foreground)' }}>
                <MapPin className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                <span>Network Benefits</span>
              </h3>
              <div className="space-y-2">
                {currentPolicy.features.networkBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeInfoSection === 'faqs' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Frequently Asked Questions
            </h3>
            {currentPolicy.faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleSection(`faq-${index}`)}
                  className="flex items-center justify-between w-full p-4 rounded-lg transition-all text-left"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                >
                  <span className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {faq.question}
                  </span>
                  {expandedSections.includes(`faq-${index}`) ? 
                    <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-muted)' }} /> :
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-muted)' }} />
                  }
                </button>
                {expandedSections.includes(`faq-${index}`) && (
                  <div className="mt-2 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-card)' }}>
                    <p className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeInfoSection === 'testimonials' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Customer Testimonials
            </h3>
            {currentPolicy.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 p-4 border-t" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="flex space-x-3">
          <button className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Download className="h-4 w-4 inline mr-2" />
            Download Brochure
          </button>
          <button className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Share2 className="h-4 w-4 inline mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );

  if (!currentPolicy) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Policy Type Not Found
          </h2>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            The requested policy type is not available.
          </p>
          <button
            onClick={() => navigate('/policies')}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Back to Policies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'var(--color-background)', 
        borderColor: 'var(--color-border)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/policies')}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Buy {currentPolicy.name}
                </h1>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Step {currentStep} of 2
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-32 h-2 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    width: `${(currentStep / 2) * 100}%`
                  }}
                ></div>
              </div>
              <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                {Math.round((currentStep / 2) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
          {/* Information Panel - Left Side */}
          <div className="lg:col-span-2 border-r" style={{ borderColor: 'var(--color-border)' }}>
            {renderInfoPanel()}
          </div>

          {/* Form Panel - Right Side */}
          <div className="lg:col-span-3 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              {currentStep === 1 ? renderBasicForm() : renderPolicySpecificForm()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="py-3 px-6 rounded-lg font-medium font-roboto transition-all duration-200"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    Previous
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="py-3 px-6 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 ml-auto"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {currentStep === 2 ? 'View Providers' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPolicyPage;