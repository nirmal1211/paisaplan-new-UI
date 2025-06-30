import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Building, TrendingUp, DollarSign, Phone, Mail, Calendar, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RelationshipManagerDashboard: React.FC = () => {
  const { user } = useAuth();

  const salesData = [
    { month: 'Jan', policies: 45, revenue: 125000, prospects: 23 },
    { month: 'Feb', policies: 52, revenue: 148000, prospects: 31 },
    { month: 'Mar', policies: 38, revenue: 108000, prospects: 28 },
    { month: 'Apr', policies: 61, revenue: 172000, prospects: 35 },
    { month: 'May', policies: 58, revenue: 165000, prospects: 29 },
    { month: 'Jun', revenue: 189000, prospects: 42 }
  ];

  const policyTypeDistribution = [
    { name: 'Life Insurance', value: 145, color: '#3B82F6' },
    { name: 'Health Insurance', value: 132, color: '#10B981' },
    { name: 'Motor Insurance', value: 98, color: '#F59E0B' },
    { name: 'Corporate Plans', value: 87, color: '#8B5CF6' }
  ];

  const topClients = [
    { id: '1', name: 'TechCorp Industries', type: 'Corporate', policies: 12, revenue: '$450,000', status: 'Active', rating: 5 },
    { id: '2', name: 'Sarah Johnson', type: 'Individual', policies: 4, revenue: '$28,500', status: 'Active', rating: 5 },
    { id: '3', name: 'Healthcare Solutions Ltd', type: 'Corporate', policies: 8, revenue: '$320,000', status: 'Renewal Due', rating: 4 },
    { id: '4', name: 'Michael Chen', type: 'Individual', policies: 3, revenue: '$18,200', status: 'Active', rating: 5 }
  ];

  const recentProspects = [
    { id: '1', name: 'Global Manufacturing', type: 'Corporate', potential: '$750,000', stage: 'Proposal Sent', priority: 'high' },
    { id: '2', name: 'David Rodriguez', type: 'Individual', potential: '$35,000', stage: 'Initial Contact', priority: 'medium' },
    { id: '3', name: 'Green Energy Corp', type: 'Corporate', potential: '$500,000', stage: 'Needs Analysis', priority: 'high' },
    { id: '4', name: 'Lisa Thompson', type: 'Individual', potential: '$22,000', stage: 'Quote Prepared', priority: 'low' }
  ];

  const upcomingTasks = [
    { id: '1', task: 'Client meeting with TechCorp', time: '10:00 AM', type: 'meeting' },
    { id: '2', task: 'Follow up on Healthcare Solutions renewal', time: '2:30 PM', type: 'call' },
    { id: '3', task: 'Prepare proposal for Global Manufacturing', time: '4:00 PM', type: 'email' },
    { id: '4', task: 'Policy review with Sarah Johnson', time: 'Tomorrow 9:00 AM', type: 'meeting' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-material p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins mb-2">Relationship Manager Dashboard</h1>
            <p className="text-emerald-100 font-roboto">Welcome back, {user?.name}</p>
            <p className="text-emerald-100 font-roboto text-sm mt-1">Grow your client portfolio and drive revenue</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 p-4 rounded-material">
              <TrendingUp className="h-12 w-12 text-white" />
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
              <p className="text-sm font-medium text-gray-500 font-roboto">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">148</p>
              <p className="text-xs text-green-600 font-roboto">+8 this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">$189K</p>
              <p className="text-xs text-green-600 font-roboto">+14% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Active Prospects</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">42</p>
              <p className="text-xs text-purple-600 font-roboto">Pipeline value: $1.3M</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-material shadow-material hover:shadow-material-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 font-roboto">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 font-poppins">68%</p>
              <p className="text-xs text-green-600 font-roboto">+5% this quarter</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Sales Performance</h2>
            <p className="text-sm text-gray-500 font-roboto mt-1">Monthly revenue and policy sales</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="policies" fill="#3B82F6" name="Policies Sold" />
                <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy Distribution */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Policy Portfolio</h2>
            <p className="text-sm text-gray-500 font-roboto mt-1">Distribution by policy type</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={policyTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {policyTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {policyTypeDistribution.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-roboto">{item.name}</p>
                    <p className="text-xs text-gray-500 font-roboto">{item.value} policies</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Client Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Top Clients</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topClients.map((client) => (
                <div key={client.id} className="border border-gray-200 rounded-material p-4 hover:shadow-material transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">{client.name}</h3>
                      <p className="text-sm text-gray-500 font-roboto">{client.type} Client</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(client.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500 font-roboto">Policies</p>
                      <p className="font-semibold text-gray-900 font-poppins">{client.policies}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-roboto">Revenue</p>
                      <p className="font-semibold text-gray-900 font-poppins">{client.revenue}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {client.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 p-1">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prospects Pipeline */}
        <div className="bg-white rounded-material shadow-material">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Prospects Pipeline</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProspects.map((prospect) => (
                <div key={prospect.id} className="border border-gray-200 rounded-material p-4 hover:shadow-material transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins">{prospect.name}</h3>
                      <p className="text-sm text-gray-500 font-roboto">{prospect.type} Prospect</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prospect.priority === 'high' ? 'bg-red-100 text-red-800' :
                      prospect.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {prospect.priority}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500 font-roboto">Potential Value</p>
                      <p className="font-semibold text-gray-900 font-poppins">{prospect.potential}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-roboto">Stage</p>
                      <p className="font-semibold text-gray-900 font-poppins">{prospect.stage}</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-material shadow-material">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins">Today's Schedule</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-material">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    task.type === 'meeting' ? 'bg-blue-100' :
                    task.type === 'call' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    {task.type === 'meeting' ? <Calendar className="h-4 w-4 text-blue-600" /> :
                     task.type === 'call' ? <Phone className="h-4 w-4 text-green-600" /> :
                     <Mail className="h-4 w-4 text-purple-600"
                    />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 font-roboto">{task.task}</p>
                    <p className="text-sm text-gray-500 font-roboto">{task.time}</p>
                  </div>
                </div>
                <button className="text-primary-600 hover:text-primary-700 font-roboto text-sm font-medium">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipManagerDashboard;