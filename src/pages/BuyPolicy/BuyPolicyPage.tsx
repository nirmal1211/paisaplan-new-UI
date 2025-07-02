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
  Minus,
  Home,
  User,
  Menu,
  X
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

interface Dependent {
  id: string;
  name: string;
  age: number;
  relationship: string;
  preExistingConditions: string[];
  medicalHistory: string;
}

interface ClaimRecord {
  id: string;
  date: string;
  amount: number;
  nature: string;
  status: 'approved' | 'rejected' | 'pending';
}

interface FormData {
  mobile: string;
  fullName: string;
  email: string;
  // Health specific
  age?: number;
  preExistingConditions?: string[];
  dependents?: Dependent[];
  // Motor specific
  vehicleRegNumber?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  manufacturingYear?: number;
  claimsHistory?: {
    numberOfClaims: number;
    claimRecords: ClaimRecord[];
    ncbPercentage: number;
  };
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
    email: '',
    dependents: [],
    claimsHistory: {
      numberOfClaims: 0,
      claimRecords: [],
      ncbPercentage: 0
    }
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState<string[]>(['benefits']);
  const [activeInfoSection, setActiveInfoSection] = useState('overview');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          'Dental treatment (unless due to accident)',
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

    if (policyType === 'health' && currentStep === 3) {
      // Validate dependents
      if (formData.dependents && formData.dependents.length > 0) {
        formData.dependents.forEach((dependent, index) => {
          if (!dependent.name) {
            newErrors[`dependent_${index}_name`] = 'Dependent name is required';
          }
          if (!dependent.age || dependent.age < 0) {
            newErrors[`dependent_${index}_age`] = 'Valid age is required';
          }
          if (!dependent.relationship) {
            newErrors[`dependent_${index}_relationship`] = 'Relationship is required';
          }
        });
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

    if ((policyType === 'motor' || policyType === 'two-wheeler') && currentStep === 3) {
      if (!formData.claimsHistory?.numberOfClaims && formData.claimsHistory?.numberOfClaims !== 0) {
        newErrors.numberOfClaims = 'Number of claims is required';
      }
      if (formData.claimsHistory?.numberOfClaims && formData.claimsHistory.numberOfClaims > 0) {
        if (!formData.claimsHistory.claimRecords || formData.claimsHistory.claimRecords.length === 0) {
          newErrors.claimRecords = 'Claim details are required';
        }
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

  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      name: '',
      age: 0,
      relationship: '',
      preExistingConditions: [],
      medicalHistory: ''
    };
    setFormData(prev => ({
      ...prev,
      dependents: [...(prev.dependents || []), newDependent]
    }));
  };

  const removeDependent = (id: string) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents?.filter(dep => dep.id !== id) || []
    }));
  };

  const updateDependent = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents?.map(dep => 
        dep.id === id ? { ...dep, [field]: value } : dep
      ) || []
    }));
  };

  const addClaimRecord = () => {
    const newClaim: ClaimRecord = {
      id: Date.now().toString(),
      date: '',
      amount: 0,
      nature: '',
      status: 'approved'
    };
    setFormData(prev => ({
      ...prev,
      claimsHistory: {
        ...prev.claimsHistory!,
        claimRecords: [...(prev.claimsHistory?.claimRecords || []), newClaim]
      }
    }));
  };

  const removeClaimRecord = (id: string) => {
    setFormData(prev => ({
      ...prev,
      claimsHistory: {
        ...prev.claimsHistory!,
        claimRecords: prev.claimsHistory?.claimRecords.filter(claim => claim.id !== id) || []
      }
    }));
  };

  const updateClaimRecord = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      claimsHistory: {
        ...prev.claimsHistory!,
        claimRecords: prev.claimsHistory?.claimRecords.map(claim => 
          claim.id === id ? { ...claim, [field]: value } : claim
        ) || []
      }
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getMaxSteps = () => {
    if (policyType === 'health') return 3; // Basic + Health Details + Dependents
    if (policyType === 'motor' || policyType === 'two-wheeler') return 3; // Basic + Vehicle + Claims
    return 2; // Basic + Policy specific
  };

  const handleNext = () => {
    if (validateForm()) {
      const maxSteps = getMaxSteps();
      if (currentStep < maxSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Navigate to provider selection
        navigate(`/buy-policy/${policyType}/providers`, { state: { formData } });
      }
    }
  };

  const renderPersistentNavbar = () => (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ 
      backgroundColor: 'var(--color-background)', 
      borderColor: 'var(--color-border)' 
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              Trovity
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigate('/policies')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <Shield className="h-4 w-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => navigate('/my-policy')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <FileText className="h-4 w-4" />
              <span>My Policies</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="space-y-4">
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  navigate('/policies');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <Shield className="h-4 w-4" />
                <span>Products</span>
              </button>
              <button
                onClick={() => {
                  navigate('/my-policy');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <FileText className="h-4 w-4" />
                <span>My Policies</span>
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

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

  const renderHealthDetailsForm = () => (
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

  const renderDependentsForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Dependent Details *
        </h3>
        <button
          onClick={addDependent}
          className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Dependent</span>
        </button>
      </div>

      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
          Please add at least one dependent to proceed with health insurance. You can add family members like spouse, children, or parents.
        </p>
      </div>

      {formData.dependents && formData.dependents.length > 0 ? (
        <div className="space-y-4">
          {formData.dependents.map((dependent, index) => (
            <div key={dependent.id} className="border rounded-lg p-6" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Dependent {index + 1}
                </h4>
                <button
                  onClick={() => removeDependent(dependent.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={dependent.name}
                    onChange={(e) => updateDependent(dependent.id, 'name', e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: errors[`dependent_${index}_name`] ? '#ef4444' : 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  />
                  {errors[`dependent_${index}_name`] && (
                    <p className="text-red-500 text-xs mt-1 font-roboto">{errors[`dependent_${index}_name`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    value={dependent.age || ''}
                    onChange={(e) => updateDependent(dependent.id, 'age', parseInt(e.target.value))}
                    placeholder="Enter age"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: errors[`dependent_${index}_age`] ? '#ef4444' : 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  />
                  {errors[`dependent_${index}_age`] && (
                    <p className="text-red-500 text-xs mt-1 font-roboto">{errors[`dependent_${index}_age`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Relationship *
                  </label>
                  <select
                    value={dependent.relationship}
                    onChange={(e) => updateDependent(dependent.id, 'relationship', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: errors[`dependent_${index}_relationship`] ? '#ef4444' : 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="father-in-law">Father-in-law</option>
                    <option value="mother-in-law">Mother-in-law</option>
                  </select>
                  {errors[`dependent_${index}_relationship`] && (
                    <p className="text-red-500 text-xs mt-1 font-roboto">{errors[`dependent_${index}_relationship`]}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Pre-existing Conditions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'None'].map(condition => (
                    <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dependent.preExistingConditions.includes(condition)}
                        onChange={(e) => {
                          const conditions = dependent.preExistingConditions;
                          if (e.target.checked) {
                            updateDependent(dependent.id, 'preExistingConditions', [...conditions, condition]);
                          } else {
                            updateDependent(dependent.id, 'preExistingConditions', conditions.filter(c => c !== condition));
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

              <div>
                <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Medical History
                </label>
                <textarea
                  value={dependent.medicalHistory}
                  onChange={(e) => updateDependent(dependent.id, 'medicalHistory', e.target.value)}
                  placeholder="Enter any relevant medical history, surgeries, or ongoing treatments"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
          <Users className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h4 className="text-lg font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            No Dependents Added
          </h4>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            Add family members to include them in your health insurance coverage
          </p>
          <button
            onClick={addDependent}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Add First Dependent
          </button>
        </div>
      )}
    </div>
  );

  const renderVehicleDetailsForm = () => (
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

  const renderClaimsHistoryForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
        Previous Claims History *
      </h3>

      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
          Please provide details of any insurance claims made in the last 3 years. This information is mandatory and affects your premium calculation.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
          Number of Claims in Last 3 Years *
        </label>
        <select
          value={formData.claimsHistory?.numberOfClaims ?? ''}
          onChange={(e) => {
            const count = parseInt(e.target.value);
            handleInputChange('claimsHistory', {
              ...formData.claimsHistory,
              numberOfClaims: count,
              claimRecords: count === 0 ? [] : formData.claimsHistory?.claimRecords || []
            });
          }}
          className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: errors.numberOfClaims ? '#ef4444' : 'var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            '--tw-ring-color': 'var(--color-primary)'
          }}
        >
          <option value="">Select Number of Claims</option>
          <option value={0}>0 - No Claims</option>
          <option value={1}>1 Claim</option>
          <option value={2}>2 Claims</option>
          <option value={3}>3 Claims</option>
          <option value={4}>4+ Claims</option>
        </select>
        {errors.numberOfClaims && (
          <p className="text-red-500 text-sm mt-1 font-roboto">{errors.numberOfClaims}</p>
        )}
      </div>

      {formData.claimsHistory?.numberOfClaims && formData.claimsHistory.numberOfClaims > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Claim Details
            </h4>
            <button
              onClick={addClaimRecord}
              className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Plus className="h-4 w-4" />
              <span>Add Claim</span>
            </button>
          </div>

          {formData.claimsHistory.claimRecords && formData.claimsHistory.claimRecords.length > 0 ? (
            <div className="space-y-4">
              {formData.claimsHistory.claimRecords.map((claim, index) => (
                <div key={claim.id} className="border rounded-lg p-4" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-md font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Claim {index + 1}
                    </h5>
                    <button
                      onClick={() => removeClaimRecord(claim.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Claim Date
                      </label>
                      <input
                        type="date"
                        value={claim.date}
                        onChange={(e) => updateClaimRecord(claim.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Claim Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={claim.amount || ''}
                        onChange={(e) => updateClaimRecord(claim.id, 'amount', parseInt(e.target.value))}
                        placeholder="Enter claim amount"
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Nature of Claim
                      </label>
                      <select
                        value={claim.nature}
                        onChange={(e) => updateClaimRecord(claim.id, 'nature', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="">Select Nature</option>
                        <option value="accident">Accident</option>
                        <option value="theft">Theft</option>
                        <option value="fire">Fire</option>
                        <option value="flood">Flood/Natural Calamity</option>
                        <option value="vandalism">Vandalism</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Claim Status
                      </label>
                      <select
                        value={claim.status}
                        onChange={(e) => updateClaimRecord(claim.id, 'status', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
              <FileText className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-muted)' }} />
              <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                No claim details added yet. Click "Add Claim" to provide claim information.
              </p>
            </div>
          )}

          {errors.claimRecords && (
            <p className="text-red-500 text-sm font-roboto">{errors.claimRecords}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
          No Claim Bonus (NCB) Percentage
        </label>
        <select
          value={formData.claimsHistory?.ncbPercentage || 0}
          onChange={(e) => handleInputChange('claimsHistory', {
            ...formData.claimsHistory,
            ncbPercentage: parseInt(e.target.value)
          })}
          className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            '--tw-ring-color': 'var(--color-primary)'
          }}
        >
          <option value={0}>0% - New Policy/Claims Made</option>
          <option value={20}>20% - 1 Year Claim Free</option>
          <option value={25}>25% - 2 Years Claim Free</option>
          <option value={35}>35% - 3 Years Claim Free</option>
          <option value={45}>45% - 4 Years Claim Free</option>
          <option value={50}>50% - 5+ Years Claim Free</option>
        </select>
      </div>
    </div>
  );

  const renderLifeDetailsForm = () => (
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

  const renderCurrentStepForm = () => {
    if (currentStep === 1) {
      return renderBasicForm();
    }

    if (policyType === 'health') {
      if (currentStep === 2) return renderHealthDetailsForm();
      if (currentStep === 3) return renderDependentsForm();
    }

    if (policyType === 'motor' || policyType === 'two-wheeler') {
      if (currentStep === 2) return renderVehicleDetailsForm();
      if (currentStep === 3) return renderClaimsHistoryForm();
    }

    if (policyType === 'life' && currentStep === 2) {
      return renderLifeDetailsForm();
    }

    return null;
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
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {renderPersistentNavbar()}
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
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
      </div>
    );
  }

  const maxSteps = getMaxSteps();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Persistent Navigation */}
      {renderPersistentNavbar()}

      {/* Header */}
      <div className="sticky top-16 z-40 backdrop-blur-md border-b" style={{ 
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
                  Step {currentStep} of {maxSteps}
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
                    width: `${(currentStep / maxSteps) * 100}%`
                  }}
                ></div>
              </div>
              <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                {Math.round((currentStep / maxSteps) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[calc(100vh-8rem)]">
          {/* Information Panel - Left Side */}
          <div className="lg:col-span-2 border-r" style={{ borderColor: 'var(--color-border)' }}>
            {renderInfoPanel()}
          </div>

          {/* Form Panel - Right Side */}
          <div className="lg:col-span-3 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              {renderCurrentStepForm()}

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
                  {currentStep === maxSteps ? 'View Providers' : 'Next'}
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