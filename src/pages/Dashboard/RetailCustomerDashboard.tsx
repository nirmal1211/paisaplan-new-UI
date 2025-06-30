import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, AlertTriangle, Clock, CheckCircle, Eye, Download, Calendar } from 'lucide-react';

const ACCENT = '#97144d';
const ACCENT_BG = '#f8eaf2';
const CARD_BG = 'white';
const CARD_BORDER = '#e5e7eb'; // slate-200
const ICON_BG = '#f3f4f6'; // slate-100

const RetailCustomerDashboard: React.FC = () => {
  const { user } = useAuth();

  const policies = [
    {
      id: '1',
      type: 'Life Insurance',
      number: 'LI-2024-001',
      premium: '$2,400',
      status: 'Active',
      renewal: '2024-12-15',
      coverage: '$500,000',
      color: ACCENT_BG
    },
    {
      id: '2',
      type: 'Health Insurance',
      number: 'HI-2024-002',
      premium: '$3,600',
      status: 'Active',
      renewal: '2024-08-20',
      coverage: '$1,000,000',
      color: '#e0f2f1' // teal-50
    },
    {
      id: '3',
      type: 'Motor Insurance',
      number: 'MI-2024-003',
      premium: '$1,800',
      status: 'Pending Renewal',
      renewal: '2024-06-30',
      coverage: '$50,000',
      color: '#fff7ed' // orange-50
    }
  ];

  const recentClaims = [
    {
      id: '1',
      type: 'Health',
      amount: '$2,500',
      status: 'Approved',
      date: '2024-05-15',
      description: 'Medical expenses'
    },
    {
      id: '2',
      type: 'Motor',
      amount: '$1,200',
      status: 'Processing',
      date: '2024-05-10',
      description: 'Vehicle repair'
    }
  ];

  const pendingEndorsements = [
    {
      id: '1',
      policy: 'Life Insurance',
      type: 'Beneficiary Update',
      status: 'Under Review',
      date: '2024-05-18'
    },
    {
      id: '2',
      policy: 'Health Insurance',
      type: 'Coverage Enhancement',
      status: 'Documentation Required',
      date: '2024-05-16'
    }
  ];

  return (
    <div className="space-y-10 min-h-screen py-10 px-2 md:px-8 bg-slate-50">
      {/* Header */}
      <div className="rounded-2xl bg-white p-10 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between border border-slate-100">
        <div>
          <h1 className="text-4xl font-extrabold font-poppins mb-2 text-slate-900 tracking-tight">Welcome back, <span style={{ color: ACCENT }}>{user?.name}</span>!</h1>
          <p className="text-slate-600 font-roboto text-lg">Manage your insurance policies and claims in one place</p>
        </div>
        <div className="mt-6 md:mt-0 md:block">
          <img
            src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
            alt="Insurance"
            className="w-28 h-28 rounded-2xl object-cover border-4 border-slate-100 shadow-lg"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white border border-slate-100 p-7 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center">
          <div className="p-4 rounded-full" style={{ background: ACCENT_BG }}>
            <FileText className="h-7 w-7" style={{ color: ACCENT }} />
          </div>
          <div className="ml-5">
            <p className="text-base font-medium font-roboto text-slate-600">Active Policies</p>
            <p className="text-3xl font-extrabold text-slate-900 font-poppins">3</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-7 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center">
          <div className="p-4 rounded-full" style={{ background: '#e0f2f1' }}>
            <CheckCircle className="h-7 w-7 text-teal-600" />
          </div>
          <div className="ml-5">
            <p className="text-base font-medium font-roboto text-slate-600">Claims Approved</p>
            <p className="text-3xl font-extrabold text-slate-900 font-poppins">12</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-7 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center">
          <div className="p-4 rounded-full" style={{ background: '#fff7ed' }}>
            <Clock className="h-7 w-7 text-orange-500" />
          </div>
          <div className="ml-5">
            <p className="text-base font-medium font-roboto text-slate-600">Pending Actions</p>
            <p className="text-3xl font-extrabold text-slate-900 font-poppins">2</p>
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-7 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center">
          <div className="p-4 rounded-full" style={{ background: ACCENT_BG }}>
            <AlertTriangle className="h-7 w-7" style={{ color: ACCENT }} />
          </div>
          <div className="ml-5">
            <p className="text-base font-medium font-roboto text-slate-600">Total Coverage</p>
            <p className="text-3xl font-extrabold text-slate-900 font-poppins">$1.55M</p>
          </div>
        </div>
      </div>

      {/* Policies Overview */}
      <div className="bg-white rounded-2xl shadow border border-slate-100">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-poppins text-slate-900">My Policies</h2>
        </div>
        <div className="p-8">
          <div className="grid gap-7">
            {policies.map((policy) => (
              <div key={policy.id} className="bg-slate-50 border border-slate-100 rounded-xl p-7 hover:shadow-lg transition-shadow flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-5 h-5 rounded-full mr-4 shadow" style={{ background: policy.color }} />
                  <div>
                    <h3 className="text-xl font-semibold font-poppins text-slate-900">{policy.type}</h3>
                    <p className="text-sm text-slate-500 font-roboto">{policy.number}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                  <div>
                    <p className="text-sm text-slate-500 font-roboto">Premium</p>
                    <p className="font-semibold text-slate-900 font-poppins">{policy.premium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-roboto">Coverage</p>
                    <p className="font-semibold text-slate-900 font-poppins">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-roboto">Renewal</p>
                    <p className="font-semibold text-slate-900 font-poppins">{policy.renewal}</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <button className="text-white hover:text-[#97144d] p-2 rounded-full" style={{ background: ACCENT }}>
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-[#97144d] hover:text-white p-2 rounded-full" style={{ background: ACCENT_BG }}>
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="text-[#97144d] hover:text-white p-2 rounded-full" style={{ background: ACCENT_BG }}>
                      <Calendar className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <span className={`ml-0 md:ml-6 mt-4 md:mt-0 px-5 py-2 rounded-full text-base font-bold shadow-md ${
                  policy.status === 'Active' ? 'bg-[#e0f2f1] text-teal-700' : 'bg-[#fff7ed] text-orange-700'
                }`}>
                  {policy.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Claims */}
        <div className="bg-white rounded-2xl shadow border border-slate-100">
          <div className="p-7 border-b border-slate-100">
            <h2 className="text-xl font-bold font-poppins text-slate-900">Recent Claims</h2>
          </div>
          <div className="p-7">
            <div className="space-y-5">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-xl shadow-sm hover:shadow transition">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full" style={{ background: ACCENT_BG }}>
                      <AlertTriangle className="h-5 w-5" style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <p className="font-semibold font-roboto text-slate-900">{claim.type} - {claim.amount}</p>
                      <p className="text-sm text-slate-500 font-roboto">{claim.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      claim.status === 'Approved' ? 'bg-[#e0f2f1] text-teal-700' : 'bg-[#fff7ed] text-orange-700'
                    }`}>
                      {claim.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 font-roboto">{claim.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Endorsements */}
        <div className="bg-white rounded-2xl shadow border border-slate-100">
          <div className="p-7 border-b border-slate-100">
            <h2 className="text-xl font-bold font-poppins text-slate-900">Pending Endorsements</h2>
          </div>
          <div className="p-7">
            <div className="space-y-5">
              {pendingEndorsements.map((endorsement) => (
                <div key={endorsement.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-xl shadow-sm hover:shadow transition">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full" style={{ background: ACCENT_BG }}>
                      <Clock className="h-5 w-5" style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <p className="font-semibold font-roboto text-slate-900">{endorsement.policy}</p>
                      <p className="text-sm text-slate-500 font-roboto">{endorsement.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm bg-[#f8eaf2] text-[#97144d]">
                      {endorsement.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 font-roboto">{endorsement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailCustomerDashboard;
