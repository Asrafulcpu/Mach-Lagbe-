import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Simple Card component - defined inline
const Card = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Simple Button component - defined inline
const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Icon components - we'll use simple emojis or text as fallback
const UsersIcon = () => <span>👥</span>;
const BarChartIcon = () => <span>📊</span>;
const ShoppingBagIcon = () => <span>🛍️</span>;
const TrendingUpIcon = () => <span>📈</span>;
const TrendingDownIcon = () => <span>📉</span>;
const DollarIcon = () => <span>💰</span>;
const PackageIcon = () => <span>📦</span>;
const DownloadIcon = () => <span>⬇️</span>;
const CalendarIcon = () => <span>📅</span>;
const ArrowRightIcon = () => <span>→</span>;
const EyeIcon = () => <span>👁️</span>;
const ShoppingCartIcon = () => <span>🛒</span>;
const CreditCardIcon = () => <span>💳</span>;
const ActivityIcon = () => <span>⚡</span>;
const TargetIcon = () => <span>🎯</span>;

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
    : 'U';
  
  // Mock data
  const topProducts = [
    { id: 1, name: 'Premium Headphones', sales: 245, revenue: '$12,450', growth: 12 },
    { id: 2, name: 'Wireless Mouse', sales: 189, revenue: '$5,670', growth: 8 },
    { id: 3, name: 'USB-C Hub', sales: 156, revenue: '$4,680', growth: 15 },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'placed an order', time: '2 min ago', amount: '$249.99' },
    { id: 2, user: 'Sarah Smith', action: 'subscribed to premium', time: '15 min ago' },
    { id: 3, user: 'Mike Johnson', action: 'left a review', time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">{initials}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Here's what's happening with your store today.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <CalendarIcon />
              <select 
                className="bg-transparent border-none focus:ring-0 text-gray-700"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="weekly">Last 7 days</option>
                <option value="monthly">This month</option>
                <option value="quarterly">This quarter</option>
                <option value="yearly">This year</option>
              </select>
            </div>
            
            <Button>
              <DownloadIcon />
              <span className="ml-2">Export Report</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-2">$24,580</h3>
                <div className="flex items-center mt-2">
                  <TrendingUpIcon />
                  <span className="text-green-600 text-sm font-medium ml-1">+12.5%</span>
                  <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarIcon />
              </div>
            </div>
          </Card>

          {/* Active Users */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Users</p>
                <h3 className="text-3xl font-bold mt-2">1,842</h3>
                <div className="flex items-center mt-2">
                  <TrendingUpIcon />
                  <span className="text-green-600 text-sm font-medium ml-1">+8.2%</span>
                  <span className="text-gray-500 text-sm ml-2">from last week</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UsersIcon />
              </div>
            </div>
          </Card>

          {/* Total Orders */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <h3 className="text-3xl font-bold mt-2">324</h3>
                <div className="flex items-center mt-2">
                  <TrendingUpIcon />
                  <span className="text-green-600 text-sm font-medium ml-1">+4.3%</span>
                  <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <ShoppingBagIcon />
              </div>
            </div>
          </Card>

          {/* Conversion Rate */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
                <h3 className="text-3xl font-bold mt-2">3.24%</h3>
                <div className="flex items-center mt-2">
                  <TrendingDownIcon />
                  <span className="text-red-600 text-sm font-medium ml-1">-1.2%</span>
                  <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TargetIcon />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart Area */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
                  <p className="text-gray-600">Monthly revenue performance</p>
                </div>
                <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
                  View Details
                  <ArrowRightIcon />
                </Button>
              </div>
              
              {/* Simplified Chart */}
              <div className="space-y-4">
                <div className="h-64 flex items-end gap-2 p-4">
                  {[65, 80, 60, 90, 75, 85, 70].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <ActivityIcon />
                    <span className="text-gray-700 ml-2">Average daily revenue: $2,842</span>
                  </div>
                  <div className="text-sm text-gray-500">Last updated: Today</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Top Products */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
                <p className="text-gray-600">Best selling items</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <PackageIcon />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                    <div className="flex items-center justify-end">
                      <TrendingUpIcon />
                      <span className="text-xs text-green-600 ml-1">+{product.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-6 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100">
              View All Products
            </Button>
          </Card>
        </div>

        {/* Recent Activities & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
                  <p className="text-gray-600">Latest user interactions</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  See All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UsersIcon />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                        {activity.amount && <span className="font-semibold text-green-600"> {activity.amount}</span>}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <button className="hover:bg-gray-200 p-2 rounded">
                      <EyeIcon />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingCartIcon />
                    <span className="text-gray-700">Avg. Order Value</span>
                  </div>
                  <span className="font-bold">$89.42</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCardIcon />
                    <span className="text-gray-700">Refund Rate</span>
                  </div>
                  <span className="font-bold text-green-600">2.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChartIcon />
                    <span className="text-gray-700">Bounce Rate</span>
                  </div>
                  <span className="font-bold text-orange-600">34.2%</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                Generate Report
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;