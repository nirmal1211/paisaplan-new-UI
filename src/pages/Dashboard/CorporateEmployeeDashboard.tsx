import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Users, FileText, Heart, Car, Shield, QrCode, Download } from 'lucide-react';

const CorporateEmployeeDashboard: React.FC = () => {
  const { user } = useAuth();

  const corporatePolicies = [
    {
      id: '1',
      type: 'Group Health',
      coverage: '$2,000,000',
      status: 'Active',
      provider: 'Corporate Benefits',
      employees: 1250,
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      id: '2',
      type: 'Group Life',
      coverage: '$500,000',
      status: 'Active',
      provider: 'Corporate Benefits',
      employees: 1250,
      icon: Shield,
      color: 'bg-blue-500'
    }
  ];

  const personalPolicies = [
    {
      id: '1',
      type: 'Personal Motor',
      premium: '$1,200',
      status: 'Active',
      renewal: '2024-08-15',
      icon: Car,
      color: 'bg-orange-500'
    }
  ];

  const dependents = [
    { id: '1', name: 'Sarah Johnson', relation: 'Spouse', coverage: 'Health + Life' },
    { id: '2', name: 'Mike Johnson', relation: 'Child', coverage: 'Health' },
    { id: '3', name: 'Emma Johnson', relation: 'Child', coverage: 'Health' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-material p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2">Hello, {user?.name}!</h1>
            <p className="text-blue-100 font-roboto">Employee at {user?.company}</p>
            <p className="text-blue-100 font-roboto text-sm mt-1">Your corporate and personal insurance dashboard</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 p-4 rounded-material">
              <Building className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Digital Health Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-material p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-poppins mb-2">Digital Health Card</h2>
            <p className="text-green-100 font-roboto">Valid for all network hospitals</p>
            <div className="mt-4 bg-white/20 p-3 rounded-lg inline-block">
              <p className="font-roboto text-sm">Policy No: GH-2024-{user?.id}</p>
              <p className="font-roboto text-sm">Member ID: EMP-{user?.id?.padStart(6, '0')}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-3 rounded-lg mb-2">
              <QrCode className="h-16 w-16 text-gray-800" />
            </div>
            <button className="text-green-100 hover:text-white transition-colors text-sm font-roboto">
              <Download className="h-4 w-4 inline mr-1" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-material shadow-material">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Corporate Policies</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Personal Policies</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Dependents</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Total Coverage</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">$2.5M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Corporate Policies */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Corporate Benefits</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {corporatePolicies.map((policy) => {
                const Icon = policy.icon;
                return (
                  <div key={policy.id} className="border border-gray-200 rounded-material p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`${policy.color} p-2 rounded-lg mr-3`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 font-poppins">{policy.type}</h3>
                          <p className="text-sm text-gray-500 font-roboto">{policy.provider}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {policy.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 font-roboto">Coverage</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.coverage}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-roboto">Employees</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.employees.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personal Policies */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Personal Policies</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {personalPolicies.map((policy) => {
                const Icon = policy.icon;
                return (
                  <div key={policy.id} className="border border-gray-200 rounded-material p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`${policy.color} p-2 rounded-lg mr-3`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 font-poppins">{policy.type}</h3>
                          <p className="text-sm text-gray-500 font-roboto">Personal Coverage</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {policy.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 font-roboto">Premium</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.premium}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-roboto">Renewal</p>
                        <p className="font-semibold text-gray-900 font-poppins">{policy.renewal}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dependents */}
      <div className="bg-white rounded-material shadow-material">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Covered Dependents</h2>
            <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
              Manage Dependents
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {dependents.map((dependent) => (
              <div key={dependent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-material">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 font-roboto">{dependent.name}</p>
                    <p className="text-sm text-gray-500 font-roboto">{dependent.relation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 font-roboto">{dependent.coverage}</p>
                  <p className="text-xs text-gray-500 font-roboto">Active Coverage</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateEmployeeDashboard;