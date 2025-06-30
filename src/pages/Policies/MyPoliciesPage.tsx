import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Shield, FileText, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { mockPolicies, mockFAQs, insuranceSlides } from '../../data/mockData';
import { Policy, FAQ } from '../../types/policy';
import InsuranceCarousel from '../../components/UI/carousel-insurance';
import FileUpload from '../../components/UI/file-upload';

const MyPoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policies' | 'faqs'>('policies');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Get the policy with the nearest expiry for renewal card
  const nearestExpiryPolicy = useMemo(() => {
    const activePolicies = mockPolicies.filter(p => p.status === 'Active' && p.expiryDays > 0);
    return activePolicies.reduce((nearest, current) => 
      current.expiryDays < nearest.expiryDays ? current : nearest
    );
  }, []);

  // Filter policies based on selected filters
  const filteredPolicies = useMemo(() => {
    return mockPolicies.filter(policy => {
      const statusMatch = statusFilter === 'all' || policy.status.toLowerCase() === statusFilter.toLowerCase();
      const typeMatch = typeFilter === 'all' || policy.type === typeFilter;
      return statusMatch && typeMatch;
    });
  }, [statusFilter, typeFilter]);

  const policyTypes = ['Health', 'Motor', 'Two-wheeler', 'Life', 'Travel', 'Home', 'Fire', 'Marine', 'Cyber', 'Professional'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>My Policies</h1>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Manage and track all your insurance policies in one place</p>
        </div>

        {/* Top Section - 3 Column Grid - Reduced Height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Column 1 - Renewal Card - Reduced Height */}
          <div className="rounded-xl p-4 text-white" style={{ background: 'var(--color-primary)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold font-poppins">Renewal Due</h2>
              <Calendar className="h-5 w-5" />
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs font-roboto opacity-80">Policy Number</p>
                <p className="font-semibold font-poppins text-sm">{nearestExpiryPolicy.policyNumber}</p>
              </div>
              
              <div>
                <p className="text-xs font-roboto opacity-80">Provider</p>
                <p className="font-semibold font-poppins text-sm">{nearestExpiryPolicy.provider}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xl font-bold font-poppins">{nearestExpiryPolicy.expiryDays}</p>
                <p className="text-xs font-roboto opacity-80">Days to Expiry</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <button className="w-full bg-white font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors font-roboto text-sm" style={{ color: 'var(--color-primary)' }}>
                Renew Now
              </button>
              <Link 
                to="/renewals" 
                className="block text-center hover:text-white text-xs font-roboto underline opacity-80 hover:opacity-100"
              >
                View More Renewals
              </Link>
            </div>
          </div>

          {/* Column 2 - Insurance Carousel - Reduced Height */}
          <div className="h-80">
            <InsuranceCarousel slides={insuranceSlides} />
          </div>

          {/* Column 3 - Document Upload - Reduced Height */}
          <div className="rounded-xl shadow-lg p-4 h-80 overflow-y-auto" style={{ backgroundColor: 'var(--color-card)' }}>
            <FileUpload onFileSelect={(files) => console.log('Files uploaded:', files)} />
          </div>
        </div>

        {/* Filter Section */}
        <div className="rounded-xl shadow-lg p-4 mb-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none border rounded-lg px-4 py-2 pr-10 font-roboto focus:outline-none focus:ring-2 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none border rounded-lg px-4 py-2 pr-10 font-roboto focus:outline-none focus:ring-2 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="all">All Types</option>
                  {policyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex rounded-lg p-1" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button
                onClick={() => setActiveTab('policies')}
                className={`px-6 py-2 rounded-md font-medium font-roboto transition-all ${
                  activeTab === 'policies'
                    ? 'shadow-sm'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === 'policies' ? 'var(--color-card)' : 'transparent',
                  color: activeTab === 'policies' ? 'var(--color-primary)' : 'var(--color-muted)'
                }}
              >
                Policies
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`px-6 py-2 rounded-md font-medium font-roboto transition-all ${
                  activeTab === 'faqs'
                    ? 'shadow-sm'
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === 'faqs' ? 'var(--color-card)' : 'transparent',
                  color: activeTab === 'faqs' ? 'var(--color-primary)' : 'var(--color-muted)'
                }}
              >
                FAQs
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'policies' ? (
          /* Policy Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.provider}</h3>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>{policy.type} Insurance</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>

                  {/* Policy Details */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Policy Number</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.policyNumber}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Valid From</p>
                        <p className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>{formatDate(policy.validFrom)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Valid To</p>
                        <p className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>{formatDate(policy.validTo)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Sum Insured</p>
                        <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>{policy.sumInsured}</p>
                      </div>
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Premium</p>
                        <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.premium}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <button 
                      className="flex-1 font-medium py-2 px-4 rounded-lg transition-colors font-roboto text-white hover:opacity-90"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex items-center justify-center p-2 rounded-lg transition-colors hover:opacity-80"
                      style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }}
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* FAQ Section */
          <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {mockFAQs.map((faq) => (
                <div key={faq.id} className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left hover:opacity-80 transition-colors flex items-center justify-between"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <span className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                    ) : (
                      <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 py-4" style={{ backgroundColor: 'var(--color-card)' }}>
                      <p className="font-roboto leading-relaxed mb-3" style={{ color: 'var(--color-foreground)' }}>{faq.answer}</p>
                      <span 
                        className="inline-block px-2 py-1 text-xs rounded-full font-medium"
                        style={{ 
                          backgroundColor: 'var(--color-secondary)', 
                          color: 'var(--color-primary)' 
                        }}
                      >
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for Policies */}
        {activeTab === 'policies' && filteredPolicies.length === 0 && (
          <div className="rounded-xl shadow-lg p-12 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Shield className="h-8 w-8" style={{ color: 'var(--color-muted)' }} />
            </div>
            <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>No Policies Found</h3>
            <p className="font-roboto mb-6" style={{ color: 'var(--color-muted)' }}>
              No policies match your current filter criteria. Try adjusting your filters or add a new policy.
            </p>
            <button 
              className="font-semibold py-3 px-6 rounded-lg transition-colors font-roboto text-white hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Add New Policy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPoliciesPage;