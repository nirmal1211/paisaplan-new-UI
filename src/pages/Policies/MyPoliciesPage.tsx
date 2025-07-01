import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Grid, List, ChevronDown, Eye, Download, Calendar, Plus, Bell, Settings } from 'lucide-react';
import { Policy, FAQ } from '../../types/policy';
import { mockPolicies, mockFAQs } from '../../data/mockData';
import UpcomingRenewals from '../../components/Policy/UpcomingRenewals';
import DocumentUploadCenter from '../../components/Policy/DocumentUploadCenter';

const MyPoliciesPage: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);
  const [activeTab, setActiveTab] = useState<'policies' | 'faqs'>('policies');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const policyTypes = [
    'Health', 'Motor', 'Two-wheeler', 'Life', 'Travel', 
    'Home', 'Fire', 'Marine', 'Cyber', 'Professional'
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPolicies(mockPolicies);
      setFaqs(mockFAQs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = policies;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(policy => policy.status.toLowerCase() === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(policy => policy.type === typeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(policy => 
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPolicies(filtered);
  }, [policies, statusFilter, typeFilter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExpiryColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days < 30) return 'text-orange-600';
    return 'text-green-600';
  };

  const formatExpiryText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return 'Expires today';
    if (days === 1) return 'Expires tomorrow';
    return `Expires in ${days} days`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" 
               style={{ borderColor: 'var(--color-primary)' }}></div>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Loading your policies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header with Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              My Policies
            </h1>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              Manage your insurance policies and documents
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-roboto hover:opacity-80 transition-opacity"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-roboto hover:opacity-80 transition-opacity"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            <Link to="/buy-policy" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-roboto text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-primary)' }}>
              <Plus className="h-4 w-4" />
              <span>Buy Policy</span>
            </Link>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4 p-4 rounded-xl border"
             style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-muted)' }} />
            <input
              type="text"
              placeholder="Search policies by number, provider, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)', 
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-card)',
                  color: 'var(--color-foreground)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" 
                           style={{ color: 'var(--color-muted)' }} />
            </div>

            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: 'var(--color-border)', 
                  backgroundColor: 'var(--color-card)',
                  color: 'var(--color-foreground)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              >
                <option value="all">All Types</option>
                {policyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" 
                           style={{ color: 'var(--color-muted)' }} />
            </div>

            <div className="flex items-center border rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-white' : ''} transition-colors`}
                style={{ 
                  backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : 'var(--color-muted)'
                }}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-white' : ''} transition-colors`}
                style={{ 
                  backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'list' ? 'white' : 'var(--color-muted)'
                }}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <UpcomingRenewals />
        <DocumentUploadCenter />
      </div>

      {/* Advertisement Banner */}
      <div className="mb-8 p-6 rounded-xl border" 
           style={{ 
             backgroundColor: 'var(--color-secondary)', 
             borderColor: 'var(--color-border)',
             background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 100%)`
           }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              🎉 Special Offer: Save up to 25% on Health Insurance
            </h3>
            <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
              Comprehensive coverage with cashless treatment at 10,000+ hospitals nationwide
            </p>
            <button className="px-6 py-2 rounded-lg font-semibold font-roboto text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'var(--color-primary)' }}>
              Get Quote Now
            </button>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=2"
              alt="Health Insurance"
              className="w-32 h-24 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <button
          onClick={() => setActiveTab('policies')}
          className={`px-6 py-3 font-semibold font-roboto border-b-2 transition-colors ${
            activeTab === 'policies' 
              ? 'border-current' 
              : 'border-transparent hover:opacity-70'
          }`}
          style={{ 
            color: activeTab === 'policies' ? 'var(--color-primary)' : 'var(--color-muted)',
            borderColor: activeTab === 'policies' ? 'var(--color-primary)' : 'transparent'
          }}
        >
          Policies ({filteredPolicies.length})
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-6 py-3 font-semibold font-roboto border-b-2 transition-colors ${
            activeTab === 'faqs' 
              ? 'border-current' 
              : 'border-transparent hover:opacity-70'
          }`}
          style={{ 
            color: activeTab === 'faqs' ? 'var(--color-primary)' : 'var(--color-muted)',
            borderColor: activeTab === 'faqs' ? 'var(--color-primary)' : 'transparent'
          }}
        >
          FAQs ({faqs.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'policies' ? (
        <div>
          {filteredPolicies.length === 0 ? (
            <div className="text-center py-12 rounded-xl border" 
                 style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Filter className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                No policies found
              </h3>
              <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
                Try adjusting your filters or search terms
              </p>
              <button 
                onClick={() => {
                  setStatusFilter('all');
                  setTypeFilter('all');
                  setSearchTerm('');
                }}
                className="px-4 py-2 rounded-lg font-roboto text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredPolicies.map((policy) => (
                <div key={policy.id} 
                     className={`border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${
                       viewMode === 'list' ? 'flex items-center justify-between' : ''
                     }`}
                     style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {policy.type} Insurance
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        <span className="font-medium">Policy No:</span> {policy.policyNumber}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        <span className="font-medium">Provider:</span> {policy.provider}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        <span className="font-medium">Valid:</span> {policy.validFrom} to {policy.validTo}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Sum Insured</p>
                        <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {policy.sumInsured}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Premium</p>
                        <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {policy.premium}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className={`text-sm font-medium font-roboto ${getExpiryColor(policy.expiryDays)}`}>
                        {formatExpiryText(policy.expiryDays)}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-2 ${viewMode === 'list' ? 'ml-6' : 'justify-between'}`}>
                    <button className="p-2 rounded-lg hover:opacity-70 transition-opacity" 
                            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:opacity-70 transition-opacity" 
                            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:opacity-70 transition-opacity" 
                            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                      <Calendar className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border rounded-xl overflow-hidden" 
                 style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full p-6 text-left hover:opacity-80 transition-opacity"
                style={{ backgroundColor: expandedFAQ === faq.id ? 'var(--color-secondary)' : 'transparent' }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {faq.question}
                  </h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`} style={{ color: 'var(--color-muted)' }} />
                </div>
                <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium" 
                      style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  {faq.category}
                </span>
              </button>
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <p className="font-roboto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPoliciesPage;