import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, TrendingUp, FileText, CheckCircle, AlertTriangle, Clock, BarChart3, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const HRAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const enrollmentData = [
    { month: 'Jan', health: 1200, life: 1150, dental: 800 },
    { month: 'Feb', health: 1250, life: 1180, dental: 850 },
    { month: 'Mar', health: 1300, life: 1200, dental: 900 },
    { month: 'Apr', health: 1280, life: 1220, dental: 920 },
    { month: 'May', health: 1350, life: 1250, dental: 950 },
    { month: 'Jun', health: 1400, life: 1280, dental: 980 }
  ];

  const policyDistribution = [
    { name: 'Health Insurance', value: 1400, color: '#10B981' },
    { name: 'Life Insurance', value: 1280, color: '#3B82F6' },
    { name: 'Dental Insurance', value: 980, color: '#F59E0B' },
    { name: 'Vision Insurance', value: 750, color: '#8B5CF6' }
  ];

  const pendingTasks = [
    { id: '1', type: 'New Employee Enrollment', count: 12, priority: 'high' },
    { id: '2', type: 'Policy Renewals', count: 8, priority: 'medium' },
    { id: '3', type: 'Dependent Updates', count: 15, priority: 'low' },
    { id: '4', type: 'Claim Approvals', count: 6, priority: 'high' }
  ];

  const recentEndorsements = [
    { id: '1', employee: 'John Smith', type: 'Add Dependent', status: 'Approved', date: '2024-05-20' },
    { id: '2', employee: 'Sarah Johnson', type: 'Coverage Change', status: 'Pending', date: '2024-05-19' },
    { id: '3', employee: 'Mike Wilson', type: 'Beneficiary Update', status: 'Under Review', date: '2024-05-18' },
    { id: '4', employee: 'Lisa Davis', type: 'Add Coverage', status: 'Approved', date: '2024-05-17' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-material p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2">HR Dashboard</h1>
            <p className="text-purple-100 font-roboto">Welcome back, {user?.name}</p>
            <p className="text-purple-100 font-roboto text-sm mt-1">Manage employee benefits and policies for {user?.company}</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 p-4 rounded-material">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">1,428</p>
              <p className="text-xs text-green-600 font-roboto">+12 this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Enrollment Rate</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">94.2%</p>
              <p className="text-xs text-green-600 font-roboto">+2.1% this quarter</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">41</p>
              <p className="text-xs text-orange-600 font-roboto">Needs attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Monthly Premium</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">$234K</p>
              <p className="text-xs text-red-600 font-roboto">+5.2% vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Enrollment Trends</h2>
            <p className="text-sm text-gray-500 font-roboto mt-1">Monthly enrollment by policy type</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="health" fill="#10B981" name="Health" />
                <Bar dataKey="life" fill="#3B82F6" name="Life" />
                <Bar dataKey="dental" fill="#F59E0B" name="Dental" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy Distribution */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Policy Distribution</h2>
            <p className="text-sm text-gray-500 font-roboto mt-1">Current active policies</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={policyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {policyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {policyDistribution.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-roboto">{item.name}</p>
                    <p className="text-xs text-gray-500 font-roboto">{item.value} employees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Pending Tasks</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-material hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      task.priority === 'high' ? 'bg-red-100' : 
                      task.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <AlertTriangle className={`h-4 w-4 ${
                        task.priority === 'high' ? 'text-red-600' : 
                        task.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-roboto">{task.type}</p>
                      <p className="text-sm text-gray-500 font-roboto">{task.count} items pending</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Endorsements */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Recent Endorsements</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentEndorsements.map((endorsement) => (
                <div key={endorsement.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-material">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-roboto">{endorsement.employee}</p>
                      <p className="text-sm text-gray-500 font-roboto">{endorsement.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      endorsement.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      endorsement.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {endorsement.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 font-roboto">{endorsement.date}</p>
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

export default HRAdminDashboard;