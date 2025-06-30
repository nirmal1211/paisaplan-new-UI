import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, TrendingUp, Settings, FileText, BarChart3, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const UnderwriterAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const productivityData = [
    { month: 'Jan', applications: 450, endorsements: 230, avgTime: 2.5 },
    { month: 'Feb', applications: 520, endorsements: 280, avgTime: 2.3 },
    { month: 'Mar', applications: 480, endorsements: 310, avgTime: 2.1 },
    { month: 'Apr', applications: 600, endorsements: 290, avgTime: 2.0 },
    { month: 'May', applications: 650, endorsements: 340, avgTime: 1.8 },
    { month: 'Jun', applications: 720, endorsements: 380, avgTime: 1.9 }
  ];

  const slaPerformance = [
    { metric: 'Application Processing', target: 3, actual: 2.1, performance: 95 },
    { metric: 'Endorsement Review', target: 2, actual: 1.6, performance: 98 },
    { metric: 'Document Verification', target: 1, actual: 0.8, performance: 92 },
    { metric: 'Risk Assessment', target: 4, actual: 3.2, performance: 89 }
  ];

  const underwriterPerformance = [
    { name: 'Mike Johnson', applications: 85, endorsements: 42, accuracy: 96, efficiency: 94 },
    { name: 'Sarah Davis', applications: 92, endorsements: 38, accuracy: 94, efficiency: 89 },
    { name: 'Tom Wilson', applications: 78, endorsements: 45, accuracy: 98, efficiency: 91 },
    { name: 'Lisa Chen', applications: 88, endorsements: 40, accuracy: 95, efficiency: 93 }
  ];

  const systemAlerts = [
    { id: '1', type: 'SLA Breach', message: 'Application processing time exceeded for 3 cases', severity: 'high', time: '2 hours ago' },
    { id: '2', type: 'System Performance', message: 'Document verification service response time increased', severity: 'medium', time: '4 hours ago' },
    { id: '3', type: 'Workflow', message: 'New automated rule deployment successful', severity: 'low', time: '1 day ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-material p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2">Underwriter Admin Dashboard</h1>
            <p className="text-slate-200 font-roboto">Welcome back, {user?.name}</p>
            <p className="text-slate-200 font-roboto text-sm mt-1">Monitor team performance and system operations</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 p-4 rounded-material">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Active Underwriters</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">12</p>
              <p className="text-xs text-green-600 font-roboto">All online</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">System Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">94%</p>
              <p className="text-xs text-green-600 font-roboto">+2% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Avg Processing Time</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">1.9d</p>
              <p className="text-xs text-green-600 font-roboto">-0.3d vs target</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">SLA Compliance</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">93.5%</p>
              <p className="text-xs text-green-600 font-roboto">Above target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Productivity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Productivity */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Team Productivity</h2>
            <p className="text-sm text-gray-500 font-roboto mt-1">Monthly processing volumes</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                <Bar dataKey="endorsements" fill="#10B981" name="Endorsements" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Processing Time Trends */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Processing Time Trends</h2>
            <p className="text-sm text-gray-500 font-roboto mt-1">Average processing time in days</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={3} name="Avg Time (days)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SLA Performance and Underwriter Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Performance */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">SLA Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {slaPerformance.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-material">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 font-roboto">{item.metric}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.performance >= 95 ? 'bg-green-100 text-green-800' :
                      item.performance >= 90 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.performance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-roboto">Target: {item.target}d</span>
                    <span className="font-roboto">Actual: {item.actual}d</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.performance >= 95 ? 'bg-green-500' :
                        item.performance >= 90 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${item.performance}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Underwriter Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {underwriterPerformance.map((performer, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-material">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 font-poppins">{performer.name}</h3>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {performer.efficiency}% Efficiency
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-roboto">Applications</p>
                      <p className="font-semibold text-gray-900 font-poppins">{performer.applications}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-roboto">Endorsements</p>
                      <p className="font-semibold text-gray-900 font-poppins">{performer.endorsements}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-roboto">Accuracy</p>
                      <p className="font-semibold text-gray-900 font-poppins">{performer.accuracy}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-material shadow-material">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins">System Alerts</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-material">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    alert.severity === 'high' ? 'bg-red-100' :
                    alert.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 font-roboto">{alert.type}</p>
                    <p className="text-sm text-gray-500 font-roboto">{alert.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-roboto">{alert.time}</p>
                  <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwriterAdminDashboard;