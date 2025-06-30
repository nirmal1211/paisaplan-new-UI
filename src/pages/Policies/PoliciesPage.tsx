import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, Download, Calendar, Layers, ArrowLeft, Plus } from 'lucide-react';

// Example policies data (replace with real data or fetch from API as needed)
const policies = [
  {
    id: '1',
    type: 'Life Insurance',
    number: 'LI-2024-001',
    premium: '$2,400',
    status: 'Active',
    renewal: '2024-12-15',
    coverage: '$500,000',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: '2',
    type: 'Health Insurance',
    number: 'HI-2024-002',
    premium: '$3,600',
    status: 'Active',
    renewal: '2024-08-20',
    coverage: '$1,000,000',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    id: '3',
    type: 'Motor Insurance',
    number: 'MI-2024-003',
    premium: '$1,800',
    status: 'Pending Renewal',
    renewal: '2024-06-30',
    coverage: '$50,000',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: '4',
    type: 'Life Insurance',
    number: 'LI-2024-004',
    premium: '$1,200',
    status: 'Active',
    renewal: '2025-01-10',
    coverage: '$250,000',
    color: 'bg-blue-100 text-blue-700'
  }
];

const policyTypes = Array.from(new Set(policies.map(p => p.type)));
const policyTypeStyles: Record<string, string> = {
  'Life Insurance': 'bg-blue-50 border-blue-200 text-blue-800',
  'Health Insurance': 'bg-teal-50 border-teal-200 text-teal-800',
  'Motor Insurance': 'bg-orange-50 border-orange-200 text-orange-800',
};

const PoliciesPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const selectedType = type ? decodeURIComponent(type) : null;
  const filteredPolicies = selectedType ? policies.filter(p => p.type === selectedType) : [];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 font-poppins tracking-tight">Policies</h1>
          <p className="text-gray-600 font-roboto mt-2 text-lg">Manage your insurance policies</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all text-lg"
          style={{ minWidth: 170 }}
        >
          <Plus className="h-5 w-5" />
          Add Policy
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-10 border border-slate-100">
        {/* Policy Type Cards */}
        {!selectedType && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 font-poppins mb-8">Select Policy Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {policyTypes.map((type) => (
                <button
                  key={type}
                  className={`group relative rounded-xl p-8 border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 hover:shadow-lg hover:-translate-y-1 ${policyTypeStyles[type] || 'bg-gray-50 border-gray-200 text-gray-800'}`}
                  onClick={() => navigate(`/policies/${encodeURIComponent(type)}`)}
                >
                  <div className="flex items-center mb-2">
                    <Layers className="h-8 w-8 mr-4 opacity-80" />
                    <span className="text-xl font-bold font-poppins tracking-wide">{type}</span>
                  </div>
                  <span className="font-roboto text-base font-medium opacity-80">{policies.filter(p => p.type === type).length} Policy{policies.filter(p => p.type === type).length > 1 ? 'ies' : 'y'}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Policies List for Selected Type */}
        {selectedType && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-4">
                <button
                  className="text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition shadow"
                  onClick={() => navigate('/policies')}
                  title="Back to types"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <h3 className="text-2xl font-extrabold text-gray-900 font-poppins tracking-tight">{selectedType} Policies</h3>
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all text-base"
              >
                <Plus className="h-5 w-5" />
                Add Policy
              </button>
            </div>
            {filteredPolicies.length === 0 ? (
              <div className="text-gray-500 font-roboto">No policies found for this type.</div>
            ) : (
              <div className="grid gap-8">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="bg-white border border-slate-100 rounded-xl p-8 hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center md:justify-between shadow-md">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className={`w-8 h-8 rounded-xl mr-6 shadow ${policy.color}`} />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 font-poppins tracking-wide">{policy.type}</h3>
                        <p className="text-base text-gray-500 font-roboto">{policy.number}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Premium</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.premium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Coverage</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.coverage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-roboto">Renewal</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.renewal}</p>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <button className="text-blue-600 hover:text-blue-800 p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition shadow">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition shadow">
                          <Download className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition shadow">
                          <Calendar className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <span className={`ml-0 md:ml-6 mt-4 md:mt-0 px-5 py-2 rounded-full text-base font-bold shadow-md ${
                      policy.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliciesPage;
