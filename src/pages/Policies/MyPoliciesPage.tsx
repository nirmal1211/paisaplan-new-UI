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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">My Policies</h1>
          <p className="text-gray-600 font-roboto">Manage and track all your insurance policies in one place</p>
        </div>

        {/* Top Section - 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Column 1 - Renewal Card */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-poppins">Renewal Due</h2>
              <Calendar className="h-6 w-6" />
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-primary-100 text-sm font-roboto">Policy Number</p>
                <p className="font-semibold font-poppins">{nearestExpiryPolicy.policyNumber}</p>
              </div>
              
              <div>
                <p className="text-primary-100 text-sm font-roboto">Provider</p>
                <p className="font-semibold font-poppins">{nearestExpiryPolicy.provider}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold font-poppins">{nearestExpiryPolicy.expiryDays}</p>
                <p className="text-primary-100 text-sm font-roboto">Days to Expiry</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button className="w-full bg-white text-primary-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors font-roboto">
                Renew Now
              </button>
              <Link 
                to="/renewals" 
                className="block text-center text-primary-100 hover:text-white text-sm font-roboto underline"
              >
                View More Renewals
              </Link>
            </div>
          </div>

          {/* Column 2 - Insurance Carousel */}
          <div className="h-full">
            <InsuranceCarousel slides={insuranceSlides} />
          </div>

          {/* Column 3 - Document Upload */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileUpload onFileSelect={(files) => console.log('Files uploaded:', files)} />
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 pr-10 font-roboto focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 pr-10 font-roboto focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Types</option>
                  {policyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('policies')}
                className={`px-6 py-2 rounded-md font-medium font-roboto transition-all ${
                  activeTab === 'policies'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Policies
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`px-6 py-2 rounded-md font-medium font-roboto transition-all ${
                  activeTab === 'faqs'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
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
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Shield className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 font-poppins">{policy.provider}</h3>
                        <p className="text-sm text-gray-500 font-roboto">{policy.type} Insurance</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>

                  {/* Policy Details */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 font-roboto">Policy Number</p>
                      <p className="font-semibold text-gray-900 font-poppins">{policy.policyNumber}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Valid From</p>
                        <p className="font-medium text-gray-900 font-roboto">{formatDate(policy.validFrom)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Valid To</p>
                        <p className="font-medium text-gray-900 font-roboto">{formatDate(policy.validTo)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Sum Insured</p>
                        <p className="font-semibold text-primary-600 font-poppins">{policy.sumInsured}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Premium</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.premium}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors font-roboto">
                      View Details
                    </button>
                    <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* FAQ Section */
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {mockFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900 font-roboto">{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-700 font-roboto leading-relaxed">{faq.answer}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
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
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-2">No Policies Found</h3>
            <p className="text-gray-600 font-roboto mb-6">
              No policies match your current filter criteria. Try adjusting your filters or add a new policy.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors font-roboto">
              Add New Policy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPoliciesPage;