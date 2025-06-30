import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Users, Target, Award } from 'lucide-react';

const UnderwriterDashboard: React.FC = () => {
  const { user } = useAuth();

  const applicationQueue = [
    {
      id: '1',
      applicant: 'John Smith',
      type: 'Life Insurance',
      amount: '$500,000',
      riskScore: 'Low',
      priority: 'high',
      timeRemaining: '2 hours',
      status: 'Risk Assessment'
    },
    {
      id: '2',
      applicant: 'Sarah Johnson',
      type: 'Health Insurance',
      amount: '$250,000',
      riskScore: 'Medium',
      priority: 'medium',
      timeRemaining: '1 day',
      status: 'Document Review'
    },
    {
      id: '3',
      applicant: 'Mike Wilson',
      type: 'Motor Insurance',
      amount: '$75,000',
      riskScore: 'High',
      priority: 'low',
      timeRemaining: '3 days',
      status: 'Additional Info Required'
    }
  ];

  const endorsementQueue = [
    {
      id: '1',
      policyholder: 'Lisa Davis',
      policyType: 'Life Insurance',
      changeType: 'Beneficiary Update',
      impact: 'Low',
      dueDate: '2024-05-25'
    },
    {
      id: '2',
      policyholder: 'Robert Brown',
      policyType: 'Health Insurance',
      changeType: 'Coverage Increase',
      impact: 'Medium',
      dueDate: '2024-05-24'
    },
    {
      id: '3',
      policyholder: 'Emma Wilson',
      policyType: 'Motor Insurance',
      changeType: 'Vehicle Addition',
      impact: 'High',
      dueDate: '2024-05-23'
    }
  ];

  const performanceMetrics = [
    { label: 'Applications Processed', value: '142', change: '+12%', period: 'this month' },
    { label: 'Average Processing Time', value: '2.3 days', change: '-15%', period: 'vs last month' },
    { label: 'Approval Rate', value: '87%', change: '+3%', period: 'this quarter' },
    { label: 'Risk Accuracy', value: '94%', change: '+1%', period: 'this month' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-material p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2">Underwriter Dashboard</h1>
            <p className="text-indigo-100 font-roboto">Welcome back, {user?.name}</p>
            <p className="text-indigo-100 font-roboto text-sm mt-1">Manage applications and risk assessments</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 p-4 rounded-material">
              <Target className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Pending Applications</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">23</p>
              <p className="text-xs text-orange-600 font-roboto">Needs attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Endorsements Queue</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">12</p>
              <p className="text-xs text-blue-600 font-roboto">Active reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">8</p>
              <p className="text-xs text-green-600 font-roboto">On track</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">SLA Compliance</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">96%</p>
              <p className="text-xs text-green-600 font-roboto">Excellent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-material shadow-material">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins">Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-material">
                <p className="text-2xl font-bold text-gray-900 font-poppins mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-gray-700 font-roboto mb-2">{metric.label}</p>
                <p className={`text-xs font-roboto ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} {metric.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Queue */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-poppins">Application Queue</h2>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {applicationQueue.length} pending
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {applicationQueue.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-material p-4 hover:shadow-material transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">{app.applicant}</h3>
                      <p className="text-sm text-gray-500 font-roboto">{app.type} - {app.amount}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.priority === 'high' ? 'bg-red-100 text-red-800' :
                        app.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.timeRemaining}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.riskScore === 'Low' ? 'bg-green-100 text-green-800' :
                        app.riskScore === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.riskScore} Risk
                      </span>
                      <span className="text-sm text-gray-500 font-roboto">{app.status}</span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Endorsement Queue */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 font-poppins">Endorsement Queue</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {endorsementQueue.length} pending
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {endorsementQueue.map((endorsement) => (
                <div key={endorsement.id} className="border border-gray-200 rounded-material p-4 hover:shadow-material transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">{endorsement.policyholder}</h3>
                      <p className="text-sm text-gray-500 font-roboto">{endorsement.policyType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 font-roboto">{endorsement.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        endorsement.impact === 'Low' ? 'bg-green-100 text-green-800' :
                        endorsement.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {endorsement.impact} Impact
                      </span>
                      <span className="text-sm text-gray-500 font-roboto">{endorsement.changeType}</span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
                      Process
                    </button>
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

export default UnderwriterDashboard;