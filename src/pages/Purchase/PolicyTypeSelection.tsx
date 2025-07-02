import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Bike, Car, Home, Plane, Briefcase, Users } from 'lucide-react';

interface PolicyTypeOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
  features: string[];
  startingPrice: string;
}

const PolicyTypeSelection: React.FC = () => {
  const navigate = useNavigate();

  const policyTypes: PolicyTypeOption[] = [
    {
      id: 'health-insurance',
      name: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family',
      icon: Heart,
      route: '/buy-policy/health-insurance',
      features: ['Cashless Treatment', 'Pre & Post Hospitalization', 'Annual Health Checkup', 'Emergency Coverage'],
      startingPrice: '₹8,000'
    },
    {
      id: 'life-insurance',
      name: 'Life Insurance',
      description: 'Financial security for your loved ones',
      icon: Shield,
      route: '/buy-policy/life-insurance',
      features: ['Life Cover', 'Accidental Death Benefit', 'Tax Benefits', 'Flexible Premiums'],
      startingPrice: '₹5,000'
    },
    {
      id: 'two-wheeler-insurance',
      name: 'Two Wheeler Insurance',
      description: 'Complete protection for your bike or scooter',
      icon: Bike,
      route: '/buy-policy/two-wheeler-insurance',
      features: ['Own Damage Cover', 'Third Party Liability', 'Personal Accident', 'Roadside Assistance'],
      startingPrice: '₹2,500'
    },
    {
      id: 'motor-insurance',
      name: 'Motor Insurance',
      description: 'Comprehensive coverage for your car',
      icon: Car,
      route: '/buy-policy/motor-insurance',
      features: ['Comprehensive Coverage', 'Zero Depreciation', 'Engine Protection', 'NCB Protection'],
      startingPrice: '₹12,000'
    },
    {
      id: 'home-insurance',
      name: 'Home Insurance',
      description: 'Protect your home and belongings',
      icon: Home,
      route: '/buy-policy/home-insurance',
      features: ['Structure Coverage', 'Contents Protection', 'Liability Cover', 'Temporary Accommodation'],
      startingPrice: '₹3,500'
    },
    {
      id: 'travel-insurance',
      name: 'Travel Insurance',
      description: 'Safe travels with comprehensive coverage',
      icon: Plane,
      route: '/buy-policy/travel-insurance',
      features: ['Medical Emergency', 'Trip Cancellation', 'Baggage Loss', 'Flight Delay'],
      startingPrice: '₹500'
    },
    {
      id: 'business-insurance',
      name: 'Business Insurance',
      description: 'Comprehensive protection for your business',
      icon: Briefcase,
      route: '/buy-policy/business-insurance',
      features: ['Property Coverage', 'Liability Protection', 'Business Interruption', 'Cyber Security'],
      startingPrice: '₹15,000'
    },
    {
      id: 'group-insurance',
      name: 'Group Insurance',
      description: 'Employee benefits and group coverage',
      icon: Users,
      route: '/buy-policy/group-insurance',
      features: ['Employee Health', 'Group Life', 'Accidental Coverage', 'Flexible Benefits'],
      startingPrice: '₹25,000'
    }
  ];

  const handlePolicySelect = (policyType: PolicyTypeOption) => {
    navigate(policyType.route);
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br shadow-lg" style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}>
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold font-poppins mb-6 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, var(--color-foreground), var(--color-primary))` }}>
            Choose Your Insurance
          </h1>
          <p className="text-xl font-roboto max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Select the type of insurance that best fits your needs. Our comprehensive coverage options provide peace of mind and financial security.
          </p>
        </div>

        {/* Policy Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {policyTypes.map((policyType) => {
            const Icon = policyType.icon;
            
            return (
              <div
                key={policyType.id}
                onClick={() => handlePolicySelect(policyType)}
                className="group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                {/* Header with Icon */}
                <div className="p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      <Icon className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      {policyType.name}
                    </h3>
                    <p className="text-sm font-roboto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      {policyType.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 pb-4">
                  <div className="space-y-2">
                    {policyType.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Starting from</span>
                      <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {policyType.startingPrice}
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 px-4 rounded-xl font-semibold font-roboto text-white transition-all duration-300 group-hover:scale-105" style={{ backgroundColor: 'var(--color-primary)' }}>
                    Get Quote
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-20 text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-2xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
              Why Choose Our Insurance?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Comprehensive Coverage
                </h3>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Wide range of coverage options tailored to your specific needs
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Users className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  24/7 Support
                </h3>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Round-the-clock customer support for all your insurance needs
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Heart className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Quick Claims
                </h3>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Fast and hassle-free claim settlement process
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyTypeSelection;