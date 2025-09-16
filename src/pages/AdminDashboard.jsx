import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, Activity, MessageSquare, Bell, Search, ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample data for charts
const userData = [
  { name: 'Jan', active: 4000, new: 2400, returning: 2400 },
  { name: 'Feb', active: 3000, new: 1398, returning: 2210 },
  { name: 'Mar', active: 2000, new: 9800, returning: 2290 },
  { name: 'Apr', active: 2780, new: 3908, returning: 2000 },
  { name: 'May', active: 1890, new: 4800, returning: 2181 },
  { name: 'Jun', active: 2390, new: 3800, returning: 2500 },
];

const pieData = [
  { name: 'Active Users', value: 400, color: '#4F46E5' },
  { name: 'New Users', value: 300, color: '#818CF8' },
  { name: 'Returning Users', value: 200, color: '#C7D2FE' },
];

const recentActivity = [
  { id: 1, user: 'Alex Johnson', action: 'completed a meditation', time: '2 min ago', type: 'success' },
  { id: 2, user: 'Maria Garcia', action: 'signed up', time: '10 min ago', type: 'info' },
  { id: 3, user: 'John Smith', action: 'reached a milestone', time: '1 hour ago', type: 'success' },
  { id: 4, user: 'Sarah Williams', action: 'reported an issue', time: '2 hours ago', type: 'warning' },
  { id: 5, user: 'Michael Brown', action: 'completed a breathing exercise', time: '5 hours ago', type: 'success' },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Stats data
  const stats = [
    { name: 'Total Users', value: '12,345', change: '+12%', changeType: 'increase', icon: Users },
    { name: 'Active Sessions', value: '1,234', change: '+5.4%', changeType: 'increase', icon: Activity },
    { name: 'New Users', value: '345', change: '-2.3%', changeType: 'decrease', icon: Users },
    { name: 'Total Content', value: '245', change: '+8.1%', changeType: 'increase', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">WellNest Admin</h1>
          ) : (
            <div className="w-8 h-8 bg-indigo-700 rounded-md"></div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-300 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>
        
        <nav className="mt-8">
          {[
            { name: 'Dashboard', icon: <Activity className="h-5 w-5" />, id: 'dashboard' },
            { name: 'Users', icon: <Users className="h-5 w-5" />, id: 'users' },
            { name: 'Content', icon: <FileText className="h-5 w-5" />, id: 'content' },
            { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, id: 'messages' },
            { name: 'Reports', icon: <FileText className="h-5 w-5" />, id: 'reports' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                activeTab === item.id ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search..."
              />
            </div>
            
            <div className="ml-4 flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </div>
              </button>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                  A
                </div>
                {sidebarOpen && (
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
            
            {/* Stats Grid */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.changeType === 'increase' ? (
                                <ArrowUpRight className="h-4 w-4 text-green-500" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4 text-red-500" />
                              )}
                              <span className="ml-1">{stat.change}</span>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Charts */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Growth Chart */}
              <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="active" fill="#4F46E5" name="Active Users" />
                      <Bar dataKey="new" fill="#818CF8" name="New Users" />
                      <Bar dataKey="returning" fill="#C7D2FE" name="Returning Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* User Distribution */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest actions from users</p>
              </div>
              <div className="bg-white overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <div className="ml-auto">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.type === 'success' 
                              ? 'bg-green-100 text-green-800' 
                              : activity.type === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </span>
                        </div>
                        <button className="ml-2 text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
