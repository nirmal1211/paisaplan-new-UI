import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { MyPolicyProps, PolicyType } from '../../types/policy';
import { mockPolicies } from '../../data/mockData';
import InsuranceCarousel from './InsuranceCarousel';
import DocumentUploader from './DocumentUploader';
import PolicyCard from './PolicyCard';
import FAQSection from './FAQSection';
import UpcomingRenewals from './UpcomingRenewals';
import DocumentUploadCenter from './DocumentUploadCenter';

const MyPolicy: React.FC<MyPolicyProps> = ({
  policy,
  insuranceTypes,
  faqs,
  onRenew,
  onUploadDocument,
  onFilterChange,
  onPolicySelect
}) => {
  const [activeTab, setActiveTab] = useState<'policies' | 'faqs'>('policies');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<PolicyType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock policies for demonstration
  const allPolicies = mockPolicies;

  const filteredPolicies = useMemo(() => {
    return allPolicies.filter(p => {
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesType = typeFilter === 'All' || p.type === typeFilter;
      const matchesSearch = searchQuery === '' || 
        p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [statusFilter, typeFilter, searchQuery, allPolicies]);

  const handleFilterChange = (status: string, type: PolicyType) => {
    setStatusFilter(status);
    setTypeFilter(type);
    onFilterChange(status, type);
  };

  const formatPolicyNumber = (number: string) => {
    if (number.length <= 4) return number;
    return number.substring(0, 4) + '*'.repeat(number.length - 4);
  };

  const policyTypes: PolicyType[] = [
    'All', 'Health', 'Motor', 'Two-wheeler', 'Life', 'Travel', 
    'Home', 'Fire', 'Marine', 'Cyber', 'Professional'
  ];

  return (
    <div className="min-h-screen py-6 px-4 md:px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header with Quick Actions */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              My Policies
            </h1>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              Manage your insurance policies and documents
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                     style={{ color: 'var(--color-muted)' }} />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border font-roboto text-sm w-64"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-foreground)'
                }}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-roboto text-sm hover:opacity-80 transition-opacity"
              style={{ 
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-foreground)'
              }}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex items-center space-x-1 p-1 rounded-lg border" 
                 style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-opacity-100' : 'bg-opacity-0'}`}
                style={{ backgroundColor: viewMode === 'grid' ? 'var(--color-secondary)' : 'transparent' }}
              >
                <Grid className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-opacity-100' : 'bg-opacity-0'}`}
                style={{ backgroundColor: viewMode === 'list' ? 'var(--color-secondary)' : 'transparent' }}
              >
                <List className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border mb-6"
               style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div>
              <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleFilterChange(e.target.value, typeFilter)}
                className="w-full p-2 rounded-lg border font-roboto"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-foreground)'
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                Policy Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => handleFilterChange(statusFilter, e.target.value as PolicyType)}
                className="w-full p-2 rounded-lg border font-roboto"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-foreground)'
                }}
              >
                {policyTypes.map(type => (
                  <option key={type} value={type}>{type} {type !== 'All' ? 'Insurance' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Priority Sections */}
      

      {/* Top Section - 3 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" style={{ minHeight: '300px' }}>
        {/* Renewal Card */}
        <div className="rounded-xl shadow-lg border p-6" style={{ 
          backgroundColor: 'var(--color-card)', 
          borderColor: 'var(--color-border)' 
        }}>
          <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
            Renewal
          </h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Policy Number
              </span>
              <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                {formatPolicyNumber(policy.number)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Provider
              </span>
              <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                {policy.provider}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Expires in
              </span>
              <span className={`font-semibold font-roboto ${
                policy.expiryDays < 30 ? 'text-red-600' : 'text-green-600'
              }`}>
                {policy.expiryDays} days
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => onRenew(policy.number)}
              className="w-full py-2 px-4 rounded-lg font-semibold font-roboto text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Renew
            </button>
            
            <button 
              onClick={() => window.location.href = '/renewals'}
              className="w-full py-2 px-4 rounded-lg font-semibold font-roboto border hover:opacity-80 transition-opacity"
              style={{ 
                borderColor: 'var(--color-border)',
                color: 'var(--color-primary)',
                backgroundColor: 'transparent'
              }}
            >
              View More
            </button>
          </div>
        </div>

        {/* Insurance Carousel */}
        <InsuranceCarousel insuranceTypes={insuranceTypes} />

        {/* Document Uploader */}
        <DocumentUploader onUploadDocument={onUploadDocument} />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex items-center space-x-1 p-1 rounded-lg border w-fit" 
             style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <button
            onClick={() => setActiveTab('policies')}
            className={`px-4 py-2 rounded-lg font-semibold font-roboto transition-colors ${
              activeTab === 'policies' ? 'text-white' : ''
            }`}
            style={{ 
              backgroundColor: activeTab === 'policies' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'policies' ? 'white' : 'var(--color-foreground)'
            }}
          >
            Policies ({filteredPolicies.length})
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded-lg font-semibold font-roboto transition-colors ${
              activeTab === 'faqs' ? 'text-white' : ''
            }`}
            style={{ 
              backgroundColor: activeTab === 'faqs' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'faqs' ? 'white' : 'var(--color-foreground)'
            }}
          >
            FAQs ({faqs.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'policies' ? (
        <div>
          {filteredPolicies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
                No policies found matching your criteria.
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredPolicies.map((policyItem) => (
                <PolicyCard 
                  key={policyItem.id} 
                  policy={policyItem} 
                  onSelect={onPolicySelect}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <FAQSection faqs={faqs} />
      )}

      {/* Side Advertisement Banner */}
      <div className="mt-8">
        <div className="rounded-xl p-6 text-center border"
             style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Need Help with Your Policies?
          </h3>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            Our experts are here to assist you 24/7
          </p>
          <button className="px-6 py-2 rounded-lg font-semibold font-roboto border hover:opacity-80 transition-opacity"
                  style={{ 
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                    backgroundColor: 'transparent'
                  }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPolicy;